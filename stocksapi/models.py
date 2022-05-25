 
from symtable import Symbol
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


class stocks(models.Model):
    symbol = models.CharField(max_length=100)
    name = models.CharField(max_length=150)

    def __str__(self) -> str:
        return str(self.symbol)

class WatchList(models.Model):
    name = models.CharField(max_length=60)
    user = models.ForeignKey(User1,on_delete=models.CASCADE)
    shares = models.ManyToManyField(stocks)

    def __str__(self) -> str:
        return str(self.name)


class Order(models.Model):
    user = models.ForeignKey(User1,on_delete=models.CASCADE)
    share_symbol = models.CharField(max_length=60,null=True,blank=True)
    oerder_type = models.CharField(max_length=20,null=True,blank=True)
    status = models.BooleanField(default=False)
    time = models.DateTimeField(null=True,blank=True)
    product = models.CharField(max_length=30,null=True,blank=True)
    ltp = models.FloatField(null=True,blank=True)
    quantity= models.IntegerField()
    price = models.FloatField(null=True,blank=True)
    share_deal_type = models.CharField(max_length=15,null=True,blank=True)

    def __str__(self) -> str:
        return str(self.user.username)

class holdings(models.Model):
    user = models.ForeignKey(User1,on_delete=models.CASCADE)
    share_symbol = models.CharField(max_length=60,null=True,blank=True)
    quantity= models.IntegerField(default=0)
    avg_price = models.FloatField(default=0.0,null=True,blank=True)
    time = models.DateTimeField(null=True,blank=True)
    
    def __str__(self) -> str:
        return str(self.user.username)
