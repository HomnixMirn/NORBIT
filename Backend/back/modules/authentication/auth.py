from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.request import Request
from back.models import authorizedToken, Profile, EmailVerification
from back.utils.code_generator import generate_code
from back.utils.email import send_verification_email
from django.core.validators import validate_email
from django.core.exceptions import ValidationError

def register(request: Request):
    if request.method != 'POST':
        return Response({"message": "Метод не поддерживается"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    data = request.data
    try:
        login = data.get('login')
        password = data.get('password')
        password2 = data.get('password2')
        email = data.get('email')

        if not all([login, password, password2, email]):
            return Response({"message": "Не все поля заполнены"}, status=status.HTTP_400_BAD_REQUEST)

        if password != password2:
            return Response({"message": "Пароли не совпадают"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            validate_email(email)
        except ValidationError:
            return Response({"message": "Некорректный email"}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.filter(email=email).first()
        if user:
            if user.is_active:
                return Response({"message": "Пользователь уже существует"}, status=status.HTTP_200_OK)
            else:
                # Повторная отправка кода для неактивного пользователя
                code = generate_code()
                EmailVerification.objects.update_or_create(user=user, defaults={"code": code})
                try:
                    send_verification_email(email, code)
                except Exception as e:
                    print("Ошибка отправки email:", e)
                return Response({"message": "Код подтверждения отправлен повторно"}, status=status.HTTP_200_OK)

        # Создание нового пользователя
        user = User.objects.create_user(username=login, email=email, password=password)
        user.is_active = False
        user.save()
        Profile.objects.create(user=user)

        code = generate_code()
        EmailVerification.objects.create(user=user, code=code)
        try:
            send_verification_email(email, code)
        except Exception as e:
            print("Ошибка отправки email:", e)

        return Response({"message": "Код подтверждения отправлен на почту"}, status=status.HTTP_201_CREATED)

    except Exception as e:
        print("Ошибка регистрации:", e)
        return Response({"message": "Ошибка регистрации"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def login(request: Request):
    if request.method != 'POST':
        return Response({"message": "Метод не поддерживается"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    data = request.data
    login_field = data.get('login')
    password = data.get('password')

    if not login_field or not password:
        return Response({"message": "Не все поля заполнены"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = authenticate(username=login_field, password=password)
        if not user:
            return Response({"message": "Неверный логин или пароль"}, status=status.HTTP_400_BAD_REQUEST)
        if not user.is_active:
            return Response({"message": "Аккаунт не подтверждён"}, status=status.HTTP_403_FORBIDDEN)

        token = authorizedToken.objects.get_or_create(user=user)[0].key
        return Response({"token": token}, status=status.HTTP_200_OK)

    except Exception as e:
        print("Ошибка логина:", e)
        return Response({"message": "Ошибка при логине"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def logout(request: Request):
    if request.method != 'GET':
        return Response({"message": "Метод не поддерживается"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return Response({"message": "Необходимо авторизоваться"}, status=status.HTTP_401_UNAUTHORIZED)

    try:
        token = auth_header.split(' ')[1]
        authorizedToken.objects.get(key=token).delete()
        return Response({"message": "Вы вышли из аккаунта"}, status=status.HTTP_200_OK)
    except authorizedToken.DoesNotExist:
        return Response({"message": "Токен не найден"}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        print("Ошибка логаута:", e)
        return Response({"message": "Не удалось выйти из аккаунта"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


def verify_email(request: Request):
    if request.method != 'POST':
        return Response({"message": "Метод не поддерживается"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    email = request.data.get('email')
    code = request.data.get('code')

    if not email or not code:
        return Response({"message": "Не все поля заполнены"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(email=email)
        verification = EmailVerification.objects.get(user=user)
        if verification.code == code:
            user.is_active = True
            user.save()
            verification.delete()
            return Response({"message": "Email подтверждён"}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "Неверный код"}, status=status.HTTP_400_BAD_REQUEST)
    except User.DoesNotExist:
        return Response({"message": "Пользователь не найден"}, status=status.HTTP_404_NOT_FOUND)
    except EmailVerification.DoesNotExist:
        return Response({"message": "Код подтверждения не найден"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        print("Ошибка подтверждения email:", e)
        return Response({"message": "Ошибка подтверждения"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
