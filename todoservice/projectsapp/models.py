from django.db import models

# Create your models here.


class Project(models.Model):
    PROCESS = 'PRC'
    DONE = 'DON'
    EXPIRED = 'EXP'
    CANCEL = 'CNL'

    STATUS_CHOICES = (
        (PROCESS, 'В процессе'),
        (DONE, 'Сдан'),
        (EXPIRED, 'Истек срок сдачи')
    )

    name = models.CharField(verbose_name='Наименование', max_length=32, unique=True)
    description = models.TextField(verbose_name='Описание', blank=True)
    rep_url = models.URLField(verbose_name='Ссылка на репозиторий', blank=True)
    status = models.CharField(verbose_name='Статус', choices=STATUS_CHOICES, max_length=3, default='PRC')
    deadline_timestamp = models.DateTimeField(verbose_name='Дата сдачи', blank=True)
    create_timestamp = models.DateTimeField(verbose_name='Дата создания', auto_now_add=True)
    update_timestamp = models.DateTimeField(verbose_name='Дата обновления', auto_now=True)
