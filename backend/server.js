const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

let db = new sqlite3.Database('./mydatabase.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT
)`, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Table created or already exists.');
});

/*let name = 'John Doe';
let email = 'john.doe@example.com';*/

app.post('/add-user', (req, res) => {
    const { name, email } = req.body;
    db.run(`INSERT INTO users (name, email) VALUES (?, ?)`, [name, email], function(err) {
    if (err) {
        return res.status(500).json({ error: err.message });
    }
    res.json({ message: `A row has been inserted with rowid ${this.lastID}` });
    });
});

app.get('/users', (req, res) => {
    db.all(`SELECT * FROM users`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ users: rows });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);

});