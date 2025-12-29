// Achievement and Progress Tracking System

export const ACHIEVEMENTS = {
  FIRST_LETTER: { id: 'first_letter', name: 'First Letter!', emoji: '🔤', description: 'Learned your first letter' },
  ALPHABET_MASTER: { id: 'alphabet_master', name: 'Alphabet Master', emoji: '🎓', description: 'Completed all letters' },
  MATH_STAR: { id: 'math_star', name: 'Math Star', emoji: '⭐', description: 'Solved 10 math problems' },
  MATH_GENIUS: { id: 'math_genius', name: 'Math Genius', emoji: '🧮', description: 'Solved 50 math problems' },
  SPELLING_BEE: { id: 'spelling_bee', name: 'Spelling Bee', emoji: '🐝', description: 'Spelled 20 words correctly' },
  NUMBER_NINJA: { id: 'number_ninja', name: 'Number Ninja', emoji: '🥷', description: 'Mastered all numbers' },
  SHAPE_EXPERT: { id: 'shape_expert', name: 'Shape Expert', emoji: '🔷', description: 'Learned all shapes' },
  COLOR_CHAMPION: { id: 'color_champion', name: 'Color Champion', emoji: '🌈', description: 'Learned all colors' },
  PHONICS_PRO: { id: 'phonics_pro', name: 'Phonics Pro', emoji: '🗣️', description: 'Practiced 30 phonics words' },
  PERFECT_SCORE: { id: 'perfect_score', name: 'Perfect Score', emoji: '💯', description: 'Got 100% in any activity' },
  STREAK_3: { id: 'streak_3', name: '3-Day Streak', emoji: '🔥', description: 'Learned 3 days in a row' },
  STREAK_7: { id: 'streak_7', name: '7-Day Streak', emoji: '🔥🔥', description: 'Learned 7 days in a row' },
  EARLY_BIRD: { id: 'early_bird', name: 'Early Bird', emoji: '🐦', description: 'Learned before 9 AM' },
  NIGHT_OWL: { id: 'night_owl', name: 'Night Owl', emoji: '🦉', description: 'Learned after 7 PM' },
  SUPER_LEARNER: { id: 'super_learner', name: 'Super Learner', emoji: '🦸', description: 'Completed 100 activities' }
};

export const ENCOURAGEMENT_MESSAGES = [
  "Amazing work! 🌟",
  "You're a star! ⭐",
  "Fantastic job! 🎉",
  "Keep it up! 💪",
  "You're doing great! 👍",
  "Brilliant! 🌈",
  "Superb! 🎊",
  "Excellent! 👏",
  "Wonderful! 🎁",
  "Outstanding! 🏆",
  "You're incredible! 🚀",
  "Perfect! 💯",
  "Marvelous! ✨",
  "Spectacular! 🎭",
  "You rock! 🎸"
];

export const SUCCESS_MESSAGES = [
  "Great job! Keep learning! 📚",
  "You're getting smarter every day! 🧠",
  "Learning is fun with you! 🎈",
  "You're a learning champion! 🏆",
  "Your brain is growing! 🌱",
  "Smart cookie! 🍪",
  "You're unstoppable! 🚀",
  "Knowledge is power! 💪",
  "You make learning look easy! 😎",
  "Future genius alert! 🎓"
];

// Get or initialize progress from localStorage
export const getProgress = () => {
  const stored = localStorage.getItem('smartKidsProgress');
  if (stored) {
    return JSON.parse(stored);
  }
  return {
    totalActivities: 0,
    mathProblems: 0,
    wordsSpelled: 0,
    lettersLearned: [],
    numbersLearned: [],
    achievements: [],
    lastActive: new Date().toDateString(),
    streak: 1,
    dailyActivities: {}
  };
};

// Save progress to localStorage
export const saveProgress = (progress) => {
  localStorage.setItem('smartKidsProgress', JSON.stringify(progress));
};

