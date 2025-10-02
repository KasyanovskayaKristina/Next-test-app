import Link from 'next/link';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
};

export default async function SSGPage() {
  const buildTime = new Date().toISOString();
  
  let users: User[] = [];
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    users = await response.json();
  } catch (error) {
    console.error('Ошибка загрузки пользователей:', error);
  }
  
  return (
    <div className="min-h-screen p-8 font-sans bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto">
        <div className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4 shadow-lg">
          Стилизация: Tailwind CSS
        </div>
        <h1 className="text-4xl font-bold mb-4 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          SSG - Static Site Generation
        </h1>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-3">Что такое SSG?</h2>
          <p className="mb-4">
            Static Site Generation - это метод рендеринга, при котором HTML страницы 
            генерируются во время сборки (build time). Эти страницы затем кешируются 
            и используются повторно для каждого запроса.
          </p>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Преимущества:</h3>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Очень быстрая загрузка страниц</li>
              <li>Отличное SEO</li>
              <li>Низкая стоимость хостинга</li>
              <li>Высокая безопасность</li>
            </ul>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">Информация о странице</h2>
          <div className="space-y-2">
            <p className="font-mono text-sm">
              <span className="font-semibold">Время сборки:</span> {buildTime}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
              Это время не будет меняться при перезагрузке страницы, так как 
              страница была сгенерирована во время билда.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">Данные из API (JSONPlaceholder)</h2>
          {users.length > 0 ? (
            <div className="space-y-3">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Список пользователей загружен во время сборки:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                {users.map((user) => (
                  <div key={user.id} className="bg-white dark:bg-gray-800 rounded p-3 border border-indigo-100 dark:border-indigo-900">
                    <h3 className="font-bold text-indigo-700 dark:text-indigo-400">
                      {user.name}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {user.username}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {user.email}
                    </p>
                  </div>
                ))}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded">
                Эти данные были загружены один раз во время билда и закешированы. 
                Они не изменятся при обновлении страницы!
              </div>
              <div className="text-xs font-mono bg-gray-100 dark:bg-gray-900 p-3 rounded">
                <strong>Код:</strong><br/>
                fetch(&apos;https://jsonplaceholder.typicode.com/users&apos;)
              </div>
            </div>
          ) : (
            <p>Нет данных</p>
          )}
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3">Когда использовать SSG?</h2>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>Страницы с контентом, который редко меняется</li>
            <li>Блоги и статьи</li>
            <li>Документация</li>
            <li>Маркетинговые страницы</li>
            <li>Портфолио и лендинги</li>
          </ul>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            ← Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  );
}
