# Generated by Django 5.0.7 on 2024-08-22 19:49

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('serverApp', '0002_remove_jobcode_permission_code_jobcode_permission_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='ssid_expires',
            field=models.DateTimeField(default=datetime.datetime(2024, 8, 22, 13, 49, 42, 75524)),
            preserve_default=False,
        ),
    ]
