// implement your API here
const express = require('express');

const dataB = require('./data/db.js');

const server = express();

server.use(express.json());