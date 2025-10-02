import Link from 'next/link';

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export default async function ISRPage() {
  const generationTime = new Date().toISOString();
  const randomQuote = [
    "Делай то, что важно, а не то, что легко.",
    "Успех - это сумма маленьких усилий, повторяемых изо дня в день.",
    "Единственный способ сделать великую работу - любить то, что ты делаешь.",
    "Не бойся отказаться от хорошего ради великого.",
    "Мотивация - это то, что заставляет тебя начать. Привычка - это то, что заставляет продолжать."
  ][Math.floor(Math.random() * 5)];

  let todos: Todo[] = [];
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5', {
      next: { revalidate: 10 }
    });
    todos = await response.json();
  } catch (error) {
    console.error('Ошибка загрузки задач:', error);
  }
  
  return (
    <div className="min-h-screen p-8 font-sans bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto">
        <div className="inline-block bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-lg">
          Стилизация: Tailwind + Inline Styles
        </div>
        <h1 
          className="text-4xl font-bold mb-4 text-center"
          style={{
            background: 'linear-gradient(to right, #9333ea, #ec4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
        >
          ISR - Incremental Static Regeneration
        </h1>
        
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-3">Что такое ISR?</h2>
          <p className="mb-4">
            Incremental Static Regeneration - это гибридный подход, который сочетает 
            преимущества SSG и SSR. Страницы генерируются статически, но могут 
            обновляться в фоновом режиме через заданные интервалы времени.
          </p>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Преимущества:</h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Быстрая загрузка как у SSG</li>
              <li>Автоматическое обновление контента</li>
              <li>Эффективное использование ресурсов</li>
              <li>Масштабируемость</li>
            </ul>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">Информация о странице</h2>
          <div className="space-y-2">
            <p className="font-mono text-sm">
              <span className="font-semibold">Время генерации:</span> {generationTime}
            </p>
            <p className="font-mono text-sm">
              <span className="font-semibold">Интервал обновления:</span> 10 секунд
            </p>
            <div className="mt-4 p-4 bg-purple-100 dark:bg-purple-900/30 rounded">
              <p className="text-sm italic">{randomQuote}</p>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
              Эта страница обновляется каждые 10 секунд. Подождите 10+ секунд, 
              затем обновите страницу - вы можете увидеть новые данные!
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20 border border-teal-200 dark:border-teal-800 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">Данные из API (JSONPlaceholder)</h2>
          {todos.length > 0 ? (
            <div className="space-y-3">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Список задач (обновляется каждые 10 секунд):
              </p>
              <div className="space-y-2">
                {todos.map((todo) => (
                  <div key={todo.id} className="bg-white dark:bg-gray-800 rounded p-3 border border-teal-100 dark:border-teal-900 flex items-start gap-3">
                    <div className={`w-5 h-5 rounded flex-shrink-0 flex items-center justify-center ${
                      todo.completed 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}>
                      {todo.completed && '✓'}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm ${
                        todo.completed 
                          ? 'line-through text-gray-500 dark:text-gray-500' 
                          : 'text-gray-800 dark:text-gray-200'
                      }`}>
                        {todo.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">ID: {todo.id}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded">
                Эти данные обновляются каждые 10 секунд в фоне. Первый запрос после 
                истечения времени триггерит регенерацию!
              </div>
              <div className="text-xs font-mono bg-gray-100 dark:bg-gray-900 p-3 rounded">
                <strong>Код:</strong><br/>
                fetch(&apos;https://jsonplaceholder.typicode.com/todos&apos;, &#123;<br/>
                &nbsp;&nbsp;next: &#123; revalidate: 10 &#125;<br/>
                &#125;)
              </div>
            </div>
          ) : (
            <p>Нет данных</p>
          )}
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">Как это работает?</h2>
          <ol className="list-decimal list-inside space-y-2 ml-2">
            <li>Первая версия страницы генерируется во время билда</li>
            <li>При запросе пользователь получает кешированную версию (быстро!)</li>
            <li>После истечения времени revalidate следующий запрос триггерит регенерацию</li>
            <li>Страница обновляется в фоне, пользователи получают старую версию</li>
            <li>После завершения регенерации новая версия становится доступной</li>
          </ol>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3">Когда использовать ISR?</h2>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>E-commerce каталоги (цены обновляются периодически)</li>
            <li>Блоги с новыми статьями</li>
            <li>Страницы с API данными, которые меняются не часто</li>
            <li>Новостные сайты</li>
            <li>Социальные сети (лента постов)</li>
          </ul>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            ← Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  );
}
