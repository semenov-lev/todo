from rest_framework import status
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from django_filters import rest_framework as filters

from projectsapp.filters import ToDosFilter
from projectsapp.models import Project, ToDo
from projectsapp.serializers import ProjectModelSerializer, ProjectModelSerializerBase, ToDoModelSerializer, \
    ToDoModelSerializerBase


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    # pagination_class = ProjectLimitOffsetPagination

    def get_queryset(self):
        name = self.request.query_params.get('name', '')
        projects = Project.objects.all()
        if name:
            projects = projects.filter(name__contains=name)
        return projects

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return ProjectModelSerializer
        return ProjectModelSerializerBase


class ToDoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ToDoModelViewSet(ModelViewSet):
    queryset = ToDo.objects.all()
    # pagination_class = ToDoLimitOffsetPagination
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = ToDosFilter

    def destroy(self, request, *args, **kwargs):
        super(ToDoModelViewSet, self).destroy(request, *args, **kwargs)
        return Response(status=status.HTTP_100_CONTINUE)

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()

    def get_serializer_class(self):
        if self.request.method in ['GET']:
            return ToDoModelSerializer
        return ToDoModelSerializerBase
