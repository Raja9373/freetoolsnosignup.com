import React, { useEffect } from 'react';
import { NotionTemplateBuilder } from '../components/tools/NotionTemplateBuilder';

interface NotionBuilderPageProps {
  onNavigateHome: () => void;
}

export const NotionBuilderPage: React.FC<NotionBuilderPageProps> = ({ onNavigateHome }) => {
  useEffect(() => {
    document.title = 'Free Notion Template Builder - Custom Columns, Your Title | Build & Download for Notion';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Build custom Notion database with your own columns, title, properties. Choose columns, set options, download CSV to import to Notion. 100% free.');
    }
  }, []);

  return (
    <NotionTemplateBuilder
      isStandalonePage={true}
      onClose={onNavigateHome}
    />
  );
};
