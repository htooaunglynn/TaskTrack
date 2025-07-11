# 🎯 TaskTrack - A To-Do List Web Application

**TaskTrack** is a simple and intuitive to-do list web application developed as a final project for [CS50x](https://cs50.harvard.edu/x/). It allows users to register, log in, and manage their personal to-do lists, with an admin dashboard for managing users.

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


## 📹 Demo
Watch the live demo here:
* [🔗 Vimeo Demo – TaskTrack](https://vimeo.com/1100676340?share=copy)
