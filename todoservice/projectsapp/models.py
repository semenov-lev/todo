from django.db import models

from usersapp.models import User


class Project(models.Model):
    PROCESS = 'PRC'
    DONE = 'DON'
    EXPIRED = 'EXP'
    CANCEL = 'CNL'

    STATUS_CHOICES = (
        (PROCESS, 'В процессе'),
        (DONE, 'Сдан'),
        (EXPIRED, 'Просрочен'),
        (CANCEL, 'Отменен')
    )

    name = models.CharField(verbose_name='Наименование', max_length=32, unique=True)
    users = models.ManyToManyField(User, verbose_name='Пользователи')
    description = models.TextField(verbose_name='Описание', blank=True)
    rep_url = models.URLField(verbose_name='Ссылка на репозиторий', blank=True)
    status = models.CharField(verbose_name='Статус', choices=STATUS_CHOICES, max_length=3, default='PRC')
    deadline_timestamp = models.DateTimeField(verbose_name='Дата сдачи', blank=True, null=True)
    create_timestamp = models.DateTimeField(verbose_name='Дата создания', auto_now_add=True)
    update_timestamp = models.DateTimeField(verbose_name='Дата обновления', auto_now=True)

    class Meta:
        ordering = ['id']

    def __str__(self):
        return self.name


class ToDo(models.Model):
    name = models.CharField(verbose_name='Наименование', max_length=64)
    description = models.TextField(verbose_name='Описание', blank=True)
    created_by = models.ForeignKey(User, verbose_name='Автор', on_delete=models.PROTECT)
    project = models.ForeignKey(Project, verbose_name='Проект', on_delete=models.CASCADE)
    create_timestamp = models.DateTimeField(verbose_name='Дата создания', auto_now_add=True)
    update_timestamp = models.DateTimeField(verbose_name='Дата обновления', auto_now=True)
    is_active = models.BooleanField(verbose_name='Активно', default=True)

    class Meta:
        ordering = ['id']

    def __str__(self):
        return self.name
