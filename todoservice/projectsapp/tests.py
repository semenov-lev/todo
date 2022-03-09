from django.test import TestCase
from datetime import datetime
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from usersapp.models import User
from .views import ProjectModelViewSet
from .models import Project


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
