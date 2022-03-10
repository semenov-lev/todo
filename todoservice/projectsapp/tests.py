from django.test import TestCase
from datetime import datetime
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APITestCase
from mixer.backend.django import mixer
from usersapp.models import User
from .views import ProjectModelViewSet
from .models import Project, ToDo


class TestProjectsViewSet(TestCase):

    def setUp(self):
        self.url = '/api/projects/'
        self.user = User.objects.create_user('test-user', 'test-user@test.com', 'test')
        self.project = Project.objects.create(name='test-project', deadline_timestamp=datetime(2025, 5, 12))

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get(self.url)
        force_authenticate(request, user=self.user)
        view = ProjectModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_detail(self):
        client = APIClient()
        client.login(username='test-user', password='test')
        response = client.get(f'{self.url}{self.project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        client.logout()


class TestTODOViewSet(APITestCase):

    def setUp(self):
        self.url = '/api/todos/'
        self.user = User.objects.create_superuser('test-user', 'test-user@test.com', 'test')
        self.create_name = 'Test-name-create'
        self.update_name = 'Test-name-update'
        self.todo = mixer.blend(ToDo, name=self.create_name)

    def test_get_todo(self):
        todo_url = f'{self.url}{self.todo.id}/'
        self.client.login(username='test-user', password='test')
        response = self.client.get(todo_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.client.logout()

    def test_put_todo(self):
        todo_url = f'{self.url}{self.todo.id}/'
        self.client.login(username='test-user', password='test')
        response = self.client.put(todo_url,
                                   {
                                       'name': self.update_name,
                                       'created_by': self.todo.created_by.id,
                                       'project': self.todo.project.id
                                   }
                                   )
        todo = ToDo.objects.get(pk=self.todo.id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(todo.name, self.update_name)
        self.client.logout()
