import React from 'react';
import { PrivacyPolicyPage } from '../../src/pages/PrivacyPolicyPage';

export default function Page() {
  return <PrivacyPolicyPage onNavigateHome={() => { if (typeof window !== 'undefined') window.location.href = '/'; }} />;
}
