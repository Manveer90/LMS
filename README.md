


https://github.com/user-attachments/assets/0a1ae660-14f2-4492-a058-839d46185d63



# Learning Management System (LMS)

A full-stack Learning Management System built with the MERN stack (MongoDB, Express.js, React, Node.js). The platform enables educators to manage courses and students to browse, enroll in, and track their learning progress.

## 🌟 Key Features

### 👩‍🏫 Educator Capabilities
- Create, edit, and delete courses
- View and manage enrolled students
- Track student progress through assignments or modules

### 👨‍🎓 Student Capabilities
- Register, log in, and manage their profile
- Browse available courses
- Enroll in courses and track progress
- View enrolled course content in an interactive UI

### 🔐 Authentication & Authorization
- JWT-based secure login system
- Role-based access control for `students` and `educators`
  
## 🛠 Tech Stack

- **Frontend:** React, Vite, JavaScript, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB
- **Other Tools:** Vercel, ESLint, JWT for authentication

## 📁 Project Structure

LMS/
- ── client/ # React frontend
- ── server/ # Node.js backend

  
## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB running locally or cloud (e.g., MongoDB Atlas)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Manveer90/lms.git
   cd lms

2. **Install dependencies for both client and server:**   

    ```bash
    cd client
    npm install
    cd ../server
    npm install

3. **Set up environment variables:**

- Create .env files in both /client and /server with appropriate values (e.g., MongoDB URI, JWT secrets, API base URLs).

4. **Run the development servers:**

- For the frontend:
  
     ```bash
      cd client
      npm run dev
     
- For the backend:

     ```bash
      cd server
      npm run dev

## 🌐 Deployment Guide
You can deploy the frontend to Vercel and backend to Vercel

### Example Deployment Strategy:
- Frontend (Vercel): Connect GitHub repo, auto-deploy client/
- Backend (Vercel): Create web service from GitHub, set environment variables, use server.js as entry point




