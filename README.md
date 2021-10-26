# Socket.io

This demo shows how to setup messaging between a Socket.io server running on the backend in ExpressJS and a React frontend.


## Code Snippets


```
// BACKEND setup

npm i socket.io // install socket io in Express

import express from "express";
const app = express();

import { Server } from "socket.io";

const PORT = process.env.PORT || 4001;
const httpServer = app.listen( PORT );

  // configure for usage from React
const io = new Server( httpServer, {
  cors: { // configure CORS
    origin: "*" 
  }
}) 
```

```
// FRONTEND setup

npm i socket.io-client // install Socket IO client for React

import socketIOClient from "socket.io-client";
const MESSAGE_SERVER_URL = "http://localhost:5000";

// connect on load...
const socketRef = useRef()

useEffect(() => {
  socketRef.current = socketIOClient(MESSAGE_SERVER_URL);

  return () => socketRef.current && socketRef.current.disconnect() // close socket when browser tab is closed
}, []);

// register socket message listener
// if listener depends on any state data 
useEffect(() => {

  socketRef.current.on("message", msg => {
    setMessages([...messages, msg]); // push response data into state
  });

  return () => socketRef.current && socketRef.current.off("message") // remove event listener after any messages state update and re-create it

}, [messages])

```

