import json

import requests
from django.shortcuts import render
import string
from rest_framework import filters, generics
from rest_framework.response import Response
from rest_framework.status import *
from rest_framework.views import APIView
import smtplib
from datetime import timezone
import datetime
from datetime import datetime
from random import choice
from email.message import EmailMessage
from django.conf import settings
from .models import User1
from django.contrib.auth import login,authenticate,logout
from .models import *
from django.views.decorators.csrf import csrf_exempt
from .serializers import *
from datetime import timedelta

def generate_random_unicode():
        # logic to generate code
        varsptoken = ''
        alphas = ['-', '_', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
        for i in range(26):
            alphas.append(chr(65+i))
            alphas.append(chr(97+i))
        for i in range(89):
            varsptoken += choice(alphas)

        return varsptoken

def send_mail(to, personalcode):
        # logic to send mail to user
    sender_mail = f"{settings.MAIL_SENDER}"
    password_sender = f"{settings.PASS_MAIL}"
    message = EmailMessage()
    message['To'] = to
    message['From'] = sender_mail
    message['Subject'] = "Welcome to ProFit King"
    message.set_content(
        f"Hello User welcome to ProFitKing Your account verification link is\n {settings.SITE_URL}verify/{personalcode} \nvalid for next 15 minutes.")
    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls() 
        server.login(sender_mail, password_sender)
        server.send_message(message)
        return True         # success 
    except:
        return False 

def send_mail1(to, personalcode):
        # logic to send mail to user
    sender_mail = f"{settings.MAIL_SENDER}"
    password_sender = f"{settings.PASS_MAIL}"
    message = EmailMessage()
    message['To'] = to
    message['From'] = sender_mail
    message['Subject'] = "Welcome to ProFit King"
    message.set_content(
        f"Hello User welcome to ProFitKing Your password reset link is\n {settings.SITE_URL}reset/{personalcode} \nvalid for next 15 minutes.")
    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls() 
        server.login(sender_mail, password_sender)
        server.send_message(message)
        return True         # success 
    except:
        return False  

def send_mail2(to, username,password):
        # logic to send mail to user
    sender_mail = f"{settings.MAIL_SENDER}"
    password_sender = f"{settings.PASS_MAIL}"
    message = EmailMessage()
    message['To'] = to
    message['From'] = sender_mail
    message['Subject'] = "Welcome to ProFit King"
    message.set_content(
        f"Hello User welcome to ProFitKing Your account is verified and your Credentialis are\n Username:{username} \n Password:{password}")
    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls() 
        server.login(sender_mail, password_sender)
        server.send_message(message)
        return True         # success 
    except:
        return False  

def generate_password():
    user_pass = ''
    alphas = ['-', '_', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    specia_char = ['@','#','$','%']
    small = []
    caps = []
    for i in range(26):
        caps.append(chr(65+i))
        small.append(chr(97+i))
    
    for i in range(3):
        user_pass += choice(caps)

    for i in range(2):
        user_pass += choice(alphas)

    for i in range(1):
        user_pass+= choice(specia_char)

    for i in range(3):
        user_pass += choice(small)

    return user_pass

def get_share_data(api_key,symbol,watchlist):
    api_url = f'https://api.twelvedata.com/time_series?apikey={api_key}&interval=1day&symbol={symbol}&outputsize=2'
    r = requests.get(url = api_url)
    data = r.json()
    stock_diff = round(float(data['values'][0]['close'])-float(data['values'][1]['close']),2)
    exchange = data['meta']['exchange']
    percentage = round((stock_diff/float(data['values'][1]['close']))*100,2)
    closing_price = round(float(data['values'][0]['close']),2)
    try:
        watc_obj = stocks.objects.get(symbol=symbol)
        company_name = watc_obj.name
    except:
        company_name = "Null"
    
    share_data1 = {
        "watchlist":watchlist,
        "symbol":symbol,
        "stock_diff":stock_diff,
        "percent":percentage,
        "exchange":exchange,
        "cmp":closing_price,
        "company_name":company_name,
    }
    return share_data1


def get_cmp(api_key,symbol):
    api_url = f'https://api.twelvedata.com/time_series?apikey={api_key}&interval=1day&symbol={symbol}&outputsize=2'
    r = requests.get(url = api_url)
    data = r.json()
    closing_price = round(float(data['values'][0]['close']),2)
    cmp_data = {
        'symbol':symbol,
        'closing_price':closing_price
    }
    return cmp_data

def get_share_data1(api_key,symbol):
    api_url = f'https://api.twelvedata.com/time_series?apikey={api_key}&interval=1day&symbol={symbol}&outputsize=2'
    r = requests.get(url = api_url)
    data = r.json()
    stock_diff = round(float(data['values'][0]['close'])-float(data['values'][1]['close']),2)
    exchange = data['meta']['exchange']
    percentage = round((stock_diff/float(data['values'][1]['close']))*100,2)
    closing_price = round(float(data['values'][0]['close']),2)
    try:
        watc_obj = stocks.objects.get(symbol=symbol)
        company_name = watc_obj.name
    except:
        company_name = "Null"
    
    share_data1 = {
        "symbol":symbol,
        "stock_diff":stock_diff,
        "percent":percentage,
        "exchange":exchange,
        "cmp":closing_price,
        "company_name":company_name,
    }
    return share_data1






class updateuser(APIView):
    def post(self,request,pid):
        if request.method == 'POST':
            data = request.data
            if data == None:
                return Response({'status':HTTP_400_BAD_REQUEST,'message':'Invalid Request'})

            try:
                username = data['unamm']
            except:
                return Response({'status':HTTP_400_BAD_REQUEST,'message':'Invalid Request.'})

            me = User1.objects.filter(unicode=pid)
            puser = User1.objects.filter(username=username)
            if len(me) != 1 or len(puser) != 1:
                return Response({'status':HTTP_200_OK,'message':'User does not exists'})
            for person in me:
                if person.is_verified == 0:
                    # match timestamp code here
                    cur_time = datetime.now()
                    pre_time = str(person.timestamp)
                    pre_time = pre_time.split('+')[0]
                    pre_time = datetime.strptime(pre_time, '%Y-%m-%d %H:%M:%S.%f')
                    del_time = str(cur_time-pre_time)    
                    del_time = del_time.split(':')
                    if del_time[0] != '0':
                        # delete entry from database
                        User1.objects.filter(
                            unicode=pid).delete()
                        return Response({'status':HTTP_200_OK,'message':'Time limit exceeds'})
                    elif int(del_time[1]) > 14:     # 15 minutes time
                        # delete entry from database
                        User1.objects.filter(
                            unicode=pid).delete()
                        return Response({'status':HTTP_200_OK,'message':'Time limit exceeds'})
                    
                    password = generate_password()
                    person.is_verified = 1
                    person.unicode = None
                    person.set_password(password)
                    person.account_bal = 50000
                    person.save()
                    stock_array = ["AAPL","INFY","TRP"]
                    default_watchlist = WatchList()
                    default_watchlist.name = 'ProFit King'
                    default_watchlist.user = person
                    default_watchlist.save()
                    for i in stock_array:
                        get_shares = stocks.objects.get(symbol=i)
                        default_watchlist.shares.add(get_shares)
                    default_watchlist.save()
                    statue = send_mail2(person.email,username,password)
                    return Response({'status':HTTP_200_OK,'message':'Success'})
                else:
                    return Response({'status':HTTP_200_OK,'message':'Already verified'})
        elif request.user.is_authenticated:
            return Response({'status':HTTP_200_OK,'message':'User is autheticated'})
        else:
            return Response({'status':HTTP_200_OK,'message':'User not autheticated'})



class register(APIView):
    def post(self,request):

        data = request.data
        if data == None:
            return Response({'status':HTTP_400_BAD_REQUEST,'message':'Invalid Request'})

        try:
            first_name = data["fname"]
            last_name = data["lname"]
            username = data['username']
            email_r = data["email"]
            phone_r = data["phoneno"]
            pan_no = data['panno']
        except:
            return Response({'status':HTTP_400_BAD_REQUEST,'message':'Invalid data.'})
        
        try:
            user = User1.objects.get(username = username)
        except:
            user = None
        if(user is not None):
            return Response({'status':HTTP_200_OK,'message':'Username already exists'})
        personalcode = generate_random_unicode()
        mytimecalculator = 0
        while(len(User1.objects.filter(unicode=personalcode))):
            personalcode = generate_random_unicode()
            mytimecalculator += 1
            if mytimecalculator > 10000:
                pass 

        status = send_mail(email_r, personalcode)

        user=User1.objects.create_user(username = username,email=email_r, first_name=first_name,last_name=last_name,unicode=personalcode, timestamp=datetime.now(),phone_no =phone_r,pan_no = pan_no)
        user.save();

        return Response({'status':HTTP_200_OK,'message':'Success'})


class logoutuser(APIView):
    def get(self,request):
        if request.user.is_authenticated:
            logout(request)
            return Response({'status':HTTP_200_OK,'message':'successfully logged out which was.'})

        return Response({'status':HTTP_200_OK,'message':'successfully logged out.'})

class logginuser(APIView):
    def post(self,request):
        if request.user.is_authenticated: 
            return Response({'status':HTTP_400_BAD_REQUEST,'message':'Already logined.'})
        try:
            data = request.data
            username = data["username"]
            password = data["password"]
        except:
            return Response({'status':HTTP_400_BAD_REQUEST,'message':';Invalid Request.'})
        user = authenticate(request,username=username,password=password)
        if user is None:
            return Response({'status':HTTP_404_NOT_FOUND,'message':'Invalid Username or Password'})
        
        login(request,user)
        return Response({'status':HTTP_200_OK,'message':'success',})
 


class password_reset(APIView):
    def post(self,request):
        data = request.data
        if data == None:
            return Response({'status':HTTP_400_BAD_REQUEST,'message':'Invalid Request'})

        try:
            email = data['email']
        except:
            return Response({'status':HTTP_400_BAD_REQUEST,'message':'Invalid Request.'})
        
        u_obj=User1.objects.filter(email=email)
        
        if u_obj is None:
            return Response({'status':HTTP_400_BAD_REQUEST,'message':'User deoes not exists'})
        else:
            for data in u_obj:
                if not data.is_verified:
                    return Response({'status':HTTP_400_BAD_REQUEST,'message':'User not verified yet'})
                
                personal_code=generate_random_unicode()
                data.unicode=personal_code
                data.save()
                status=send_mail1(email,personal_code)
                return Response({'status':HTTP_200_OK,'message':'success'})



class save_new_password(APIView):
    def post(self,request,pid):
        data = request.data
        if data == None:
            return Response({'status':HTTP_400_BAD_REQUEST,'message':'Invalid Request'})

        try:
            passwor=data['password']
            confirm_password=data['confirm_password']
        except:
            return Response({'status':HTTP_400_BAD_REQUEST,'message':'Invalid Request.'})

        
        if(passwor!=confirm_password):
            return Response({'status':HTTP_400_BAD_REQUEST,'message':'Password did not matched'})

        u_obj=User1.objects.filter(unicode = pid)
        if len(u_obj)==0:
            return Response({'status':HTTP_400_BAD_REQUEST,'message':'User does not exists'})
        else:
            for u_ob in u_obj:
                u_ob.set_password(passwor)
                u_ob.unicode=None
                u_ob.save()
            return Response({'status':HTTP_200_OK,'message':'success'})

class addwatchlist(APIView):
    def post(self,request):
        data = request.data
        if data == None:
            return Response({'status':HTTP_400_BAD_REQUEST,'message':'Invalid Request'})

        try:
            symbol = data['symbol']
            watchlist = data['Watchlist']
        except:
            return Response({'status':HTTP_400_BAD_REQUEST,'message':'No data passed.'})
        
        try:
            get_watch = WatchList.objects.get(name=watchlist,user = request.user)
            share = stocks.objects.get(symbol=symbol)
        except:
            return Response({'status':HTTP_400_BAD_REQUEST,'message':'Watchlist/share does not exists.'})
        
        if(watchlist == 'ProFit King'):
            return Response({'status':HTTP_400_BAD_REQUEST,'message':'You Cannot add any stock in Profit King.'})

        get_watch.shares.add(share)
        get_watch.save()
        share_data = []
        api_keys = ["b93e2df9d9d94053a54ec92e039c9300",
"9810194c6c6b4fdebf81989f51b2410d",
"f14e6bf23b7246758e4398152a3afcb7",
"971e9789fd7a48499a702a73634b1815",
"7dbbab7aae7240b7a08528164cc5b5d6"]
        api_no = 0
        for i in get_watch.shares.all():
            try:
                ind = int(int(api_no)%5)
                api_key = api_keys[ind]
                api_no+=1
            except:
                api_key = api_keys[0]
            sh_data =get_share_data(api_key,i.symbol,watchlist)
            share_data.append(sh_data)
        return Response({'status':HTTP_200_OK,'message':'success','data':share_data})


class CreateWatchList(APIView):
    def post(self,request):
        if request.user.is_authenticated:
            data = request.data
            if data == None:
                return Response({'status':HTTP_400_BAD_REQUEST,'message':'Invalid Request'})

            try:
                name = data['name']
            except:
                return Response({'status':HTTP_400_BAD_REQUEST,'message':'No data passed.'})
            
            try:
                get_wat = WatchList.objects.get(name = name,user = request.user)
                return Response({'status':HTTP_200_OK,'message':'WatchList Already exists'})
            except:
                pass
            
            total_watchlist = WatchList.objects.filter(user = request.user)
            if(len(total_watchlist)>=20):
                return Response({'status':HTTP_200_OK,'message':'You cannot create more than 20 Watchlist'})
            
            create_watch = WatchList()
            create_watch.name = name
            create_watch.user = request.user
            create_watch.save()
            return Response({'status':HTTP_200_OK,'message':'success'})
        else:
            return Response({'status':HTTP_400_BAD_REQUEST,'message':'User is not autheticated..'})


class GetWatchList(APIView):
    def get(self,request):
        if request.user.is_authenticated:
            user_watchlist = WatchList.objects.filter(user=request.user)
            watchlist = WatchListSerializer(user_watchlist, many=True)
            share_data = []
            api_keys = ["b93e2df9d9d94053a54ec92e039c9300",
"9810194c6c6b4fdebf81989f51b2410d",
"f14e6bf23b7246758e4398152a3afcb7",
"971e9789fd7a48499a702a73634b1815",
"7dbbab7aae7240b7a08528164cc5b5d6"]
            api_no = 0
            for j in user_watchlist:
                for i in j.shares.all():
                    try:
                        ind = int(int(api_no)%5)
                        api_key = api_keys[ind]
                        api_no+=1
                    except:
                        api_key = api_keys[0]
                    sh_data =get_share_data(api_key,i.symbol,j.name)
                    share_data.append(sh_data)
            return Response({'status':HTTP_200_OK,'message':'success','data':watchlist.data,'share_data':share_data})
        else:
            return Response({'status':HTTP_400_BAD_REQUEST,'message':'User is not autheticated..'})


class check_userlogin(APIView):
    def get(self,request):
        if request.user.is_authenticated:
            return Response({'status':HTTP_200_OK,'message':'yes'})
        else:
            return Response({'status':HTTP_200_OK,'message':'no'})

class userdata(APIView):
    def get(self,request):
        if request.user.is_authenticated:
            user = User1.objects.get(id = request.user.id)
            user_data = UserSerializer(user)
            data = user_data.data
            return Response({'status':HTTP_200_OK,'message':'success','data':data})
        else:
            return Response({'status':HTTP_200_OK,'message':'User not authenticated'})

class EditWatchList(APIView):
    def post(self,request):
        if request.user.is_authenticated:
            data = request.data
            if data == None:
                return Response({'status':HTTP_400_BAD_REQUEST,'message':'Invalid Request'})

            try:
                id = data['id']
                name = data['name']
            except:
                return Response({'status':HTTP_400_BAD_REQUEST,'message':'No data passed.'})
            
            get_wtch = WatchList.objects.get(id=id)
            get_wtch.name = name
            get_wtch.save()
            return Response({'status':HTTP_200_OK,'message':'success'})

class deleteWatchList(APIView):
    def post(self,request):
        if request.user.is_authenticated:
            data = request.data
            if data == None:
                return Response({'status':HTTP_400_BAD_REQUEST,'message':'Invalid Request'})

            try:
                id = data['id']
            except:
                return Response({'status':HTTP_400_BAD_REQUEST,'message':'No data passed.'})
            get_watc = WatchList.objects.get(id=id)
            if(get_watc.name=='ProFit King'):
                return Response({'status':HTTP_400_BAD_REQUEST,'message':'You cannot delete this watchlist.'})
            get_watc.delete()
            return Response({'status':HTTP_200_OK,'message':'success'})

class GetProfitList(APIView):
    def get(self,request):
        if request.user.is_authenticated:
            user_watchlist = WatchList.objects.filter(user= request.user,name='ProFit King')
            watchlist = WatchListSerializer(user_watchlist, many=True)
            share_data = []
            api_keys = ["b93e2df9d9d94053a54ec92e039c9300",
"9810194c6c6b4fdebf81989f51b2410d",
"f14e6bf23b7246758e4398152a3afcb7",
"971e9789fd7a48499a702a73634b1815",
"7dbbab7aae7240b7a08528164cc5b5d6"]
            api_no = 0
            for j in user_watchlist:
                for i in j.shares.all():
                    try:
                        ind = int(int(api_no)%5)
                        api_key = api_keys[ind]
                        api_no+=1
                    except:
                        api_key = api_keys[0]
                    sh_data =get_share_data(api_key,i.symbol,j.name)
                    share_data.append(sh_data)
            return Response({'status':HTTP_200_OK,'message':'success','share_data':share_data})
        else:
            return Response({'status':HTTP_400_BAD_REQUEST,'message':'User is not autheticated..'})

class changepassword(APIView):
    def post(self,request):
        if request.user.is_authenticated:
            data = request.data
            if data == None:
                return Response({'status':HTTP_400_BAD_REQUEST,'message':'Invalid Request'})

            try:
                password = data['password']
                confirm_password = data['confirm_password']
            except:
                return Response({'status':HTTP_400_BAD_REQUEST,'message':'No data passed.'})
            
            if(password!=confirm_password):
                return Response({'status':HTTP_400_BAD_REQUEST,'message':'Password did not matched!'})

            user = User1.objects.get(id = request.user.id)
            user.set_password(password)
            user.save()
            return Response({'status':HTTP_200_OK,'message':'success'})
        else:
            return Response({'status':HTTP_400_BAD_REQUEST,'message':'User is not autheticated..'})


class get_share_details(APIView):
    def post(self,request):
        if request.user.is_authenticated:
            data = request.data
            if data == None:
                return Response({'status':HTTP_400_BAD_REQUEST,'message':'Invalid Request'})

            try:
                symbol = data['symbol']
            except:
                return Response({'status':HTTP_400_BAD_REQUEST,'message':'No data passed.'})
            
            api_keys = ["b93e2df9d9d94053a54ec92e039c9300",
"9810194c6c6b4fdebf81989f51b2410d",
"f14e6bf23b7246758e4398152a3afcb7",
"971e9789fd7a48499a702a73634b1815",
"7dbbab7aae7240b7a08528164cc5b5d6"]
            api_key = api_keys[4]
            sh_data =get_share_data1(api_key,symbol)
            return Response({'status':HTTP_200_OK,'message':'success','share_data':sh_data})
        else:
            return Response({'status':HTTP_400_BAD_REQUEST,'message':'User is not autheticated..'})


class buy_stock(APIView):
    def post(self,request):
        if request.user.is_authenticated:
            data = request.data
            if data == None:
                return Response({'status':HTTP_400_BAD_REQUEST,'message':'Invalid Request'})

            try:
                order_type = data['order_type']
                product_type = data['product_type']
                symbol = data['symbol']
                quantity = data['quantity']
                buy_price = data['buy_price']
            except:
                return Response({'status':HTTP_400_BAD_REQUEST,'message':'No data passed.'})

            date_format_str = '%d/%m/%Y %H:%M:%S.%f'
            final_time = datetime.now() + timedelta(hours = 5,minutes=30)
            order_creation = Order()
            order_creation.user = request.user
            order_creation.share_symbol = symbol
            order_creation.time = datetime.now()
            order_creation.product = product_type
            order_creation.ltp = buy_price
            order_creation.quantity = int(quantity)
            order_creation.price = round(float(buy_price)*int(quantity),3)
            order_creation.oerder_type = order_type
            order_creation.share_deal_type = 'BUY'

            try:
                user = User1.objects.get(id = request.user.id)
            except:
                return Response({'status':HTTP_400_BAD_REQUEST,'message':'User is not autheticated..'})

            if((float(buy_price)*int(quantity))<= float(user.account_bal)): 
                user.account_bal = round(float(user.account_bal) - (float(buy_price)*int(quantity)),3)
                user.save()
                order_creation.status = True
                add_holding,res = holdings.objects.get_or_create(user = request.user
                ,share_symbol = symbol)
                try:
                    add_holding.quantity = add_holding.quantity+int(quantity)
                except:
                    add_holding.quantity = int(quantity)
                try:
                    add_holding.avg_price =round((add_holding.avg_price + float(buy_price)*int(quantity))/add_holding.quantity,3)
                except:
                    add_holding.avg_price = (float(buy_price)*int(quantity))/add_holding.quantity
                add_holding.time = datetime.now()
                add_holding.save()
            else:
                return Response({'status':HTTP_200_OK,'message':'You do not have sufficient balance'})

            order_creation.save()

#             get_orders = []
#             position_cmps = []
#             get_user_orders = Order.objects.filter(user=request.user)
#             for j in get_user_orders:
#                 if(j.time.date()== (datetime.now().date())):
#                     get_orders.append(j)
#             api_keys = ["b93e2df9d9d94053a54ec92e039c9300",
# "9810194c6c6b4fdebf81989f51b2410d",
# "f14e6bf23b7246758e4398152a3afcb7",
# "971e9789fd7a48499a702a73634b1815",
# "7dbbab7aae7240b7a08528164cc5b5d6"]
#             api_no = 0
#             for ord in get_orders:
#                 api_no+=1
#                 try:
#                     ind = int(int(api_no)%5)
#                     api_key = api_keys[ind]
#                     api_no+=1
#                 except:
#                     api_key = api_keys[0]
#                 smbl = ord.share_symbol
#                 dat = get_cmp(api_key,smbl)
#                 position_cmps.append(dat)

#             serializer = OrderSerializer(get_orders,many=True)


            return Response({'status':HTTP_200_OK,'message':'success'})
        else:
            return Response({'status':HTTP_400_BAD_REQUEST,'message':'User is not autheticated..'})



class sell_stock(APIView):
    def post(self,request):
        if request.user.is_authenticated:
            data = request.data
            if data == None:
                return Response({'status':HTTP_400_BAD_REQUEST,'message':'Invalid Request'})

            try:
                order_type = data['order_type']
                product_type = data['product_type']
                symbol = data['symbol']
                quantity = data['quantity']
                buy_price = data['buy_price']
            except:
                return Response({'status':HTTP_400_BAD_REQUEST,'message':'No data passed.'})
            
            # date_format_str = '%d/%m/%Y %H:%M:%S.%f'
            # time_str=str(datetime.now(timezone.utc))
            # given_time = datetime.strptime(time_str, date_format_str)
            # final_time = given_time + timedelta(hours = 5,minutes=30)
            order_creation = Order()
            order_creation.user = request.user
            order_creation.share_symbol = symbol
            order_creation.time = datetime.now()
            order_creation.product = product_type
            order_creation.ltp = buy_price
            order_creation.quantity = int(quantity)
            order_creation.price = round(float(buy_price)*int(quantity),3)
            order_creation.oerder_type = order_type
            order_creation.share_deal_type = 'SELL'
            order_creation.save()

            try:
                user = User1.objects.get(id = request.user.id)
            except:
                return Response({'status':HTTP_400_BAD_REQUEST,'message':'User is not autheticated..'})

            user_holdings = holdings.objects.filter(user=request.user,share_symbol=symbol)
            if(len(user_holdings)==0):
                return Response({'status':HTTP_200_OK,'message':f'You Dont have any shares of {symbol}..'})
            total_order = 0
            for user_or in user_holdings:
                total_order+=int(user_or.quantity)

            if(int(total_order)<int(quantity)):
                return Response({'status':HTTP_200_OK,'message':f'You Dont have enough shares of {symbol}..'})
            
            
            user.account_bal = round(float(user.account_bal) + float(buy_price)*int(quantity),3)
            user.save()
            order_creation.status = True
            order_creation.save()
            user_h = holdings.objects.get(user=request.user,share_symbol=symbol)
            user_h.quantity = int(user_h.quantity)-int(quantity)
            user_h.avg_price = float(buy_price)*int(quantity)/user_h.quantity
            user_h.save()



#             get_orders = []
#             position_cmps = []
#             get_user_orders = Order.objects.filter(user=request.user)
#             for j in get_user_orders:
#                 if(j.time.date()== (datetime.now().date())):
#                     get_orders.append(j)
#             api_keys = ["b93e2df9d9d94053a54ec92e039c9300",
# "9810194c6c6b4fdebf81989f51b2410d",
# "f14e6bf23b7246758e4398152a3afcb7",
# "971e9789fd7a48499a702a73634b1815",
# "7dbbab7aae7240b7a08528164cc5b5d6"]
#             api_no = 0
#             for ord in get_orders:
#                 api_no+=1
#                 try:
#                     ind = int(int(api_no)%5)
#                     api_key = api_keys[ind]
#                     api_no+=1
#                 except:
#                     api_key = api_keys[0]
#                 smbl = ord.share_symbol
#                 dat = get_cmp(api_key,smbl)
#                 position_cmps.append(dat)

#             serializer = OrderSerializer(get_orders,many=True)


            return Response({'status':HTTP_200_OK,'message':'success'})
        else:
            return Response({'status':HTTP_400_BAD_REQUEST,'message':'User is not autheticated..'})

class get_orders(APIView):
    def get(self,request):
        if request.user.is_authenticated:
            holding = []
            get_orders = []
            holding_cmps = []
            position_cmps = []
            get_user_orders = Order.objects.filter(user=request.user)
            for j in get_user_orders:
                if(j.time.date()== (datetime.now().date())):
                    get_orders.append(j)
            get_holdings = holdings.objects.filter(user=request.user)
            for i in get_holdings:
                if((i.quantity)!=0):
                    if((i.time.date()) != (datetime.now().date())):
                        holding.append(i)
            api_keys = ["b93e2df9d9d94053a54ec92e039c9300",
"9810194c6c6b4fdebf81989f51b2410d",
"f14e6bf23b7246758e4398152a3afcb7",
"971e9789fd7a48499a702a73634b1815",
"7dbbab7aae7240b7a08528164cc5b5d6"]
            api_no = 0
            for hold in holding:
                api_no+=1
                try:
                    ind = int(int(api_no)%5)
                    api_key = api_keys[ind]
                    api_no+=1
                except:
                    api_key = api_keys[0]
                smbl = hold.share_symbol
                dat = get_cmp(api_key,smbl)
                holding_cmps.append(dat)
            
            api_no = 0

            for ord in get_orders:
                api_no+=1
                try:
                    ind = int(int(api_no)%5)
                    api_key = api_keys[ind]
                    api_no+=1
                except:
                    api_key = api_keys[0]
                smbl = ord.share_symbol
                dat = get_cmp(api_key,smbl)
                position_cmps.append(dat)

            serializer = OrderSerializer(get_orders,many=True)
            holding_serializer = HoldingSerializer(holding,many=True)
            
            return Response({'status':HTTP_200_OK,'message':'success','data':serializer.data,'holding_data':holding_serializer.data,'holdin_cmp':holding_cmps,'position_cmp':position_cmps})
        else:
            return Response({'status':HTTP_400_BAD_REQUEST,'message':'User is not autheticated..'})

class get_balances(APIView):
    def get(self,request):
        if request.user.is_authenticated: 
            acc_bal = request.user.account_bal
            get_hold = holdings.objects.filter(user=request.user)
            total_used = 0
            for hold in get_hold:
                if(hold.quantity)!=0:
                    total_used+=(hold.avg_price)*(hold.quantity)
            user_data = {
                'account_balance':acc_bal,
                'used_fund':total_used
            } 
            return Response({'status':HTTP_200_OK,'message':'success','data':user_data})
        else:
            return Response({'status':HTTP_400_BAD_REQUEST,'message':'User is not autheticated..'})


class getpandf(APIView):
    def get(self,request):
        if request.user.is_authenticated:
            total_order = []
            get_orders = Order.objects.filter(user=request.user,status=True)
            for ord in get_orders:
                if(ord.share_deal_type=='BUY'):
                    get_sell = Order.objects.filter(user=request.user,status=True,share_symbol=ord.share_symbol,share_deal_type='SELL')
                    if(len(get_sell)!=0):
                        for sel in get_sell:
                            order_data={
                                'symbol':ord.share_symbol,
                                'buy_date':ord.time,
                                'quantity':ord.quantity,
                                'price':ord.price,
                                'sell_date':sel.time,
                                'sell_quantity':sel.quantity,
                                'sell_price':sel.price,
                            }
                            total_order.append(order_data)
            return Response({'status':HTTP_200_OK,'message':'success','data':total_order})
        
        else:
            return Response({'status':HTTP_400_BAD_REQUEST,'message':'User is not autheticated..'})

