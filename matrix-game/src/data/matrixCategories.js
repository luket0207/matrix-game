const matrixCategories = [
  {
    id: 'animals',
    label: { en: 'Animals', ja: '動物' },
    scales: [
      {
        id: 'small-big',
        lower: { en: 'Small', ja: '小さい' },
        upper: { en: 'Big', ja: '大きい' },
      },
      {
        id: 'scary-cute',
        lower: { en: 'Scary', ja: '怖い' },
        upper: { en: 'Cute', ja: 'かわいい' },
      },
      {
        id: 'safe-dangerous',
        lower: { en: 'Safe', ja: '安全' },
        upper: { en: 'Dangerous', ja: '危険' },
      },
      {
        id: 'slow-fast',
        lower: { en: 'Slow', ja: '遅い' },
        upper: { en: 'Fast', ja: '速い' },
      },
      {
        id: 'common-rare',
        lower: { en: 'Common', ja: 'よくある' },
        upper: { en: 'Rare', ja: 'レア' },
      },
    ],
  },
  {
    id: 'food',
    label: { en: 'Food', ja: '食べ物' },
    scales: [
      {
        id: 'cheap-expensive',
        lower: { en: 'Cheap', ja: '安い' },
        upper: { en: 'Expensive', ja: '高い' },
      },
      {
        id: 'healthy-unhealthy',
        lower: { en: 'Healthy', ja: '健康的' },
        upper: { en: 'Unhealthy', ja: '不健康' },
      },
      {
        id: 'soft-crunchy',
        lower: { en: 'Soft', ja: '柔らかい' },
        upper: { en: 'Crunchy', ja: 'サクサク' },
      },
      {
        id: 'mild-spicy',
        lower: { en: 'Mild', ja: 'マイルド' },
        upper: { en: 'Spicy', ja: '辛い' },
      },
      {
        id: 'sweet-savoury',
        lower: { en: 'Sweet', ja: '甘い' },
        upper: { en: 'Savoury', ja: 'しょっぱい' },
      },
    ],
  },
  {
    id: 'countries',
    label: { en: 'Countries', ja: '国' },
    scales: [
      {
        id: 'small-large',
        lower: { en: 'Small', ja: '小さい' },
        upper: { en: 'Large', ja: '大きい' },
      },
      {
        id: 'cold-hot',
        lower: { en: 'Cold', ja: '寒い' },
        upper: { en: 'Hot', ja: '暑い' },
      },
      {
        id: 'few-many-people',
        lower: { en: 'Few People', ja: '人が少ない' },
        upper: { en: 'Lots of People', ja: '人が多い' },
      },
      {
        id: 'near-far',
        lower: { en: 'Near', ja: '近い' },
        upper: { en: 'Far', ja: '遠い' },
      },
    ],
  },
  {
    id: 'sports',
    label: { en: 'Sports', ja: 'スポーツ' },
    scales: [
      {
        id: 'slow-fast',
        lower: { en: 'Slow', ja: '遅い' },
        upper: { en: 'Fast', ja: '速い' },
      },
      {
        id: 'easy-hard-to-play',
        lower: { en: 'Easy to Play', ja: '遊びやすい' },
        upper: { en: 'Hard to Play', ja: '遊びにくい' },
      },
      {
        id: 'cheap-expensive',
        lower: { en: 'Cheap', ja: '安い' },
        upper: { en: 'Expensive', ja: '高い' },
      },
      {
        id: 'boring-fun-to-watch',
        lower: { en: 'Boring to Watch', ja: '見ていてつまらない' },
        upper: { en: 'Fun to Watch', ja: '見ていて楽しい' },
      },
      {
        id: 'safe-dangerous',
        lower: { en: 'Safe', ja: '安全' },
        upper: { en: 'Dangerous', ja: '危険' },
      },
    ],
  },
  {
    id: 'musical-instruments',
    label: { en: 'Musical Instruments', ja: '楽器' },
    scales: [
      {
        id: 'small-large',
        lower: { en: 'Small', ja: '小さい' },
        upper: { en: 'Large', ja: '大きい' },
      },
      {
        id: 'quiet-loud',
        lower: { en: 'Quiet', ja: '静か' },
        upper: { en: 'Loud', ja: 'うるさい' },
      },
      {
        id: 'cheap-expensive',
        lower: { en: 'Cheap', ja: '安い' },
        upper: { en: 'Expensive', ja: '高い' },
      },
      {
        id: 'easy-hard-to-play',
        lower: { en: 'Easy to Play', ja: '遊びやすい' },
        upper: { en: 'Hard to Play', ja: '遊びにくい' },
      },
    ],
  },
  {
    id: 'pokemon',
    label: { en: 'Pokemon', ja: 'ポケモン' },
    scales: [
      {
        id: 'small-big',
        lower: { en: 'Small', ja: '小さい' },
        upper: { en: 'Big', ja: '大きい' },
      },
      {
        id: 'scary-cute',
        lower: { en: 'Scary', ja: '怖い' },
        upper: { en: 'Cute', ja: 'かわいい' },
      },
      {
        id: 'weak-strong',
        lower: { en: 'Weak', ja: '弱い' },
        upper: { en: 'Strong', ja: '強い' },
      },
      {
        id: 'silly-cool',
        lower: { en: 'Silly', ja: 'おもしろい' },
        upper: { en: 'Cool', ja: 'かっこいい' },
      },
    ],
  },
  {
    id: 'household-objects',
    label: { en: 'Household Objects', ja: '日用品' },
    scales: [
      {
        id: 'small-large',
        lower: { en: 'Small', ja: '小さい' },
        upper: { en: 'Large', ja: '大きい' },
      },
      {
        id: 'cheap-expensive',
        lower: { en: 'Cheap', ja: '安い' },
        upper: { en: 'Expensive', ja: '高い' },
      },
      {
        id: 'useless-useful',
        lower: { en: 'Useless', ja: '役に立たない' },
        upper: { en: 'Useful', ja: '役に立つ' },
      },
      {
        id: 'soft-hard-material',
        lower: { en: 'Soft', ja: '柔らかい' },
        upper: { en: 'Hard', ja: '硬い' },
      },
      {
        id: 'safe-dangerous',
        lower: { en: 'Safe', ja: '安全' },
        upper: { en: 'Dangerous', ja: '危険' },
      },
    ],
  },
  {
    id: 'clothing',
    label: { en: 'Clothing', ja: '服' },
    scales: [
      {
        id: 'casual-formal',
        lower: { en: 'Casual', ja: 'カジュアル' },
        upper: { en: 'Formal', ja: 'フォーマル' },
      },
      {
        id: 'cheap-expensive',
        lower: { en: 'Cheap', ja: '安い' },
        upper: { en: 'Expensive', ja: '高い' },
      },
      {
        id: 'cool-warm',
        lower: { en: 'Cool', ja: '涼しい' },
        upper: { en: 'Warm', ja: '暖かい' },
      },
      {
        id: 'comfortable-uncomfortable',
        lower: { en: 'Comfortable', ja: '快適' },
        upper: { en: 'Uncomfortable', ja: '不快' },
      },
    ],
  },
  {
    id: 'hobbies',
    label: { en: 'Hobbies', ja: '趣味' },
    scales: [
      {
        id: 'cheap-expensive',
        lower: { en: 'Cheap', ja: '安い' },
        upper: { en: 'Expensive', ja: '高い' },
      },
      {
        id: 'popular-unpopular',
        lower: { en: 'Popular', ja: '人気' },
        upper: { en: 'Unpopular', ja: '人気がない' },
      },
      {
        id: 'indoor-outdoor',
        lower: { en: 'Indoor', ja: 'インドア' },
        upper: { en: 'Outdoor', ja: 'アウトドア' },
      },
      {
        id: 'easy-hard',
        lower: { en: 'Easy', ja: '簡単' },
        upper: { en: 'Hard', ja: '難しい' },
      },
      {
        id: 'relaxing-intense',
        lower: { en: 'Relaxing', ja: 'リラックス' },
        upper: { en: 'Intense', ja: '激しい' },
      },
    ],
  },
];

export default matrixCategories;
