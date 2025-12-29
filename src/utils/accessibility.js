// Accessibility utilities for blind and visually impaired users
import { speak } from './voiceInteraction';

// Auto-announce page content
export const announcePageContent = (pageName, description) => {
  speak(`${pageName}. ${description}. Press any key to hear instructions.`);
};

// Announce available actions
export const announceActions = (actions) => {
  const actionList = actions.join(', ');
  speak(`Available actions: ${actionList}`);
};

// Keyboard shortcuts guide
export const keyboardShortcuts = {
  'h': 'Go to Home',
  'a': 'Go to Alphabet',
  'n': 'Go to Numbers',
  'm': 'Go to Math',
  's': 'Go to Spelling',
  'p': 'Go to Phonics',
  'c': 'Go to Shapes and Colors',
  'w': 'Go to Continents',
  'l': 'Go to Leaderboard',
  'v': 'Toggle Voice Commands',
  'i': 'Hear Instructions',
  '?': 'Hear all shortcuts',
  'ArrowRight': 'Next item',
  'ArrowLeft': 'Previous item',
  'Enter': 'Select item',
  'Space': 'Play audio',
  'Escape': 'Go back'
};

// Announce keyboard shortcuts
export const announceShortcuts = () => {
  const shortcuts = Object.entries(keyboardShortcuts)
    .map(([key, action]) => `Press ${key} for ${action}`)
    .join('. ');
  speak(`Keyboard shortcuts: ${shortcuts}`);
};

// Focus management
export const announceFocus = (elementName) => {
  speak(`${elementName}`);
};

// Progress announcements
export const announceProgress = (current, total, itemName) => {
  speak(`${itemName} ${current} of ${total}`);
};

// Success/Error announcements
export const announceResult = (isSuccess, message) => {
  if (isSuccess) {
    speak(`Correct! ${message}`);
  } else {
    speak(`Not quite. ${message}`);
  }
};

// Navigation announcements
export const announceNavigation = (destination) => {
  speak(`Navigating to ${destination}`);
};

// Help system
export const announceHelp = (pageName) => {
  const helpMessages = {
    'Home': 'Welcome to Smart Kids Learn and Read. Use arrow keys to navigate between learning categories. Press Enter to select. Press H to return here anytime. Press V to activate voice commands.',
    'Alphabet': 'Alphabet learning page. Use arrow keys to move between letters. Press Space or Enter to hear the letter sound. Press I for instructions.',
    'Numbers': 'Numbers learning page. Use arrow keys to move between numbers. Press Space or Enter to hear the number. Press I for instructions.',
    'Math': 'Math practice page. Use Tab to move through options. Type your answer and press Enter to submit. Press I for instructions.',
    'Spelling': 'Spelling practice page. Press Space to hear the word. Type your spelling and press Enter to check. Press I for instructions.',
    'Phonics': 'Phonics page. Press Space to sound out the word. Use arrow keys for next or previous word. Press I for instructions.',
    'Shapes & Colors': 'Shapes and Colors page. Use arrow keys to navigate. Press Space or Enter to hear about each shape or color. Press I for instructions.',
    'Continents': 'Continents learning page. Use arrow keys to select a continent. Press Enter to learn more. Press I for instructions.',
    'Leaderboard': 'Your progress and achievements. Press Tab to move through your stats. Press I for instructions.'
  };
  
  const message = helpMessages[pageName] || 'Use arrow keys to navigate. Press Enter to select. Press H for home. Press I for help.';
  speak(message);
};

// Enable blind-friendly mode
export const enableBlindMode = () => {
  // Add high contrast
  document.body.style.filter = 'contrast(1.5)';
  
  // Add focus indicators
  const style = document.createElement('style');
  style.textContent = `
    *:focus {
      outline: 4px solid #FFD93D !important;
      outline-offset: 4px !important;
      box-shadow: 0 0 0 4px rgba(255, 217, 61, 0.5) !important;
    }
    
    button:focus, a:focus, input:focus {
      transform: scale(1.05);
    }
  `;
  document.head.appendChild(style);
  
  speak('Blind-friendly mode enabled. All actions will be announced. Press question mark for keyboard shortcuts.');
};

// Disable blind-friendly mode
export const disableBlindMode = () => {
  document.body.style.filter = '';
  speak('Blind-friendly mode disabled.');
};

// Auto-play audio on focus
export const enableAutoPlay = (enabled) => {
  if (enabled) {
    speak('Auto-play enabled. Audio will play when you focus on items.');
  } else {
    speak('Auto-play disabled.');
  }
};
