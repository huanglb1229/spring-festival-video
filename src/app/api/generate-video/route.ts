import { NextRequest, NextResponse } from 'next/server';

const API_KEY = 'd449bfad-9810-4f8b-9577-f1252ee6b6cf';
const API_BASE = 'https://ark.cn-beijing.volces.com/api/v3/contents/generations';

async function createVideoTask(prompt: string, imageUrl?: string) {
  const url = `${API_BASE}/tasks`;
  
  const content: any[] = [
    {
      type: 'text',
      text: `${prompt} --duration 5 --camerafixed false --watermark true`
    }
  ];
  
  if (imageUrl) {
    content.push({
      type: 'image_url',
      image_url: {
        url: imageUrl
      }
    });
  }
  
  const payload = {
    model: 'doubao-seedance-1-5-pro-251215',
    content
  };
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  
  const responseText = await response.text();
  
  if (!response.ok) {
    throw new Error(`API 请求失败: ${response.status}`);
  }
  
  let result;
  try {
    result = JSON.parse(responseText);
  } catch {
    throw new Error('API 响应格式错误');
  }
  
  if (!result.id) {
    throw new Error('API 响应中没有找到任务 ID');
  }
  
  return result.id;
}

async function getTaskStatus(taskId: string) {
  const url = `${API_BASE}/tasks/${taskId}`;
  
  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`
    }
  });
  
  const responseText = await response.text();
  
  try {
    return JSON.parse(responseText);
  } catch {
    throw new Error('API 响应格式错误');
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { image, style, taskId, action } = body;

    if (action === 'check-status' && taskId) {
      const status = await getTaskStatus(taskId);
      
      return NextResponse.json({
        success: true,
        status: status.status,
        videoUrl: status.content?.video_url || status.result?.video_url
      });
    }

    const dialogueText = style?.dialogue?.join('，说：') || '';
    const fullPrompt = `${style?.prompt || ''}，说：${dialogueText}`;
    
    const newTaskId = await createVideoTask(fullPrompt, image);
    
    return NextResponse.json({
      success: true,
      message: '任务已创建，请等待生成',
      taskId: newTaskId
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '未知错误';
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}
