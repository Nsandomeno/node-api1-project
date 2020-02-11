// import 
const express = require('express')
const cors = require('cors')
// declare server
const server = express()
// Teach express JSON
server.use(express.json())
// Bring cors
server.use(cors())
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
server.get('/api/users/:id',  (req, res) => {
    Users.findById(req.params.id).then((user) => {
        // if (res.length > 0) {
        //     res.status(200).json(user)
        // } else {
        //     res.status(404).json({ error_message: "The user with the specified id is not found."})
        // }
        if (typeof user === 'object') {
            res.status(200).json(user)
        } else {
            res.status(404).json({ error_message: "The user with this id could not be found."})
        }
    }).catch((error) => {
        res.status(500).json({ error_message: "The user could not be retrieved."})
    })
})

// (4) delete request - an individual user
server.delete('/api/users/:id', (req,res) => {
Users.remove(req.params.id).then((num) => {
    if (num === 1) {
        res.status(200).json(num)
    } else {
        res.status(404).json({ error_message: "The user with this id could not be deleted."})
    }
}).catch((error) => {
    res.status(500).json({ error_message: "This user could not be deleted. "})
})
})

// (5) put request - update an individual user
server.put('/api/users/:id', (req, res) => {
    const updatedUser = req.body

    Users.update(req.params.id, updatedUser).then((num) => {
        if (num === 1 && updatedUser.name.length > 0 && updatedUser.bio.length > 0) {
            res.status(200).json(num)
        } else {
            res.status(404).json({ error_message: "This user cannot be found"})
        } 
    }).catch((error) => {
        if (!updatedUser.name || !updatedUser.bio) {
            res.status(400).json({ error_message: "Please provide a username and a bio." })
        } else {
            res.status(500).json({ error_message: "This user could not be modified." })
        }
    })
})





// initiate the server
server.listen(5000, () => console.log("API is running on port 5000."))
