import React from 'react';
import { AboutPage } from '../../src/pages/AboutPage';

export default function Page() {
  return <AboutPage onNavigateHome={() => { if (typeof window !== 'undefined') window.location.href = '/'; }} />;
}
