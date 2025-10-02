# Архитектура проекта

## Структура проекта

```
next-test-app/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx           # Корневой layout
│   │   ├── page.tsx             # Главная страница
│   │   ├── globals.css          # Глобальные стили
│   │   │
│   │   ├── api/                 # API Routes
│   │   │   └── submit/
│   │   │       └── route.ts     # POST endpoint для формы
│   │   │
│   │   ├── ssg/                 # Static Site Generation
│   │   │   └── page.tsx
│   │   ├── ssr/                 # Server-Side Rendering
│   │   │   └── page.tsx
│   │   ├── isr/                 # Incremental Static Regeneration
│   │   │   └── page.tsx
│   │   ├── csr/                 # Client-Side Rendering
│   │   │   └── page.tsx
│   │   │
│   │   ├── modal-demo/          # Демонстрация модального окна
│   │   │   └── page.tsx
│   │   └── websocket-demo/      # Демонстрация WebSocket
│   │       └── page.tsx
│   │
│   ├── components/              # Переиспользуемые компоненты
│   │   ├── Modal.tsx           # Модальное окно с формой
│   │   └── ModalTrigger.tsx    # Обертка для модалки
│   │
│   ├── hooks/                   # Кастомные React хуки
│   │   ├── useModal.ts         # Управление модальным окном
│   │   └── useWebSocket.ts     # Работа с WebSocket
│   │
│   ├── lib/                     # Бизнес-логика и утилиты
│   │   ├── api.ts              # API клиент (fetch обертки)
│   │   └── utils.ts            # Утилитарные функции
│   │
│   ├── types/                   # TypeScript типы
│   │   ├── index.ts            # Общие типы (Post, User, Todo, Photo)
│   │   ├── modal.ts            # Типы для модального окна
│   │   └── websocket.ts        # Типы для WebSocket
│   │
│   └── config/                  # Конфигурация
│       └── constants.ts        # Константы приложения
│
├── public/                      # Статические файлы
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
└── ARCHITECTURE.md             # Этот файл

```

## Архитектурные принципы

### 1. **Separation of Concerns (Разделение ответственности)**
- **app/**: Только роутинг и страницы
- **components/**: Переиспользуемые UI компоненты
- **lib/**: Бизнес-логика и утилиты
- **hooks/**: Переиспользуемая логика состояния
- **types/**: Типизация данных
- **config/**: Конфигурация и константы

### 2. **DRY (Don't Repeat Yourself)**
- API вызовы вынесены в `lib/api.ts`
- Утилиты в `lib/utils.ts`
- Типы переиспользуются через `types/`
- Хуки абстрагируют сложную логику

### 3. **Type Safety (Типобезопасность)**
- Все типы в отдельных файлах
- TypeScript strict mode
- Типизация API ответов
- Типизация props и состояний

### 4. **Feature-Based Structure**
- Логическое группирование по фичам
- Легко масштабируется
- Простая навигация по проекту

### 5. **Clean Code**
- Понятные имена переменных и функций
- Комментарии к сложным участкам
- Консистентный код-стайл
- JSDoc для важных функций

## Потоки данных

### API Запросы
```
Page Component → lib/api.ts → External API → Response
                     ↓
                  types/index.ts (типизация)
```

### Модальное окно
```
User Action → ModalTrigger → useModal hook → Modal Component
                                                    ↓
                                            lib/api.ts → API Route
```

### WebSocket
```
Component → useWebSocket hook → WebSocket API → Server
                ↓
         types/websocket.ts
```

## Слои приложения

### Presentation Layer (Представление)
- `app/*/page.tsx` - страницы
- `components/` - UI компоненты

### Business Logic Layer (Бизнес-логика)
- `hooks/` - логика состояния
- `lib/` - утилиты и API клиенты

### Data Layer (Данные)
- `types/` - структуры данных
- `config/` - конфигурация

### API Layer (Сервер)
- `app/api/` - серверные endpoints

## Технологический стек

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **API**: REST + WebSocket
- **Validation**: HTML5 + TypeScript

## Масштабируемость

Архитектура готова к:
- Добавлению новых страниц
- Интеграции новых API
- Расширению компонентов
- Добавлению новых фич

## Документация

- Код задокументирован через JSDoc
- Типы самодокументируются
- README для инструкций
- ARCHITECTURE.md для понимания структуры

