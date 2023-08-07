from flask import Blueprint

# Create a Blueprint for auth routes
auth_bp = Blueprint('auth', __name__)

# Import auth routes
from app.routes.auth import login, register

# Create a Blueprint for main routes
main_bp = Blueprint('main', __name__)

# Import main routes
from app.routes.main import home
