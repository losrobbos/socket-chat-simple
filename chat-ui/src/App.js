import './App.css';
import { useEffect, useRef, useState } from 'react';
import faker from 'faker'
import socketIo from 'socket.io-client'

// URL to API / Message Server
const MESSAGE_SERVER_URL = process.env.REACT_APP_MESSAGE_SERVER_URL

function App() {

  // state vs refs FIGHT
  // state => RE-RENDERS !
  // ref => do NOT trigger RE-RENDER !

  const socketRef = useRef() // global variables

  // generate some fake user....
  const [userName, setUsername] = useState( faker.name.firstName() )

  // store history of chat messages
  const [chatHistory, setChatHistory] = useState([
    { text: "It's a me, Mario!", user: "Mario" },
    { text: "Buongiorno!", user: "Luigi" },
  ])

  // store here the message that we typed...
  const msgRef = useRef() 

  useEffect(() => {
    // initialize socket connection on load
    socketRef.current = socketIo( MESSAGE_SERVER_URL )

    // on browser tab close or page reload => close socket connection pleaaaase
    // otherwise the browser will open several connections in parallel
    return () => {
      socketRef.current && socketRef.current.disconnect()
    }
  }, [])

  // on every change of history 
  // => re-register message listener!
  useEffect(() => {
    const socket = socketRef.current

    // custom event listener => not triggered in DOM!
    socket.on("message", (msg) => {
      console.log("Received somethin': ", msg)
      setChatHistory([...chatHistory, msg]) // chatHistory contains a SNAPSHOT of state when this listener was created
    })

    // cleanup => remove event listener on every new message and re-assign
    return () => {
      socketRef.current && socketRef.current.off("message")
    }

  }, [ chatHistory ] )
  

  // add our message to history - and emit it to all our peeeeeps
  const addChatMessageToHistory = (e) => {
    e.preventDefault()

    // msgRef.current => gives me the DOM node => <input />
    // msgRef.current.value => value of input field
    let chatMsg = { text: msgRef.current.value, user: userName }
    msgRef.current.value = "" // clear input box

    // send to socket.io // => send it to everyone else connected

    const socket = socketRef.current

    // socket.on("")
    // socket.emit("")
    socket.emit("message", chatMsg) // emit event "message" to socket io server

    setChatHistory([ ...chatHistory, chatMsg ])
  }
 
  // create JSX history from chat entries
  let jsxChatHistory = chatHistory.map((chatMsg, i) => (
    <div className="chat-msg" key={i}>
      <label>{chatMsg.user}:</label>
      <span>{chatMsg.text}</span>
    </div>
  ))

  // display chat panel
  return (
    <div className="App">
      <header className="App-header">
        <h2>Chat</h2>
        
        {/* CHAT area with all messages */}
        <div id="chat-area" >{jsxChatHistory}</div>

        {/* SUBMIT new message */}
        <form id="message-send" onSubmit={ addChatMessageToHistory }>
          <input
            autoComplete="off"
            ref={msgRef} // we are not interested in intermediate typing results
            // value={msg} onChange={setMsg()} // => validation as you type!
            name="message-new"
            placeholder={`Type your message, ${userName}...`} 
          />
          <button type="submit" >Send</button>
        </form>
      </header>
    </div>
  );
}

export default App;
