// Lojban Parser - handles tokenization and basic validation
// Focuses on predicates (selbri), argument structure (sumti), and logical connectives

export const WORD_TYPES = {
  SELBRI: 'predicate',      // verbs/predicates (e.g., broda, gleki, tavla)
  SUMTI: 'argument',        // arguments (e.g., mi, do, la)
  GADRI: 'article',         // articles (e.g., lo, le, la)
  CMAVO: 'particle',        // structure words (e.g., cu, .i, je)
  CONNECTOR: 'connector',   // logical connectives (e.g., .a, .o, je, ja)
  CMENE: 'name',           // names (e.g., .djan., .meris.)
  NUMBER: 'number',        // numbers (e.g., pa, re, ci)
  UNKNOWN: 'unknown'
};

// Basic Lojban word recognition patterns
const PATTERNS = {
  // Common predicates (selbri)
  selbri: /^[bcdfgjklmnprstvxz][aeiou]'*[bcdfgjklmnprstvxz][aeiou]$/i,

  // Pronouns and basic sumti
  sumti: /^(mi|do|ti|ta|tu|ko)$/i,

  // Articles (gadri)
  gadri: /^(lo|le|la|li)$/i,

  // Separators
  separator: /^(cu|vau)$/i,

  // Logical connectives
  connector: /^(je|ja|jo|ju|\.a|\.e|\.i|\.o|\.u|ge|ga|go|gu|gi)$/i,

  // Names (start with period or consonant cluster)
  name: /^\.[a-z]+\.?$/i,

  // Numbers
  number: /^(pa|re|ci|vo|mu|xa|ze|bi|so|no)$/i,
};

// Known Lojban words database
const LOJBAN_DICT = {
  // Predicates
  'broda': { type: WORD_TYPES.SELBRI, meaning: 'is-X (variable predicate)', places: ['x₁'] },
  'gleki': { type: WORD_TYPES.SELBRI, meaning: 'is-happy', places: ['x₁ is happy', 'x₂ about condition'] },
  'tavla': { type: WORD_TYPES.SELBRI, meaning: 'talks/speaks', places: ['x₁ talks', 'x₂ to listener', 'x₃ about subject', 'x₄ in language'] },
  'klama': { type: WORD_TYPES.SELBRI, meaning: 'goes/comes', places: ['x₁ goes', 'x₂ to destination', 'x₃ from origin', 'x₄ via route', 'x₅ by means'] },
  'dunda': { type: WORD_TYPES.SELBRI, meaning: 'gives', places: ['x₁ gives', 'x₂ gift', 'x₃ to receiver'] },
  'prami': { type: WORD_TYPES.SELBRI, meaning: 'loves', places: ['x₁ loves', 'x₂ beloved'] },
  'citka': { type: WORD_TYPES.SELBRI, meaning: 'eats', places: ['x₁ eats', 'x₂ food'] },
  'nelci': { type: WORD_TYPES.SELBRI, meaning: 'likes', places: ['x₁ likes', 'x₂ object-of-fondness'] },
  'djuno': { type: WORD_TYPES.SELBRI, meaning: 'knows', places: ['x₁ knows', 'x₂ fact', 'x₃ about subject'] },
  'cusku': { type: WORD_TYPES.SELBRI, meaning: 'says/expresses', places: ['x₁ says', 'x₂ expression', 'x₃ to audience'] },

  // Pronouns (sumti)
  'mi': { type: WORD_TYPES.SUMTI, meaning: 'I/me/we' },
  'do': { type: WORD_TYPES.SUMTI, meaning: 'you' },
  'ti': { type: WORD_TYPES.SUMTI, meaning: 'this (near speaker)' },
  'ta': { type: WORD_TYPES.SUMTI, meaning: 'that (medium distance)' },
  'tu': { type: WORD_TYPES.SUMTI, meaning: 'that (far)' },
  'ko': { type: WORD_TYPES.SUMTI, meaning: 'you (imperative)' },

  // Articles (gadri)
  'lo': { type: WORD_TYPES.GADRI, meaning: 'one-or-more of those which are' },
  'le': { type: WORD_TYPES.GADRI, meaning: 'the (specific)' },
  'la': { type: WORD_TYPES.GADRI, meaning: 'the one(s) named' },
  'li': { type: WORD_TYPES.GADRI, meaning: 'the number' },

  // Structure words
  'cu': { type: WORD_TYPES.CMAVO, meaning: 'separator (before selbri)' },
  '.i': { type: WORD_TYPES.CMAVO, meaning: 'sentence separator' },
  'vau': { type: WORD_TYPES.CMAVO, meaning: 'end of bridi (optional)' },

  // Logical connectives
  'je': { type: WORD_TYPES.CONNECTOR, meaning: 'and (for selbri)' },
  'ja': { type: WORD_TYPES.CONNECTOR, meaning: 'or (inclusive, for selbri)' },
  'jo': { type: WORD_TYPES.CONNECTOR, meaning: 'if and only if (for selbri)' },
  'ju': { type: WORD_TYPES.CONNECTOR, meaning: 'whether or not (for selbri)' },
  '.a': { type: WORD_TYPES.CONNECTOR, meaning: 'or (inclusive, for sumti)' },
  '.e': { type: WORD_TYPES.CONNECTOR, meaning: 'and (for sumti)' },
  '.o': { type: WORD_TYPES.CONNECTOR, meaning: 'if and only if (for sumti)' },
  '.u': { type: WORD_TYPES.CONNECTOR, meaning: 'whether or not (for sumti)' },
  'ge': { type: WORD_TYPES.CONNECTOR, meaning: 'and (prefix for selbri)' },
  'ga': { type: WORD_TYPES.CONNECTOR, meaning: 'or (prefix for selbri)' },
  'gi': { type: WORD_TYPES.CONNECTOR, meaning: 'connector separator' },

  // Numbers
  'no': { type: WORD_TYPES.NUMBER, meaning: '0' },
  'pa': { type: WORD_TYPES.NUMBER, meaning: '1' },
  're': { type: WORD_TYPES.NUMBER, meaning: '2' },
  'ci': { type: WORD_TYPES.NUMBER, meaning: '3' },
  'vo': { type: WORD_TYPES.NUMBER, meaning: '4' },
  'mu': { type: WORD_TYPES.NUMBER, meaning: '5' },
  'xa': { type: WORD_TYPES.NUMBER, meaning: '6' },
  'ze': { type: WORD_TYPES.NUMBER, meaning: '7' },
  'bi': { type: WORD_TYPES.NUMBER, meaning: '8' },
  'so': { type: WORD_TYPES.NUMBER, meaning: '9' },
};

