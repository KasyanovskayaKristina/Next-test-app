export type Message = {
  id: string;
  text: string;
  type: 'sent' | 'received' | 'system';
  timestamp: Date;
};

export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected';

export type WebSocketConfig = {
  url: string;
  reconnectAttempts?: number;
  reconnectInterval?: number;
};

