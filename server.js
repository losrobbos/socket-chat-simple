import express from "express"
const app = express() // create API instance

app.get("/", (req, res, next) => {
  res.json({ message: "Hello from Message Server (we use Socket.io, buddy)"})
})

const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => console.log(`API started on http://localhost:${PORT}`))