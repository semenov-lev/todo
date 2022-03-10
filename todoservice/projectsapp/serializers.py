from rest_framework import serializers
from .models import Project, ToDo


class ProjectModelSerializer(serializers.ModelSerializer):
    status = serializers.CharField(source='get_status_display')
    users = serializers.StringRelatedField(many=True)
    deadline_timestamp = serializers.DateTimeField()
    create_timestamp = serializers.DateTimeField(format="%d-%m-%Y %H:%M:%S")
    update_timestamp = serializers.DateTimeField(format="%d-%m-%Y %H:%M:%S")

    class Meta:
        model = Project
        fields = '__all__'


class ProjectModelSerializerBase(serializers.ModelSerializer):
    deadline_timestamp = serializers.DateTimeField()

    class Meta:
        model = Project
        fields = '__all__'


class ToDoModelSerializer(serializers.HyperlinkedModelSerializer):
    create_timestamp = serializers.DateTimeField(format="%d-%m-%Y %H:%M:%S")
    update_timestamp = serializers.DateTimeField(format="%d-%m-%Y %H:%M:%S")

    class Meta:
        model = ToDo
        fields = '__all__'


class ToDoModelSerializerBase(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = ToDo
        fields = '__all__'
