import ModalTrigger from "@/components/ModalTrigger";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-6 text-center">
          Next.js Типы Рендеринга
        </h1>

         <div className="flex flex-col items-center gap-3 mb-8">
          <ModalTrigger />
          <Link 
            href="/modal-demo"
            className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
          >
            Узнать больше о модальном окне →
          </Link>
        </div>
        
        <p className="text-center text-lg mb-4 text-gray-600 dark:text-gray-400">
          Изучите различные методы рендеринга страниц в Next.js
        </p>
        
        <div className="text-center mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Все страницы демонстрируют работу с API!</strong>
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Используется <a href="https://jsonplaceholder.typicode.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">JSONPlaceholder</a> - бесплатный REST API для тестирования
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/ssg">
            <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6 hover:shadow-xl transition-all hover:scale-105 cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                  SSG
                </h2>
              </div>
              <h3 className="font-semibold mb-2">Static Site Generation</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Страница генерируется во время сборки (build time). 
                Загружает список пользователей из API.
              </p>
              <div className="mt-4 text-blue-600 dark:text-blue-400 font-semibold">
                Перейти →
              </div>
            </div>
          </Link>

          <Link href="/ssr">
            <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl p-6 hover:shadow-xl transition-all hover:scale-105 cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-2xl font-bold text-green-700 dark:text-green-400">
                  SSR
                </h2>
              </div>
              <h3 className="font-semibold mb-2">Server-Side Rendering</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Страница рендерится на сервере при каждом запросе. 
                Показывает случайный пост из API.
              </p>
              <div className="mt-4 text-green-600 dark:text-green-400 font-semibold">
                Перейти →
              </div>
            </div>
          </Link>

          <Link href="/isr">
            <div className="bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-200 dark:border-purple-800 rounded-xl p-6 hover:shadow-xl transition-all hover:scale-105 cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-400">
                  ISR
                </h2>
              </div>
              <h3 className="font-semibold mb-2">Incremental Static Regeneration</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Статическая генерация с периодическим обновлением каждые 10 секунд. 
                Показывает задачи из API.
              </p>
              <div className="mt-4 text-purple-600 dark:text-purple-400 font-semibold">
                Перейти →
              </div>
            </div>
          </Link>

          <Link href="/csr">
            <div className="bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-200 dark:border-orange-800 rounded-xl p-6 hover:shadow-xl transition-all hover:scale-105 cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-2xl font-bold text-orange-700 dark:text-orange-400">
                  CSR
                </h2>
              </div>
              <h3 className="font-semibold mb-2">Client-Side Rendering</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Рендеринг происходит на клиенте (в браузере). 
                Загружает фото из API по клику.
              </p>
              <div className="mt-4 text-orange-600 dark:text-orange-400 font-semibold">
                Перейти →
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-12 bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
          <h2 className="text-2xl font-bold mb-4">Сравнение методов</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b dark:border-gray-700">
                  <th className="text-left p-2">Метод</th>
                  <th className="text-left p-2">Скорость</th>
                  <th className="text-left p-2">SEO</th>
                  <th className="text-left p-2">Актуальность</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b dark:border-gray-700">
                  <td className="p-2 font-semibold">SSG</td>
                  <td className="p-2">Отлично</td>
                  <td className="p-2">Только при билде</td>
                </tr>
                <tr className="border-b dark:border-gray-700">
                  <td className="p-2 font-semibold">SSR</td>
                  <td className="p-2">Отлично</td>
                  <td className="p-2">Всегда актуально</td>
                </tr>
                <tr className="border-b dark:border-gray-700">
                  <td className="p-2 font-semibold">ISR</td>
                  <td className="p-2">Отлично</td>
                  <td className="p-2">Периодическое обновление</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">CSR</td>
                  <td className="p-2">Сложнее</td>
                  <td className="p-2">В реальном времени</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}