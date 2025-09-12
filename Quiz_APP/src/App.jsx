// filepath: c:\Users\Tahir\Desktop\REACT PRACTICE\Websockets\quiz_app\src\App.jsx
import React, { useState, useEffect } from 'react';


function App() {
  // State for storing the list of messages (history) - imagine this as a chat log that grows
  const [messages, setMessages] = useState([]);
  
  // State for the WebSocket connection - this holds the "pipe" to the server
  const [ws, setWs] = useState(null);
  
  // State for the input field value - what the user types before sending
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // Step 1: Create a new WebSocket connection to the server at localhost:8080
    // Visualize: Like dialing a phone number to connect to a friend
    const websocket = new WebSocket('ws://localhost:8080');
    setWs(websocket);

    // Step 2: When the connection opens, log it (optional for debugging)
    // Visualize: The call connects, and you hear "hello"
    websocket.onopen = () => {
      console.log('Connected to server');
    };

    // Step 3: When a message arrives from the server, add it to the messages list
    // Visualize: Your friend speaks, and you write it down in your notebook (the messages array)
    websocket.onmessage = (event) => {
      console.log('Message received:', event.data);
      setMessages((prevMessages) => [...prevMessages, `Received: ${event.data}`]);
    };

    websocket.onclose =()=>{
      console.log('disconnected from server');
    }
    return ()=> websocket.close();

  }, []);

  // Function to send a message
  // Visualize: You type a note, press "send," and it goes through the phone line to your friend
function sendMessage(){
  if (ws && ws.readyState===WebSocket.OPEN && inputValue.trim()){
    //send the types message to the server
    ws.send(inputValue);
    //Add your sent message to the history for display
    //Visualize: You add your own note to the notebook too
    setMessages((prevMessages)=>{
                [...prevMessages, `You: ${inputValue}`]);
    // Clear the input field after sending
      setInputValue('');
    }
  };
  //handle enter key press in input for convenience 
  //visuallize : Hitting enter is like cliking send button
  function handleKeyPress(e){
    if (e.key==='Enter'){
      sendMessage();

    }
  }
  return(
    <div style={{padding : '20px'}}>
      <h1>WEb socket Chat</h1>
      {/*Input field  for typing messages*/}
<input 
type='text'
value={inputValue}
onChange={(e)=>{
  setInputValue(e.target.value);
}}
placeholder='Type Your message lil bro .......'
 style={{ width: '300px', marginRight: '10px' }}
/>

 
      {/* Send button */}

      <button onClick={sendMessage} style={{backgroundColor: 'Blue'}}>Send</button>
      {/* Display message history */}

      <ul style={{marginTop : '20px'}}>
        {messages.map((msg,index)=>{
          <li key={index}>{msg}</li>
        })}
      </ul>




    </div>
  )

  }
export default App;