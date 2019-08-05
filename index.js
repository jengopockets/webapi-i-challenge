// implement your API here
const express = require('express');

const DataB = require('./data/db.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('hello world')
});
//User List Get /api/users
server.get('/api/users', (req, res) => {
    DataB.find()
    .then(users => {
        res.status(201).json(users);
    })
    .catch(error => {
        res.status(500).json({message:"You Are Alone Here"})
    });
});
// Get /api/users/:id
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    DataB.find(id)
    .then(user => {
        if (user) {
            res.status(201).json(user);
        }else {
            res.status(404).json({message: 'user is imaginary'})
        }
    })
    .catch(error => {
        res.status(500).json({message:"You Are Alone Here"})
    });
});
//Post
server.post('/api/users', (req, res) => {
    const {name, bio} = req.body;
    if (!name || !bio) {
        return res
        .status(400)
        .json({message:"Name and Bio Please"});
    }
    DataB.insert({name, bio})
    .then(newUser => {
        res.status(200).json(newUser);
    })
    .catch(error => {
        res.status(500).json({message:"Sorry You Didn't do it right"})
    });
});

const port = 8000;
server.listen(port, () => console.log('api running'));