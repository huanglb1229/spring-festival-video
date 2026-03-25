'use client';

import { useState } from 'react';
import { styles, type Style } from '@/data/styles';

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<Style | null>(null);
  const [customDialogue, setCustomDialogue] = useState<string[]>([]);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('图片太大了，请选择小于 10MB 的图片');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
        setGeneratedImage(null);
        setGeneratedVideo(null);
      };
      reader.onerror = () => {
        alert('图片读取失败，请重试');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStyleSelect = (style: Style) => {
    setSelectedStyle(style);
    setCustomDialogue([...style.dialogue]);
    setGeneratedImage(null);
    setGeneratedVideo(null);
  };

  const handleDialogueChange = (index: number, value: string) => {
    const newDialogue = [...customDialogue];
    newDialogue[index] = value;
    setCustomDialogue(newDialogue);
  };

  const addDialogueLine = () => {
    setCustomDialogue([...customDialogue, '']);
  };

  const removeDialogueLine = (index: number) => {
    if (customDialogue.length > 1) {
      const newDialogue = customDialogue.filter((_, i) => i !== index);
      setCustomDialogue(newDialogue);
    }
  };

  const handleGenerateImage = async () => {
    if (!selectedImage || !selectedStyle) {
      alert('请先上传照片并选择风格');
      return;
    }
    
    setIsGeneratingImage(true);
    
    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: selectedImage,
          style: selectedStyle,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setGeneratedImage(data.imageUrl);
      } else {
        throw new Error(data.message || '生成图片失败');
      }
    } catch (error) {
      console.error('生成图片失败:', error);
      const errorMessage = error instanceof Error ? error.message : '生成图片失败，请重试';
      alert(errorMessage);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleGenerateVideo = async () => {
    if (!generatedImage || !selectedStyle) return;
    
    setIsGeneratingVideo(true);
    
    try {
      const styleWithCustomDialogue = {
        ...selectedStyle,
        dialogue: customDialogue.filter(line => line.trim() !== '')
      };
      
      const response = await fetch('/api/generate-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: generatedImage,
          style: styleWithCustomDialogue,
        }),
      });

      const data = await response.json();
      
      if (data.success && data.taskId) {
        console.log('任务已创建，开始轮询:', data.taskId);
        await pollForVideo(data.taskId);
      } else {
        throw new Error(data.message || '创建任务失败');
      }
    } catch (error) {
      console.error('生成视频失败:', error);
      alert('生成视频失败，请重试');
      setIsGeneratingVideo(false);
    }
  };

  const pollForVideo = async (taskId: string) => {
    let attempts = 0;
    const maxAttempts = 60;
    
    while (attempts < maxAttempts) {
      try {
        const response = await fetch('/api/generate-video', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            taskId,
            action: 'check-status'
          }),
        });

        const data = await response.json();
        
        if (data.success) {
          console.log('任务状态:', data.status);
          
          if (data.status === 'succeeded' && data.videoUrl) {
            setGeneratedVideo(data.videoUrl);
            setIsGeneratingVideo(false);
            return;
          } else if (data.status === 'failed') {
            throw new Error('视频生成失败');
          }
        }
        
        attempts++;
        await new Promise(resolve => setTimeout(resolve, 3000));
      } catch (error) {
        console.error('轮询失败:', error);
        attempts++;
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    }
    
    setIsGeneratingVideo(false);
    alert('生成超时，请稍后重试');
  };

  const resetAll = () => {
    setSelectedImage(null);
    setSelectedStyle(null);
    setGeneratedImage(null);
    setGeneratedVideo(null);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900"></div>
      
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="inline-block float-animation">
            <h1 className="text-6xl md:text-7xl font-black mb-4 neon-text">
              春 节 拜 年 视 频 生 成 器
            </h1>
          </div>
          <p className="text-xl text-gray-400 mt-4 tracking-wider">
            上传照片 · 选择风格 · 先生成图片 · 再生成视频
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <div className="bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-800 glow-border">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white">上传你的照片</h2>
            </div>
            
            {!selectedImage ? (
              <label className="flex flex-col items-center justify-center w-full h-80 border-2 border-dashed border-gray-700 rounded-2xl cursor-pointer hover:border-red-500/50 hover:bg-red-500/5 transition-all duration-300 group">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <p className="mb-2 text-lg text-gray-400 font-medium">
                    点击或拖拽照片到这里
                  </p>
                  <p className="text-sm text-gray-600">支持 JPG、PNG、WEBP 格式</p>
                </div>
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
              </label>
            ) : (
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-yellow-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <img src={selectedImage} alt="上传的照片" className="relative w-full h-80 object-cover rounded-2xl border-2 border-gray-700" />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 bg-gray-900/90 backdrop-blur-sm text-white rounded-full p-3 hover:bg-red-600 transition-all duration-300 hover:scale-110"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          <div className="bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-800 glow-border">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white">选择拜年风格</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4 max-h-[450px] overflow-y-auto pr-2">
              {styles.map((style) => (
                <div
                  key={style.id}
                  onClick={() => handleStyleSelect(style)}
                  className={`relative cursor-pointer rounded-2xl overflow-hidden border-2 transition-all duration-300 group ${
                    selectedStyle?.id === style.id
                      ? 'border-red-500 scale-105 shadow-2xl shadow-red-500/20'
                      : 'border-gray-800 hover:border-gray-600 hover:scale-102'
                  }`}
                >
                  <div className="relative overflow-hidden">
                    <img src={style.image} alt={style.name} className="w-full h-36 object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h3 className="font-bold text-white text-sm mb-1">{style.name}</h3>
                      <p className="text-xs text-gray-400">{style.description}</p>
                    </div>
                    {selectedStyle?.id === style.id && (
                      <div className="absolute top-3 right-3 bg-gradient-to-br from-red-500 to-red-700 text-white rounded-full p-1.5 shadow-lg shadow-red-500/50">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414-1.414L8 11.172 4.707 7.879a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {selectedStyle && (
              <div className="mt-6 p-5 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-2xl border border-yellow-500/20">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="font-bold text-yellow-400">拜年台词（可编辑）</h3>
                  </div>
                  <button
                    onClick={addDialogueLine}
                    className="px-3 py-1 bg-green-600 hover:bg-green-500 text-white text-sm font-bold rounded-xl transition-all duration-300 hover:scale-105"
                  >
                    + 添加
                  </button>
                </div>
                <div className="space-y-2">
                  {customDialogue.map((line, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={line}
                        onChange={(e) => handleDialogueChange(index, e.target.value)}
                        placeholder="输入拜年台词..."
                        className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-yellow-500 transition-all duration-300"
                      />
                      <button
                        onClick={() => removeDialogueLine(index)}
                        className="px-3 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl transition-all duration-300 hover:scale-105"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {generatedImage && (
          <div className="mt-8 max-w-4xl mx-auto">
            <div className="bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-800 glow-border">
              <div className="text-center mb-6">
                <div className="inline-block float-animation">
                  <h2 className="text-3xl font-black neon-text mb-2">
                    ✨ 图片生成成功
                  </h2>
                </div>
                <p className="text-gray-400">这是基于您选择的风格生成的图片</p>
              </div>
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/30 to-yellow-500/30 rounded-2xl blur-2xl"></div>
                  <img
                    src={generatedImage}
                    alt="生成的图片"
                    className="relative max-w-full max-h-[400px] rounded-2xl border-2 border-gray-700"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 flex flex-col md:flex-row justify-center gap-6">
          <button
            onClick={handleGenerateImage}
            disabled={!selectedImage || !selectedStyle || isGeneratingImage || isGeneratingVideo}
            className={`relative px-12 py-5 text-2xl font-black rounded-3xl transition-all duration-300 overflow-hidden ${
            !selectedImage || !selectedStyle || isGeneratingImage || isGeneratingVideo
              ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/40 active:scale-95'
          }`}
          >
            {isGeneratingImage ? (
              <span className="flex items-center gap-3">
                <svg className="animate-spin h-7 w-7" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                正在生成图片...
              </span>
            ) : (
              <span className="flex items-center gap-3">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                生成图片
              </span>
            )}
          </button>

          <button
            onClick={handleGenerateVideo}
            disabled={!generatedImage || !selectedStyle || isGeneratingImage || isGeneratingVideo}
            className={`relative px-12 py-5 text-2xl font-black rounded-3xl transition-all duration-300 overflow-hidden ${
            !generatedImage || !selectedStyle || isGeneratingImage || isGeneratingVideo
              ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 text-white hover:scale-105 hover:shadow-2xl hover:shadow-red-500/40 active:scale-95'
          }`}
          >
            {isGeneratingVideo ? (
              <span className="flex items-center gap-3">
                <svg className="animate-spin h-7 w-7" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                正在生成视频...
              </span>
            ) : (
              <span className="flex items-center gap-3">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                生成视频
              </span>
            )}
          </button>
        </div>

        {generatedVideo && (
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-800 glow-border">
              <div className="text-center mb-6">
                <div className="inline-block float-animation">
                  <h2 className="text-3xl font-black neon-text mb-2">
                    🎉 恭喜！视频生成成功
                  </h2>
                </div>
                <p className="text-gray-400">快来下载你的专属拜年视频吧！</p>
              </div>
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/30 to-yellow-500/30 rounded-2xl blur-2xl"></div>
                  <video
                    src={generatedVideo}
                    controls
                    className="relative max-w-full max-h-[500px] rounded-2xl border-2 border-gray-700"
                  />
                </div>
              </div>
              <div className="flex justify-center gap-4">
                <button className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-2xl hover:scale-105 hover:shadow-xl hover:shadow-green-500/40 transition-all duration-300 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  下载视频
                </button>
                <button 
                  onClick={resetAll}
                  className="px-8 py-4 bg-gray-800 text-white font-bold rounded-2xl hover:bg-gray-700 hover:scale-105 transition-all duration-300 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  重新开始
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
