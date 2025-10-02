'use client';

import { useState, useRef, ChangeEvent, FormEvent } from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type SubmitResponse = {
  success: boolean;
  message: string;
  receivedData?: {
    text: string;
    fileName: string;
    fileSize: string;
    fileType: string;
    timestamp: string;
  };
  error?: string;
};

export default function Modal({ isOpen, onClose }: ModalProps) {
  const [textInput, setTextInput] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');
  const [submittedData, setSubmittedData] = useState<SubmitResponse | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmittedData(null);
    
    try {
      const formData = new FormData();
      formData.append('text', textInput);
      if (selectedFile) {
        formData.append('file', selectedFile);
      }

      console.log('Отправка POST запроса на сервер...');

      const response = await fetch('/api/submit', {
        method: 'POST',
        body: formData,
      });

      const data: SubmitResponse = await response.json();
      
      console.log('Ответ от сервера:', data);
      
      setSubmittedData(data);
      
    } catch (error) {
      console.error('Ошибка отправки:', error);
      setSubmittedData({
        success: false,
        message: 'Ошибка соединения с сервером',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setTextInput('');
    setSelectedFile(null);
    setFileName('');
    setSubmittedData(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 animate-[modalSlideIn_0.3s_ease-out]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Форма с данными
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            aria-label="Закрыть"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="textInput" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Текстовое поле
            </label>
            <input
              id="textInput"
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Введите текст..."
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all"
              required
            />
          </div>

          <div>
            <label htmlFor="fileInput" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Загрузка файла
            </label>
            <div className="relative">
              <input
                id="fileInput"
                ref={fileInputRef}
                type="file"
                onChange={handleFileChange}
                className="hidden"
                accept="image/*,.pdf,.doc,.docx,.txt"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors text-left"
              >
                {fileName ? (
                  <span className="flex items-center text-gray-700 dark:text-gray-300">
                    <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {fileName}
                  </span>
                ) : (
                  <span className="text-gray-500 dark:text-gray-400">
                    Нажмите для выбора файла...
                  </span>
                )}
              </button>
            </div>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Поддерживаются: изображения, PDF, DOC, TXT
            </p>
          </div>

          {submittedData && (
            <div className={`${
              submittedData.success 
                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
                : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
            } border rounded-lg p-4`}>
              <h3 className={`font-semibold mb-2 ${
                submittedData.success 
                  ? 'text-green-800 dark:text-green-400' 
                  : 'text-red-800 dark:text-red-400'
              }`}>
                {submittedData.success ? 'Успешно!' : 'Ошибка'}
              </h3>
              <p className="text-sm mb-2 text-gray-700 dark:text-gray-300">
                {submittedData.message}
              </p>
              {submittedData.receivedData && (
                <div className="text-sm space-y-1 bg-white dark:bg-gray-800 p-3 rounded mt-3">
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Текст:</strong> {submittedData.receivedData.text}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Файл:</strong> {submittedData.receivedData.fileName}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Размер:</strong> {submittedData.receivedData.fileSize}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Тип:</strong> {submittedData.receivedData.fileType}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Время: {new Date(submittedData.receivedData.timestamp).toLocaleString('ru-RU')}
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Отправка...
                </>
              ) : (
                'Отправить'
              )}
            </button>
            <button
              type="button"
              onClick={handleReset}
              disabled={isSubmitting}
              className="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 dark:text-gray-200 font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              Очистить
            </button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Данные отправляются POST-запросом на <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">/api/submit</code>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}

