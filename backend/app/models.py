from app import db, bcrypt
from datetime import datetime

# Define data models using MongoEngine


class User(db.Document):
    name = db.StringField(required=True)
    email = db.StringField(required=True)
    password = db.StringField(required=True)
    image = db.StringField(required=False)
    def to_dict(self):
        return {
            'id': str(self.id),
            'name': self.name,
            'email': self.email,
            'image': self.image
        }
    
class Post(db.Document):
    title = db.StringField(required=True)
    content = db.StringField(required=True)
    image = db.StringField(required=False)
    category = db.StringField(required=True)
    created_at = db.DateTimeField(default=datetime.utcnow)
    updated_at = db.DateTimeField(default=datetime.utcnow)
    uid = db.StringField(required=True)

    def to_dict(self):
        return {
            'id': str(self.id),
            'title': self.title,
            'content': self.content,
            'category': self.category,
            'image': self.image,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'uid':self.uid
        }
    
class Comment(db.Document):
    content = db.StringField(required=True)
    created_at = db.DateTimeField(default=datetime.utcnow)
    updated_at = db.DateTimeField(default=datetime.utcnow)
    uid = db.StringField(required=True)
    postId = db.StringField(required=True)

    def to_dict(self):
        return {
            'id': str(self.id),
            'content': self.content,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'uid':self.uid,
            'postId':self.postId
        }

class Microstructure(db.Document):
    name = db.StringField(required=True)
    description = db.StringField(required=True)
    category = db.StringField(required=True)
    image = db.StringField(required=False)
    composition = db.ListField(required=True)
    created_at = db.DateTimeField(default=datetime.utcnow)
    updated_at = db.DateTimeField(default=datetime.utcnow)
    uid = db.StringField(required=True)

    def to_dict(self):
        return {
            'id': str(self.id),
            'name': self.name,
            'description': self.description,
            'category': self.category,
            'composition': self.composition,
            'image': self.image,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
            'uid':self.uid
        }

class Element:
    def __init__(self, name, percentage):
        self.name = name
        self.percentage = percentage



