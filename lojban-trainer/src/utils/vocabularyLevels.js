// Vocabulary organized into Duolingo-style levels
// Each level teaches a specific set of words

export const vocabularyLevels = [
  {
    id: 1,
    name: "Basics 1",
    description: "Learn your first words: I, you",
    icon: "👋",
    words: [
      { lojban: 'mi', english: 'I, me, we', category: 'pronouns', examples: ['mi gleki = I am happy'] },
      { lojban: 'do', english: 'you', category: 'pronouns', examples: ['do tavla = you talk'] },
    ],
    requiredXP: 0,
  },
  {
    id: 2,
    name: "Basics 2",
    description: "Point to things: this, that",
    icon: "👆",
    words: [
      { lojban: 'ti', english: 'this (near)', category: 'pronouns', examples: ['ti mlatu = this is a cat'] },
      { lojban: 'ta', english: 'that (medium)', category: 'pronouns', examples: ['ta zdani = that is a house'] },
      { lojban: 'tu', english: 'that (far)', category: 'pronouns', examples: ['tu lorxu = that (far) is a deer'] },
    ],
    requiredXP: 20,
  },
  {
    id: 3,
    name: "Emotions",
    description: "Express feelings",
    icon: "😊",
    words: [
      { lojban: 'gleki', english: 'happy', category: 'emotions', places: ['x₁ is happy'], examples: ['mi gleki = I am happy'] },
      { lojban: 'badri', english: 'sad', category: 'emotions', places: ['x₁ is sad'], examples: ['do badri = you are sad'] },
      { lojban: 'prami', english: 'love', category: 'emotions', places: ['x₁ loves x₂'], examples: ['mi prami do = I love you'] },
      { lojban: 'nelci', english: 'like', category: 'emotions', places: ['x₁ likes x₂'], examples: ['mi nelci ti = I like this'] },
    ],
    requiredXP: 50,
  },
  {
    id: 4,
    name: "Common Actions",
    description: "Basic verbs",
    icon: "🏃",
    words: [
      { lojban: 'tavla', english: 'talk, speak', category: 'actions', places: ['x₁ talks to x₂'], examples: ['mi tavla do = I talk to you'] },
      { lojban: 'citka', english: 'eat', category: 'actions', places: ['x₁ eats x₂'], examples: ['mi citka = I eat'] },
      { lojban: 'pinxe', english: 'drink', category: 'actions', places: ['x₁ drinks x₂'], examples: ['mi pinxe = I drink'] },
      { lojban: 'klama', english: 'go, come', category: 'actions', places: ['x₁ goes to x₂'], examples: ['mi klama = I go'] },
    ],
    requiredXP: 90,
  },
  {
    id: 5,
    name: "Animals",
    description: "Common animals",
    icon: "🐱",
    words: [
      { lojban: 'mlatu', english: 'cat', category: 'things', places: ['x₁ is a cat'], examples: ['lo mlatu = a cat'] },
      { lojban: 'gerku', english: 'dog', category: 'things', places: ['x₁ is a dog'], examples: ['lo gerku = a dog'] },
      { lojban: 'cipni', english: 'bird', category: 'things', places: ['x₁ is a bird'], examples: ['lo cipni = a bird'] },
      { lojban: 'finpe', english: 'fish', category: 'things', places: ['x₁ is a fish'], examples: ['lo finpe = a fish'] },
    ],
    requiredXP: 130,
  },
  {
    id: 6,
    name: "Food & Drink",
    description: "Things to eat and drink",
    icon: "🍎",
    words: [
      { lojban: 'plise', english: 'apple', category: 'things', places: ['x₁ is an apple'], examples: ['lo plise = an apple'] },
      { lojban: 'djacu', english: 'water', category: 'things', places: ['x₁ is water'], examples: ['lo djacu = water'] },
      { lojban: 'nanba', english: 'bread', category: 'things', places: ['x₁ is bread'], examples: ['lo nanba = bread'] },
      { lojban: 'ladru', english: 'milk', category: 'things', places: ['x₁ is milk'], examples: ['lo ladru = milk'] },
    ],
    requiredXP: 170,
  },
  {
    id: 7,
    name: "People",
    description: "Describe people",
    icon: "👥",
    words: [
      { lojban: 'prenu', english: 'person', category: 'things', places: ['x₁ is a person'], examples: ['lo prenu = a person'] },
      { lojban: 'nanmu', english: 'man, male', category: 'things', places: ['x₁ is a man'], examples: ['lo nanmu = a man'] },
      { lojban: 'ninmu', english: 'woman, female', category: 'things', places: ['x₁ is a woman'], examples: ['lo ninmu = a woman'] },
      { lojban: 'verba', english: 'child', category: 'things', places: ['x₁ is a child'], examples: ['lo verba = a child'] },
    ],
    requiredXP: 210,
  },
  {
    id: 8,
    name: "Places",
    description: "Locations and buildings",
    icon: "🏠",
    words: [
      { lojban: 'zdani', english: 'house, home', category: 'things', places: ['x₁ is a home'], examples: ['lo zdani = a house'] },
      { lojban: 'ckule', english: 'school', category: 'things', places: ['x₁ is a school'], examples: ['lo ckule = a school'] },
      { lojban: 'zarci', english: 'market, store', category: 'things', places: ['x₁ is a market'], examples: ['lo zarci = a market'] },
      { lojban: 'gusta', english: 'restaurant', category: 'things', places: ['x₁ is a restaurant'], examples: ['lo gusta = a restaurant'] },
    ],
    requiredXP: 250,
  },
  {
    id: 9,
    name: "More Actions",
    description: "More things you can do",
    icon: "🚶",
    words: [
      { lojban: 'cadzu', english: 'walk', category: 'actions', places: ['x₁ walks'], examples: ['mi cadzu = I walk'] },
      { lojban: 'bajra', english: 'run', category: 'actions', places: ['x₁ runs'], examples: ['do bajra = you run'] },
      { lojban: 'dansu', english: 'dance', category: 'actions', places: ['x₁ dances'], examples: ['mi dansu = I dance'] },
      { lojban: 'kelci', english: 'play', category: 'actions', places: ['x₁ plays'], examples: ['mi kelci = I play'] },
    ],
    requiredXP: 290,
  },
  {
    id: 10,
    name: "Descriptions",
    description: "Describe things",
    icon: "⭐",
    words: [
      { lojban: 'barda', english: 'big, large', category: 'properties', places: ['x₁ is big'], examples: ['ti barda = this is big'] },
      { lojban: 'cmalu', english: 'small', category: 'properties', places: ['x₁ is small'], examples: ['ta cmalu = that is small'] },
      { lojban: 'xamgu', english: 'good', category: 'properties', places: ['x₁ is good'], examples: ['ti xamgu = this is good'] },
      { lojban: 'mabla', english: 'bad', category: 'properties', places: ['x₁ is bad'], examples: ['ta mabla = that is bad'] },
      { lojban: 'melbi', english: 'beautiful', category: 'properties', places: ['x₁ is beautiful'], examples: ['ti melbi = this is beautiful'] },
    ],
    requiredXP: 330,
  },
  {
    id: 11,
    name: "Structure 1",
    description: "The separator word",
    icon: "🔧",
    words: [
      { lojban: 'cu', english: '[separator]', category: 'structure', examples: ['mi cu tavla = I talk'] },
    ],
    requiredXP: 380,
  },
  {
    id: 12,
    name: "Structure 2",
    description: "Articles: a/the",
    icon: "📝",
    words: [
      { lojban: 'lo', english: 'a, some (general)', category: 'structure', examples: ['lo mlatu = a cat'] },
      { lojban: 'le', english: 'the (specific)', category: 'structure', examples: ['le mlatu = the cat'] },
      { lojban: 'la', english: 'named', category: 'structure', examples: ['la .djan. = John'] },
    ],
    requiredXP: 400,
  },
  {
    id: 13,
    name: "Logic: AND",
    description: "Connect with AND",
    icon: "🔗",
    words: [
      { lojban: 'je', english: 'and (for verbs)', category: 'connectives', examples: ['gleki je nelci = happy and likes'] },
      { lojban: '.e', english: 'and (for things)', category: 'connectives', examples: ['mi .e do = I and you'] },
    ],
    requiredXP: 440,
  },
  {
    id: 14,
    name: "Logic: OR",
    description: "Connect with OR",
    icon: "🔀",
    words: [
      { lojban: 'ja', english: 'or (for verbs)', category: 'connectives', examples: ['gleki ja badri = happy or sad'] },
      { lojban: '.a', english: 'or (for things)', category: 'connectives', examples: ['mi .a do = I or you'] },
    ],
    requiredXP: 480,
  },
  {
    id: 15,
    name: "Thinking",
    description: "Mental actions",
    icon: "💭",
    words: [
      { lojban: 'djuno', english: 'know', category: 'cognition', places: ['x₁ knows fact x₂'], examples: ['mi djuno = I know'] },
      { lojban: 'pensi', english: 'think', category: 'cognition', places: ['x₁ thinks about x₂'], examples: ['mi pensi = I think'] },
      { lojban: 'cusku', english: 'say, express', category: 'cognition', places: ['x₁ says x₂'], examples: ['mi cusku = I say'] },
      { lojban: 'jimpe', english: 'understand', category: 'cognition', places: ['x₁ understands x₂'], examples: ['mi jimpe = I understand'] },
    ],
    requiredXP: 520,
  },
];

