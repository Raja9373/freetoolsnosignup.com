import React from 'react';
import { DisclaimerPage } from '../../src/pages/DisclaimerPage';

export default function Page() {
  return <DisclaimerPage onNavigateHome={() => { if (typeof window !== 'undefined') window.location.href = '/'; }} />;
}
