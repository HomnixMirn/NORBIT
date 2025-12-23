from django.core.mail import send_mail

def send_verification_email(email, code):
    send_mail(
        subject='Подтверждение регистрации',
        message=f'Ваш код подтверждения: {code}',
        from_email='My App <your_email@gmail.com>',
        recipient_list=[email],
        fail_silently=False
    )
