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
    sentences: [
      { template: '__ gleki', blank: 'mi', english: 'I am happy', hint: 'Use the word for "I"' },
      { template: '__ tavla', blank: 'do', english: 'You talk', hint: 'Use the word for "you"' },
    ],
    requiredXP: 0,
    grammarTips: [
      {
        showAfterExercise: 2,
        icon: '💪',
        title: 'Arguments Fill Relation Slots',
        content: 'In Lojban, pronouns fill numbered slots in relations. "mi prami do" means the pair (mi, do) is in the prami relation - one of many possible pairs.',
      },
      {
        showAfterExercise: 4,
        icon: '🎯',
        title: 'Building Blocks',
        content: 'These basic pronouns combine with predicates to make complete statements. Coming up: words for pointing!',
        example: {
          lojban: 'mi gleki',
          english: 'I am happy'
        }
      }
    ]
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
    sentences: [
      { template: '__ mlatu', blank: 'ti', english: 'This is a cat', hint: 'Point to something near' },
      { template: '__ zdani', blank: 'ta', english: 'That is a house', hint: 'Point to something at medium distance' },
      { template: 'mi prami __', blank: 'do', english: 'I love you', hint: 'Combine with previous level words' },
    ],
    requiredXP: 20,
    grammarTips: [
      {
        showAfterExercise: 3,
        icon: '👁️',
        title: 'Distance Markers',
        content: 'When pointing at objects, ti/ta/tu mark distance: near/medium/far. Helps clarify "which thing?" when gesturing.',
        example: {
          lojban: 'ti zdani',
          english: 'This (near me) is a house'
        }
      },
      {
        showAfterExercise: 6,
        icon: '📍',
        title: 'Physical Reference',
        content: 'Useful for specs and instructions involving physical objects - "use this screw" vs "use that screw (far away)".',
      }
    ]
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
    grammarTips: [
      {
        showAfterExercise: 3,
        icon: '⚙️',
        title: 'Fixed Argument Positions',
        content: '"prami" always means x₁ loves x₂. Unlike English where "John loves Mary" changes meaning if you swap names.',
        example: {
          lojban: 'mi prami do',
          english: 'I love you (x₁=mi, x₂=do)'
        }
      },
      {
        showAfterExercise: 6,
        icon: '📦',
        title: 'Like Database Tables',
        content: 'Think: prami has columns [lover, beloved]. "mi prami do" = one row. "mi prami ta" = another row. Both can exist! Fixed positions eliminate ambiguity.',
      }
    ]
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
    name: "📚 Review: Basics",
    description: "Review everything you've learned",
    icon: "🔄",
    isReview: true,
    reviewLevels: [1, 2, 3, 4, 5], // Pull words from these levels
    requiredXP: 170,
    grammarTips: [
      {
        showAfterExercise: 5,
        icon: '🧠',
        title: 'Spaced Repetition',
        content: 'Reviewing old material strengthens memory. You\'ll see review levels periodically to keep skills sharp.',
      }
    ]
  },
  {
    id: 7,
    name: "Food & Drink",
    description: "Things to eat and drink",
    icon: "🍎",
    words: [
      { lojban: 'plise', english: 'apple', category: 'things', places: ['x₁ is an apple'], examples: ['lo plise = an apple'] },
      { lojban: 'djacu', english: 'water', category: 'things', places: ['x₁ is water'], examples: ['lo djacu = water'] },
      { lojban: 'nanba', english: 'bread', category: 'things', places: ['x₁ is bread'], examples: ['lo nanba = bread'] },
      { lojban: 'ladru', english: 'milk', category: 'things', places: ['x₁ is milk'], examples: ['lo ladru = milk'] },
    ],
    requiredXP: 190,
  },
  {
    id: 8,
    name: "People",
    description: "Describe people",
    icon: "👥",
    words: [
      { lojban: 'prenu', english: 'person', category: 'things', places: ['x₁ is a person'], examples: ['lo prenu = a person'] },
      { lojban: 'nanmu', english: 'man, male', category: 'things', places: ['x₁ is a man'], examples: ['lo nanmu = a man'] },
      { lojban: 'ninmu', english: 'woman, female', category: 'things', places: ['x₁ is a woman'], examples: ['lo ninmu = a woman'] },
      { lojban: 'verba', english: 'child', category: 'things', places: ['x₁ is a child'], examples: ['lo verba = a child'] },
    ],
    requiredXP: 230,
  },
  {
    id: 9,
    name: "Places",
    description: "Locations and buildings",
    icon: "🏠",
    words: [
      { lojban: 'zdani', english: 'house, home', category: 'things', places: ['x₁ is a home'], examples: ['lo zdani = a house'] },
      { lojban: 'ckule', english: 'school', category: 'things', places: ['x₁ is a school'], examples: ['lo ckule = a school'] },
      { lojban: 'zarci', english: 'market, store', category: 'things', places: ['x₁ is a market'], examples: ['lo zarci = a market'] },
      { lojban: 'gusta', english: 'restaurant', category: 'things', places: ['x₁ is a restaurant'], examples: ['lo gusta = a restaurant'] },
    ],
    requiredXP: 270,
  },
  {
    id: 10,
    name: "More Actions",
    description: "More things you can do",
    icon: "🚶",
    words: [
      { lojban: 'cadzu', english: 'walk', category: 'actions', places: ['x₁ walks'], examples: ['mi cadzu = I walk'] },
      { lojban: 'bajra', english: 'run', category: 'actions', places: ['x₁ runs'], examples: ['do bajra = you run'] },
      { lojban: 'dansu', english: 'dance', category: 'actions', places: ['x₁ dances'], examples: ['mi dansu = I dance'] },
      { lojban: 'kelci', english: 'play', category: 'actions', places: ['x₁ plays'], examples: ['mi kelci = I play'] },
    ],
    requiredXP: 310,
  },
  {
    id: 11,
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
    requiredXP: 350,
  },
  {
    id: 12,
    name: "📚 Review: Vocabulary",
    description: "Review all vocabulary learned",
    icon: "🔄",
    isReview: true,
    reviewLevels: [1, 2, 3, 4, 5, 7, 8, 9, 10, 11], // Skip review level 6
    requiredXP: 400,
    grammarTips: [
      {
        showAfterExercise: 8,
        icon: '💪',
        title: 'Building Fluency',
        content: 'Practice makes permanent. Regular review sessions help move knowledge from short-term to long-term memory.',
      }
    ]
  },
  {
    id: 13,
    name: "Structure 1",
    description: "The separator word",
    icon: "🔧",
    words: [
      { lojban: 'cu', english: '[separator]', category: 'structure', examples: ['mi cu tavla = I talk'] },
    ],
    requiredXP: 440,
  },
  {
    id: 14,
    name: "Structure 2",
    description: "Articles: a/the",
    icon: "📝",
    words: [
      { lojban: 'lo', english: 'a, some (general)', category: 'structure', examples: ['lo mlatu = a cat'] },
      { lojban: 'le', english: 'the (specific)', category: 'structure', examples: ['le mlatu = the cat'] },
      { lojban: 'la', english: 'named', category: 'structure', examples: ['la .djan. = John'] },
    ],
    requiredXP: 480,
  },
  {
    id: 15,
    name: "Logic: AND",
    description: "Connect with AND",
    icon: "🔗",
    words: [
      { lojban: 'je', english: 'and (for verbs)', category: 'connectives', examples: ['gleki je nelci = happy and likes'] },
      { lojban: '.e', english: 'and (for things)', category: 'connectives', examples: ['mi .e do = I and you'] },
    ],
    requiredXP: 520,
  },
  {
    id: 16,
    name: "Logic: OR",
    description: "Connect with OR",
    icon: "🔀",
    words: [
      { lojban: 'ja', english: 'or (for verbs)', category: 'connectives', examples: ['gleki ja badri = happy or sad'] },
      { lojban: '.a', english: 'or (for things)', category: 'connectives', examples: ['mi .a do = I or you'] },
    ],
    requiredXP: 560,
  },
  {
    id: 17,
    name: "Thinking",
    description: "Mental actions",
    icon: "💭",
    words: [
      { lojban: 'djuno', english: 'know', category: 'cognition', places: ['x₁ knows fact x₂'], examples: ['mi djuno = I know'] },
      { lojban: 'pensi', english: 'think', category: 'cognition', places: ['x₁ thinks about x₂'], examples: ['mi pensi = I think'] },
      { lojban: 'cusku', english: 'say, express', category: 'cognition', places: ['x₁ says x₂'], examples: ['mi cusku = I say'] },
      { lojban: 'jimpe', english: 'understand', category: 'cognition', places: ['x₁ understands x₂'], examples: ['mi jimpe = I understand'] },
    ],
    requiredXP: 600,
  },
];

