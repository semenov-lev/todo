from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from .views import UserViewSet
from .models import User


class TestUserViewSet(TestCase):

    def setUp(self):
        self.url = '/api/users/'
        self.admin = User.objects.create_user('test-admin', 'test-admin@test.com', 'test')

    def test_get_list(self):
        factory = APIRequestFactory()
        request = factory.get(self.url)
        force_authenticate(request, user=self.admin)
        view = UserViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
