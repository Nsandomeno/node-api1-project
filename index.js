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

// (1) post request - add a user
server.post('/api/users', (req, res) => {
    const newUser = req.body

    if (newUser.name && newUser.bio) {
        Users.insert(newUser).then((user) => {
            console.log("This is the response from new user post:", user)
            res.status(201).json(user)
        }).catch((error) => {
            res.status(400).json({ error_message: "Please provide a name and a bio for the new user."})
        })
    } else {
        res.status(500).json({ error_message: "There was an error while saving the user to the database."})
    }
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

// (3) get request - an individual user
server.get('/api/users/:id', (req, res) => {
    Users.findById(req.params.id).then((user) => {
        // if (res.length > 0) {
        //     res.status(200).json(user)
        // } else {
        //     res.status(404).json({ error_message: "The user with the specified id is not found."})
        // }
        res.status(200).json(user)
    }).catch((error) => {
        res.status(500).json({ error_message: "The user information could not be retrieved."})
    })
})





// initiate the server
server.listen(5000, () => console.log("API is running on port 5000."))
