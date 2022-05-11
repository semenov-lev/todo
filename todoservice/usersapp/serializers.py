from rest_framework.serializers import HyperlinkedModelSerializer
from .models import User


class UserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = User
        # fields = '__all__'
        fields = 'id', 'username', 'first_name', 'last_name', 'email', 'is_superuser'


class UserModelPrivilegeSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = 'is_staff', 'is_superuser'
