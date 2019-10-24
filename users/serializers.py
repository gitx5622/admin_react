from rest_framework import serializers;
from .models import User;
from rest_auth.registration.serializers import RegisterSerializer



class UserSerializers(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ('email','username','password','is_student','is_teacher')



class CustomRegisterSerializers(RegisterSerializers):
    is_student = models.BooleanField()
    is_teacher = models.BooleanField()
    
    class Meta:
        model = User
        fields = ('email','username','password','is_student','is_teacher')
    