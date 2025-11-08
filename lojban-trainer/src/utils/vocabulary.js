// Vocabulary database for Lojban Logic Trainer
// Organized by category and difficulty

export const vocabularyDatabase = {
  // Basic pronouns and demonstratives
  pronouns: [
    { lojban: 'mi', english: 'I, me, we', category: 'pronouns', difficulty: 1, examples: ['mi gleki = I am happy'] },
    { lojban: 'do', english: 'you', category: 'pronouns', difficulty: 1, examples: ['do tavla = you talk'] },
    { lojban: 'ti', english: 'this (near speaker)', category: 'pronouns', difficulty: 1, examples: ['ti mlatu = this is a cat'] },
    { lojban: 'ta', english: 'that (medium distance)', category: 'pronouns', difficulty: 1, examples: ['ta zdani = that is a house'] },
    { lojban: 'tu', english: 'that (far away)', category: 'pronouns', difficulty: 1, examples: ['tu lorxu = that is a deer (far)'] },
  ],

  // Common predicates (selbri)
  emotions: [
    { lojban: 'gleki', english: 'happy', category: 'emotions', difficulty: 1, places: ['x₁ is happy about x₂'], examples: ['mi gleki = I am happy'] },
    { lojban: 'badri', english: 'sad', category: 'emotions', difficulty: 1, places: ['x₁ is sad about x₂'], examples: ['do badri = you are sad'] },
    { lojban: 'prami', english: 'loves', category: 'emotions', difficulty: 1, places: ['x₁ loves x₂'], examples: ['mi prami do = I love you'] },
    { lojban: 'nelci', english: 'likes', category: 'emotions', difficulty: 1, places: ['x₁ likes x₂'], examples: ['mi nelci ti = I like this'] },
    { lojban: 'cinmo', english: 'feels', category: 'emotions', difficulty: 2, places: ['x₁ feels emotion x₂'], examples: ['mi cinmo lo gleki = I feel happiness'] },
  ],

  actions: [
    { lojban: 'tavla', english: 'talks, speaks', category: 'actions', difficulty: 1, places: ['x₁ talks to x₂ about x₃ in language x₄'], examples: ['mi tavla do = I talk to you'] },
    { lojban: 'klama', english: 'goes, comes', category: 'actions', difficulty: 1, places: ['x₁ goes to x₂ from x₃ via x₄ by means x₅'], examples: ['mi klama lo zdani = I go to a house'] },
    { lojban: 'citka', english: 'eats', category: 'actions', difficulty: 1, places: ['x₁ eats x₂'], examples: ['mi citka lo plise = I eat an apple'] },
    { lojban: 'pinxe', english: 'drinks', category: 'actions', difficulty: 1, places: ['x₁ drinks x₂'], examples: ['mi pinxe lo djacu = I drink water'] },
    { lojban: 'cadzu', english: 'walks', category: 'actions', difficulty: 1, places: ['x₁ walks on surface x₂'], examples: ['mi cadzu = I walk'] },
    { lojban: 'bajra', english: 'runs', category: 'actions', difficulty: 1, places: ['x₁ runs on surface x₂'], examples: ['do bajra = you run'] },
    { lojban: 'dansu', english: 'dances', category: 'actions', difficulty: 1, places: ['x₁ dances to x₂'], examples: ['mi dansu = I dance'] },
    { lojban: 'kelci', english: 'plays', category: 'actions', difficulty: 1, places: ['x₁ plays with x₂'], examples: ['mi kelci = I play'] },
  ],

  cognition: [
    { lojban: 'djuno', english: 'knows', category: 'cognition', difficulty: 2, places: ['x₁ knows fact x₂ about x₃'], examples: ['mi djuno = I know'] },
    { lojban: 'cusku', english: 'says, expresses', category: 'cognition', difficulty: 2, places: ['x₁ says x₂ to x₃'], examples: ['mi cusku = I say'] },
    { lojban: 'pensi', english: 'thinks', category: 'cognition', difficulty: 2, places: ['x₁ thinks about x₂'], examples: ['mi pensi = I think'] },
    { lojban: 'jimpe', english: 'understands', category: 'cognition', difficulty: 2, places: ['x₁ understands x₂ about x₃'], examples: ['mi jimpe = I understand'] },
  ],

  things: [
    { lojban: 'mlatu', english: 'cat', category: 'things', difficulty: 1, places: ['x₁ is a cat'], examples: ['lo mlatu = a cat'] },
    { lojban: 'gerku', english: 'dog', category: 'things', difficulty: 1, places: ['x₁ is a dog'], examples: ['lo gerku = a dog'] },
    { lojban: 'plise', english: 'apple', category: 'things', difficulty: 1, places: ['x₁ is an apple'], examples: ['lo plise = an apple'] },
    { lojban: 'djacu', english: 'water', category: 'things', difficulty: 1, places: ['x₁ is water'], examples: ['lo djacu = water'] },
    { lojban: 'zdani', english: 'house, home', category: 'things', difficulty: 1, places: ['x₁ is a home of x₂'], examples: ['lo zdani = a house'] },
    { lojban: 'ckule', english: 'school', category: 'things', difficulty: 1, places: ['x₁ is a school'], examples: ['lo ckule = a school'] },
    { lojban: 'prenu', english: 'person', category: 'things', difficulty: 1, places: ['x₁ is a person'], examples: ['lo prenu = a person'] },
    { lojban: 'nanmu', english: 'man, male', category: 'things', difficulty: 1, places: ['x₁ is a man'], examples: ['lo nanmu = a man'] },
    { lojban: 'ninmu', english: 'woman, female', category: 'things', difficulty: 1, places: ['x₁ is a woman'], examples: ['lo ninmu = a woman'] },
    { lojban: 'verba', english: 'child', category: 'things', difficulty: 1, places: ['x₁ is a child'], examples: ['lo verba = a child'] },
  ],

  properties: [
    { lojban: 'xamgu', english: 'good', category: 'properties', difficulty: 1, places: ['x₁ is good for x₂'], examples: ['ti xamgu = this is good'] },
    { lojban: 'mabla', english: 'bad', category: 'properties', difficulty: 1, places: ['x₁ is bad for x₂'], examples: ['ta mabla = that is bad'] },
    { lojban: 'barda', english: 'big, large', category: 'properties', difficulty: 1, places: ['x₁ is big'], examples: ['lo barda = a big one'] },
    { lojban: 'cmalu', english: 'small', category: 'properties', difficulty: 1, places: ['x₁ is small'], examples: ['lo cmalu = a small one'] },
    { lojban: 'melbi', english: 'beautiful', category: 'properties', difficulty: 1, places: ['x₁ is beautiful to x₂'], examples: ['ti melbi = this is beautiful'] },
    { lojban: 'dunli', english: 'equal', category: 'properties', difficulty: 2, places: ['x₁ equals x₂'], examples: ['mi dunli do = I equal you'] },
  ],

  // Structure words
  structure: [
    { lojban: 'cu', english: '[separator before predicate]', category: 'structure', difficulty: 1, examples: ['mi cu tavla = I talk'] },
    { lojban: 'lo', english: 'one or more that are...', category: 'structure', difficulty: 2, examples: ['lo mlatu = a cat / cats'] },
    { lojban: 'le', english: 'the specific...', category: 'structure', difficulty: 2, examples: ['le mlatu = the cat'] },
    { lojban: 'la', english: 'the one named...', category: 'structure', difficulty: 2, examples: ['la .djan. = John'] },
  ],

  connectives: [
    { lojban: 'je', english: 'and (predicate)', category: 'connectives', difficulty: 2, examples: ['gleki je nelci = happy and likes'] },
    { lojban: 'ja', english: 'or (predicate)', category: 'connectives', difficulty: 2, examples: ['gleki ja badri = happy or sad'] },
    { lojban: '.e', english: 'and (argument)', category: 'connectives', difficulty: 2, examples: ['mi .e do = I and you'] },
    { lojban: '.a', english: 'or (argument)', category: 'connectives', difficulty: 2, examples: ['mi .a do = I or you'] },
  ],
};

// Get all vocabulary items as flat array
export function getAllVocabulary() {
  const allWords = [];
  Object.values(vocabularyDatabase).forEach(category => {
    allWords.push(...category);
  });
  return allWords;
}

// Get vocabulary by difficulty level
export function getVocabularyByDifficulty(level) {
  return getAllVocabulary().filter(word => word.difficulty === level);
}

// Get vocabulary by category
export function getVocabularyByCategory(categoryName) {
  return vocabularyDatabase[categoryName] || [];
}

// Get random words
export function getRandomWords(count, difficulty = null) {
  let words = getAllVocabulary();
  if (difficulty !== null) {
    words = words.filter(w => w.difficulty === difficulty);
  }

  // Shuffle and take count
  const shuffled = [...words].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// Generate wrong answers for multiple choice
export function generateWrongAnswers(correctWord, count = 3) {
  const allWords = getAllVocabulary();
  const sameCategory = allWords.filter(w =>
    w.category === correctWord.category && w.lojban !== correctWord.lojban
  );

  const otherWords = allWords.filter(w => w.lojban !== correctWord.lojban);

  // Prefer same category for more challenging questions
  const pool = sameCategory.length >= count ? sameCategory : otherWords;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);

  return shuffled.slice(0, count);
}