// Helper function to get words for a level (including review levels)
export function getWordsForLevel(level) {
  if (level.isReview && level.reviewLevels) {
    // Collect all words from the specified levels
    const allWords = [];
    level.reviewLevels.forEach(levelId => {
      const reviewLevel = getLevelById(levelId);
      if (reviewLevel && reviewLevel.words) {
        allWords.push(...reviewLevel.words);
      }
    });
    return allWords;
  }
  return level.words || [];
}

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

// Helper function to get correct copula (am/is/are) for English subject
function getCopula(subject) {
  const sub = subject.toLowerCase();
  if (sub === 'i' || sub === 'me') return 'am';
  if (sub === 'you' || sub === 'we') return 'are';
  return 'is'; // for this, that, he, she, it, etc.
}

// Helper function to conjugate verbs for English subject
function conjugateVerb(verb, subject) {
  const sub = subject.toLowerCase();
  const baseVerb = verb.split(',')[0].trim();

  // For third person singular (this, that), add 's' if needed
  if (sub === 'this' || sub === 'that') {
    // Check if verb already ends in appropriate form
    if (!baseVerb.endsWith('s') && !baseVerb.endsWith('es')) {
      return baseVerb + 's';
    }
  }
  return baseVerb;
}

// Generate sentences from learned words based on Lojban grammar
export function generateSentences(currentLevelId, count = 3) {
  // Get all words learned up to current level
  const learnedWords = [];
  for (let i = 1; i <= currentLevelId; i++) {
    const level = getLevelById(i);
    if (level) {
      learnedWords.push(...getWordsForLevel(level));
    }
  }

  // Separate into sumti (pronouns/arguments) and selbri (predicates)
  const sumti = learnedWords.filter(w => w.category === 'pronouns');
  const selbri = learnedWords.filter(w => w.places && w.places.length > 0);

  if (sumti.length === 0 || selbri.length === 0) {
    return []; // Not enough words to generate sentences
  }

  const sentences = [];
  const used = new Set(); // Track to avoid duplicates

  while (sentences.length < count && sentences.length < selbri.length * sumti.length) {
    // Pick random predicate
    const predicate = selbri[Math.floor(Math.random() * selbri.length)];

    // Determine if 1-place or 2-place by checking if place string contains 'x₂'
    const placeString = predicate.places[0] || '';
    const isTwoPlace = placeString.includes('x₂');

    // Generate based on place structure
    let template, blank, english, hint;

    if (!isTwoPlace) {
      // One-place predicate: "mi gleki" (I am happy)
      const subject = sumti[Math.floor(Math.random() * sumti.length)];
      template = `__ ${predicate.lojban}`;
      blank = subject.lojban;

      // Add proper copula for English translation
      const subjectEng = subject.english.split(',')[0].trim();
      const copula = getCopula(subjectEng);

      // Check if predicate needs copula (emotions, properties) or is a verb (actions)
      const needsCopula = predicate.category === 'emotions' ||
                          predicate.category === 'properties' ||
                          predicate.category === 'things';

      if (needsCopula) {
        english = `${subjectEng} ${copula} ${predicate.english}`;
      } else {
        // For actions, use verb directly (already conjugated in word data)
        english = `${subjectEng} ${predicate.english.split(',')[0]}`;
      }

      hint = `Use a pronoun like "${subjectEng}"`;
    } else {
      // Two-place predicate: "mi prami do" (I love you)
      const subject = sumti[Math.floor(Math.random() * sumti.length)];
      const objectCandidates = sumti.filter(s => s.lojban !== subject.lojban);
      if (objectCandidates.length === 0) continue; // Skip if no valid object

      const object = objectCandidates[Math.floor(Math.random() * objectCandidates.length)];

      // Get properly formatted English words
      const subjectEng = subject.english.split(',')[0].trim();
      const objectEng = object.english.split(',')[0].trim();

      // Conjugate the verb based on subject
      const verb = conjugateVerb(predicate.english, subjectEng);

      // Randomly blank subject or object
      const blankSubject = Math.random() < 0.5;

      if (blankSubject) {
        template = `__ ${predicate.lojban} ${object.lojban}`;
        blank = subject.lojban;
        english = `${subjectEng} ${verb} ${objectEng}`;
        hint = `Who is doing the action?`;
      } else {
        template = `${subject.lojban} ${predicate.lojban} __`;
        blank = object.lojban;
        english = `${subjectEng} ${verb} ${objectEng}`;
        hint = `Who/what receives the action?`;
      }
    }

    // Check for duplicates
    const key = template + blank;
    if (!used.has(key)) {
      used.add(key);
      sentences.push({ template, blank, english, hint });
    }
  }

  return sentences;
}

// Generate wrong answers for a word (from same level or nearby levels)
export function generateWrongAnswers(word, levelId, count = 3) {
  const currentLevel = getLevelById(levelId);
  if (!currentLevel) return [];

  // Get words from current level and adjacent levels
  const adjacentLevels = vocabularyLevels.filter(l =>
    Math.abs(l.id - levelId) <= 1
  );

  const allWords = adjacentLevels.flatMap(l => getWordsForLevel(l));
  const wrongWords = allWords.filter(w => w.lojban !== word.lojban);

  // Shuffle and take count
  const shuffled = [...wrongWords].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
