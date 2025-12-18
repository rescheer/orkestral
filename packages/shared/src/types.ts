interface GenericMessage {
  sentAt: Date;
  recievedAt: Date | null;
  source: null;
  target: null;
}

export type LogLevel = 'TRACE' | 'INFO' | 'WARN' | 'ERROR';

export interface NotifyMessage extends GenericMessage {
  type: 'NOTIFY';
  level: LogLevel;
  payload: string;
}

export interface QueryMessage extends GenericMessage {
  type: 'QUERY';
  requests: string[];
}

export interface CommandMessage extends GenericMessage {
  type: 'COMMAND';
  request: string;
  params?: any[];
}

export interface ResponseMessage extends GenericMessage {
  type: 'RESPONSE';
  initiator: QueryMessage | CommandMessage;
  payload: any[];
}

export type SocketMessage =
  | NotifyMessage
  | QueryMessage
  | CommandMessage
  | ResponseMessage;
