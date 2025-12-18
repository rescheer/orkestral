import type { SocketMessage } from '@orkestral/shared';
import { createContext, type RefObject } from 'react';

export interface WebSocketContextType {
  socketRef: RefObject<WebSocket | null>;
  isConnected: boolean;
  lastMessage: SocketMessage | null;
  send: (msg: SocketMessage) => void;
}

export const WebSocketContext = createContext<WebSocketContextType | null>(
  null
);
