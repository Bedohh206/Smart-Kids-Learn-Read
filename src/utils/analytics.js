// Google Analytics 4 utility functions

// Initialize GA4
export const initGA4 = (measurementId) => {
  if (!measurementId || typeof window === 'undefined') return;

  // Add GA4 script
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script1);

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  
  gtag('js', new Date());
  gtag('config', measurementId, {
    page_path: window.location.pathname,
  });
  
  console.log('GA4 initialized with ID:', measurementId);
};

// Track page views
export const trackPageView = (path) => {
  if (typeof window.gtag === 'undefined') return;
  
  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: document.title,
    page_location: window.location.href,
  });
};

// Track custom events
export const trackEvent = (eventName, eventParams = {}) => {
  if (typeof window.gtag === 'undefined') return;
  
  window.gtag('event', eventName, eventParams);
};

// Track activity completion
export const trackActivityComplete = (activityName, score = null) => {
  trackEvent('activity_complete', {
    activity_name: activityName,
    score: score,
    timestamp: new Date().toISOString(),
  });
};

// Track game started
export const trackGameStart = (gameName) => {
  trackEvent('game_start', {
    game_name: gameName,
    timestamp: new Date().toISOString(),
  });
};

// Track learning progress
export const trackLearningProgress = (category, level, progress) => {
  trackEvent('learning_progress', {
    category: category,
    level: level,
    progress_percentage: progress,
  });
};

// Track interaction
export const trackInteraction = (interactionType, elementName) => {
  trackEvent('user_interaction', {
    interaction_type: interactionType,
    element_name: elementName,
  });
};

// Track time spent
export const trackTimeSpent = (pageName, timeInSeconds) => {
  trackEvent('time_spent', {
    page_name: pageName,
    duration_seconds: timeInSeconds,
  });
};

// Track achievements
export const trackAchievement = (achievementName) => {
  trackEvent('achievement_unlocked', {
    achievement_name: achievementName,
    timestamp: new Date().toISOString(),
  });
};

// Track errors
export const trackError = (errorMessage, errorLocation) => {
  trackEvent('error_occurred', {
    error_message: errorMessage,
    error_location: errorLocation,
  });
};

// Track app install
export const trackAppInstall = () => {
  trackEvent('app_installed', {
    timestamp: new Date().toISOString(),
    platform: navigator.platform,
  });
};

export default {
  initGA4,
  trackPageView,
  trackEvent,
  trackActivityComplete,
  trackGameStart,
  trackLearningProgress,
  trackInteraction,
  trackTimeSpent,
  trackAchievement,
  trackError,
  trackAppInstall,
};
