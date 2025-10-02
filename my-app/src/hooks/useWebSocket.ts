import { generateId } from '@/lib/utils';
import { Message, ConnectionStatus } from '@/types/websocket';
import { useState, useEffect, useRef, useCallback } from 'react';


type UseWebSocketProps = {
  url: string;
  onOpen?: () => void;
  onClose?: () => void;
  onError?: (error: Event) => void;
};

export function useWebSocket({ url, onOpen, onClose, onError }: UseWebSocketProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');
  const wsRef = useRef<WebSocket | null>(null);

  const addMessage = useCallback((text: string, type: Message['type']) => {
    const newMessage: Message = {
      id: generateId(),
      text,
      type,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  }, []);

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      addMessage('Уже подключено!', 'system');
      return;
    }

    setConnectionStatus('connecting');
    addMessage('Подключение к серверу...', 'system');

    try {
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => {
        setConnectionStatus('connected');
        addMessage('Подключено к WebSocket серверу!', 'system');
        onOpen?.();
      };

      ws.onmessage = (event) => {
        addMessage(event.data, 'received');
      };

      ws.onerror = (error) => {
        addMessage('Ошибка подключения', 'system');
        setConnectionStatus('disconnected');
        onError?.(error);
      };

      ws.onclose = () => {
        setConnectionStatus('disconnected');
        addMessage('Соединение закрыто', 'system');
        onClose?.();
      };
    } catch (error) {
      addMessage('Не удалось подключиться', 'system');
      setConnectionStatus('disconnected');
    }
  }, [url, addMessage, onOpen, onClose, onError]);

  const disconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  }, []);

  const sendMessage = useCallback((message: string) => {
    if (!message.trim()) return false;

    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      addMessage('Нет подключения к серверу', 'system');
      return false;
    }

    try {
      wsRef.current.send(message);
      addMessage(message, 'sent');
      return true;
    } catch (error) {
      addMessage('Ошибка отправки сообщения', 'system');
      return false;
    }
  }, [addMessage]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  return {
    messages,
    connectionStatus,
    isConnected: connectionStatus === 'connected',
    connect,
    disconnect,
    sendMessage,
    clearMessages,
  };
}

