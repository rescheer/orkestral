interface GenericMessage {
  sentAt: Date;
  recievedAt: Date | null;
  source: null;
  target: null;
}

export type LogLevel = 'TRACE' | 'INFO' | 'WARN' | 'ERROR';

export type NotifyMessage = GenericMessage & {
  type: 'NOTIFY';
  level: LogLevel;
  payload: string;
};

export type QueryMessage = GenericMessage & {
  type: 'QUERY';
  requests: string[];
};

export type CommandMessage = GenericMessage & {
  type: 'COMMAND';
  request: string;
  params?: any[];
};

export type ResponseMessage = GenericMessage & {
  type: 'RESPONSE';
  initiator: SocketMessage;
  payload: any[];
};

export type SocketMessage =
  | NotifyMessage
  | QueryMessage
  | CommandMessage
  | ResponseMessage;
