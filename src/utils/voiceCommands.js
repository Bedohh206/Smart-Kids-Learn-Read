// Global Voice Command System
import { speak } from './voiceInteraction';

// Voice command patterns mapped to navigation paths
const commandPatterns = {
  alphabet: [
    /\b(alphabet|abc|letters|a b c)\b/i,
    /\blearn.*letters?\b/i,
    /\bshow.*letters?\b/i
  ],
  numbers: [
    /\b(numbers?|counting|count|digits?)\b/i,
    /\blearn.*numbers?\b/i,
    /\bshow.*numbers?\b/i
  ],
  phonics: [
    /\b(phonics?)\b/i,
    /\blearn.*sounds?\b/i
  ],
  spelling: [
    /\b(spelling|spell)\b/i,
    /\bspell.*words?\b/i,
    /\blearn.*spelling\b/i
  ],
  math: [
    /\b(math|addition|subtraction|multiplication|division|plus|minus|times|divide)\b/i,
    /\bsolve.*problems?\b/i,
    /\bdo.*math\b/i
  ],
  'shapes-colors': [
    /\b(shapes?|colors?|circle|square|triangle)\b/i,
    /\blearn.*shapes?\b/i,
    /\blearn.*colors?\b/i
  ],
  continents: [
    /\b(continents?|geography|world|countries|earth|planet)\b/i,
    /\blearn.*continents?\b/i,
    /\bexplore.*world\b/i
  ],
  blocks: [
    /\b(blocks?|build|building|tower|stack)\b/i,
    /\bblock.*game\b/i,
    /\bplay.*blocks?\b/i
  ],
  leaderboard: [
    /\b(leaderboard|leader board|progress|achievements?|badges?|score|stats)\b/i,
    /\bshow.*progress\b/i,
    /\bmy.*achievements?\b/i
  ],
  home: [
    /\b(home|main|menu|start|beginning)\b/i,
    /\bgo.*home\b/i,
    /\bback.*home\b/i,
    /\bmain.*menu\b/i
  ]
};

// Match voice input to a command
export const matchVoiceCommand = (transcript) => {
  const normalizedInput = transcript.toLowerCase().trim();
  
  for (const [path, patterns] of Object.entries(commandPatterns)) {
    for (const pattern of patterns) {
      if (pattern.test(normalizedInput)) {
        return path;
      }
    }
  }
  
  return null;
};

// Get friendly name for path
export const getFriendlyName = (path) => {
  const names = {
    alphabet: 'Alphabet',
    numbers: 'Numbers',
    phonics: 'Phonics',
    spelling: 'Spelling',
    math: 'Math Practice',
    'shapes-colors': 'Shapes and Colors',
    continents: 'Continents',
    blocks: 'Block Game',
    leaderboard: 'Leaderboard',
    home: 'Home'
  };
  return names[path] || path;
};

// Start global voice command listener
export const startVoiceCommandListener = (navigate, onListeningChange) => {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    console.warn('Speech recognition not supported');
    return null;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';
  recognition.maxAlternatives = 5;

  recognition.onstart = () => {
    if (onListeningChange) onListeningChange(true);
  };

  recognition.onresult = (event) => {
    const results = [];
    for (let i = 0; i < event.results[0].length; i++) {
      results.push(event.results[0][i].transcript.trim());
    }
    
    console.log('Voice command heard:', results);
    
    // Try to match any of the alternatives
    for (const transcript of results) {
      const matchedPath = matchVoiceCommand(transcript);
      if (matchedPath) {
        const friendlyName = getFriendlyName(matchedPath);
        speak(`Going to ${friendlyName}!`);
        
        setTimeout(() => {
          if (matchedPath === 'home') {
            navigate('/');
          } else {
            navigate(`/${matchedPath}`);
          }
        }, 1000);
        
        return;
      }
    }
    
    // No match found
    speak("I didn't understand that. Try saying: Go to Alphabet, Go to Numbers, Go to Math, Go to Spelling, Go to Shapes, Go to Continents, Go to Blocks, or Go Home!");
  };

  recognition.onerror = (event) => {
    console.error('Voice command error:', event.error);
    if (onListeningChange) onListeningChange(false);
    
    if (event.error === 'no-speech') {
      speak("I didn't hear anything. Try again!");
    } else if (event.error === 'audio-capture') {
      speak("I can't access your microphone!");
    }
  };

  recognition.onend = () => {
    if (onListeningChange) onListeningChange(false);
  };

  try {
    recognition.start();
    return recognition;
  } catch (error) {
    console.error('Failed to start voice commands:', error);
    if (onListeningChange) onListeningChange(false);
    return null;
  }
};

// Stop voice command listener
export const stopVoiceCommandListener = (recognition) => {
  if (recognition) {
    try {
      recognition.stop();
    } catch (error) {
      console.error('Error stopping voice commands:', error);
    }
  }
};
