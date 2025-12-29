// Voice Interaction Utility using Web Speech API

// Text-to-Speech
export const speak = (text, options = {}) => {
  return new Promise((resolve, reject) => {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported');
      resolve();
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Default settings for kid-friendly voice
    utterance.rate = options.rate || 0.9; // Slightly slower for clarity
    utterance.pitch = options.pitch || 1.1; // Slightly higher for friendliness
    utterance.volume = options.volume || 1;
    utterance.lang = options.lang || 'en-US';

    // Try to find a child-friendly female voice
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      // Prefer female voices as they're often clearer for children
      const preferredVoice = voices.find(v => 
        v.lang.startsWith('en') && v.name.toLowerCase().includes('female')
      ) || voices.find(v => 
        v.lang.startsWith('en') && (v.name.includes('Zira') || v.name.includes('Samantha') || v.name.includes('Karen') || v.name.includes('Victoria'))
      ) || voices.find(v => v.lang.startsWith('en') && !v.name.toLowerCase().includes('male')) || voices[0];
      
      utterance.voice = preferredVoice;
    }

    utterance.onend = () => resolve();
    utterance.onerror = (e) => {
      console.error('Speech error:', e);
      reject(e);
    };

    window.speechSynthesis.speak(utterance);
  });
};

// Speech Recognition
export const startListening = (onResult, onError) => {
  if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    console.warn('Speech recognition not supported');
    if (onError) onError(new Error('Speech recognition not supported'));
    return null;
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';
  recognition.maxAlternatives = 3;

  recognition.onresult = (event) => {
    const results = [];
    for (let i = 0; i < event.results[0].length; i++) {
      results.push({
        transcript: event.results[0][i].transcript.trim(),
        confidence: event.results[0][i].confidence
      });
    }
    if (onResult) onResult(results);
  };

  recognition.onerror = (event) => {
    console.error('Recognition error:', event.error);
    if (onError) onError(event);
  };

  recognition.onend = () => {
    console.log('Recognition ended');
  };

  try {
    recognition.start();
    return recognition;
  } catch (error) {
    console.error('Failed to start recognition:', error);
    if (onError) onError(error);
    return null;
  }
};

// Stop listening
export const stopListening = (recognition) => {
  if (recognition) {
    try {
      recognition.stop();
    } catch (error) {
      console.error('Error stopping recognition:', error);
    }
  }
};

// Interactive prompts for kids
export const greetChild = async () => {
  const greetings = [
    "Hello there! Ready to learn something amazing today?",
    "Hi friend! Let's have fun learning together!",
    "Welcome back superstar! What do you want to learn today?",
    "Hey there smarty! Ready for some fun?",
    "Hello brilliant learner! Let's get started!"
  ];
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];
  await speak(greeting);
};

export const encourageChild = async (correct = true) => {
  if (correct) {
    const messages = [
      "Awesome! You got it right!",
      "Fantastic! You're so smart!",
      "Perfect! Keep going!",
      "Yes! That's correct!",
      "Amazing job! You're a star!",
      "Excellent! You're doing great!",
      "Wonderful! You're brilliant!"
    ];
    const message = messages[Math.floor(Math.random() * messages.length)];
    await speak(message);
  } else {
    const messages = [
      "That's okay! Let's try again!",
      "Good try! Want to give it another shot?",
      "Almost! You're learning!",
      "Nice effort! Try once more!",
      "Don't give up! You can do this!"
    ];
    const message = messages[Math.floor(Math.random() * messages.length)];
    await speak(message);
  }
};

export const askQuestion = async (question) => {
  await speak(question);
};

export const celebrateSuccess = async () => {
  const messages = [
    "Yay! You're amazing!",
    "Woohoo! Super job!",
    "Incredible! You're a champion!",
    "Fantastic work! Give yourself a pat on the back!",
    "You're unstoppable! Great job!"
  ];
  const message = messages[Math.floor(Math.random() * messages.length)];
  await speak(message, { pitch: 1.3, rate: 1.0 });
};

// Helper to check if number matches spoken text
export const matchesNumber = (spokenText, targetNumber) => {
  const cleaned = spokenText.toLowerCase().replace(/[^a-z0-9]/g, '');
  const target = String(targetNumber);
  
  // Check direct match
  if (cleaned === target) return true;
  
  // Check word form
  const numberWords = {
    'zero': '0', 'one': '1', 'two': '2', 'three': '3', 'four': '4',
    'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9',
    'ten': '10', 'eleven': '11', 'twelve': '12', 'thirteen': '13',
    'fourteen': '14', 'fifteen': '15', 'sixteen': '16', 'seventeen': '17',
    'eighteen': '18', 'nineteen': '19', 'twenty': '20', 'thirty': '30',
    'forty': '40', 'fifty': '50', 'sixty': '60', 'seventy': '70',
    'eighty': '80', 'ninety': '90', 'hundred': '100'
  };
  
  if (numberWords[cleaned] === target) return true;
  
  return false;
};

// Helper to check if word matches (fuzzy matching for kids' pronunciation)
export const matchesWord = (spokenText, targetWord) => {
  const spoken = spokenText.toLowerCase().replace(/[^a-z]/g, '');
  const target = targetWord.toLowerCase().replace(/[^a-z]/g, '');
  
  // Exact match
  if (spoken === target) return true;
  
  // Close match (allow 1-2 character differences for kids' pronunciation)
  if (spoken.length === target.length) {
    let differences = 0;
    for (let i = 0; i < spoken.length; i++) {
      if (spoken[i] !== target[i]) differences++;
    }
    return differences <= 2;
  }
  
  // Substring match for longer words
  if (target.length > 5 && (spoken.includes(target) || target.includes(spoken))) {
    return true;
  }
  
  return false;
};

// Initialize speech synthesis on page load
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  // Load voices
  window.speechSynthesis.getVoices();
  
  // Reload voices when they change (for some browsers)
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
  }
}
