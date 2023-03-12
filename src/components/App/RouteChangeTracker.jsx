import React, { useEffect } from 'react';
import { getCookieConsentValue } from 'react-cookie-consent';

import ReactGA from 'react-ga';
import { useLocation } from 'react-router-dom';

import { GA_TRACKING_ID } from 'config/settings';

const RouteChangeTracker = () => {
  let location = useLocation();

  useEffect(() => {
    const isConsent = getCookieConsentValue();
    if (isConsent === 'true') {
      ReactGA.initialize(GA_TRACKING_ID, { testMode: true });
      ReactGA.pageview(location.pathname + location.search);
    }
  }, [location]);

  return <></>;
};

export default RouteChangeTracker;
