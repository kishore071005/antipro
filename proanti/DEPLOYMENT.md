# Deployment Guide: Local Skill Connect

This guide covers how to deploy the "Local Skill Connect" application.
The project consists of a **Django Backend** and a **React Frontend**.

## 1. Prerequisites

- A [GitHub](https://github.com/) account.
- A [Render](https://render.com/) account (for Backend & Database).
- A [Vercel](https://vercel.com/) account (for Frontend).

## 2. GitHub Setup

1.  **Initialize Git** (if not done already):
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    ```
2.  **Create a Repository**: Go to GitHub and create a new repository (e.g., `local-skill-connect`).
3.  **Push Code**:
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/local-skill-connect.git
    git branch -M main
    git push -u origin main
    ```

## 3. Backend Deployment (Render)

We will use **Render** to host the Django backend.

1.  **Create Web Service**:
    *   Go to Docker Dashboard -> New -> Web Service.
    *   Connect your GitHub repository.
    *   **Root Directory**: `backend`
    *   **Runtime**: Python 3
    *   **Build Command**: `pip install -r requirements.txt && python manage.py migrate`
    *   **Start Command**: `gunicorn config.wsgi:application`

2.  **Environment Variables**:
    Add the following in the "Environment" tab:
    *   `PYTHON_VERSION`: `3.9.0` (or your local version)
    *   `SECRET_KEY`: (Generate a random string)
    *   `DEBUG`: `False`
    *   `ALLOWED_HOSTS`: `*` (or your render URL)

3.  **Database**:
    *   Render provides a free PostgreSQL database. Create one and link it, or use SQLite (default) for testing (note: SQLite data is lost on restart in free tier).

## 4. **Frontend Deployment (Vercel)**

We will use **Vercel** to host the React frontend.

1.  **Import Project**:
    *   Go to Vercel Dashboard -> Add New -> Project.
    *   Select your GitHub repository.

2.  **Configure Project (CRITICAL STEP)**:
    *   **Framework Preset**: Vite
    *   **Root Directory**: Click "Edit" and select `frontend`. **(This fixes the 404 error)**
    *   **Build Command**: `npm run build`
    *   **Output Directory**: `dist`

3.  **Environment Variables**:
    *   `VITE_API_URL`: The URL of your deployed backend (e.g., `https://your-app.onrender.com/api/`)

4.  **Fixing 404 on Refresh**:
    *   I have added a `vercel.json` file to the `frontend` folder. Make sure to push this to GitHub.
    *   This file tells Vercel to redirect all traffic to `index.html` so React Router works.

## 5. Final Configuration

1.  **CORS**:
    *   Once the frontend is deployed, copy its URL (e.g., `https://local-skill-connect.vercel.app`).
    *   Go back to **Render (Backend)** -> Environment Variables.
    *   Add/Update `CORS_ALLOWED_ORIGINS` to include your Vercel URL.

2.  **Test**:
    *   Open your Vercel URL.
    *   Try logging in and checking the "Backend Connected" status.
