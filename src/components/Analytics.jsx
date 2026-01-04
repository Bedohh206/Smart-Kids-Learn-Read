import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initGA4, trackPageView } from '../utils/analytics';

export default function Analytics() {
  const location = useLocation();

  // Initialize GA4 on mount
  useEffect(() => {
    const measurementId = window.GA4_MEASUREMENT_ID;
    
    // Only initialize if measurement ID is set and not the placeholder
    if (measurementId && measurementId !== 'G-XXXXXXXXXX') {
      initGA4(measurementId);
    } else {
      console.log('GA4: Measurement ID not configured. Set window.GA4_MEASUREMENT_ID in index.html');
    }
  }, []);

  // Track page views on route change
  useEffect(() => {
    const measurementId = window.GA4_MEASUREMENT_ID;
    
    if (measurementId && measurementId !== 'G-XXXXXXXXXX') {
      trackPageView(location.pathname + location.search);
    }
  }, [location]);

  return null;
}
