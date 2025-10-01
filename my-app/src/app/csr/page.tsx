'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './csr.css';

type Photo = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export default function CSRPage() {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [counter, setCounter] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loadingPhotos, setLoadingPhotos] = useState(false);

  useEffect(() => {
    setIsLoading(false);
    setCurrentTime(new Date().toISOString());

    const interval = setInterval(() => {
      setCurrentTime(new Date().toISOString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const loadPhotos = async () => {
    setLoadingPhotos(true);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=6');
      const data = await response.json();
      setPhotos(data);
    } catch (error) {
      console.error('Ошибка загрузки фото:', error);
    } finally {
      setLoadingPhotos(false);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <div className="spinner"></div>
          <p style={{ fontSize: '1.25rem', color: '#7c2d12' }}>Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="csr-page">
      <div className="csr-container">
        <div className="style-badge">
          🎨 Стилизация: Обычный CSS файл
        </div>
        <h1 className="csr-title">
          CSR - Client-Side Rendering
        </h1>
        
        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-3">Что такое CSR?</h2>
          <p className="mb-4">
            Client-Side Rendering - это метод рендеринга, при котором JavaScript 
            выполняется в браузере пользователя для отрисовки страницы. 
            Сервер отправляет минимальный HTML, а всё остальное загружается и 
            рендерится на клиенте.
          </p>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Преимущества:</h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Быстрые переходы между страницами</li>
              <li>Богатые интерактивные UI</li>
              <li>SPA (Single Page Application)</li>
              <li>Реалтайм обновления без перезагрузки</li>
            </ul>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span>⚡</span> Интерактивная демонстрация
          </div>
          
          <div className="timer-display">
            <p className="timer-label">Текущее время:</p>
            <p className="timer-value">{currentTime}</p>
            <p style={{ fontSize: '0.75rem', color: '#7c2d12', marginTop: '0.5rem' }}>
              Обновляется каждую секунду на клиенте
            </p>
          </div>

          <div className="counter-container">
            <h3 style={{ fontWeight: 600, marginBottom: '1rem', color: '#1e3a8a' }}>
              Интерактивный счётчик:
            </h3>
            <div className="counter-controls">
              <button
                onClick={() => setCounter(counter - 1)}
                className="counter-button"
              >
                -
              </button>
              <span className="counter-display">
                {counter}
              </span>
              <button
                onClick={() => setCounter(counter + 1)}
                className="counter-button increment"
              >
                +
              </button>
            </div>
            <button
              onClick={() => setCounter(0)}
              className="reset-button"
            >
              Сбросить
            </button>
          </div>
        </div>

        <div className="photos-container fade-in">
          <div className="card-header">
            Загрузка данных из API на клиенте
          </div>
          <p style={{ fontSize: '0.875rem', color: '#0c4a6e', marginBottom: '1rem' }}>
            Нажмите кнопку, чтобы загрузить фото из JSONPlaceholder API прямо в браузере!
          </p>
          
          <button
            onClick={loadPhotos}
            disabled={loadingPhotos}
            className="load-button"
          >
            {loadingPhotos ? '⏳ Загрузка...' : photos.length > 0 ? '🔄 Обновить фото' : '📸 Загрузить фото'}
          </button>

          {photos.length > 0 && (
            <div className="fade-in">
              <div className="photo-grid">
                {photos.map((photo) => (
                  <div key={photo.id} className="photo-item">
                    <Image 
                      src={photo.thumbnailUrl} 
                      alt={photo.title}
                      width={150}
                      height={150}
                      className="photo-img"
                      unoptimized
                    />
                    <p className="photo-title">
                      {photo.title}
                    </p>
                  </div>
                ))}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded">
                 Эти данные загружены в браузере после клика. Запрос выполняется 
                на клиенте, а не на сервере!
              </div>
              <div className="text-xs font-mono bg-gray-100 dark:bg-gray-900 p-3 rounded">
                <strong>Код:</strong><br/>
                const response = await fetch(&apos;https://jsonplaceholder.typicode.com/photos&apos;);<br/>
                const data = await response.json();<br/>
                setPhotos(data);
              </div>
            </div>
          )}
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">Когда использовать CSR?</h2>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>Административные панели и дашборды</li>
            <li>Приложения, требующие частых обновлений UI</li>
            <li>Интерактивные карты и графики</li>
            <li>Чаты и мессенджеры</li>
            <li>Страницы, не требующие SEO (за авторизацией)</li>
          </ul>
        </div>

        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3">Недостатки</h2>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>Медленная начальная загрузка (нужно загрузить весь JS)</li>
            <li>Проблемы с SEO (поисковики могут не видеть контент)</li>
            <li>Требует хорошего интернет-соединения</li>
            <li>Увеличенное потребление батареи на мобильных устройствах</li>
          </ul>
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link href="/" className="back-link">
            ← Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  );
}
