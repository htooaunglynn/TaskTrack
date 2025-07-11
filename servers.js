const express = require('express');
const Database = require('better-sqlite3');
const db = new Database('./data/database.db');
const app = express();
const bcrypt = require('bcrypt');
const path = require('path');
const SALT_ROUNDS = 10;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

bcrypt.hash('admin', 10, (err, hashedPassword) => {
    if (err) throw err;

    // Check if user exists by email
    const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get('admin@gmail.com');

    if (!existingUser) {
        // If user does not exist, insert new admin user
        const stmt = db.prepare(`
            INSERT INTO users (name, email, password)
            VALUES (?, ?, ?)
        `);

        try {
            stmt.run('admin', 'admin@gmail.com', hashedPassword);
            console.log('Admin user created securely.');
        } catch (e) {
            console.error('Failed to create user:', e.message);
        }
    } else {
        console.log('Admin user already exists.');
    }
});


// Register
app.post('/register', async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const stmt = db.prepare(`
            INSERT INTO users (name, email, password)
            VALUES (?, ?, ?)
        `);
        const result = stmt.run(name, email, hashedPassword);

        const user = db.prepare(`
            SELECT id, name, email, created_at, updated_at FROM users WHERE id = ?
        `).get(result.lastInsertRowid);

        res.status(201).json(user);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Email already exists or other error' });
    }
});

// Login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

    if (!user) return res.status(404).json({ error: 'User not found' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid password' });

    // Never send back the password!
    const { id, name, created_at, updated_at } = user;
    res.json({ id, name, email, created_at, updated_at });
});

// Get Users
app.get('/users', (req, res) => {
    const users = db.prepare('SELECT id, name, email, created_at, updated_at FROM users').all();
    res.json(users);
});

// Delete Users
app.delete('/users/:id', (req, res) => {
    db.prepare('DELETE FROM todos WHERE user_id = ?').run(req.params.id);
    const result = db.prepare('DELETE FROM users WHERE id = ?').run(req.params.id);
    res.status(result.changes ? 204 : 404).send();
});

// Get all todos by user
app.get('/todos', (req, res) => {
    const { user_id } = req.query;
    try {
        const stmt = db.prepare('SELECT * FROM todos WHERE user_id = ?');
        const todos = stmt.all(user_id);
        res.json(todos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch todos' });
    }
});

// create todos
app.post('/todos', (req, res) => {
    const { user_id, text } = req.body;
    try {
        const result = db.prepare('INSERT INTO todos (user_id, text) VALUES (?, ?)').run(user_id, text);
        const todo = db.prepare('SELECT * FROM todos WHERE id = ?').get(result.lastInsertRowid);
        res.status(201).json(todo);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Invalid user_id or data' });
    }
});

// todo complete status
app.put('/todos/:id/complete', (req, res) => {
    const todoId = req.params.id;
    try {
        const result = db.prepare('UPDATE todos SET completed = 1 WHERE id = ?').run(todoId);
        if (result.changes === 0) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        const updatedTodo = db.prepare('SELECT * FROM todos WHERE id = ?').get(todoId);
        res.json(updatedTodo);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// delete todo
app.delete('/todos/:id', (req, res) => {
    const result = db.prepare('DELETE FROM todos WHERE id = ?').run(req.params.id);
    res.status(result.changes ? 204 : 404).send();
});

// default route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
