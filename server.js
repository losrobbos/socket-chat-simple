import express from "express"
import { Server } from 'socket.io' 
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config() // load env vars

// requirement env check at startup
if(!process.env.FRONTEND_ORIGIN) {
  console.log("Necessary env config missing. Expected FRONTEND_ORIGIN")
  process.exit() // terminate API script before it even starts up
}

const app = express() // create API instance

app.use((req, res, next) => {
  console.log("API request was made...")
  next()
})

app.get("/", (req, res, next) => {
  res.json({ message: "Hello from Message Server (we use Socket.io, buddy)"})
})

// setup cors for API
app.use( cors({ origin: process.env.FRONTEND_ORIGIN }) ) // ==> will just affect API routes!

const PORT = process.env.PORT || 5000

// Startup of HTTP server
const httpServer = app.listen(PORT, () => console.log(`API started on http://localhost:${PORT}`))

// Hook in Socket.io server into Express API
const io = new Server( httpServer, 
  { cors: { origin: process.env.FRONTEND_ORIGIN } } 
) // io = Socket server

// socket => individual connection of client & server
// browser tab 1 => own socket
// browser tab 2 => own socket
io.on("connection", ( socket ) => {

  console.log("Someone connected. So exciting...")

  // setup an event listener 
  // message = direct line channel
  socket.on("message", (data) => {
    console.log("Received some stuff: ", data)

    // forward message to everyone else
    socket.broadcast.emit("message", data)
  })


})


