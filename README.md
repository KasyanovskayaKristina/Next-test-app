# Next.js Test Application

Демонстрационное приложение, показывающее различные методы рендеринга в Next.js, работу с API, модальными окнами и WebSocket.

## Быстрый старт

```bash
# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev

# Открыть в браузере
http://localhost:3000
```

## Функциональность

### 1. Типы рендеринга (4 страницы)

#### SSG (Static Site Generation) - `/ssg`
- Генерация страницы во время билда
- Загружает список пользователей из API
- Максимальная производительность

#### SSR (Server-Side Rendering) - `/ssr`
- Рендеринг на сервере при каждом запросе
- Показывает случайный пост из API
- Всегда актуальные данные

#### ISR (Incremental Static Regeneration) - `/isr`
- Статическая генерация с обновлением каждые 10 секунд
- Отображает список задач
- Баланс между скоростью и актуальностью

#### CSR (Client-Side Rendering) - `/csr`
- Рендеринг на клиенте
- Интерактивная загрузка фото по клику
- Счетчик и таймер в реальном времени

### 2. Модальное окно с формой - `/modal-demo`
- Текстовый инпут (type="text")
- Файловый инпут (type="file")
- POST запрос на `/api/submit`
- Отображение ответа сервера
- Loading состояние

### 3. WebSocket демонстрация - `/websocket-demo`
- Подключение к WebSocket серверу
- Отправка и получение сообщений
- Управление состоянием соединения
- Обработка всех WebSocket событий

## Архитектура

```
src/
├── app/              # Next.js App Router (страницы и API)
├── components/       # Переиспользуемые компоненты
├── hooks/            # Кастомные React хуки
├── lib/              # Бизнес-логика и утилиты
├── types/            # TypeScript типы
└── config/           # Константы и конфигурация
```

Подробнее: [ARCHITECTURE.md](./ARCHITECTURE.md)

## Технологии

- **Next.js 15** - React фреймворк с App Router
- **TypeScript** - Типизация
- **Tailwind CSS** - Utility-first CSS framework
- **CSS Modules** - Локально изолированные стили
- **CSS Files** - Обычный CSS
- **Inline Styles** - React inline стили
- **styled-jsx** - CSS-in-JS (встроенный в Next.js)
- **React 19** - UI библиотека
- **WebSocket API** - Двусторонняя связь
- **Fetch API** - HTTP запросы

## Демонстрация стилизации

Каждая страница использует **свой подход к стилизации**:

| Страница | Подход к стилизации | Описание |
|----------|---------------------|----------|
| **SSG** (`/ssg`) | Tailwind CSS | Utility-first подход, быстрая разработка |
| **SSR** (`/ssr`) | CSS Modules | Изолированные стили с хешированными классами |
| **ISR** (`/isr`) | Tailwind + Inline | Комбинированный подход для динамических стилей |
| **CSR** (`/csr`) | Обычный CSS | Классический CSS файл с animations |
| **Modal** | styled-jsx | CSS-in-JS встроенный в Next.js |

Подробнее: [STYLING.md](./STYLING.md)

## Команды

```bash
# Разработка
npm run dev

# Сборка для продакшена
npm build

# Запуск продакшен сервера
npm run start

# Линтинг
npm run lint
```

## API Endpoints

### POST `/api/submit`
Обрабатывает данные из модальной формы.

**Request:**
- Content-Type: multipart/form-data
- Body: FormData с полями text и file

**Response:**
```json
{
  "success": true,
  "message": "Данные успешно получены на сервере!",
  "receivedData": {
    "text": "...",
    "fileName": "...",
    "fileSize": "...",
    "fileType": "...",
    "timestamp": "..."
  }
}
```

### External APIs
- **JSONPlaceholder** - https://jsonplaceholder.typicode.com
  - Бесплатный REST API для тестирования
  - Используется для демонстрации работы с API
  
- **Echo WebSocket** - wss://echo.websocket.org/
  - Публичный WebSocket сервер
  - Возвращает все полученные сообщения

## Основные файлы

- `src/app/page.tsx` - Главная страница
- `src/components/Modal.tsx` - Модальное окно
- `src/hooks/useWebSocket.ts` - Хук для WebSocket
- `src/lib/api.ts` - API клиент
- `src/types/` - TypeScript типы
- `src/config/constants.ts` - Константы

## Особенности UI

- Responsive дизайн
- Dark mode поддержка
- Анимации и transitions
- Loading состояния
- Error handling

## Best Practices

- **Type Safety**: Строгая типизация TypeScript
- **Separation of Concerns**: Разделение ответственности
- **DRY**: Переиспользование кода
- **Clean Code**: Читаемый и поддерживаемый код
- **Error Handling**: Обработка ошибок на всех уровнях
- **Performance**: Оптимизация рендеринга

## Структура роутов

```
/                    - Главная страница
├── /ssg            - Static Site Generation
├── /ssr            - Server-Side Rendering
├── /isr            - Incremental Static Regeneration
├── /csr            - Client-Side Rendering
├── /modal-demo     - Демонстрация модального окна
└── /websocket-demo - Демонстрация WebSocket
```

## Тестирование

Откройте приложение и проверьте:

1. **Главная страница**: Навигация по всем разделам
2. **SSG**: Список пользователей (не меняется при обновлении)
3. **SSR**: Случайный пост (меняется при обновлении)
4. **ISR**: Задачи (обновляются каждые 10 секунд)
5. **CSR**: Интерактивная загрузка фото
6. **Modal**: Форма с отправкой на сервер
7. **WebSocket**: Отправка и получение сообщений

## Автор

Тестовое задание на позицию Frontend Developer

## Лицензия

MIT
