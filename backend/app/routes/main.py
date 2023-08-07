from flask import jsonify, Blueprint, request, Response, url_for, json
from werkzeug.utils import secure_filename
import os
import uuid
from app import db, app
from app.models import Post
from app.models import Microstructure
from app.models import Comment
from app.models import User
import mimetypes


app.config['UPLOAD_FOLDER'] = os.environ.get('UPLOAD_FOLDER', 'uploads')

# Create a Blueprint for main routes
main_bp = Blueprint('main', __name__)

# Home route
@main_bp.route('/')
def home():
    return jsonify({'message': 'Welcome to my Flask web app!'})

# Add Post endpoint
@main_bp.route('/api/posts', methods=['POST'])
def create_post():
    title = request.form.get('title')
    content = request.form.get('content')
    category = request.form.get('category')
    image_file = request.files.get('image')
    uid= request.form.get('uid')
    if not title or not content or not category or not uid:
            return jsonify({'message': 'Title, content, category and uid are required'}), 400

    if image_file:
        filename = secure_filename(str(uuid.uuid4()) + '.jpg')
        image_path = os.path.join(app.config['UPLOAD_FOLDER'],filename)
        with open(image_path, 'wb') as f:
            f.write(image_file.read())
        image_url = filename
    else:
        image_url = None

    post = Post(title=title, content=content, category=category, image=image_url, uid=uid)
    post.save()

    return jsonify({'message': 'Post created successfully', 'post': post.to_dict()}), 201

# Get all posts endpoint
@main_bp.route('/api/posts', methods=['GET'])
def get_posts():
    cat = request.args.get('cat')  # Get the value of the 'cat' query parameter
    if cat:
        posts = Post.objects(category=cat)  # Retrieve posts with the specified category
    else:
        posts = Post.objects()  # Retrieve all posts if no category is specified

    return jsonify([post.to_dict() for post in posts]), 200

#get image of a post endpoint
@main_bp.route('/api/posts/image/<post_id>',methods=['GET'])
def get_post_image(post_id):
    post = Post.objects.get(id=post_id)

    if post.image:
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], post.image)
        if os.path.exists(image_path):
            with open(image_path, 'rb') as f:
                image_data = f.read()
            return Response(image_data, mimetype='.jpg')
        else:
            return jsonify({'error': 'Image not found'}), 404

    else:
        return jsonify({'error': 'Post has no image'}), 404

# get image by imageId endpoint
@main_bp.route('/api/image/<image_id>',methods=['GET'])
def get_image(image_id):
    

    if image_id:
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], image_id)
        if os.path.exists(image_path):
            with open(image_path, 'rb') as f:
                image_data = f.read()
            return Response(image_data, mimetype='.jpg')
        else:
            return jsonify({'error': 'Image not found'}), 404

    else:
        return jsonify({'error': 'Bad Request'}), 400

# Get post by Id 
@main_bp.route('/api/posts/<post_id>', methods=['GET'])
def get_post(post_id):
    post = Post.objects(id=post_id).first()
    if not post:
        return jsonify({'error': 'Post not found'}), 404
    return jsonify(post.to_dict()), 200

# Get post by user Id 
@main_bp.route('/api/user/posts/<uid>', methods=['GET'])
def get_post_by_uid(uid):
    posts = Post.objects(uid=uid)
    if not posts:
        return jsonify({'error': 'Posts not found'}), 404
    return jsonify([post.to_dict() for post in posts]), 200

# update post endpoint
@app.route('/api/posts/<post_id>', methods=['PUT'])
def update_post(post_id):
    post = Post.objects.get(id=post_id)
    
    if not post:
        return jsonify({'error': 'Post not found'}), 404
    
    title = request.form.get('title')
    content = request.form.get('content')
    image_file = request.form.get('image')
    
    if title:
        post.title = title
    if content:
        post.content = content
    if image_file:
        filename = secure_filename(str(uuid.uuid4()) + '.jpg')
        image_path = os.path.join(app.config['UPLOAD_FOLDER'],filename)
        with open(image_path, 'wb') as f:
            f.write(image_file.read())
        image_url = filename
        post.image = image_url
    
    post.save()
    
    return jsonify({'message': 'Post updated successfully', 'post': post.to_dict()})

