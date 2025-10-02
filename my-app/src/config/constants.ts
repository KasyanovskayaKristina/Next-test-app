export const API_ENDPOINTS = {
  SUBMIT: '/api/submit',
  JSONPLACEHOLDER: {
    BASE: 'https://jsonplaceholder.typicode.com',
    POSTS: 'https://jsonplaceholder.typicode.com/posts',
    USERS: 'https://jsonplaceholder.typicode.com/users',
    TODOS: 'https://jsonplaceholder.typicode.com/todos',
    PHOTOS: 'https://jsonplaceholder.typicode.com/photos',
  },
} as const;

export const WEBSOCKET_CONFIG = {
  ECHO_SERVER: 'wss://echo.websocket.org/',
  RECONNECT_ATTEMPTS: 3,
  RECONNECT_INTERVAL: 3000,
} as const;

export const REVALIDATION = {
  ISR_INTERVAL: 10,
} as const;

export const FILE_UPLOAD = {
  ACCEPTED_TYPES: 'image/*,.pdf,.doc,.docx,.txt',
  MAX_SIZE: 5 * 1024 * 1024,
} as const;

export const ROUTES = {
  HOME: '/',
  SSG: '/ssg',
  SSR: '/ssr',
  ISR: '/isr',
  CSR: '/csr',
  MODAL_DEMO: '/modal-demo',
  WEBSOCKET_DEMO: '/websocket-demo',
} as const;

