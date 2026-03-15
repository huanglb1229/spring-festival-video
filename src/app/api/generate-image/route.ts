import { NextRequest, NextResponse } from 'next/server';

const API_KEY = 'd449bfad-9810-4f8b-9577-f1252ee6b6cf';
const API_BASE = 'https://ark.cn-beijing.volces.com/api/v3';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { image, style } = body;

    console.log('收到图片生成请求:', { 
      hasImage: !!image,
      styleName: style.name,
      prompt: style.prompt
    });

    const url = `${API_BASE}/images/generations`;
    
    const payload = {
      model: 'doubao-seedream-4-0-250828',
      prompt: style.prompt,
      sequential_image_generation: 'disabled',
      response_format: 'url',
      size: '2K',
      stream: false,
      watermark: true
    };

    console.log('图片生成请求参数:', payload);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    console.log('图片生成 API 响应:', result);

    if (result.data && result.data.length > 0) {
      const imageUrl = result.data[0].url;
      
      console.log('图片生成成功，URL:', imageUrl);
      
      return NextResponse.json({
        success: true,
        message: '图片生成成功',
        imageUrl: imageUrl
      });
    }

    throw new Error('图片生成失败');
  } catch (error) {
    console.error('图片生成失败:', error);
    return NextResponse.json(
      { success: false, message: '图片生成失败' },
      { status: 500 }
    );
  }
}
