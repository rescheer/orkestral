import type { SocketMessage } from '@orkestral/shared';
import type { RefObject } from 'react';

export interface WebSocketContextType {
  /** The stable reference to the underlying WebSocket instance */
  socketRef: RefObject<WebSocket | null>;
  /** Reactive state indicating connection status */
  isConnected: boolean;
  /** The latest parsed message received from the server */
  lastMessage: SocketMessage | null;
  /** Stable helper function to send messages */
  send: (data: SocketMessage) => void;
}
