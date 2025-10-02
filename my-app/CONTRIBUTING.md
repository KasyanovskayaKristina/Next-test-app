# Contributing Guide

Спасибо за интерес к проекту! Этот документ описывает процесс внесения изменений.

## 📋 Процесс разработки

### 1. Setup

```bash
git clone <repository-url>
cd next-test-app

npm install

# Запуск dev сервера
npm run dev
```

### 2. Создание ветки

```bash
# Формат: feature/название или fix/название
git checkout -b feature/new-awesome-feature
```

### 3. Разработка

- Следуйте существующему code style
- Используйте TypeScript типизацию
- Пишите понятные комментарии
- Следуйте архитектуре проекта (см. ARCHITECTURE.md)

### 4. Коммиты

Используйте conventional commits:

```bash
# Формат: type: message

# Примеры:
git commit -m "feat: add new endpoint for users"
git commit -m "fix: resolve closing issue"
git commit -m "docs: update installation steps"
git commit -m "style: improve hover animation"
git commit -m "refactor: optimize formatDate function"
git commit -m "perf: add lazy loading"
git commit -m "test: add useModal tests"
```

**Types:**
- `feat`: Новая функциональность
- `fix`: Исправление бага
- `docs`: Документация
- `style`: Форматирование, стили
- `refactor`: Рефакторинг кода
- `perf`: Улучшение производительности
- `test`: Добавление тестов
- `chore`: Рутинные задачи

### 5. Code Quality

```bash
# Проверка линтинга
npm run lint

# Сборка проекта
npm run build
```

### 6. Pull Request

- Заполните шаблон PR
- Опишите изменения
- Добавьте скриншоты для UI изменений
- Убедитесь, что все проверки прошли

## 📐 Code Style

### TypeScript

```typescript
// Good
interface User {
  id: number;
  name: string;
}

const getUser = async (id: number): Promise<User> => {
  // implementation
};

// Bad
const getUser = async (id: any) => {
  // implementation
};
```

### React Components

```tsx
// Good
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export function Button({ label, onClick, disabled = false }: ButtonProps) {
  return <button onClick={onClick} disabled={disabled}>{label}</button>;
}

// Bad
export function Button(props: any) {
  return <button onClick={props.onClick}>{props.label}</button>;
}
```

### Hooks

```typescript
// Good
export function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = useCallback(() => {
    setCount(c => c + 1);
  }, []);
  
  return { count, increment };
}
```

### Naming Conventions

- **Files**: `camelCase.tsx`, `PascalCase.tsx` для компонентов
- **Components**: `PascalCase`
- **Functions**: `camelCase`
- **Constants**: `UPPER_SNAKE_CASE`
- **Types/Interfaces**: `PascalCase`


## Документация

- Обновляйте README.md при изменении функциональности
- Добавляйте JSDoc комментарии для сложных функций
- Обновляйте ARCHITECTURE.md при изменении структуры

## Reporting Bugs

При создании issue укажите:

1. **Описание**: Что произошло?
2. **Ожидаемое поведение**: Что должно было произойти?
3. **Шаги воспроизведения**: Как воспроизвести?
4. **Окружение**: OS, Browser, Node version
5. **Скриншоты**: Если применимо

## Feature Requests

При предложении новой фичи опишите:

1. **Проблема**: Какую проблему решает?
2. **Решение**: Как это должно работать?
3. **Альтернативы**: Рассмотренные варианты
4. **Дополнительный контекст**: Примеры, mockups

## Checklist перед PR

- [ ] Код соответствует style guide
- [ ] Добавлена типизация TypeScript
- [ ] Обновлена документация
- [ ] Проверен линтинг (`npm run lint`)
- [ ] Проект собирается (`npm run build`)
- [ ] Проверена работа в dev режиме
- [ ] Добавлены комментарии для сложной логики
- [ ] Commit messages следуют conventional commits

Спасибо за ваш вклад!

