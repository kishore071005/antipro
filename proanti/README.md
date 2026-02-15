# Local Skill Connect - MSME Workforce Hiring Platform

## 📌 Project Overview
Local Skill Connect is a full-stack web application designed to bridge the gap between Micro, Small, and Medium Enterprises (MSMEs) and local skilled workers. It provides a centralized digital platform for verified worker profiles, location-based searching, and seamless hiring.

## 🚀 Features
- **User Roles Check**: MSME Employer, Skilled Worker, Admin.
- **Authentication**: Secure JWT-based login/registration with role-based access control.
- **Worker Module**: Create profile, add skills/experience, upload certifications, set availability.
- **Employer Module**: Create company profile, post jobs, search workers by skill/location.
- **Job Board**: View and apply for jobs (Workers), manage applications (Employers).
- **Search System**: Filter workers and jobs by City, Pincode, and Skills.

## 🛠️ Tech Stack
- **Frontend**: React.js, Vite, Tailwind CSS, Axios, React Router.
- **Backend**: Django, Django REST Framework (DRF), SimpleJWT.
- **Database**: SQLite (Development) / PostgreSQL (Production ready).

## 📂 Folder Structure
```
/backend          # Django Project
  /config         # Project Settings
  /users          # Authentication & User Models
  /workers        # Worker Profiles & Logic
  /employers      # Employer Profiles & Logic
  /jobs           # Job Listings & Applications
/frontend         # React Application
  /src
    /components   # Reusable Components
    /pages        # Page Views
    /context      # Auth Context
    /services     # API Services
```

## ⚙️ Installation & Setup

### Prerequisites
- Python 3.8+
- Node.js & npm

### 1. Clone the Repository
```bash
git clone <repository_url>
cd local-skill-connect
```

### 2. Backend Setup (Django)
```bash
cd backend
python -m venv venv
# Activate Virtual Environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
# source venv/bin/activate

pip install -r requirements.txt
# If requirements.txt is missing, install dependencies manually:
# pip install django djangorestframework djangorestframework-simplejwt django-cors-headers psycopg2-binary

python manage.py migrate
python manage.py runserver
```
Backend runs at: `http://localhost:8000`

### 3. Frontend Setup (React)
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at: `http://localhost:5173`

### ⚡ Quick Start (Windows)
Simply run the `start_project.bat` file in the root directory to launch both servers.

## 📡 API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register/` | Register new user |
| POST | `/api/auth/login/` | Login & Get JWT |
| GET | `/api/workers/` | List all workers |
| GET | `/api/jobs/listings/` | List all jobs |
| POST | `/api/jobs/applications/` | Apply for a job |

## 🛡️ Security
- Password hashing with Argon2 (Django default).
- JWT (JSON Web Token) for stateless authentication.
- CORS configured for frontend communication.

## 🔮 Future Enhancements
- Real-time chat between Employer and Worker.
- Map integration for location visualization.
- AI-based job matching recommendations.