export function tokenize(text) {
  if (!text || typeof text !== 'string') {
    return [];
  }

  // Split on whitespace and filter empty strings
  const words = text.trim().toLowerCase().split(/\s+/).filter(w => w.length > 0);

  return words.map((word, index) => {
    const dictEntry = LOJBAN_DICT[word];

    if (dictEntry) {
      return {
        word,
        type: dictEntry.type,
        meaning: dictEntry.meaning,
        places: dictEntry.places || [],
        index,
        valid: true
      };
    }

    // Pattern matching for unknown words
    for (const [patternName, pattern] of Object.entries(PATTERNS)) {
      if (pattern.test(word)) {
        const typeMap = {
          'selbri': WORD_TYPES.SELBRI,
          'sumti': WORD_TYPES.SUMTI,
          'gadri': WORD_TYPES.GADRI,
          'separator': WORD_TYPES.CMAVO,
          'connector': WORD_TYPES.CONNECTOR,
          'name': WORD_TYPES.CMENE,
          'number': WORD_TYPES.NUMBER
        };

        return {
          word,
          type: typeMap[patternName] || WORD_TYPES.UNKNOWN,
          meaning: `(${patternName})`,
          places: [],
          index,
          valid: true
        };
      }
    }

    return {
      word,
      type: WORD_TYPES.UNKNOWN,
      meaning: 'unknown word',
      places: [],
      index,
      valid: false
    };
  });
}

export function validateStructure(tokens) {
  const errors = [];
  const warnings = [];

  if (tokens.length === 0) {
    return { valid: true, errors, warnings };
  }

  // Check for unknown words
  const unknownWords = tokens.filter(t => !t.valid);
  if (unknownWords.length > 0) {
    errors.push({
      message: `Unknown word(s): ${unknownWords.map(t => t.word).join(', ')}`,
      positions: unknownWords.map(t => t.index)
    });
  }

  // Check basic bridi structure (at least one selbri)
  const hasSelbri = tokens.some(t => t.type === WORD_TYPES.SELBRI);
  if (!hasSelbri) {
    warnings.push({
      message: 'No predicate (selbri) found. A complete Lojban sentence needs a predicate.',
      positions: []
    });
  }

  // Check for proper sumti before selbri
  let selbriPosition = tokens.findIndex(t => t.type === WORD_TYPES.SELBRI);
  if (selbriPosition > 0) {
    const beforeSelbri = tokens.slice(0, selbriPosition);
    const hasSumti = beforeSelbri.some(t =>
      t.type === WORD_TYPES.SUMTI ||
      t.type === WORD_TYPES.GADRI ||
      t.type === WORD_TYPES.CMENE
    );

    if (!hasSumti && selbriPosition > 0) {
      warnings.push({
        message: 'Consider adding a subject (sumti) before the predicate',
        positions: [selbriPosition]
      });
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

export function parseSentence(text) {
  const tokens = tokenize(text);
  const validation = validateStructure(tokens);

  return {
    tokens,
    ...validation
  };
}

export function getDictEntry(word) {
  return LOJBAN_DICT[word.toLowerCase()] || null;
}

export function getAllPredicates() {
  return Object.entries(LOJBAN_DICT)
    .filter(([_, entry]) => entry.type === WORD_TYPES.SELBRI)
    .map(([word, entry]) => ({ word, ...entry }));
}

export function getAllSumti() {
  return Object.entries(LOJBAN_DICT)
    .filter(([_, entry]) => entry.type === WORD_TYPES.SUMTI || entry.type === WORD_TYPES.GADRI)
    .map(([word, entry]) => ({ word, ...entry }));
}
