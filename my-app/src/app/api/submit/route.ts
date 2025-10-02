import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const textInput = formData.get('text') as string;
    const file = formData.get('file') as File | null;

    const responseData = {
      success: true,
      message: 'Данные успешно получены на сервере!',
      receivedData: {
        text: textInput,
        fileName: file ? file.name : 'Нет файла',
        fileSize: file ? `${(file.size / 1024).toFixed(2)} KB` : 'N/A',
        fileType: file ? file.type : 'N/A',
        timestamp: new Date().toISOString(),
      }
    };

    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('POST запрос получен:', responseData);

    return NextResponse.json(responseData, { status: 200 });
    
  } catch (error) {
    console.error('Ошибка обработки POST запроса:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Ошибка обработки данных на сервере',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'API endpoint работает! Используйте POST для отправки данных.',
    endpoint: '/api/submit',
    methods: ['POST']
  });
}

