# Generated by Django 5.0.7 on 2024-08-05 16:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('serverApp', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='employee_number',
            field=models.CharField(default='0', max_length=50),
            preserve_default=False,
        ),
    ]
