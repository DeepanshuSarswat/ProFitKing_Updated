 
from django.db import models
from django.contrib.auth.models import AbstractUser,User

# Create your models here.
class User1(AbstractUser):
    phone_no = models.IntegerField('phone_no',null=True,blank=True)
    unicode = models.CharField('unicode',max_length=100,null=True) 
    imgp=models.FileField('user_img',upload_to='imgs', null=True,blank=True)
    is_verified=models.BooleanField('is_verified',default=False)
    pan_no = models.CharField('PAN_no',null=True,blank=True,max_length=10)
    timestamp = models.DateTimeField('timestamp',null=True)
    account_bal = models.FloatField('Account_balance',default=0, null=True,blank=True)

