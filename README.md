# 🎯 TaskTrack - A To-Do List Web Application

## Description:

**TaskTrack** is a full-stack web application designed to help users organize and manage their daily tasks efficiently. Built with modern web technologies, it provides a seamless user experience for task management while maintaining robust security and data integrity. It allows users to register, log in, and manage their personal to-do lists, with an admin dashboard for managing users.

### Key Capabilities:
- **User Authentication**: Secure registration and login system with bcrypt password hashing
- **Personal Task Management**: Each user has their own private to-do list with full CRUD functionality
- **Admin Control Panel**: Administrative interface for user management and oversight
- **Responsive Design**: Clean, modern interface built with Tailwind CSS that works across all devices
- **Real-time Updates**: Dynamic task management without page refreshes
- **Data Persistence**: Reliable SQLite database for storing user data and tasks

The application follows best practices in web development, including secure authentication, proper session management, and a clean separation of concerns between frontend and backend components. It's designed to be both user-friendly for end users and maintainable for developers.

---

## 🚀 Features

- ✅ User registration and login with password hashing
- 📝 Create, Read, Update, Delete (CRUD) for to-do items
- 👤 To-do items scoped per user
- 🛠️ Admin dashboard with read/delete functionality for users
- 💡 Clean and responsive interface with Tailwind CSS

---

## 🛠️ Tech Stack

### 👨‍💻 Languages & Tools
- **Frontend:** HTML, Tailwind CSS, JavaScript
- **Backend:** Node.js (Express)
- **Database:** SQLite (via `better-sqlite3`)

### 📦 NPM Packages Used
- [`express`](https://www.npmjs.com/package/express) – routing and server logic
- [`bcrypt`](https://www.npmjs.com/package/bcrypt) – password hashing
- [`better-sqlite3`](https://www.npmjs.com/package/better-sqlite3) – SQLite integration

---

## ⚙️ Getting Started

Follow these instructions to run TaskTrack locally.

### ✅ Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### 📥 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/htooaunglynn/TaskTrack.git

2.  Navigate to the project directory:
    ```bash
    cd TaskTrack
    ```
3.  Install the dependencies:
    ```bash
    npm install
    ```

### Usage

1. Create database
   ```bash
    node data/db.js
    ```
2.  Start the server:
    ```bash
    node servers.js
    ```
3.  Open your web browser and navigate to `http://localhost:3000`

## File Structure

```
.
├── data
│   ├── database.db
│   └── db.js
├── node_modules
├── package-lock.json
├── package.json
├── public
│   ├���─ index.html
│   ├── js
│   │   ├── dashboard.js
│   │   ├── method.js
│   │   ├── protect.js
│   │   ├── signInUp.js
│   │   └── todo.js
│   └── pages
│       ├── dashboard.html
│       └── todo.html
├── servers.js
└── README.md
```
