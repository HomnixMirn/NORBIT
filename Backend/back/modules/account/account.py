from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from rest_framework.request import Request
from back.models import Profile
from back.utils.serializers import ProfileSerializer

def personal_account(request:Request):
    if request.method == 'GET':
        user = request.user
        try:
            profile = Profile.objects.get(user=user)
            serializer = ProfileSerializer(profile)
            return Response(serializer.data,status=status.HTTP_200_OK)
        except:
            return Response('Ошибка получения данных',status=status.HTTP_406_NOT_ACCEPTABLE)
    else:
        return Response('Неверный метод',status=status.HTTP_406_NOT_ACCEPTABLE)
    
def set_icon_profile(request:Request):
    if request.method == 'POST':
        user = request.user
        data = request.data
        try:
            profile = Profile.objects.get(user=user)
            profile.icon.delete()
            profile.icon = data['icon']
            profile.save()
            serializer = ProfileSerializer(profile)
            return Response(serializer.data,status=status.HTTP_200_OK)
        except:
            return Response('Ошибка получения данных',status=status.HTTP_406_NOT_ACCEPTABLE)
    else:
        return Response('Неверный метод',status=status.HTTP_406_NOT_ACCEPTABLE)
    
def set_name_profile(request:Request):
    if request.method == 'POST':
        user = request.user
        data = request.data
        try:

            user.username = data['name']
            user.save()
            profile = Profile.objects.get(user=user)
            serializer = ProfileSerializer(profile)
            return Response(serializer.data,status=status.HTTP_200_OK)
        except:
            
            return Response('Ошибка получения данных',status=status.HTTP_406_NOT_ACCEPTABLE)
    else:
        return Response('Неверный метод',status=status.HTTP_406_NOT_ACCEPTABLE)