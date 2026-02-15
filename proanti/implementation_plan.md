# Local Skill Connect - Implementation Plan

## Goal Description
Create a full-stack MSME workforce hiring platform connecting employers with local skilled workers. The platform will feature verified worker profiles, location-based filtering, and a seamless hiring workflow.

## User Review Required
> [!IMPORTANT]
> - Database Choice: PostgreSQL is planned, but for local dev & demo, SQLite is easier. Confirmed PostgreSQL in requirements, so sticking to that (or SQLite for simplicity if needed).
> - Auth: JWT using `djangorestframework-simplejwt`.
> - Frontend: React with Axios.

## Proposed Changes

### Backend (Django)
Architecture:
- Project: `backend`
- Apps: `users`, `workers`, `employers`, `jobs`, `core`
- Database: PostgreSQL (or SQLite for dev)

#### Models
- **CustomUser**: AbstractUser with `role` (worker, employer, admin).
- **WorkerProfile**: OneToOne with User setup, skills, experience, location, certifications.
- **EmployerProfile**: OneToOne with User setup, company details.
- **Job**: Title, description, skills required, location, wage, employer (FK).
- **Application**: Worker (FK), Job (FK), status, applied_at.
- **Skill**: Name, category (predefined list or dynamic).
- **Certification**: Worker (FK), title, issuer, date, proof_file (Image/PDF).

#### API Endpoints
- `/api/auth/register/` (POST)
- `/api/auth/login/` (POST)
- `/api/workers/` (GET, POST - Profile creation/list)
- `/api/employers/` (GET, POST - Profile creation/list)
- `/api/jobs/` (GET, POST - Job listings)
- `/api/jobs/<id>/apply/` (POST)

### Frontend (React)
Structure:
- `src/components`: Reusable UI components (Button, Input, Card).
- `src/pages`: Page views (Home, Login, Register, Dashboards).
- `src/context`: AuthContext for user state.
- `src/services`: API service functions (axios instance).

#### Key Components
- **Navbar**: Dynamic based on role.
- **WorkerCard**: Display worker summary.
- **JobCard**: Display job details.
- **SearchFilter**: Filter by location/skill.

## Verification Plan

### Automated Tests
- Django Unit Tests: Test models and API endpoints.

### Manual Verification
- Browser Tool: Click through user flows.
- Register as Employer -> Post Job.
- Register as Worker -> Apply for Job.
- Verify data persistence.
