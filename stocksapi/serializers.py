from dataclasses import field, fields
from pyexpat import model
from rest_framework import serializers
from .models import Order, User1, WatchList, holdings


class WatchListSerializer(serializers.ModelSerializer):
    class Meta:
        model=WatchList
        fields=['id','name','shares']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User1
        fields=['first_name','last_name','username','email','phone_no','imgp','pan_no','account_bal']

        
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model=Order
        fields=['share_symbol','oerder_type','status','time','product','ltp','quantity','price','share_deal_type']


class HoldingSerializer(serializers.ModelSerializer):
     class Meta:
         model = holdings
         fields=['share_symbol','quantity','avg_price','time']


        