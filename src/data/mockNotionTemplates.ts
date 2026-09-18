export interface NotionTemplate {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: 'Productivity' | 'Finance' | 'Student' | 'Life OS';
  downloads: string;
  rating: number;
  imageUrl: string;
  notionUrl: string;
}

export const NOTION_TEMPLATES: NotionTemplate[] = [
  {
    id: '1',
    slug: 'second-brain-os',
    title: 'Ultimate Second Brain OS',
    description: 'Capture notes, tasks, projects, and resources in a unified PARA method workspace designed for deep focus.',
    category: 'Productivity',
    downloads: '48.2k',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80',
    notionUrl: 'https://www.notion.so'
  },
  {
    id: '2',
    slug: 'ultimate-habit-tracker',
    title: 'Daily Habit & Routine Tracker',
    description: 'Build unbreakable daily habits with streak counters, weekly analytics, and morning routine checklists.',
    category: 'Life OS',
    downloads: '34.5k',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80',
    notionUrl: 'https://www.notion.so'
  },
  {
    id: '3',
    slug: 'monthly-budget-planner',
    title: 'Aesthetic Monthly Budget Planner',
    description: 'Track income, expenses, subscriptions, and savings goals with automated calculations and currency converters.',
    category: 'Finance',
    downloads: '29.1k',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    notionUrl: 'https://www.notion.so'
  },
  {
    id: '4',
    slug: 'student-hub-dashboard',
    title: 'Ultimate Student Hub Dashboard',
    description: 'Manage class notes, semester syllabi, exam countdowns, assignment trackers, and GPA calculators.',
    category: 'Student',
    downloads: '41.0k',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    notionUrl: 'https://www.notion.so'
  },
  {
    id: '5',
    slug: 'project-management-hub',
    title: 'Agile Project Management Hub',
    description: 'Kanban boards, sprint planners, client CRM, and meeting notes templates for freelancers and agencies.',
    category: 'Productivity',
    downloads: '22.8k',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    notionUrl: 'https://www.notion.so'
  },
  {
    id: '6',
    slug: 'daily-journal-mood-tracker',
    title: 'Minimalist Daily Journal & Mood Tracker',
    description: 'Guided gratitude prompts, daily reflections, sleep logs, and monthly sentiment trend graphs.',
    category: 'Life OS',
    downloads: '19.4k',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    notionUrl: 'https://www.notion.so'
  },
  {
    id: '7',
    slug: 'crypto-investment-tracker',
    title: 'Crypto & Stock Portfolio Tracker',
    description: 'Monitor asset allocations, DCA schedules, trade journals, and long-term financial milestones.',
    category: 'Finance',
    downloads: '15.6k',
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&w=800&q=80',
    notionUrl: 'https://www.notion.so'
  },
  {
    id: '8',
    slug: 'content-creator-planner',
    title: 'YouTube & TikTok Content Creator Planner',
    description: 'Idea incubator, script generator database, video production pipeline, and sponsorship tracker.',
    category: 'Productivity',
    downloads: '31.9k',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80',
    notionUrl: 'https://www.notion.so'
  },
  {
    id: '9',
    slug: 'university-study-planner',
    title: 'University Semester Study Planner',
    description: 'Flashcard databases, lecture schedule matrix, assignment deadline alerts, and citation manager.',
    category: 'Student',
    downloads: '27.4k',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    notionUrl: 'https://www.notion.so'
  }
];
