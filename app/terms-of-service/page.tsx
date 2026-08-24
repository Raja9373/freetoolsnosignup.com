import React from 'react';
import { TermsPage } from '../../src/pages/TermsPage';

export default function Page() {
  return <TermsPage onNavigateHome={() => { if (typeof window !== 'undefined') window.location.href = '/'; }} />;
}
