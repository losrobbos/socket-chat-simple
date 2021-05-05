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
const io = new Server( httPserver, {
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
useEffect(() => {
  const socket = socketIOClient(MESSAGE_SERVER_URL);
  // const socket = socketIo(MESSAGE_SERVER_URL, { transports: ['websocket'] }) 
    // this works even without CORS set in backend!

  socket.on("helloFromApi", data => {
    setResponse(data); // push response data into state
  });
}, []);

```

