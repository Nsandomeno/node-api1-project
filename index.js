// import 
const express = require('express')

// declare server
const server = express()
// Teach express JSON
server.use(express.json())
// Bring in the data
const Users = require('./data/db.js')

// endpoints:

// (0) base endpoint
server.get('/', (req, res) => {
    // res.send('Hello World.')
    res.json({ greeting: 'Hello'})
})

// (2) get request - all users
server.get('/api/users', (req, res) => {
    Users.find().then((users) => {
        console.log("This is a list of all users:", users)
        res.status(200).json(users)
    }).catch((error) => {
        res.status(500).json({ error_message: "The User information could not be retrieved."})
    })
})



// initiate the server
server.listen(5000, () => console.log("API is running on port 5000."))
