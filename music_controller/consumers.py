# your_app_name/consumers.py
from channels.generic.websocket import WebsocketConsumer
import json

class EventConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        event_id = text_data_json.get('event_id')
        
        self.send(text_data=json.dumps({
            'message': 'Event updated',
            'event_id': event_id
        }))
