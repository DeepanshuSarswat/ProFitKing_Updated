# Generated by Django 4.0.4 on 2022-05-23 08:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stocksapi', '0014_order_oerder_type_alter_order_product_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='share_deal_type',
            field=models.CharField(blank=True, max_length=15, null=True),
        ),
    ]
