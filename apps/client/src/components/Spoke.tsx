import type { NotifyMessage } from '@orkestral/shared';
import { useWebSocket } from '../hooks/useWebSocket';

export default function Spoke() {
  const { isConnected, lastMessage, send } = useWebSocket();

  const handleClick = () => {
    const msg: NotifyMessage = {
      type: 'NOTIFY',
      level: 'INFO',
      payload: 'Click',
      sentAt: new Date(),
      recievedAt: null,
      source: null,
      target: null,
    };

    send(msg);
  };

  return (
    <>
      <h2>Connection status: {isConnected ? 'connected' : 'disconnected'}</h2>
      <button onClick={handleClick}>Say Hi</button>
      <span>Last message: {lastMessage?.type || 'no messages'}</span>
    </>
  );
}
