from django.urls import path, include
from .views import *
from rest_framework import routers

urlpatterns = [
    path('room', RoomView.as_view()),
    path('create-room', CreateRoomView.as_view()),
    path('get-room', GetRoom.as_view()),
    path('join-room', JoinRoom.as_view()),
    path('leave-room',LeaveRoom.as_view()),
    path('user-in-room',UserInRoom.as_view()),
    path('update-room',UpdateRoom.as_view()),
    path('event-list',Eventlistview.as_view()),
]