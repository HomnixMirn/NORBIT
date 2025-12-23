from rest_framework.decorators import api_view
from rest_framework.request import Request
from back.modules.authentication import auth
from back.modules.account import account
from back.utils.auth_decorator import *
@api_view(['POST'])
def login(request: Request):
    return auth.login(request)


@api_view(['POST'])
def register(request: Request):
    return auth.register(request)


@api_view(['GET'])
def logout(request: Request):
    return auth.logout(request)


@api_view(['POST'])
def verify_email(request: Request):
    return auth.verify_email(request)

@api_view(['GET'])
@token_required
def personal_account(request:Request):
    return account.personal_account(request)