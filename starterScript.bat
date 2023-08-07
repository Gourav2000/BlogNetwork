@echo off

rem Create app directory
mkdir backend
cd backend

rem Create app directory structure
mkdir app
cd app
echo. > __init__.py
echo. > models.py
mkdir routes
cd routes
echo. > __init__.py
echo. > auth.py
echo. > main.py
cd ..
mkdir templates
cd templates
echo. > base.html
echo. > home.html
mkdir auth
cd auth
echo. > login.html
echo. > register.html
cd ../../..

rem Create config.py file
echo. > config.py

rem Create run.py file
echo. > run.py

rem Create requirements.txt file
echo Flask >> requirements.txt
echo Flask-MongoEngine >> requirements.txt
echo Flask-Bcrypt >> requirements.txt
