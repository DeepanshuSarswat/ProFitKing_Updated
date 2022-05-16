from django.contrib import admin
from . import models
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth import get_user_model
User = get_user_model()
# Register your models here.


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    fieldsets = [
        (None, {"fields": ["username", "email", "password"]}),
        (
            "Other info",
            {
                "fields": [
                    "first_name",
                    "last_name",
                    "phone_no",
                    "unicode",
                    "imgp",
                    "is_verified",
                    "pan_no",
                    "account_bal",
                    "timestamp",
                ],
            },
        ),
    ]
    add_fieldsets = [
        (
            None,
            {
                "fields": [
                    "username",
                    "email",
                    "first_name",
                    "last_name",
                    "password1",
                    "password2",
                ]
            },
        ), ]
