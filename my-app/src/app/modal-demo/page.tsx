'use client';

import { useState } from 'react';
import Link from 'next/link';
import Modal from '@/components/Modal';

export default function ModalDemoPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-center">
          Демонстрация модального окна
        </h1>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-3">Что это?</h2>
          <p className="mb-4">
            Модальное окно (Modal) - это всплывающий интерфейсный элемент, который 
            отображается поверх основного контента страницы и требует взаимодействия 
            пользователя перед возвратом к основному контенту.
          </p>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Особенности реализации:</h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Клиентский компонент (Client Component)</li>
              <li>Управление состоянием через useState</li>
              <li>Backdrop с затемнением фона</li>
              <li>Анимация появления</li>
              <li>Закрытие по клику вне окна или на крестик</li>
            </ul>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">Элементы формы</h2>
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">1. Текстовый инпут (type=&quot;text&quot;)</h3>
              <ul className="text-sm space-y-1 ml-4">
                <li>• Обязательное поле (required)</li>
                <li>• Placeholder для подсказки</li>
                <li>• Валидация через HTML5</li>
                <li>• Стилизация с Tailwind CSS</li>
              </ul>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">2. Файловый инпут (type=&quot;file&quot;)</h3>
              <ul className="text-sm space-y-1 ml-4">
                <li>• Кастомная кнопка загрузки</li>
                <li>• Отображение имени выбранного файла</li>
                <li>• Ограничение типов файлов (accept)</li>
                <li>• useRef для доступа к DOM элементу</li>
              </ul>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">3. POST запрос на сервер 🚀</h3>
              <ul className="text-sm space-y-1 ml-4">
                <li>• FormData для отправки файлов</li>
                <li>• Fetch API с методом POST</li>
                <li>• API Route Handler в Next.js</li>
                <li>• Обработка ответа и отображение результата</li>
                <li>• Loading состояние во время отправки</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">Как это работает?</h2>
          <ol className="list-decimal list-inside space-y-2 ml-2 text-sm">
            <li>При клике на кнопку состояние <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">isOpen</code> меняется на <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">true</code></li>
            <li>Модальное окно рендерится с overlay (затемнение фона)</li>
            <li>Форма обрабатывает ввод данных через состояния <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">useState</code></li>
            <li>При отправке создается <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">FormData</code> и отправляется POST запрос на <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">/api/submit</code></li>
            <li>API Route обрабатывает данные и возвращает JSON ответ</li>
            <li>Результат отображается в модалке с детальной информацией</li>
            <li>Можно очистить форму или закрыть модалку</li>
          </ol>
        </div>

        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 border border-cyan-200 dark:border-cyan-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">POST запрос и API Route</h2>
          <p className="text-sm mb-3">
            При отправке формы данные отправляются POST запросом на серверный API endpoint:
          </p>
          <div className="bg-white dark:bg-gray-800 rounded p-4 mb-3">
            <p className="text-xs font-mono mb-2"><strong>Endpoint:</strong> <code className="bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">/api/submit</code></p>
            <p className="text-xs font-mono mb-2"><strong>Method:</strong> POST</p>
            <p className="text-xs font-mono mb-2"><strong>Content-Type:</strong> multipart/form-data</p>
            <p className="text-xs font-mono"><strong>Location:</strong> src/app/api/submit/route.ts</p>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            API Route автоматически обрабатывает FormData, извлекает текст и файл, 
            симулирует обработку (1 секунда задержки) и возвращает детальную информацию о полученных данных.
          </p>
        </div>

        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">Технические детали</h2>
          <div className="space-y-3 text-sm">
            <div>
              <strong>Стек технологий:</strong>
              <ul className="list-disc list-inside ml-4 mt-1">
                <li>React (useState, useRef)</li>
                <li>TypeScript (типизация пропсов и событий)</li>
                <li>Tailwind CSS (стили)</li>
                <li>Next.js 15 App Router</li>
              </ul>
            </div>
            
            <div>
              <strong>Хуки React:</strong>
              <ul className="list-disc list-inside ml-4 mt-1">
                <li><code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">useState</code> - управление состоянием формы</li>
                <li><code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">useRef</code> - доступ к input файла</li>
              </ul>
            </div>

            <div>
              <strong>События:</strong>
              <ul className="list-disc list-inside ml-4 mt-1">
                <li><code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">onSubmit</code> - отправка формы</li>
                <li><code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">onChange</code> - изменение значений</li>
                <li><code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">onClick</code> - клики и закрытие</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            Открыть модальное окно
          </button>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-block bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            ← Вернуться на главную
          </Link>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

