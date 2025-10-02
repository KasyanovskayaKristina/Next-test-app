'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

type Message = {
  id: string;
  text: string;
  type: 'sent' | 'received' | 'system';
  timestamp: Date;
};

export default function WebSocketDemo() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const wsRef = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const WS_URL = 'wss://echo.websocket.org/';

  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addMessage = (text: string, type: Message['type']) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      type,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const connectWebSocket = () => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      addMessage('Уже подключено!', 'system');
      return;
    }

    setConnectionStatus('connecting');
    addMessage('Подключение к серверу...', 'system');

    try {
      const ws = new WebSocket(WS_URL);
      wsRef.current = ws;

      ws.onopen = () => {
        setIsConnected(true);
        setConnectionStatus('connected');
        addMessage('Подключено к WebSocket серверу!', 'system');
        console.log('WebSocket подключен');
      };

      ws.onmessage = (event) => {
        console.log('Получено сообщение:', event.data);
        addMessage(event.data, 'received');
      };

      ws.onerror = (error) => {
        console.error('WebSocket ошибка:', error);
        addMessage('Ошибка подключения', 'system');
        setConnectionStatus('disconnected');
      };

      ws.onclose = () => {
        setIsConnected(false);
        setConnectionStatus('disconnected');
        addMessage('Соединение закрыто', 'system');
        console.log('WebSocket отключен');
      };

    } catch (error) {
      console.error('Ошибка создания WebSocket:', error);
      addMessage('Не удалось подключиться', 'system');
      setConnectionStatus('disconnected');
    }
  };

  const disconnectWebSocket = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  };

  const sendMessage = () => {
    if (!inputMessage.trim()) return;
    
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      addMessage('Нет подключения к серверу', 'system');
      return;
    }

    try {
      wsRef.current.send(inputMessage);
      addMessage(inputMessage, 'sent');
      console.log('Отправлено сообщение:', inputMessage);
      setInputMessage('');
    } catch (error) {
      console.error('Ошибка отправки:', error);
      addMessage('Ошибка отправки сообщения', 'system');
    }
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <div className="min-h-screen p-8 font-sans bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">
          WebSocket Демонстрация
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${
                connectionStatus === 'connected' ? 'bg-green-500' :
                connectionStatus === 'connecting' ? 'bg-yellow-500 animate-pulse' :
                'bg-red-500'
              }`} />
              <span className="font-semibold">
                Статус: {
                  connectionStatus === 'connected' ? 'Подключено' :
                  connectionStatus === 'connecting' ? 'Подключение...' :
                  'Отключено'
                }
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={connectWebSocket}
                disabled={isConnected}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
              >
                Подключиться
              </button>
              <button
                onClick={disconnectWebSocket}
                disabled={!isConnected}
                className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm"
              >
                Отключиться
              </button>
            </div>
          </div>

          <div className="text-xs text-gray-500 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 p-3 rounded mb-4">
            Используется публичный эхо-сервер: <code className="bg-white dark:bg-gray-700 px-1 rounded">{WS_URL}</code>
            <br />
            Сервер отправляет обратно все полученные сообщения (echo)
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 h-96 overflow-y-auto mb-4">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-400">
                Нет сообщений. Подключитесь к серверу и отправьте сообщение!
              </div>
            ) : (
              <div className="space-y-2">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.type === 'sent' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg px-4 py-2 ${
                        msg.type === 'sent'
                          ? 'bg-blue-600 text-white'
                          : msg.type === 'received'
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                      }`}
                    >
                      <p className="text-sm break-words">{msg.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {msg.timestamp.toLocaleTimeString('ru-RU')}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Введите сообщение..."
              disabled={!isConnected}
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed"
            />
            <button
              onClick={sendMessage}
              disabled={!isConnected || !inputMessage.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Отправить
            </button>
            <button
              onClick={clearMessages}
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
              title="Очистить сообщения"
            >
              Корзина
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <h3 className="font-semibold mb-2 text-lg">Как это работает?</h3>
            <ol className="text-sm space-y-1 list-decimal list-inside">
              <li>Нажмите &quot;Подключиться&quot;</li>
              <li>Введите сообщение в поле ввода</li>
              <li>Нажмите &quot;Отправить&quot;</li>
              <li>Сервер вернет ваше сообщение (эхо)</li>
            </ol>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <h3 className="font-semibold mb-2 text-lg">WebSocket Events</h3>
            <ul className="text-sm space-y-1">
              <li>• <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">onopen</code> - подключение установлено</li>
              <li>• <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">onmessage</code> - получено сообщение</li>
              <li>• <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">onerror</code> - ошибка соединения</li>
              <li>• <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">onclose</code> - соединение закрыто</li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">Что такое WebSocket?</h2>
          <p className="text-sm mb-3">
            WebSocket - это протокол для двусторонней связи между клиентом и сервером через одно TCP-соединение.
            В отличие от HTTP, где клиент инициирует запрос, WebSocket позволяет серверу отправлять данные клиенту в любое время.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong className="text-green-700 dark:text-green-400">Преимущества:</strong>
              <ul className="list-disc list-inside ml-2 mt-1">
                <li>Реальное время (real-time)</li>
                <li>Низкая задержка</li>
                <li>Двусторонняя связь</li>
                <li>Меньше нагрузки на сервер</li>
              </ul>
            </div>
            <div>
              <strong className="text-blue-700 dark:text-blue-400">Примеры использования:</strong>
              <ul className="list-disc list-inside ml-2 mt-1">
                <li>Чаты и мессенджеры</li>
                <li>Live обновления</li>
                <li>Онлайн-игры</li>
                <li>Биржевые котировки</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/"
            className="inline-block bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            ← Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  );
}

