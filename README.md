# Doctor Tracker – Healthcare Management System

## 1. Description (Elevator Pitch)

**Doctor Tracker** is a modern healthcare management application designed to simplify doctor and patient record management. It provides a centralized dashboard where authenticated users can manage doctors, organize patient records, monitor doctor-patient relationships, and analyze healthcare data. The application includes doctor creation and management, patient registration, searching, filtering, pagination, and dashboard analytics. Built with Next.js, TypeScript, Express.js, MongoDB, and Better Auth, Doctor Tracker focuses on secure authentication, efficient data management, responsive design, and a user-friendly experience across desktop and mobile devices.

## 2. Setup Guide

Follow these steps to run the project locally.

### Prerequisites

Make sure you have installed:

- Node.js (LTS version recommended)
- npm
- MongoDB (local installation or MongoDB Atlas account)
- Git

### Project Structure

The project contains two main applications:

doctor-tracker/
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── .env.example
│   └── ...
│
└── backend/
    ├── index.js
    ├── package.json
    ├── .env.example
    └── ...

 frontend and backend repositories are separate.*

### Step 1: Clone the Repository

git clone YOUR_FRONTEND_REPOSITORY_URL
cd doctor-tracker


Clone the backend repository separately if it is maintained in a different repository.

### Step 2: Install Frontend Dependencies

Open a terminal in the frontend project directory:

npm install

### Step 3: Install Backend Dependencies

Open another terminal in the backend project directory:
npm install

### Step 4: Configure Environment Variables

Create a `.env.local` file in the frontend root directory.

Example frontend configuration:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=my_secure_auth_secret
MONGODB_URL=my_mongodb_connection_string

# Optional: GitHub authentication
GITHUB_CLIENT_ID=my_github_client_id
GITHUB_CLIENT_SECRET=my_github_client_secret


Create a `.env` file in the backend root directory.

Example backend configuration:

PORT=8000
MONGODB_URL=your_mongodb_connection_string
FRONTEND_URL=http://localhost:3000


**Important:**

- Replace the example values with your actual configuration.
- Use the same MongoDB connection string for the applications if they share the same database.
- The database name used by the application is `doctor_tracker`.
- Never commit `.env`, `.env.local`, or real credentials to GitHub.
- Generate a strong, unique Better Auth secret and configure it consistently with your authentication setup.
- Configure production environment variables separately in your deployment platforms.

### Step 5: Run the Backend

From the backend directory:
npm run dev

The backend should be available at:

http://localhost:8000

### Step 6: Run the Frontend

From the frontend directory:
npm run dev
Open your browser:

http://localhost:3000

The application should now be running locally.

## 3. System Architecture

Doctor Tracker follows a client-server architecture with a separate frontend and backend.

### Technology Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js, React, TypeScript |
| Styling | Tailwind CSS, shadcn/ui |
| Icons | Lucide React |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Authentication | Better Auth, JWT |
| Deployment | Vercel |

### Architecture Overview

### Data Flow

1. **User Interaction:** Users interact with the Next.js frontend to access the dashboard and management features.
2. **Authentication:** Better Auth manages user authentication and issues authentication tokens.
3. **API Communication:** The frontend sends HTTP requests to the Express.js backend. Protected requests include a JWT in the Authorization header.
4. **Token Verification:** The backend verifies the JWT before allowing access to protected API endpoints.
5. **Database Operations:** Express.js communicates with MongoDB to create, retrieve, update, and delete doctor and patient records.
6. **Response Handling:** The backend returns JSON responses to the frontend, which updates the interface with the retrieved information.

### Main Application Modules

- **Authentication:** User registration, login, session management, and protected access.
- **Dashboard:** Overview of healthcare records and analytics.
- **Doctor Management:** Create, view, search, filter, and paginate doctor records.
- **Patient Management:** View and manage patient information.
- **Doctor-Patient Relationships:** Associate patients with doctors and manage those relationships.

## 4. Technical Decisions

### Decision 1: Separate Frontend and Backend Architecture

**Why this approach?**

The application uses Next.js for the frontend and Express.js for the backend instead of implementing all application logic inside a single framework.

**Reasons:**

- Separation of concerns makes the application easier to maintain.
- Express.js provides a dedicated REST API for database operations.
- Next.js focuses on rendering, routing, and user interactions.
- The backend can serve other clients in the future, such as mobile applications.
- Frontend and backend can be deployed and scaled independently.

**Result:**

This architecture creates a modular application where frontend components and backend services can be developed and maintained independently.

### Decision 2: JWT-Based Authentication Between Services

**Why JWT?**

The project uses Better Auth for authentication and JWT-based token verification to secure communication between the Next.js frontend and Express.js backend.

**Reasons:**

- Authentication is managed centrally through Better Auth.
- JWT allows the backend to verify authenticated requests.
- Protected API endpoints can reject requests without valid tokens.
- The backend does not need to maintain a separate login session for every API request.
- The approach supports communication between independently deployed services.

**Result:**

The application separates authentication from business logic and provides a consistent authentication mechanism for protected API requests.

## 5. Visual Evidence

The following screenshots demonstrate the application's user interface on desktop and mobile devices.

### Desktop Screenshots

**Dashboard**
<img width="1912" height="912" alt="image" src="https://github.com/user-attachments/assets/ab7d4d8b-d0f2-486b-9ee4-b6c994a3fccf" />

## 6. Project Links

Live Frontend:** https://doctor-frontend-tau.vercel.app
Frontend Repository: https://github.com/towhidul-dev-ai/doctor-tracker
Backend Repository: https://github.com/towhidul-dev-ai/doctor-tracker-server

## 7. Future Improvements

- Role-based access control for different user types.
- Advanced healthcare analytics and reporting.
- Export doctor and patient records.
- Improved data visualization.
- Additional validation and security improvements.

## 8. License

This project was developed for educational and demonstration purposes.
