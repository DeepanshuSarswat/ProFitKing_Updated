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
from random import choice
from email.message import EmailMessage
from django.conf import settings
from .models import User1
from django.contrib.auth import login,authenticate,logout

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
    message['Subject'] = "Welcome to Fb Clone"
    message.set_content(
        f"Hello User welcome to ProFitKing Your account verification link is\n {settings.SITE_URL}/verifyacc/{personalcode} \nvalid for next 15 minutes.")
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
    message['Subject'] = "Welcome to Fb Clone"
    message.set_content(
        f"Hello User welcome to ProFitKing Your password reset link is\n {settings.SITE_URL}/reset/{personalcode} \nvalid for next 15 minutes.")
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
                    cur_time = datetime.datetime.now(timezone.utc)
                    pre_time = person.timestamp
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
                    person.password = password
                    print(person.password)
                    person.save()
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
        print(data)
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
        
        personalcode = generate_random_unicode()
        mytimecalculator = 0
        while(len(User1.objects.filter(unicode=personalcode))):
            personalcode = generate_random_unicode()
            mytimecalculator += 1
            if mytimecalculator > 10000:
                pass 

        status = send_mail(email_r, personalcode)
        user=User1.objects.create_user(username = username,email=email_r, first_name=first_name,last_name=last_name,unicode=personalcode, timestamp=datetime.datetime.now(timezone.utc),phone_no =phone_r,pan_no = pan_no)
        user.save();

        return Response({'status':HTTP_200_OK,'message':'Success'})


class logoutuser(APIView):
    def post(self,request):
        logout(request)

        return Response({'status':HTTP_200_OK,'message':'successfully logged out.'})

class logginuser(APIView):
    def post(self,request):
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
        return Response({'status':HTTP_200_OK,'message':'success'})
 


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
                if not data.verified:
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
            passwor=request.POST['pass1']
            confirm_password=request.POST['pass2']
        except:
            return Response({'status':HTTP_400_BAD_REQUEST,'message':'Invalid Request.'})

        if(passwor!=confirm_password):
            return Response({'status':HTTP_400_BAD_REQUEST,'message':'Password did not matched'})

        u_obj=User1.objects.filter(unicode = pid)
        
        if u_obj is None:
            return Response({'status':HTTP_400_BAD_REQUEST,'message':'User deoes not exists'})
        else:
            for u_ob in u_obj:
                u_ob.set_password(passwor)
                u_ob.unicode=None
                u_ob.save()
            return Response({'status':HTTP_200_OK,'message':'success'})
