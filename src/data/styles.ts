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
    image: "https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=可爱的小男孩，中国传统舞龙表演，红色和金色为主色调，热闹喜庆，春节氛围，高清照片&image_size=square_hd",
    prompt: "可爱的小男孩在热闹的舞龙表演场景中，穿着喜庆的红色唐装，面带微笑，双手作揖拜年，背景是金黄色的龙和红色灯笼，春节氛围浓厚，保持小孩儿的面部特征",
    dialogue: ["龙年大吉！", "恭喜发财，万事如意！"]
  },
  {
    id: "lion-dance",
    name: "醒狮贺岁",
    description: "威武的醒狮表演",
    image: "https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=可爱的小男孩，中国传统醒狮表演，红色狮子，春节，热闹，高清照片&image_size=square_hd",
    prompt: "可爱的小男孩在醒狮表演现场，穿着金色唐装，旁边是红色的醒狮，小男孩拱手拜年，笑容满面，背景是红色的春联和鞭炮，保持小孩儿的面部特征",
    dialogue: ["醒狮贺岁！", "新年好，身体棒！"]
  },
  {
    id: "reunion-dinner",
    name: "团圆饭",
    description: "温馨的家庭团圆场景",
    image: "https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=可爱的小男孩，中国春节团圆饭，丰盛的菜肴，红色装饰，温馨家庭，高清照片&image_size=square_hd",
    prompt: "可爱的小男孩坐在丰盛的团圆饭桌旁，桌上有鱼、饺子、年糕等春节美食，小男孩穿着红色毛衣，手持饮料，微笑着向镜头拜年，保持小孩儿的面部特征",
    dialogue: ["团圆美满！", "吃好喝好，新年好！"]
  },
  {
    id: "fireworks",
    name: "烟花璀璨",
    description: "绚丽的烟花夜景",
    image: "https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=可爱的小男孩，春节烟花表演，夜空，绚丽多彩，红色金色，高清照片&image_size=square_hd",
    prompt: "可爱的小男孩站在夜空下，背景是绚丽的烟花绽放，小男孩穿着喜庆的新年服装，双手比心，笑容灿烂，保持小孩儿的面部特征",
    dialogue: ["烟花灿烂！", "新年快乐，好运连连！"]
  },
  {
    id: "red-envelope",
    name: "红包派送",
    description: "送红包的喜庆场景",
    image: "https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=可爱的小男孩，春节红包，红色信封，金色字体，喜庆，高清照片&image_size=square_hd",
    prompt: "可爱的小男孩手持多个红色红包，穿着喜庆的红色服装，笑容可掬地递出红包，背景是金色的元宝和铜钱，保持小孩儿的面部特征",
    dialogue: ["红包来啦！", "恭喜发财，红包拿来！"]
  },
  {
    id: "spring-couplets",
    name: "春联纳福",
    description: "贴春联的传统场景",
    image: "https://copilot-cn.bytedance.net/api/ide/v1/text_to_image?prompt=可爱的小男孩，春节贴春联，红色对联，金色文字，传统，高清照片&image_size=square_hd",
    prompt: "可爱的小男孩正在贴春联，门上贴着红色的春联和福字，小男孩拿着胶带，侧身微笑，穿着蓝色唐装，保持小孩儿的面部特征",
    dialogue: ["春联贴好啦！", "福到运到，新年好！"]
  }
];
