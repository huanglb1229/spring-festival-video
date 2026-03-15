# 🧧 春节拜年视频生成器

一个基于 Next.js 的春节拜年视频生成应用，让用户上传照片、选择风格，生成专属的春节拜年视频。

## 功能特性

- 📸 **照片上传** - 支持上传用户个人照片
- 🎭 **多种风格** - 提供6种不同的春节主题风格
  - 舞龙拜年
  - 醒狮贺岁
  - 团圆饭
  - 烟花璀璨
  - 红包派送
  - 春联纳福
- 🎬 **幽默台词** - 每种风格都配有1-2句幽默的春节台词
- ✨ **视频生成** - 集成视频生成模型（可接入实际 API）

## 技术栈

- **Next.js 15** - React 框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **React Hooks** - 状态管理

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

打开浏览器访问 [http://localhost:3000](http://localhost:3000)

### 构建生产版本

```bash
npm run build
npm start
```

## 使用说明

1. **上传照片** - 点击或拖拽照片到上传区域
2. **选择风格** - 从6种风格中选择喜欢的一种
3. **查看台词** - 预览该风格的拜年台词
4. **生成视频** - 点击"生成拜年视频"按钮
5. **下载视频** - 生成完成后可以下载视频

## 项目结构

```
spring-festival-video/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── generate-video/
│   │   │       └── route.ts      # 视频生成 API
│   │   ├── page.tsx               # 主页面
│   │   ├── layout.tsx             # 布局
│   │   └── globals.css            # 全局样式
│   └── data/
│       └── styles.ts              # 风格配置数据
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

## 风格配置

每种风格包含以下属性：

- `id` - 风格唯一标识
- `name` - 风格名称
- `description` - 风格描述
- `image` - 风格预览图片
- `prompt` - 视频生成提示词（包含动作和场景）
- `dialogue` - 拜年台词数组（1-2句）

## 接入实际视频生成 API

当前使用的是模拟数据，要接入真实的视频生成 API：

1. 修改 `src/app/api/generate-video/route.ts`
2. 替换为实际的视频生成服务调用
3. 可以使用 Seedream4.0、Runway、Pika 等视频生成服务

## 许可证

MIT
