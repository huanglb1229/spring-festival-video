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
  
  console.log('发送请求到:', url);
  console.log('请求参数:', JSON.stringify(payload, null, 2));
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  
  console.log('响应状态码:', response.status);
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('API 错误响应:', errorText);
    throw new Error(`API 请求失败: ${response.status} - ${errorText}`);
  }
  
  const result = await response.json();
  console.log('API 响应:', result);
  
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
  
  return response.json();
}

async function waitForTaskCompletion(taskId: string, maxWait = 120, checkInterval = 10) {
  const startTime = Date.now();
  
  while (Date.now() - startTime < maxWait * 1000) {
    const status = await getTaskStatus(taskId);
    console.log('任务状态:', status.status);
    
    if (status.status === 'succeeded') {
      return status;
    } else if (status.status === 'failed') {
      throw new Error('视频生成失败: ' + JSON.stringify(status));
    }
    
    await new Promise(resolve => setTimeout(resolve, checkInterval * 1000));
  }
  
  throw new Error('等待超时，请稍后重试');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { image, style } = body;

    console.log('收到视频生成请求:', { 
      hasImage: !!image, 
      styleName: style.name,
      dialogue: style.dialogue
    });

    const dialogueText = style.dialogue.join('，说：');
    const fullPrompt = `${style.prompt}，说：${dialogueText}`;
    
    console.log('构建的提示词:', fullPrompt);
    console.log('使用的图片URL:', image ? '已提供' : '未提供');
    
    const taskId = await createVideoTask(fullPrompt, image);
    
    console.log('任务创建成功:', taskId);
    
    const result = await waitForTaskCompletion(taskId);
    
    if (result.status === 'succeeded') {
      const videoUrl = result.content?.video_url || result.result?.video_url;
      
      console.log('视频生成成功，URL:', videoUrl);
      
      return NextResponse.json({
        success: true,
        message: '视频生成成功',
        videoUrl: videoUrl || 'https://www.w3schools.com/html/mov_bbb.mp4'
      });
    }
    
    throw new Error('视频生成失败');
  } catch (error) {
    console.error('视频生成失败:', error);
    const errorMessage = error instanceof Error ? error.message : '未知错误';
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}
