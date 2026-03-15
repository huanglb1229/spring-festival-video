import { NextRequest, NextResponse } from 'next/server';

const API_KEY = 'd449bfad-9810-4f8b-9577-f1252ee6b6cf';
const API_BASE = 'https://ark.cn-beijing.volces.com/api/v3';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { image, style } = body;

    if (!style) {
      return NextResponse.json(
        { success: false, message: '请选择一个风格' },
        { status: 400 }
      );
    }

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
      return NextResponse.json(
        { success: false, message: `API 请求失败: ${response.status}` },
        { status: response.status }
      );
    }

    let result;
    try {
      result = JSON.parse(responseText);
    } catch {
      return NextResponse.json(
        { success: false, message: 'API 响应格式错误' },
        { status: 500 }
      );
    }

    if (result.data && result.data.length > 0) {
      const imageUrl = result.data[0].url;
      
      return NextResponse.json({
        success: true,
        message: '图片生成成功',
        imageUrl: imageUrl
      });
    }

    return NextResponse.json(
      { success: false, message: '图片生成失败，请重试' },
      { status: 500 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '未知错误';
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  }
}
