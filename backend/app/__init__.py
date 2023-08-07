from flask import Flask
from flask_mongoengine import MongoEngine
from flask_bcrypt import Bcrypt
from flask_cors import CORS


# Initialize Flask app
app = Flask(__name__)
CORS(app,supports_credentials=True)


app.config['SECRET_KEY'] = 'ukhvfqweyur7qefisf78w3fgqwif7'
app.config["SESSION_COOKIE_SAMESITE"] = "None"
app.config["SESSION_COOKIE_SECURE"] = True
# Configure MongoDB
# app.config['MONGODB_SETTINGS'] = {
#     'db': 'blogNetwork',
#     'host': 'mongodb://host.docker.internal:27017/mydb'
# }
app.config['MONGODB_SETTINGS'] = {
    'db': 'blogNetwork',
    'host': 'mongodb://localhost:27017/mydb'
}


db = MongoEngine(app)

# Initialize Bcrypt for password hashing
bcrypt = Bcrypt(app)

# Import and register blueprints
from app.routes.auth import auth_bp
from app.routes.main import main_bp

app.register_blueprint(auth_bp)
app.register_blueprint(main_bp)

