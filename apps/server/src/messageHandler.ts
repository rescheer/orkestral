import { WebSocketServer } from 'ws';
import {
  CommandMessage,
  NotifyMessage,
  QueryMessage,
  ResponseMessage,
  SocketMessage,
} from '@orkestral/shared';

function parseMessage(msgString: string): SocketMessage {
  return JSON.parse(msgString);
}

export default function messageHandler(
  server: WebSocketServer,
  msgString: string
) {
  const msg = parseMessage(msgString);

  msg.recievedAt = new Date();

  switch (msg.type) {
    case 'NOTIFY':
      return notifyHandler(server, msg);
    case 'QUERY':
      return queryHandler(server, msg);
    case 'COMMAND':
      return commandHandler(server, msg);
    case 'RESPONSE':
      return responseHandler(server, msg);
    default:
      const _exhaustiveCheck: never = msg;
      throw new Error(`Unhandled message type: ${_exhaustiveCheck}`);
  }
}

function notifyHandler(server: WebSocketServer, msg: NotifyMessage) {
  switch (msg.level) {
    case 'TRACE':
      return console.trace(msg.payload);
    case 'INFO':
      return console.info(msg.payload);
    case 'WARN':
      return console.warn(msg.payload);
    case 'ERROR':
      return console.error(msg.payload);
    default:
      const _exhaustiveCheck: never = msg.level;
      throw new Error(`Unhandled message type: ${_exhaustiveCheck}`);
  }
}

function queryHandler(server: WebSocketServer, msg: QueryMessage) {}

function commandHandler(server: WebSocketServer, msg: CommandMessage) {}

function responseHandler(server: WebSocketServer, msg: ResponseMessage) {}
