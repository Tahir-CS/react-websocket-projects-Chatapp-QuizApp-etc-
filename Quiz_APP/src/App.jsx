// filepath: c:\Users\Tahir\Desktop\REACT PRACTICE\Websockets\quiz_app\src\App.jsx
import React, { useState, useEffect } from 'react';


function App() {
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);
  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:8080');
    setWs(websocket);
    websocket.onmessage = (e) => setMessages([...messages, e.data]);
  }, []);
  const send = () => ws.send('Test');
  return (<div><button onClick={send}>Send</button><ul>{messages.map(m => <li>{m}</li>)}</ul></div>);
}
export default App;