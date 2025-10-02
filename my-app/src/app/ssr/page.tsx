import Link from 'next/link';
import styles from './ssr.module.css';

export const dynamic = 'force-dynamic';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default async function SSRPage() {
  const requestTime = new Date().toISOString();
  const randomNumber = Math.floor(Math.random() * 1000);
  
  const randomPostId = Math.floor(Math.random() * 100) + 1;
  let post: Post | null = null;
  let error = null;

  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${randomPostId}`, {
      cache: 'no-store',
    });
    post = await response.json();
  } catch (e) {
    error = 'Ошибка загрузки данных';
    console.error(e);
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.methodBadge}>
          Стилизация: CSS Modules
        </div>
        <h1 className={styles.title}>
          SSR - Server-Side Rendering
        </h1>
        
        <div className={styles.infoCard}>
          <h2 className={styles.cardTitle}>
           Что такое SSR?
          </h2>
          <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
            Server-Side Rendering - это метод рендеринга, при котором HTML генерируется 
            на сервере при каждом запросе. Это гарантирует, что пользователи всегда 
            получают самую актуальную информацию.
          </p>
          
          <div>
            <h3 style={{ fontWeight: 600, fontSize: '1.125rem', marginBottom: '0.5rem' }}>
              Преимущества:
            </h3>
            <ul className={styles.advantagesList}>
              <li>Всегда актуальные данные</li>
              <li>Отличное SEO</li>
              <li>Безопасность (логика на сервере)</li>
              <li>Персонализация контента</li>
            </ul>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">Информация о запросе</h2>
          <div className="space-y-2">
            <p className="font-mono text-sm">
              <span className="font-semibold">Время запроса:</span> {requestTime}
            </p>
            <p className="font-mono text-sm">
              <span className="font-semibold">Случайное число:</span> {randomNumber}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
              Обновите страницу (F5) - эти значения изменятся, потому что 
              страница рендерится на сервере при каждом запросе!
            </p>
          </div>
        </div>

        <div className={styles.postCard}>
          <h2 className={styles.cardTitle}>
            Данные из API (JSONPlaceholder)
          </h2>
          {error ? (
            <p style={{ color: '#dc2626' }}>{error}</p>
          ) : post ? (
            <div>
              <span className={styles.postId}>Post ID: {post.id}</span>
              <h3 className={styles.postTitle}>
                {post.title}
              </h3>
              <p className={styles.postBody}>
                {post.body}
              </p>
              <div className="text-xs text-gray-600 dark:text-gray-400 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded">
                Этот пост загружен с API при запросе страницы на сервере. 
                Обновите страницу - увидите другой пост!
              </div>
              <div className="text-xs font-mono bg-gray-100 dark:bg-gray-900 p-3 rounded">
                <strong>Код:</strong><br/>
                fetch(&apos;https://jsonplaceholder.typicode.com/posts/{`${randomPostId}`}&apos;, &#123;<br/>
                &nbsp;&nbsp;cache: &apos;no-store&apos; // Не кешируем<br/>
                &#125;)
              </div>
            </div>
          ) : (
            <p>Загрузка...</p>
          )}
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">Когда использовать SSR?</h2>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>Страницы с часто обновляемыми данными</li>
            <li>Персонализированный контент для пользователей</li>
            <li>Страницы, требующие аутентификации</li>
            <li>Дашборды с реалтайм данными</li>
            <li>Контент, зависящий от cookies или headers</li>
          </ul>
        </div>

        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-3">Важно помнить</h2>
          <ul className="list-disc list-inside space-y-2 ml-2">
            <li>Медленнее, чем SSG (каждый запрос = новый рендер)</li>
            <li>Требует больше серверных ресурсов</li>
            <li>Время ответа зависит от нагрузки на сервер</li>
          </ul>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3">Документация</h2>
          <p className="text-sm mb-3">
            Эта страница использует <strong>App Router</strong> - современный подход Next.js:
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <a 
                href="https://nextjs.org/docs/app/building-your-application/rendering/server-components#dynamic-rendering" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Dynamic Rendering в App Router
              </a>
            </li>
            <li>
              <a 
                href="https://nextjs.org/docs/app/building-your-application/rendering/server-components" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Server Components (общая информация)
              </a>
            </li>
            <li>
              <a 
                href="https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Опция dynamic = &apos;force-dynamic&apos;
              </a>
            </li>
            <li className="pt-2 border-t dark:border-gray-600">
              <a 
                href="https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-600 dark:text-orange-400 hover:underline"
              >
               getServerSideProps (старый Pages Router)
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.centerText}>
          <Link href="/" className={styles.backButton}>
            ← Вернуться на главную
          </Link>
        </div>
      </div>
    </div>
  );
}
 