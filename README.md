# SOL9x MERN Stack Intern Assignment

## Project Overview
A mini-project designed to demonstrate understanding of **authentication, role-based access, and dashboard CRUD operations** using the **MERN stack** (MongoDB, Express.js, React.js, Node.js).

The system supports **two user roles**:  

- **Admin** – full access to manage student records  
- **Student** – can view and update own profile  



## Features

### Authentication
- User Signup & Login using **email & password**
- **JWT authentication** for protected routes
- Passwords are **hashed with bcrypt**

### User Roles
- **Admin**
  - View all students
  - Add / Edit / Delete student records
- **Student**
  - View own profile
  - Update own profile (name, email, course)

### Student Entity
- Name
- Email
- Course (default: MERN Bootcamp)
- Enrollment Date

### Frontend
- **React.js** SPA with role-based routing
- Pages:
  - Login
  - Signup
  - Admin Dashboard
  - Student Dashboard
- Protected routes for authenticated users only

### Backend
- **Node.js + Express**
- **MongoDB** as database
- Role-based access control
- API routes for authentication and student CRUD operations

### Bonus / Optional Features
- Logout option
- Contex management 