// Get level by ID
export function getLevelById(id) {
  return vocabularyLevels.find(level => level.id === id);
}

// Check if level is unlocked based on previous level completion
export function isLevelUnlocked(levelId, levelProgress) {
  const level = getLevelById(levelId);
  if (!level) return false;

  // Level 1 is always unlocked
  if (levelId === 1) return true;

  // Check if previous level is completed
  const previousLevel = levelProgress[levelId - 1];
  return previousLevel && previousLevel.completed;
}

// Get next locked level
export function getNextLockedLevel(totalXP) {
  return vocabularyLevels.find(level => totalXP < level.requiredXP);
}

// Get all unlocked levels
export function getUnlockedLevels(totalXP) {
  return vocabularyLevels.filter(level => totalXP >= level.requiredXP);
}

// Generate wrong answers for a word (from same level or nearby levels)
export function generateWrongAnswers(word, levelId, count = 3) {
  const currentLevel = getLevelById(levelId);
  if (!currentLevel) return [];

  // Get words from current level and adjacent levels
  const adjacentLevels = vocabularyLevels.filter(l =>
    Math.abs(l.id - levelId) <= 1
  );

  const allWords = adjacentLevels.flatMap(l => l.words);
  const wrongWords = allWords.filter(w => w.lojban !== word.lojban);

  // Shuffle and take count
  const shuffled = [...wrongWords].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
