//create web serverusing express
const express = require('express');
const app = express();
const port = 3000;

//use body parser to parse json
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//use cors to allow cross origin resource sharing
const cors = require('cors');
app.use(cors());

//use mysql to connect to database
const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'comment'
});

//connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

//get all comments
app.get('/api/comments', (req, res) => {
    let sql = 'SELECT * FROM comment';
    let query = db.query(sql, (err, results) => {
        if (err) {
            throw err;
        }
        res.send(JSON.stringify({
            "status": 200,
            "error": null,
            "response": results
        }));
    });
});

//get single comment
app.get('/api/comments/:id', (req, res) => {
    let sql = 'SELECT * FROM comment WHERE id=' + req.params.id;
    let query = db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(JSON.stringify({
            "status": 200,
            "error": null,
            "response": result
        }));
    });
});

//add new comment
app.post('/api/comments', (req, res) => {
    let data = {
        name: req.body.name,
        comment: req.body.comment,
        date: req.body.date
    };
    let sql = 'INSERT INTO comment SET ?';
    let query = db.query(sql, data, (err, result) => {
        if (err) {
            throw err;
        }
        res.send(JSON.stringify({
            "status": 200,
            "error": null,
            "response": result
        }));
    });
});

//update comment
app.put('/api/comments/:id', (req, res) => {
    let sql = 'UPDATE comment SET name="' + req.body.name + '", comment="' + req.body.comment + '", date="' + req.body.date + '" WHERE id=' + req.params.id;
