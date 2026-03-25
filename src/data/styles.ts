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
    image: "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=400&h=300&fit=crop",
    prompt: "照片中的人物在热闹的舞龙表演场景中，穿着喜庆的红色服装，面带微笑，双手作揖拜年，背景是金黄色的龙和红色灯笼，春节氛围浓厚，保持照片中人物的面部特征，写实风格，高清照片",
    dialogue: ["龙年大吉！", "恭喜发财，万事如意！"]
  },
  {
    id: "lion-dance",
    name: "醒狮贺岁",
    description: "威武的醒狮表演",
    image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400&h=300&fit=crop",
    prompt: "照片中的人物在醒狮表演现场，穿着喜庆服装，旁边是红色的醒狮，拱手拜年，笑容满面，背景是红色的春联和鞭炮，保持照片中人物的面部特征，写实风格，高清照片",
    dialogue: ["醒狮贺岁！", "新年好，身体棒！"]
  },
  {
    id: "reunion-dinner",
    name: "团圆饭",
    description: "温馨的家庭团圆场景",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
    prompt: "照片中的人物坐在丰盛的团圆饭桌旁，桌上有鱼、饺子、年糕等春节美食，穿着喜庆服装，手持饮料，微笑着向镜头拜年，保持照片中人物的面部特征，写实风格，高清照片",
    dialogue: ["团圆美满！", "吃好喝好，新年好！"]
  },
  {
    id: "fireworks",
    name: "烟花璀璨",
    description: "绚丽的烟花夜景",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&h=300&fit=crop",
    prompt: "照片中的人物站在夜空下，背景是绚丽的烟花绽放，穿着喜庆的新年服装，笑容灿烂，保持照片中人物的面部特征，写实风格，高清照片",
    dialogue: ["烟花灿烂！", "新年快乐，好运连连！"]
  },
  {
    id: "red-envelope",
    name: "红包派送",
    description: "送红包的喜庆场景",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&h=300&fit=crop",
    prompt: "照片中的人物手持多个红色红包，穿着喜庆服装，笑容可掬地递出红包，背景是金色的元宝和铜钱，保持照片中人物的面部特征，写实风格，高清照片",
    dialogue: ["红包来啦！", "恭喜发财，红包拿来！"]
  },
  {
    id: "spring-couplets",
    name: "春联纳福",
    description: "贴春联的传统场景",
    image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=400&h=300&fit=crop",
    prompt: "照片中的人物正在贴春联，门上贴着红色的春联和福字，拿着胶带，侧身微笑，保持照片中人物的面部特征，写实风格，高清照片",
    dialogue: ["春联贴好啦！", "福到运到，新年好！"]
  }
];
