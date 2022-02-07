import json

from django.core.management.base import BaseCommand

from usersapp.models import User


def load_from_json(file_path):
    with open(file_path, mode='r', encoding='utf-8') as infile:
        return json.load(infile)


class Command(BaseCommand):
    def handle(self, *args, **options):
        # users = load_from_json('usersapp/fixtures/users.json')
        # User.objects.all().delete()
        # for user in users:
        #     user_fields = user.get('fields')
        #     new_user = User(**user_fields)
        #     new_user.save()
        User.objects.create_superuser('lev', 'lev@mail.local', 'django')
