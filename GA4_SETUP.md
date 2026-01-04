# Google Analytics 4 Setup Guide

## How to Enable GA4 Tracking

### Step 1: Get Your GA4 Measurement ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new GA4 property (or use existing one)
3. Go to Admin → Data Streams
4. Select your web stream (or create new one)
5. Copy your **Measurement ID** (format: G-XXXXXXXXXX)

### Step 2: Add Your Measurement ID

Open `index.html` and replace the placeholder:

```html
<script>
  window.GA4_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your actual GA4 ID
</script>
```

Replace `'G-XXXXXXXXXX'` with your actual Measurement ID.

### Step 3: Deploy

Run:
```bash
npm run build
vercel --prod
```

## What's Being Tracked

The app automatically tracks:

### 📊 Standard Events:
- **Page Views** - Every page navigation
- **App Installed** - When users install the PWA
- **User Interactions** - Button clicks, navigation

### 🎮 Custom Events:
- **activity_complete** - When kids complete activities
  - Activity name
  - Score achieved
  - Timestamp

- **game_start** - When games begin
  - Game name
  - Timestamp

- **learning_progress** - Progress tracking
  - Category (alphabet, numbers, etc.)
  - Level
  - Progress percentage

- **achievement_unlocked** - When milestones are reached
  - Achievement name
  - Timestamp

- **time_spent** - Time spent on each page
  - Page name
  - Duration in seconds

- **error_occurred** - Error tracking
  - Error message
  - Error location

## Using Analytics in Components

Import the analytics utility:

```javascript
import { trackActivityComplete, trackGameStart } from '../utils/analytics';

// Track activity completion
trackActivityComplete('Alphabet Learning', 85);

// Track game start
trackGameStart('Pattern Matching Game');

// Track achievement
trackAchievement('Completed 10 Activities');
```

## Available Functions

All available in `src/utils/analytics.js`:

- `trackPageView(path)` - Track page views
- `trackEvent(eventName, eventParams)` - Custom events
- `trackActivityComplete(activityName, score)` - Activity completion
- `trackGameStart(gameName)` - Game started
- `trackLearningProgress(category, level, progress)` - Learning progress
- `trackInteraction(interactionType, elementName)` - User interactions
- `trackTimeSpent(pageName, timeInSeconds)` - Time tracking
- `trackAchievement(achievementName)` - Achievements
- `trackError(errorMessage, errorLocation)` - Error tracking
- `trackAppInstall()` - App installation

## Privacy Considerations

- No personally identifiable information (PII) is collected
- Complies with COPPA for children's apps
- No cookies are set by our code (GA4 handles its own)
- Consider adding a privacy policy page

## Testing

To test GA4 is working:
1. Replace the placeholder ID with your real ID
2. Build and deploy
3. Visit your site
4. Check GA4 Real-time reports
5. Navigate between pages to see events

## Troubleshooting

Check browser console for:
```
GA4 initialized with ID: G-XXXXXXXXXX
```

If not showing:
- Verify Measurement ID is correct
- Check browser console for errors
- Ensure ad blockers are disabled for testing
- Wait 24-48 hours for data to appear in GA4 reports
