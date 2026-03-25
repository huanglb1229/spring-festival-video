export interface Style {
  id: string;
  name: string;
  description: string;
  image: string;
  prompt: string;
  dialogue: string[];
}

export const styles: Style[] = [
  {
    id: "dragon-dance",
    name: "舞龙拜年",
    description: "热闹喜庆的舞龙场景",
    image: "https://picsum.photos/seed/dragon/400/300",
    prompt: "照片中的人物在热闹的舞龙表演场景中，穿着喜庆的红色唐装，保持人物的性别、年龄和面部特征完全一致，面带微笑，双手作揖拜年，背景是金黄色的龙和红色灯笼，春节氛围浓厚，只改变服装和动作，写实风格，高清照片",
    dialogue: ["龙年大吉！", "恭喜发财，万事如意！"]
  },
  {
    id: "lion-dance",
    name: "醒狮贺岁",
    description: "威武的醒狮表演",
    image: "https://picsum.photos/seed/lion/400/300",
    prompt: "照片中的人物在醒狮表演现场，穿着喜庆的金色唐装，保持人物的性别、年龄和面部特征完全一致，旁边是红色的醒狮，拱手拜年，笑容满面，背景是红色的春联和鞭炮，只改变服装和动作，写实风格，高清照片",
    dialogue: ["醒狮贺岁！", "新年好，身体棒！"]
  },
  {
    id: "reunion-dinner",
    name: "团圆饭",
    description: "温馨的家庭团圆场景",
    image: "https://picsum.photos/seed/reunion/400/300",
    prompt: "照片中的人物坐在丰盛的团圆饭桌旁，桌上有鱼、饺子、年糕等春节美食，保持人物的性别、年龄和面部特征完全一致，穿着喜庆的红色毛衣，手持饮料，微笑着向镜头拜年，只改变服装和背景，写实风格，高清照片",
    dialogue: ["团圆美满！", "吃好喝好，新年好！"]
  },
  {
    id: "fireworks",
    name: "烟花璀璨",
    description: "绚丽的烟花夜景",
    image: "https://picsum.photos/seed/fireworks/400/300",
    prompt: "照片中的人物站在夜空下，背景是绚丽的烟花绽放，保持人物的性别、年龄和面部特征完全一致，穿着喜庆的新年服装，笑容灿烂，只改变服装和背景，写实风格，高清照片",
    dialogue: ["烟花灿烂！", "新年快乐，好运连连！"]
  },
  {
    id: "red-envelope",
    name: "红包派送",
    description: "送红包的喜庆场景",
    image: "https://picsum.photos/seed/redenvelope/400/300",
    prompt: "照片中的人物手持多个红色红包，保持人物的性别、年龄和面部特征完全一致，穿着喜庆的红色服装，笑容可掬地递出红包，背景是金色的元宝和铜钱，只改变服装和动作，写实风格，高清照片",
    dialogue: ["红包来啦！", "恭喜发财，红包拿来！"]
  },
  {
    id: "spring-couplets",
    name: "春联纳福",
    description: "贴春联的传统场景",
    image: "https://picsum.photos/seed/couplets/400/300",
    prompt: "照片中的人物正在贴春联，门上贴着红色的春联和福字，保持人物的性别、年龄和面部特征完全一致，穿着喜庆的蓝色唐装，拿着胶带，侧身微笑，只改变服装和背景，写实风格，高清照片",
    dialogue: ["春联贴好啦！", "福到运到，新年好！"]
  }
];
