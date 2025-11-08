# IMPORTANT: Lojban Grammar Rules for Sentence Generation

## Critical Distinction: Relations vs Functions

**PREDICATES ARE RELATIONS, NOT FUNCTIONS**

### Wrong Understanding (Function):
- A function X → Y maps each element of X to exactly one element of Y
- This is NOT how Lojban predicates work

### Correct Understanding (Relation):
- A relation X ⟺ Y is a set of tuples (pairs, triples, etc.)
- For an element of X, there can be MANY related elements of Y
- Example: "mi prami do" and "mi prami ta" are both valid
  - One x₁ (mi) can love multiple x₂ (do, ta, etc.)
  - One x₂ can be loved by multiple x₁

### In Set Theory Terms:
```
prami ⊆ X × Y
where X = set of lovers, Y = set of beloved things

"mi prami do" means (mi, do) ∈ prami
"mi prami ta" means (mi, ta) ∈ prami
Both can be true simultaneously!
```

## Lojban Predicate Structure

### Selbri (Predicates)
A selbri establishes a relationship between its arguments (sumti).

**Place Structure:**
- Each predicate has numbered places: x₁, x₂, x₃, etc.
- The order is FIXED and defines the relationship
- Example: `prami` has structure "x₁ loves x₂"
  - `mi prami do` = (I, you) is in the "love" relation
  - `do prami mi` = (you, I) is in the "love" relation
  - These are DIFFERENT relations!

### Sumti (Arguments)
Arguments that fill the places of a predicate.

**Personal Pronouns:**
- `mi` = I, me, we (1st person)
- `do` = you (2nd person)
- `ti` = this (near speaker)
- `ta` = that (medium distance)
- `tu` = that (far away)

**Articles:**
- `lo [predicate]` = one or more things that satisfy the predicate
- `le [predicate]` = the specific thing(s) being referred to
- `la [name]` = the one named [name]

## Valid Sentence Patterns

### 1-Place Predicates (Properties/States)
Pattern: `[x₁] [predicate]`

Examples:
- `mi gleki` = I am happy (property of x₁)
- `do badri` = you are sad
- `ti barda` = this is big

### 2-Place Predicates (Binary Relations)
Pattern: `[x₁] [predicate] [x₂]`

Examples:
- `mi prami do` = I love you (relation between x₁ and x₂)
- `mi tavla do` = I talk to you
- `mi citka ti` = I eat this

### 3+ Place Predicates
Pattern: `[x₁] [predicate] [x₂] [x₃] ...`

Example:
- `klama` has 5 places: x₁ goes to x₂ from x₃ via x₄ by means x₅
- `mi klama ta` = I go to that (only filling x₁ and x₂)

## Sentence Generation Rules

### Rule 1: Place Structure Must Be Respected
```javascript
// CORRECT:
"mi prami do" // x₁=mi, x₂=do
"do nelci ti" // x₁=do, x₂=ti

// WRONG:
"prami mi do" // No x₁ before predicate!
```

### Rule 2: Sumti Must Be Compatible with Place
```javascript
// For emotion predicates (gleki, badri):
// x₁ must be capable of feeling (mi, do, lo prenu)
"mi gleki" // ✓ CORRECT
"ti gleki" // ✗ WRONG (things can't be happy)

// For action predicates (tavla, citka):
// x₁ must be capable of performing action
"mi tavla" // ✓ CORRECT
"ti tavla" // ✗ WRONG (things can't talk)
```

### Rule 3: Multiple Relations Are Independent
```javascript
// These can all be true simultaneously:
"mi prami do" // I love you
"mi prami ta" // I love that
"do prami mi" // You love me

// This is because prami is a RELATION, not a function!
```

### Rule 4: Elided Places Are Existentially Quantified
```javascript
// "mi citka" means "I eat something" (x₂ is elided)
// Not "I perform the action of eating" - there must be a thing eaten
// The x₂ exists, we just don't specify what it is
```

## Common Mistakes to Avoid

