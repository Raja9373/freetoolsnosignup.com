import React from 'react';
import { ContactPage } from '../../src/pages/ContactPage';

export default function Page() {
  return <ContactPage onNavigateHome={() => { if (typeof window !== 'undefined') window.location.href = '/'; }} />;
}