# Add Comment endpoint
@main_bp.route('/api/comments', methods=['POST'])
def cpost_comment():
    content = request.json['content']
    uid = request.json['uid']
    postId = request.json['postId']

    if not content or not uid or not postId:
            return jsonify({'message': 'content, postId and uid are required'}), 400

    comment = Comment(content=content, uid=uid, postId=postId)
    comment.save()

    return jsonify({'message': 'Comment added successfully', 'comment': comment.to_dict()}), 201

# Get comments by postId 
@main_bp.route('/api/comments/<post_id>', methods=['GET'])
def get_coments(post_id):
    post = Post.objects(id=post_id).first()
    if not post:
        return jsonify({'error': 'Post not found'}), 404
    comments = Comment.objects(postId = post_id)
    res = []
    for comment in comments:
        user = User.objects(id=comment.uid).first()
        obj = comment.to_dict()
        obj['user'] = user.to_dict()
        res.append(obj)
        
    return jsonify(res), 200

# Add Microstructure endpoint
@main_bp.route('/api/microstructures', methods=['POST'])
def create_microstructure():
    name = request.form.get('name')
    description = request.form.get('description')
    category = request.form.get('category')
    image_file = request.files.get('image')
    composition = request.form.get('composition')
    uid = request.form.get('uid')
    composition = json.loads(composition)
    if not name:
            return jsonify({'message': 'Name is required'}), 400
    if not description:
        return jsonify({'message': 'Description is required'}), 400
    if not uid:
        return jsonify({'message': 'Uid is required'}), 400
    if not category:
        return jsonify({'message': 'Category is required'}), 400

    if image_file:
        filename = secure_filename(str(uuid.uuid4()) + '.jpg')
        image_path = os.path.join(app.config['UPLOAD_FOLDER'],filename)
        with open(image_path, 'wb') as f:
            f.write(image_file.read())
        image_url = filename
    else:
        image_url = None

    microstructure = Microstructure(name=name, description=description, category=category, composition=composition, image=image_url, uid=uid)
    microstructure.save()

    return jsonify({'message': 'Microstructure created successfully', 'microstructure': microstructure.to_dict()}), 201

# Get all microstructures endpoint
@main_bp.route('/api/microstructures', methods=['GET'])
def get_microstructures():
    
    microstructures = Microstructure.objects()  # Retrieve all posts if no category is specified

    return jsonify([microstructure.to_dict() for microstructure in microstructures]), 200

# update post endpoint
@app.route('/api/microstructures/<microstructure_id>', methods=['PUT'])
def update_microstructure(microstructure_id):
    microstructure = Microstructure.objects.get(id=microstructure_id)
    
    if not microstructure:
        return jsonify({'error': 'microstructure not found'}), 404
    
    name = request.form.get('name')
    description = request.form.get('description')
    category = request.form.get('category')
    image_file = request.files.get('image')
    composition = request.form.get('composition')

    if name:
        microstructure.name = name
    if description:
        microstructure.description = description
    if category:
        microstructure.category = category
    if image_file:
        filename = secure_filename(str(uuid.uuid4()) + '.jpg')
        image_path = os.path.join(app.config['UPLOAD_FOLDER'],filename)
        with open(image_path, 'wb') as f:
            f.write(image_file.read())
        image_url = filename
        microstructure.image = image_url
    if composition:
        microstructure.composition = json.loads(composition)
    
    microstructure.save()
    
    return jsonify({'message': 'microstructure updated successfully', 'microstructure': microstructure.to_dict()})

# Delete a microstructure
@app.route('/api/microstructures/<microstructure_id>', methods=['DELETE'])
def delete_microstructure(microstructure_id):
    microstructure = Microstructure.objects(id=microstructure_id).first()
    if not microstructure:
        return jsonify({'message': 'Microstructure not found'}), 404

    microstructure.delete()
    return jsonify({'message': 'Microstructure deleted successfully'}), 200