// Update progress and check for new achievements
export const updateProgress = (activityType, details = {}) => {
  const progress = getProgress();
  const today = new Date().toDateString();
  
  // Update streak
  if (progress.lastActive !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    if (progress.lastActive === yesterday.toDateString()) {
      progress.streak += 1;
    } else {
      progress.streak = 1;
    }
    progress.lastActive = today;
  }

  // Update daily activities
  if (!progress.dailyActivities[today]) {
    progress.dailyActivities[today] = 0;
  }
  progress.dailyActivities[today] += 1;
  
  // Update activity-specific counters
  progress.totalActivities += 1;

  const newAchievements = [];

  switch (activityType) {
    case 'math':
      progress.mathProblems += 1;
      if (progress.mathProblems === 10 && !progress.achievements.includes('math_star')) {
        newAchievements.push(ACHIEVEMENTS.MATH_STAR);
        progress.achievements.push('math_star');
      }
      if (progress.mathProblems === 50 && !progress.achievements.includes('math_genius')) {
        newAchievements.push(ACHIEVEMENTS.MATH_GENIUS);
        progress.achievements.push('math_genius');
      }
      break;

    case 'spelling':
      progress.wordsSpelled += 1;
      if (progress.wordsSpelled === 20 && !progress.achievements.includes('spelling_bee')) {
        newAchievements.push(ACHIEVEMENTS.SPELLING_BEE);
        progress.achievements.push('spelling_bee');
      }
      break;

    case 'phonics':
      if (details.wordCount >= 30 && !progress.achievements.includes('phonics_pro')) {
        newAchievements.push(ACHIEVEMENTS.PHONICS_PRO);
        progress.achievements.push('phonics_pro');
      }
      break;

    case 'letter':
      if (details.letter && !progress.lettersLearned.includes(details.letter)) {
        progress.lettersLearned.push(details.letter);
        if (progress.lettersLearned.length === 1 && !progress.achievements.includes('first_letter')) {
          newAchievements.push(ACHIEVEMENTS.FIRST_LETTER);
          progress.achievements.push('first_letter');
        }
        if (progress.lettersLearned.length === 26 && !progress.achievements.includes('alphabet_master')) {
          newAchievements.push(ACHIEVEMENTS.ALPHABET_MASTER);
          progress.achievements.push('alphabet_master');
        }
      }
      break;

    case 'number':
      if (details.number && !progress.numbersLearned.includes(details.number)) {
        progress.numbersLearned.push(details.number);
        if (progress.numbersLearned.length === 10 && !progress.achievements.includes('number_ninja')) {
          newAchievements.push(ACHIEVEMENTS.NUMBER_NINJA);
          progress.achievements.push('number_ninja');
        }
      }
      break;

    case 'shapes':
      if (!progress.achievements.includes('shape_expert')) {
        newAchievements.push(ACHIEVEMENTS.SHAPE_EXPERT);
        progress.achievements.push('shape_expert');
      }
      break;

    case 'colors':
      if (!progress.achievements.includes('color_champion')) {
        newAchievements.push(ACHIEVEMENTS.COLOR_CHAMPION);
        progress.achievements.push('color_champion');
      }
      break;
  }

  // Check for perfect score
  if (details.score === 100 && !progress.achievements.includes('perfect_score')) {
    newAchievements.push(ACHIEVEMENTS.PERFECT_SCORE);
    progress.achievements.push('perfect_score');
  }

  // Check for streaks
  if (progress.streak === 3 && !progress.achievements.includes('streak_3')) {
    newAchievements.push(ACHIEVEMENTS.STREAK_3);
    progress.achievements.push('streak_3');
  }
  if (progress.streak === 7 && !progress.achievements.includes('streak_7')) {
    newAchievements.push(ACHIEVEMENTS.STREAK_7);
    progress.achievements.push('streak_7');
  }

  // Check time-based achievements
  const hour = new Date().getHours();
  if (hour < 9 && !progress.achievements.includes('early_bird')) {
    newAchievements.push(ACHIEVEMENTS.EARLY_BIRD);
    progress.achievements.push('early_bird');
  }
  if (hour >= 19 && !progress.achievements.includes('night_owl')) {
    newAchievements.push(ACHIEVEMENTS.NIGHT_OWL);
    progress.achievements.push('night_owl');
  }

  // Check for super learner
  if (progress.totalActivities === 100 && !progress.achievements.includes('super_learner')) {
    newAchievements.push(ACHIEVEMENTS.SUPER_LEARNER);
    progress.achievements.push('super_learner');
  }

  saveProgress(progress);
  return { progress, newAchievements };
};

// Get a random encouragement message
export const getRandomEncouragement = () => {
  return ENCOURAGEMENT_MESSAGES[Math.floor(Math.random() * ENCOURAGEMENT_MESSAGES.length)];
};

// Get a random success message
export const getRandomSuccessMessage = () => {
  return SUCCESS_MESSAGES[Math.floor(Math.random() * SUCCESS_MESSAGES.length)];
};
