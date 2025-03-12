from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from celery.signals import worker_process_init
from multiprocessing import current_process

# Set default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'app.settings')

app = Celery('app')

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.

app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django app configs.
app.autodiscover_tasks()


@worker_process_init.connect
def fix_multiprocessing(**kwargs):
    try:
        current_process()._config
    except AttributeError:
        current_process()._config = {'semprefix': '/mp'}

@app.task(bind=True)
def debug_task(self):
    print('Request: {0!r}'.format(self.request))