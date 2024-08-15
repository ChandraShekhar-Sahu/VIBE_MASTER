from django.db import models
from api.models import Room

class SpotifyToken(models.Model):
    user = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    refresh_token = models.CharField(max_length= 150)
    access_token = models.CharField(max_length=150)
    expires_in = models.DateTimeField()
    token_type = models.CharField(max_length=50)

class Vote(models.Model):
    user = models.CharField(max_length=50, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    song_id = models.CharField(max_length=50)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    current_song = models.CharField(max_length=50, null = True)

class EventList(models.Model):
    user = models.CharField(max_length=50)
    title = models.CharField(max_length=30,null=True, unique=True)
    description = models.TextField(max_length=100, null=True)
    completed = models.BooleanField(default=False)
    