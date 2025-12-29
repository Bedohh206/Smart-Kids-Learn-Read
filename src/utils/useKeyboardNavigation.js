// Global keyboard navigation hook
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { announceShortcuts, announceHelp, keyboardShortcuts } from './accessibility';

export const useKeyboardNavigation = (pageName) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyPress = (event) => {
      // Don't interfere with typing in inputs
      if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return;
      }

      const key = event.key.toLowerCase();

      switch (key) {
        case 'h':
          navigate('/');
          break;
        case 'a':
          navigate('/alphabet');
          break;
        case 'n':
          navigate('/numbers');
          break;
        case 'm':
          navigate('/math');
          break;
        case 's':
          navigate('/spelling');
          break;
        case 'p':
          navigate('/phonics');
          break;
        case 'c':
          navigate('/shapes-colors');
          break;
        case 'w':
          navigate('/continents');
          break;
        case 'l':
          navigate('/leaderboard');
          break;
        case 'i':
          announceHelp(pageName);
          event.preventDefault();
          break;
        case '?':
          announceShortcuts();
          event.preventDefault();
          break;
        case 'escape':
          navigate(-1);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [navigate, pageName]);
};
