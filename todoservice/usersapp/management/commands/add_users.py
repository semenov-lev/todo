import json

from django.core.management.base import BaseCommand

from usersapp.models import User

import random


# def load_from_json(file_path):
#     with open(file_path, mode='r', encoding='utf-8') as infile:
#         return json.load(infile)


def get_random_users(count):
    users = []
    names = [
        "jay", "jim", "roy", "axel", "billy", "charlie", "jax", "gina", "paul", "ringo", "ally", "nicky", "cam", "ari",
        "trudie", "cal", "carl", "lady", "lauren", "ichabod", "arthur", "ashley", "drake", "kim", "julio", "lorraine",
        "floyd", "janet", "lydia", "charles", "pedro", "bradley"]
    random.shuffle(names)
    for i in range(count - 1):
        name = names[i]
        user = (f"{name}", f"{name}@mail.com")
        users.append(user)
    return users


class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument("count", type=int)

    def handle(self, *args, **options):
        user_count = options['count']
        User.objects.all().delete()
        for user in get_random_users(user_count):
            User.objects.create_user(user[0], user[1], 'test')
        User.objects.create_superuser('lev', 'lev@mail.local', 'django')
