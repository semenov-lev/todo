from rest_framework import serializers
from .models import Project, ToDo


class ProjectModelSerializer(serializers.ModelSerializer):
    status = serializers.CharField(source='get_status_display')
    users = serializers.StringRelatedField(many=True)
    deadline_timestamp = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    create_timestamp = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    update_timestamp = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")


    class Meta:
        model = Project
        fields = '__all__'


class ToDoModelSerializer(serializers.HyperlinkedModelSerializer):
    create_timestamp = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    update_timestamp = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")

    class Meta:
        model = ToDo
        exclude = ('is_active',)
