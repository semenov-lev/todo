from django.core.management.base import BaseCommand
from mixer.backend.django import mixer
from django.contrib.auth.hashers import make_password

from projectsapp.models import Project, ToDo
from usersapp.models import User


class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument("count", type=int)

    def handle(self, *args, **options):
        print('Start to fill DB')
        count = options["count"]

        Project.objects.all().delete()
        ToDo.objects.all().delete()
        User.objects.all().delete()

        User.objects.create_superuser('lev', 'lev@mail.local', 'django')

        for i in range(count - 1):
            mixer.blend(ToDo, created_by__password=lambda: make_password('test'), is_active=True)
        print('Done')
