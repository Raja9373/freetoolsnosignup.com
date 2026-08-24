import React, { useEffect } from 'react';
import { NotionTemplateBuilder } from '../../../src/components/tools/NotionTemplateBuilder';

export const metadata = {
  title: 'Free Notion Template Builder - Custom Columns, Your Title | Build & Download for Notion',
  description: 'Build custom Notion database with your own columns, title, properties. Choose columns, set options, download CSV to import to Notion. 100% free.',
};

export default function NotionTemplateBuilderPage() {
  useEffect(() => {
    document.title = metadata.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', metadata.description);
    }
  }, []);

  return (
    <NotionTemplateBuilder 
      isStandalonePage={true}
      onClose={() => {
        if (typeof window !== 'undefined') {
          window.location.href = '/';
        }
      }}
    />
  );
}
