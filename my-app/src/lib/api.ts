import { API_ENDPOINTS } from '@/config/constants';
import { Photo, Post, Todo, User } from '@/types';


async function fetchApi<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
}

export async function getRandomPost(): Promise<Post> {
  const randomId = Math.floor(Math.random() * 100) + 1;
  return fetchApi<Post>(
    `${API_ENDPOINTS.JSONPLACEHOLDER.POSTS}/${randomId}`,
    { cache: 'no-store' }
  );
}

export async function getUsers(): Promise<User[]> {
  return fetchApi<User[]>(API_ENDPOINTS.JSONPLACEHOLDER.USERS);
}

export async function getTodos(limit = 5): Promise<Todo[]> {
  return fetchApi<Todo[]>(
    `${API_ENDPOINTS.JSONPLACEHOLDER.TODOS}?_limit=${limit}`,
    { next: { revalidate: 10 } }
  );
}

export async function getPhotos(limit = 6): Promise<Photo[]> {
  return fetchApi<Photo[]>(
    `${API_ENDPOINTS.JSONPLACEHOLDER.PHOTOS}?_limit=${limit}`
  );
}

export async function submitFormData(formData: FormData): Promise<Response> {
  return fetch(API_ENDPOINTS.SUBMIT, {
    method: 'POST',
    body: formData,
  });
}

