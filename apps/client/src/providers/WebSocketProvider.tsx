import { useEffect, useRef, useState } from 'react';
import type { ReactNode, FC } from 'react';
import type { WebSocketContextType } from '../types/types';
import type { SocketMessage } from '@orkestral/shared';
import { WebSocketContext } from '../contexts/WebSocketContext';

interface Props {
  url: string;
  children: ReactNode;
}

export const WebSocketProvider: FC<Props> = ({ url, children }) => {
  const socketRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [lastMessage, setLastMessage] = useState<SocketMessage | null>(null);

  useEffect(() => {
    const socket = new WebSocket(url);
    socketRef.current = socket;

    socket.onopen = () => setIsConnected(true);
    socket.onclose = () => setIsConnected(false);
    socket.onmessage = (event) =>
      setLastMessage(JSON.parse(event.data as string) as SocketMessage);
    return () => {
      socket.close();
      socketRef.current = null;
    };
  }, [url]);

  const send = (msg: SocketMessage) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(msg));
    } else {
      console.warn('WebSocket not connected. Message skipped.');
    }
  };

  // We pass the ref object itself, not .current, to avoid render-time access errors
  const value: WebSocketContextType = {
    socketRef,
    isConnected,
    lastMessage,
    send,
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};
