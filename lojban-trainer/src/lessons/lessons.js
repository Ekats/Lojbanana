// Lesson structure for Lojban Logic Trainer
// Progressive curriculum from zero to logical precision

export const lessons = [
  {
    id: 1,
    title: "Introduction: What is Lojban?",
    description: "Lojban as a formal logic system, not a natural language",
    content: `
# Welcome to Lojban Logic Trainer

**Lojban is not a natural language. It's a formal logic system you can speak.**

Think of it like learning programming:
- **Predicates (selbri)** = relations (like database tables)
- **Arguments (sumti)** = fill numbered slots in relations
- **Logical connectives** = boolean operators

## Why Lojban?

1. **Fixed place structures** - Every predicate has unambiguous argument slots
2. **Explicit logic** - All logical relationships are marked
3. **Machine-parseable** - Perfect for human-AI communication
4. **Expresses formal logic** - Like first-order predicate logic, but speakable

## What You'll Learn

1. **Predicates** - The building blocks (relations, like database tables)
2. **Argument structure** - How to fill numbered slots
3. **Logical connectives** - AND, OR, IF-THEN, etc.
4. **Quantification** - "all", "some", "none"
5. **Practical use** - Expressing specs, logic, and requirements

Ready to think in pure logic? Let's start.
    `,
    exercises: [
      {
        type: 'info',
        question: 'Read the introduction above, then click Next when ready.'
      }
    ]
  },
  {
    id: 2,
    title: "Lesson 1: Predicates (selbri)",
    description: "The core of Lojban - predicates are relations",
    content: `
# Predicates (selbri)

In Lojban, **predicates** are the core. Think of them as relations (like database tables) with numbered slots.

## Structure

A predicate describes a relationship with one or more "slots" (places):

**gleki** = "x₁ is happy about x₂"
- Place 1: who is happy
- Place 2: what they're happy about

**tavla** = "x₁ talks to x₂ about x₃ in language x₄"
- Place 1: speaker
- Place 2: listener
- Place 3: subject
- Place 4: language

## Key Insight

The **order matters** and is **fixed**. It's like a function signature:
\`\`\`
tavla(speaker, listener, subject, language)
\`\`\`

## Common Predicates

- **gleki** - is happy (x₁ about x₂)
- **prami** - loves (x₁ loves x₂)
- **tavla** - talks (x₁ to x₂ about x₃ in x₄)
- **klama** - goes (x₁ to x₂ from x₃ via x₄ by x₅)
- **citka** - eats (x₁ eats x₂)
- **nelci** - likes (x₁ likes x₂)

## Try It

Type these words into the parser below and see their place structure!
    `,
    exercises: [
      {
        type: 'parse',
        question: 'Type the predicate: tavla',
        answer: 'tavla',
        hint: 'Just type: tavla'
      },
      {
        type: 'parse',
        question: 'Type the predicate: gleki',
        answer: 'gleki',
        hint: 'Just type: gleki'
      },
      {
        type: 'multiple-choice',
        question: 'What does "citka" mean?',
        options: ['talks', 'eats', 'loves', 'goes'],
        answer: 1,
        explanation: 'citka means "eats" - x₁ eats x₂'
      }
    ]
  },
  {
    id: 3,
    title: "Lesson 2: Arguments (sumti)",
    description: "Filling in the slots - pronouns and arguments",
    content: `
# Arguments (sumti)

Now that we have predicates (relations), we need **arguments** to fill their numbered slots.

## Pronouns

The simplest arguments are pronouns:

- **mi** = I/me/we
- **do** = you
- **ti** = this (near me)
- **ta** = that (medium distance)
- **tu** = that (far away)

## Your First Sentence

**mi gleki**
= "I am happy"

Breaking it down:
- **mi** fills the first place of **gleki** (x₁ is happy)
- The second place (what I'm happy about) is left unspecified

## More Examples

**do tavla**
= "You talk" (listener and subject unspecified)

**mi citka**
= "I eat" (food unspecified)

## Key Rule

Arguments go BEFORE the predicate (by default):
\`\`\`
[argument(s)] [predicate]
mi gleki
do tavla
\`\`\`

Think of it like calling a function:
\`\`\`javascript
gleki(mi)  // in code
mi gleki   // in Lojban
\`\`\`
    `,
    exercises: [
      {
        type: 'parse',
        question: 'Type: mi gleki',
        answer: 'mi gleki',
        hint: 'Pronoun + predicate'
      },
      {
        type: 'parse',
        question: 'Type: do tavla',
        answer: 'do tavla',
        hint: 'you talk'
      },
      {
        type: 'multiple-choice',
        question: 'What does "mi prami" mean?',
        options: ['You love', 'I love', 'They love', 'I talk'],
        answer: 1,
        explanation: 'mi = I, prami = loves. So "mi prami" = "I love" (beloved unspecified)'
      },
      {
        type: 'construct',
        question: 'Construct: "I eat"',
        availableWords: ['mi', 'do', 'citka', 'tavla', 'gleki'],
        answer: ['mi', 'citka'],
        hint: 'Use "mi" (I) and "citka" (eats)'
      }
    ]
  },
  {
    id: 4,
    title: "Lesson 3: Multiple Arguments",
    description: "Filling multiple slots in predicates",
    content: `
# Multiple Arguments

Most predicates have multiple places. Let's fill them!

## The Problem

**mi prami**
= "I love" (but love WHO?)

We need a second argument!

## The Separator: cu

To add more arguments after the predicate, we use **cu** to mark where the selbri starts:

**mi cu prami do**
= "I love you"

Structure:
\`\`\`
mi     cu  prami  do
x₁     |   predicate  x₂
I      |   love    you
\`\`\`

The **cu** says "the predicate starts here", separating arguments before from the predicate.

## Examples

**do cu tavla mi**
= "You talk to me"
- do = you (x₁ speaker)
- tavla = talk
- mi = me (x₂ listener)

**mi cu nelci ti**
= "I like this"
- mi = I (x₁ liker)
- nelci = like
- ti = this (x₂ liked thing)

## Without cu

If there's only one argument before the predicate, **cu** is optional:

**mi prami do** = **mi cu prami do**

But for clarity, especially when learning, use **cu**!

## Multi-argument Structure

\`\`\`
x₁ cu predicate x₂ x₃ x₄ ...
\`\`\`

Arguments after the predicate fill places 2, 3, 4, etc. in order.
    `,
    exercises: [
      {
        type: 'parse',
        question: 'Type: mi cu prami do',
        answer: 'mi cu prami do',
        hint: 'I love you'
      },
      {
        type: 'parse',
        question: 'Type: do cu tavla mi',
        answer: 'do cu tavla mi',
        hint: 'You talk to me'
      },
      {
        type: 'construct',
        question: 'Construct: "I like you"',
        availableWords: ['mi', 'do', 'cu', 'nelci', 'prami'],
        answer: ['mi', 'cu', 'nelci', 'do'],
        hint: 'nelci = likes. Use: mi cu nelci do'
      },
      {
        type: 'multiple-choice',
        question: 'What does "do cu gleki" mean?',
        options: ['I am happy', 'You are happy', 'They are happy', 'You talk'],
        answer: 1,
        explanation: 'do = you, gleki = is happy. "You are happy"'
      }
    ]
  },
  {
    id: 5,
    title: "Lesson 4: Logical Connectives",
    description: "AND, OR, and logical operators",
    content: `
# Logical Connectives

Now we get to the power of Lojban: **explicit logic**.

## Connecting Predicates: je (AND)

**mi gleki je nelci**
= "I am-happy AND like"

Wait, that's awkward in English, but in Lojban:
**mi gleki je nelci do**
= "I am-happy AND like you"

The **je** connects the two predicates: both are true!

## Other Predicate Connectives

- **je** = AND (both are true)
- **ja** = OR (at least one is true, maybe both)
- **jo** = IF AND ONLY IF (both true or both false)
- **ju** = WHETHER OR NOT (truth of second doesn't matter)

## Connecting Arguments: .e (AND)

**mi .e do cu tavla**
= "I AND you talk" = "We both talk"

## Other Argument Connectives

- **.e** = AND (for arguments/sumti)
- **.a** = OR (for arguments/sumti)
- **.o** = IF AND ONLY IF (for arguments/sumti)
- **.u** = WHETHER OR NOT (for arguments/sumti)

## Key Insight

Lojban forces you to be **explicit** about logic:
- In English: "I like cats and dogs" (ambiguous!)
  - Do I like (cats and dogs)?
  - Or do (I like cats) AND (I like dogs)?

- In Lojban: Must choose:
  - **mi nelci lo mlatu .e lo gerku** = I like (cats AND dogs)
  - **mi nelci je prami lo mlatu** = I (like AND love) cats

## Truth Tables

**je** (AND): true only if both are true
**ja** (OR): true if at least one is true
**jo** (IFF): true if both same
**ju** (irrelevant): always true

This is first-order logic made speakable!
    `,
    exercises: [
      {
        type: 'parse',
        question: 'Type: mi gleki je nelci',
        answer: 'mi gleki je nelci',
        hint: 'I am happy AND like'
      },
      {
        type: 'multiple-choice',
        question: 'What does "je" mean?',
        options: ['OR', 'AND', 'IF-THEN', 'NOT'],
        answer: 1,
        explanation: 'je means logical AND - both predicates must be true'
      },
      {
        type: 'multiple-choice',
        question: 'What\'s the difference between "je" and ".e"?',
        options: [
          'No difference',
          'je connects predicates, .e connects arguments',
          'je is OR, .e is AND',
          'je is formal, .e is casual'
        ],
        answer: 1,
        explanation: 'je connects selbri (predicates), .e connects sumti (arguments)'
      },
      {
        type: 'parse',
        question: 'Type: mi .e do cu tavla',
        answer: 'mi .e do cu tavla',
        hint: 'I and you talk (we both talk)'
      }
    ]
  },
  {
    id: 6,
    title: "Lesson 5: Articles & Description",
    description: "lo, le, la - describing things",
    content: `
# Articles (gadri)

So far we've used pronouns (mi, do). Now let's describe things!

## lo - "one or more that are..."

**lo** creates a description based on a predicate:

**lo prami** = "one-or-more lover(s)" / "a lover" / "lovers"
**lo tavla** = "one-or-more talker(s)" / "a talker" / "talkers"

Think of **lo** as extracting the x₁ of a predicate!

## Examples with lo

**mi prami lo tavla**
= "I love one-or-more talkers"
= "I love a talker" / "I love talkers"

**lo gleki cu tavla**
= "A happy-one talks" / "Happy ones talk"

## le - "the specific one(s)"

**le** refers to specific things (like "the" in English):

**le prami** = "the lover(s)" (specific one(s) we know)

## la - "the one named..."

**la** introduces names:

**la .djan.** = "the one named John" / "John"

Note: Lojban names end in consonant and are marked with periods

**mi cu prami la .meris.**
= "I love Mary"

## Building Complex Arguments

**mi cu tavla lo gleki**
= "I talk to a happy-one"
= "I talk to someone who is happy"

**lo prami cu nelci lo mlatu**
= "A lover likes a cat"
= "Lovers like cats"

## Why This Matters

This lets you build precise, unambiguous descriptions:

\`\`\`
mi cu dunda lo plise lo tavla
I give an-apple to a-talker
\`\`\`

Every argument is clear, every relationship explicit!
    `,
    exercises: [
      {
        type: 'parse',
        question: 'Type: lo gleki',
        answer: 'lo gleki',
        hint: 'A happy one / happy ones'
      },
      {
        type: 'parse',
        question: 'Type: mi cu prami lo tavla',
        answer: 'mi cu prami lo tavla',
        hint: 'I love a talker'
      },
      {
        type: 'multiple-choice',
        question: 'What does "lo" mean?',
        options: [
          'the specific one',
          'one or more that are...',
          'the one named...',
          'not'
        ],
        answer: 1,
        explanation: 'lo means "one or more of those which are..." - it creates a description'
      },
      {
        type: 'construct',
        question: 'Construct: "A happy one talks"',
        availableWords: ['lo', 'le', 'gleki', 'tavla', 'cu', 'mi'],
        answer: ['lo', 'gleki', 'cu', 'tavla'],
        hint: 'lo gleki cu tavla'
      }
    ]
  },
  {
    id: 7,
    title: "Practice: Putting It Together",
    description: "Build complete logical sentences",
    content: `
# Practice: Complete Sentences

You now know:
- ✅ Predicates (selbri) - relations with numbered slots
- ✅ Arguments (sumti) - fill those numbered slots
- ✅ Logical connectives - AND/OR/etc
- ✅ Articles - describing things

## Let's Build Complex Sentences!

**mi .e do cu gleki je tavla lo prami**
= "I and you are-happy AND talk-to a-lover"
= "We're both happy and talking to someone who loves"

Breaking it down:
- **mi .e do** = I AND you (connected arguments)
- **cu** = separator (predicate starts)
- **gleki je tavla** = happy AND talk (connected predicates)
- **lo prami** = a lover (x₂ for tavla)

## The Power

You can now express:
- Boolean logic: AND, OR, IFF
- Precise relationships: who does what to whom
- Nested descriptions: "a happy talker who loves"
- Fixed place structures: machine-parseable with numbered argument slots

This is **formal logic you can speak**!

## What's Next?

From here you'd learn:
- Quantifiers (all, some, none)
- Tense (past, future, ongoing)
- Questions
- Relative clauses
- Modal logic

But you already have the **core logic system**!

## Try Building

Use the construction mode below to practice building sentences from scratch.
    `,
    exercises: [
      {
        type: 'construct',
        question: 'Construct: "I and you talk"',
        availableWords: ['mi', 'do', '.e', 'cu', 'tavla', 'je'],
        answer: ['mi', '.e', 'do', 'cu', 'tavla'],
        hint: 'Connect the pronouns with .e, then add cu tavla'
      },
      {
        type: 'construct',
        question: 'Construct: "A happy one loves you"',
        availableWords: ['lo', 'gleki', 'cu', 'prami', 'do', 'mi'],
        answer: ['lo', 'gleki', 'cu', 'prami', 'do'],
        hint: 'lo gleki cu prami do'
      },
      {
        type: 'parse',
        question: 'Type a sentence combining what you learned! (Free form)',
        answer: null, // free form
        hint: 'Try: mi cu nelci je prami lo gleki'
      }
    ]
  }
];

export function getLessonById(id) {
  return lessons.find(lesson => lesson.id === id);
}

export function getNextLesson(currentId) {
  const currentIndex = lessons.findIndex(l => l.id === currentId);
  if (currentIndex === -1 || currentIndex === lessons.length - 1) {
    return null;
  }
  return lessons[currentIndex + 1];
}

export function getPreviousLesson(currentId) {
  const currentIndex = lessons.findIndex(l => l.id === currentId);
  if (currentIndex <= 0) {
    return null;
  }
  return lessons[currentIndex - 1];
}
