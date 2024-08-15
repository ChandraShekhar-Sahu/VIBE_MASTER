import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from channels.security.websocket import AllowedHostsOriginValidator
from django.urls import path
from music_controller.consumers import EventConsumer

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "music_controller.settings")

# The Django ASGI application
application = ProtocolTypeRouter({
    "http": get_asgi_application(),  # Handles HTTP requests
    "websocket": AllowedHostsOriginValidator(
        AuthMiddlewareStack(
            URLRouter(
                [
                    path("ws/events/", EventConsumer.as_asgi()),  # WebSocket endpoint
                ]
            )
        )
    ),
})
