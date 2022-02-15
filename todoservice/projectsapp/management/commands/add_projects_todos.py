from django.core.management.base import BaseCommand
from mixer.backend.django import mixer

from projectsapp.models import Project, ToDo


class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument("count", type=int)

    def handle(self, *args, **options):
        print('Start to fill DB')
        count = options["count"]

        Project.objects.all().delete()
        ToDo.objects.all().delete()

        for i in range(count - 1):
            mixer.blend(Project)
            for ii in range(2):
                mixer.blend(ToDo, is_active=True)
        print('Done')
