from flask import request, jsonify, Blueprint, session, make_response
from app import app, bcrypt
from app.models import User, bcrypt
from werkzeug.utils import secure_filename
import os
import uuid
import jwt
import datetime

from bcrypt import checkpw, hashpw, gensalt

# Create a Blueprint for auth routes
auth_bp = Blueprint('auth', __name__)

# Register route
@auth_bp.route('/register', methods=['POST'])
def register():
    if request.method == 'POST':
        
        name = request.form.get('name')
        email= request.form.get('email')
        password = request.form.get('password')
        image_file = request.files.get('image')

        if not name or not email or not password:
            return {'error':'Invalid JSON data'}, 400 # Return error response for invalid JSON

        # Check if email already exists in MongoDB
        existing_user = User.objects(email=email).first()
        if existing_user:
            return {"error":'Email already registered. Please login or use a different email.'},409
        
        if image_file:
            filename = secure_filename(str(uuid.uuid4()) + '.jpg')
            image_path = os.path.join(app.config['UPLOAD_FOLDER'],filename)
            with open(image_path, 'wb') as f:
                f.write(image_file.read())
            image_url = filename
        else:
            image_url = None

        # Store user in MongoDB
        user = User(name=name, email=email, image=image_url, password= bcrypt.generate_password_hash(password).decode('utf-8'))
        user.save()
        return {"message":'Registration successful. Please login.'}

# Login route
@auth_bp.route('/login', methods=['POST'])
def login():
    # Get username and password from request data
    email = request.json['email']
    password = request.json['password']

    # Find the User in the database
    existing_user = User.objects(email=email).first()
    if existing_user and checkpw(password.encode('utf-8'), existing_user['password'].encode('utf-8')):
        status_code = 200
        token = jwt.encode({'name': existing_user['name'],'email': email, 'image': existing_user['image'], 'uid': str(existing_user['id']),'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)}, app.config['SECRET_KEY'] , algorithm='HS256')
        session['token'] = token
        response = {'message': 'Login successful', 'token':token}
        response = make_response(response)
        response.set_cookie('access_token',token)
    else:
        response = {'error': 'Invalid username or password'}
        status_code = 401

    return response, status_code

# Protected route
@auth_bp.route('/protected')
def protected():
    # Verify JWT token
    token = request.headers.get('token')
    # print(token)
    # print(session.get('token'))
    if session.get('token') is None:
        return {'error':'Please Login to continue'},401
    if token!=session['token']:
        return {'error': 'Invalid token'},401
    if not token:
        return {'error': 'No token provided'},401

    try:
        # Decode JWT token
        payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        email = payload['email']
        name = payload['name']
        uid = payload['uid']
        image = payload['image']
        return {'message': f'Welcome, {name}', 'email':email, 'name':name, 'uid': uid, 'image': image}
    except jwt.ExpiredSignatureError:
        return {'error': 'Token has expired'},401
    except jwt.InvalidTokenError:
        return {'error': 'Invalid token'},401

@auth_bp.route('/users/<user_id>')
def getUserById(user_id):
    user =User.objects(id=user_id).first()
    if not user:
        return jsonify({'error': 'user not found'}), 404
    return jsonify(user.to_dict()), 200
    
@auth_bp.route('/users')
def getAllUsers():
    users = User.objects()
    return jsonify([user.to_dict() for user in users]), 200


# Logout route
@app.route('/logout')
def logout():
    # Clear token from session
    session.pop('token', None)
    return {"message":'Logged out successfully.'}

