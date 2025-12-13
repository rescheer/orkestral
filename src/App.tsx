import { useEffect, useState, useRef } from 'react';
import './App.css';

const server = {
  ip: import.meta.env.VITE_SERVER_IP,
  port: import.meta.env.VITE_SERVER_PORT,
};

const testUrl = `ws://${server.ip}:${server.port}`;

function App() {
  const [connectionStatus, setConnectionStatus] = useState<
    'connected' | 'disconnected' | 'error'
  >('disconnected');

  const socket = useRef<WebSocket | null>(null);

  const handleClick = () => {
    socket.current?.send('Hi!');
  };

  useEffect(() => {
    socket.current = new WebSocket(testUrl);
    const socketCurrent = socket.current;

    socketCurrent.onopen = () => {
      console.log('Server connection successful!');
      setConnectionStatus('connected');
    };

    socketCurrent.onclose = () => {
      console.log('Server connection closed.');
      setConnectionStatus('disconnected');
    };

    socketCurrent.onerror = (event: Event) => {
      console.error('Socket error: ', event);
      setConnectionStatus('error');
    };

    return () => socketCurrent.close();
  }, []);

  return (
    <>
      <h1>Connection status: {connectionStatus}</h1>
      <button onClick={handleClick}>Say Hi</button>
    </>
  );
}

export default App;
