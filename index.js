require('dotenv').config()
const express = require('express')
const cors = require('cors')

const server = express()

server.use(express.json())
server.use(cors())

let users = []

server.get('/api/users', (req, res ) => {
    res.json(users)
})

server.post('/api/register', ( req, res) => {
    const {username, password} = req.body
    const newUser = {username, password}
    users.push(newUser)
    res.status(201).json(newUser)
})

server.post('/api/login', (req, res) => {
    const {username, password} = req.body
    res.json(`Welcome ${username}!`)
})

server.use('*', (req, res ) => {
    res.send(`<h1>Hello, Hello!</h1>`)
})

server.use((err, req, res, next) => { //eslint-disable-line
    res.status(500).json({
        message: err.message,
        stack: err.stack,
    })
})


const port = process.env.PORT || 9000

server.listen(port, () => {
    console.log(`listening on port ${ port }`)
})