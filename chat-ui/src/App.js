import './App.css';
import { useEffect, useRef, useState } from 'react';
import faker from 'faker'

// URL to API / Message Server
const MESSAGE_SERVER_URL = process.env.REACT_APP_MESSAGE_SERVER_URL

function App() {

  // generate some fake user....
  const [userName, setUsername] = useState( faker.name.firstName() )

  // store history of chat messages
  const [chatHistory, setChatHistory] = useState([
    { text: "It's a me, Mario!", user: "Mario" },
    { text: "Buongiorno!", user: "Luigi" },
  ])

  // store here the message that we typed...
  const msgRef = useRef() 

  // initialize socket connection on load
  useEffect(() => {

  }, [])
  

  // add our message to history - and emit it to all our peeeeeps
  const addChatMessageToHistory = (e) => {
    e.preventDefault()

    let chatMsg = { text: msgRef.current.value, user: userName }
    msgRef.current.value = "" // clear input box

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
            ref={msgRef}
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
