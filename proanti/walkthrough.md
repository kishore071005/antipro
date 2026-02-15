# Local Skill Connect - Walkthrough

## Overview
This platform connects MSMEs with local skilled workers. It features role-based dashboards, job posting, application management, and worker search.

## Features Implemented
- **Authentication**: JWT-based login/register with role selection (Worker/Employer).
- **Worker Module**: Profile management, Job browsing, Applying to jobs.
- **Employer Module**: Company profile, Posting jobs, Managing applications, Searching workers.
- **API**: Django REST Framework with documented endpoints.
- **Frontend**: React + Tailwind CSS, responsive design.

## How to Run

1. **Start the backend server**:
   ```bash
   cd backend
   venv\Scripts\activate
   python manage.py runserver
   ```

2. **Start the frontend server**:
   ```bash
   cd frontend
   npm run dev
   ```
   
   *Or just run `start_project.bat` in the root directory.*

3. **Open Browser**:
   Navigate to `http://localhost:5173`

## User Flows

### 1. Register as a Worker
- Go to `/register`.
- Select "Worker".
- Fill details.
- Redirects to Login.
- Login -> Go to Dashboard (`/worker/dashboard`).
- Edit Profile (City, Experience, Skills).
- Browse Jobs (`/jobs`).
- Apply.

### 2. Register as an Employer
- Go to `/register`.
- Select "Employer".
- Login -> Go to Dashboard (`/employer/dashboard`).
- Post a Job.
- View "My Jobs".
- Search Workers (`/workers`).

## API Endpoints (Key)
- `POST /api/auth/register/`
- `POST /api/auth/login/`
- `GET/PATCH /api/workers/me/`
- `GET/PATCH /api/employers/me/`
- `GET/POST /api/jobs/listings/`
- `POST /api/jobs/applications/`

## Technology Stack
- **Backend**: Django, DRF, SQLite (dev), SimpleJWT.
- **Frontend**: React, Vite, Tailwind CSS, Axios, React Router.
