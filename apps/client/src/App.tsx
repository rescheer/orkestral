import { useEffect, useState, useRef } from 'react';
import './App.css';
import type { NotifyMessage } from '@orkestral/shared';

const serverIp: string = import.meta.env.VITE_SERVER_IP;

function App() {
  const [connectionStatus, setConnectionStatus] = useState<
    'connected' | 'disconnected' | 'error'
  >('disconnected');
  const [message, setMessage] = useState<string>('');

  const socket = useRef<WebSocket | null>(null);

  const handleClick = () => {
    const msg: NotifyMessage = {
      type: 'NOTIFY',
      level: 'INFO',
      payload: 'Click',
      sentAt: new Date(),
      recievedAt: null,
      source: null,
      target: null
    };

    socket.current?.send(JSON.stringify(msg));
  };

  const handleClear = () => {
    setMessage('');
  };

  useEffect(() => {
    socket.current = new WebSocket(serverIp);
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

    socketCurrent.onmessage = (msgEvent: MessageEvent) => {
      const data = msgEvent.data as string;
      setMessage(data);
    };

    return () => socketCurrent.close();
  }, []);

  return (
    <>
      <h2>Connection status: {connectionStatus}</h2>
      <button onClick={handleClick}>Say Hi</button>
      <button onClick={handleClear}>Clear Message</button>
      <div>server response: {message}</div>
    </>
  );
}

export default App;
