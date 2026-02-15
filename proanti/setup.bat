@echo off
echo ==========================================
echo      Local Skill Connect - Setup
echo ==========================================

echo [1/4] Setting up Backend Virtual Environment...
cd backend
python -m venv venv
call venv\Scripts\activate

echo [2/4] Installing Backend Dependencies...
pip install django djangorestframework djangorestframework-simplejwt django-cors-headers psycopg2-binary

echo [3/4] Running Database Migrations...
python manage.py migrate
cd ..

echo [4/4] Installing Frontend Dependencies...
cd frontend
call npm install
cd ..

echo ==========================================
echo           Setup Complete!
echo ==========================================
echo You can now run start_project.bat to launch the application.
pause
