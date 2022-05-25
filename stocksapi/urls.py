from django.contrib import admin
from django.urls import path
 
from stocksapi.views import *
from . import views

urlpatterns = [
    path('userregister',register.as_view()),
    path('userlogin',logginuser.as_view()),
    path('userlogout',logoutuser.as_view()),
    path('verify/verifyacc/<slug:pid>',updateuser.as_view()),
    path('addwatchlist',addwatchlist.as_view()),
    path('CreateWatchList',CreateWatchList.as_view()),
    path('GetWatchList',GetWatchList.as_view()),
    path('check_userlogin',check_userlogin.as_view()),
    path('userdata',userdata.as_view()),
    path('EditWatchList',EditWatchList.as_view()),
    path('deleteWatchList',deleteWatchList.as_view()),
    path('GetProfitList',GetProfitList.as_view()),
    path('changepassword',changepassword.as_view()),
    path('password_reset',password_reset.as_view()),
    path('save_new_password/<slug:pid>',save_new_password.as_view()),
    path('get_share_details',get_share_details.as_view()),
    path('buy_stock',buy_stock.as_view()),
    path('sell_stock',sell_stock.as_view()),
    path('get_orders',get_orders.as_view()),
    path('get_balances',get_balances.as_view()),
    path('getpandf',getpandf.as_view()),
]   