### ❌ Mistake 1: Treating Predicates as Functions
```javascript
// WRONG: Assuming one x₁ maps to exactly one x₂
if (subject === 'mi') {
  object = 'do'; // NO! mi can love many things
}

// CORRECT: Relations allow multiple tuples
validSentences = [
  "mi prami do",
  "mi prami ta",
  "mi prami lo mlatu"
]; // All valid simultaneously
```

### ❌ Mistake 2: Confusing Place Order
```javascript
// WRONG: Randomly assigning sumti to places
"mi citka" means "I eat [something]"
"citka mi" is INVALID (no x₁ before predicate)

// CORRECT: x₁ comes before predicate
"mi citka ti" // I eat this
```

### ❌ Mistake 3: Using Incompatible Sumti
```javascript
// WRONG: Using non-sentient x₁ for mental predicates
"ti djuno" // "this knows" - nonsensical

// CORRECT: Match sumti to semantic requirements
"mi djuno" // I know
"lo prenu cu djuno" // a person knows
```

### ❌ Mistake 4: Claiming Zero Ambiguity
```javascript
// WRONG: "Lojban has zero ambiguity"
// Lojban CAN have reference ambiguity:
"mi prami ri" // "I love the last mentioned" - which one?

// CORRECT: "Lojban has fixed place structures"
// The STRUCTURE is unambiguous, but reference can still be unclear
```

## Sentence Generator Implementation Notes

### When Generating Fill-in-the-Blank:
```javascript
// For 1-place predicates:
template = "__ gleki"
blank = "mi" // or any sentient sumti
english = "I am happy"

// For 2-place predicates:
template = "mi prami __"
blank = "do" // or any valid x₂
english = "I love you"

// OR:
template = "__ prami do"
blank = "mi" // or any sentient x₁
english = "I love you"
```

### When Generating Multiple Choice:
```javascript
// Ensure wrong answers are:
// 1. Grammatically valid in the same position
// 2. From learned vocabulary
// 3. Not semantically identical

// GOOD wrong answers for "mi prami __":
wrongAnswers = ["ti", "ta", "tu"] // all valid objects

// BAD wrong answers:
wrongAnswers = ["gleki", "badri"] // these aren't sumti!
```

### When Generating Constructed Sentences:
```javascript
// Ensure:
// 1. All words are from learned vocabulary
// 2. Place structure is respected
// 3. Semantic compatibility (don't make nonsense)

// GOOD:
"mi nelci lo mlatu" // I like cats (if all words learned)

// BAD:
"lo mlatu cu djuno" // Cats know (semantic mismatch - cats can't "know" in Lojban djuno sense)
```

## Quick Reference: Common Predicates

### Emotions (1-place, need sentient x₁):
- `gleki` - x₁ is happy
- `badri` - x₁ is sad
- `nelci` - x₁ likes x₂
- `prami` - x₁ loves x₂

### Actions (need capable x₁):
- `tavla` - x₁ talks to x₂
- `citka` - x₁ eats x₂
- `pinxe` - x₁ drinks x₂
- `klama` - x₁ goes to x₂

### Properties (1-place, usually for objects):
- `barda` - x₁ is big
- `cmalu` - x₁ is small
- `xamgu` - x₁ is good
- `melbi` - x₁ is beautiful

### Things (1-place, defining what x₁ is):
- `mlatu` - x₁ is a cat
- `gerku` - x₁ is a dog
- `prenu` - x₁ is a person
- `zdani` - x₁ is a house

## Testing Validity

Before adding a generated sentence, check:
1. ✓ Does the predicate come after x₁?
2. ✓ Are all places filled with compatible sumti?
3. ✓ Does the English translation accurately reflect the Lojban?
4. ✓ Is this a relation that can actually hold? (semantic validity)
5. ✓ Are all words from learned vocabulary?

---

**Remember: Lojban predicates are RELATIONS (sets of tuples), not FUNCTIONS (one-to-one mappings)!**
