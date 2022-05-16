from django.contrib import admin
from django.urls import path
 
from stocksapi.views import register,updateuser,logginuser, logoutuser

urlpatterns = [
    path('userregister',register.as_view()),
    path('userlogin',logginuser.as_view()),
    path('userlogout',logoutuser.as_view()),
    path('verify/verifyacc/<slug:pid>',updateuser.as_view()),
]   