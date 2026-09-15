import { NotionPropertyType, NotionColumnConfig, NotionPresetTemplate, NotionSelectOption } from '../../types';

export interface PropertyTypeDefinition {
  type: NotionPropertyType;
  name: string;
  category: 'basic' | 'advanced' | 'meta';
  icon: string; // Lucide icon name or emoji
  description: string;
  defaultColumnName: string;
  defaultOptions?: NotionSelectOption[];
}

export const NOTION_PROPERTY_TYPES: PropertyTypeDefinition[] = [
  {
    type: 'title',
    name: 'Title (Name)',
    category: 'basic',
    icon: 'Heading',
    description: 'Primary identifier name for each row in the database.',
    defaultColumnName: 'Name',
  },
  {
    type: 'select',
    name: 'Select',
    category: 'basic',
    icon: 'Tag',
    description: 'Single choice tag with custom color options.',
    defaultColumnName: 'Status',
    defaultOptions: [
      { id: 'opt-1', name: 'Not Started', color: 'gray' },
      { id: 'opt-2', name: 'In Progress', color: 'blue' },
      { id: 'opt-3', name: 'Completed', color: 'green' }
    ]
  },
  {
    type: 'multi_select',
    name: 'Multi-Select',
    category: 'basic',
    icon: 'Tags',
    description: 'Multiple choice colored tags and badges.',
    defaultColumnName: 'Tags',
    defaultOptions: [
      { id: 'opt-1', name: 'Priority', color: 'red' },
      { id: 'opt-2', name: 'Design', color: 'purple' },
      { id: 'opt-3', name: 'Tech', color: 'blue' },
      { id: 'opt-4', name: 'Marketing', color: 'orange' }
    ]
  },
  {
    type: 'status',
    name: 'Status',
    category: 'basic',
    icon: 'CheckCircle2',
    description: 'Notion status group (To-do, In progress, Complete).',
    defaultColumnName: 'Stage',
    defaultOptions: [
      { id: 'st-1', name: 'To Do', color: 'gray' },
      { id: 'st-2', name: 'In Progress', color: 'blue' },
      { id: 'st-3', name: 'Under Review', color: 'yellow' },
      { id: 'st-4', name: 'Done', color: 'green' }
    ]
  },
  {
    type: 'date',
    name: 'Date',
    category: 'basic',
    icon: 'Calendar',
    description: 'Calendar date, deadline, or date range.',
    defaultColumnName: 'Due Date',
  },
  {
    type: 'person',
    name: 'Person (Assignee)',
    category: 'basic',
    icon: 'User',
    description: 'Team member or owner responsible for the task.',
    defaultColumnName: 'Assignee',
  },
  {
    type: 'number',
    name: 'Number',
    category: 'basic',
    icon: 'Hash',
    description: 'Quantities, currency, percentages, or estimates.',
    defaultColumnName: 'Amount',
  },
  {
    type: 'checkbox',
    name: 'Checkbox',
    category: 'basic',
    icon: 'CheckSquare',
    description: 'Boolean checkbox for completion and approvals.',
    defaultColumnName: 'Done',
  },
  {
    type: 'url',
    name: 'URL Link',
    category: 'basic',
    icon: 'Link',
    description: 'Clickable web links and references.',
    defaultColumnName: 'Link',
  },
  {
    type: 'email',
    name: 'Email',
    category: 'basic',
    icon: 'Mail',
    description: 'Email contact address.',
    defaultColumnName: 'Contact Email',
  },
  {
    type: 'phone',
    name: 'Phone',
    category: 'basic',
    icon: 'Phone',
    description: 'Phone numbers and hotlines.',
    defaultColumnName: 'Phone Number',
  },
  {
    type: 'text',
    name: 'Rich Text / Notes',
    category: 'basic',
    icon: 'AlignLeft',
    description: 'Multi-line descriptions, summaries, and notes.',
    defaultColumnName: 'Notes',
  },
  {
    type: 'files',
    name: 'Files & Media',
    category: 'basic',
    icon: 'Paperclip',
    description: 'File attachment URLs and media assets.',
    defaultColumnName: 'Attachments',
  },
  {
    type: 'rating',
    name: 'Rating (1-5 Stars)',
    category: 'advanced',
    icon: 'Star',
    description: 'Star ratings (1 to 5) for reviews and difficulty.',
    defaultColumnName: 'Priority Rating',
  },
  {
    type: 'progress',
    name: 'Progress Bar (%)',
    category: 'advanced',
    icon: 'Percent',
    description: 'Visual percentage completion bar (0-100%).',
    defaultColumnName: 'Progress',
  },
  {
    type: 'created_time',
    name: 'Created Time',
    category: 'meta',
    icon: 'Clock',
    description: 'Automatic timestamp when the record was created.',
    defaultColumnName: 'Created At',
  },
  {
    type: 'last_edited_time',
    name: 'Last Edited Time',
    category: 'meta',
    icon: 'History',
    description: 'Timestamp when the row was last modified.',
    defaultColumnName: 'Last Updated',
  },
  {
    type: 'formula',
    name: 'Formula / Calculation',
    category: 'advanced',
    icon: 'Cpu',
    description: 'Computed values, days remaining, or sums.',
    defaultColumnName: 'Days Left',
  }
];

export const NOTION_PRESETS: NotionPresetTemplate[] = [
  {
    id: 'preset-content-calendar',
    name: 'Content Calendar & Social Media Tracker',
    category: 'Marketing',
    icon: '📅',
    description: 'Plan, schedule, and track social posts across YouTube, LinkedIn, X/Twitter, and TikTok.',
    tags: ['Marketing', 'Social Media', 'Publishing'],
    columns: [
      { id: 'col-1', name: 'Post Title', type: 'title', required: true },
      { 
        id: 'col-2', 
        name: 'Platform', 
        type: 'select', 
        options: [
          { id: 'p1', name: 'YouTube', color: 'red' },
          { id: 'p2', name: 'LinkedIn', color: 'blue' },
          { id: 'p3', name: 'X / Twitter', color: 'gray' },
          { id: 'p4', name: 'TikTok', color: 'pink' },
          { id: 'p5', name: 'Instagram', color: 'purple' },
          { id: 'p6', name: 'Newsletter', color: 'orange' }
        ]
      },
      { 
        id: 'col-3', 
        name: 'Status', 
        type: 'status', 
        options: [
          { id: 's1', name: 'Idea / Backlog', color: 'gray' },
          { id: 's2', name: 'Drafting', color: 'yellow' },
          { id: 's3', name: 'In Review', color: 'orange' },
          { id: 's4', name: 'Scheduled', color: 'blue' },
          { id: 's5', name: 'Published', color: 'green' }
        ]
      },
      { id: 'col-4', name: 'Publish Date', type: 'date' },
      { id: 'col-5', name: 'Author', type: 'person' },
      { 
        id: 'col-6', 
        name: 'Tags', 
        type: 'multi_select',
        options: [
          { id: 't1', name: 'Tutorial', color: 'green' },
          { id: 't2', name: 'Product Launch', color: 'red' },
          { id: 't3', name: 'Thought Leadership', color: 'purple' },
          { id: 't4', name: 'Case Study', color: 'blue' }
        ]
      },
      { id: 'col-7', name: 'Draft Link', type: 'url' },
      { id: 'col-8', name: 'Estimated Views', type: 'number' },
      { id: 'col-9', name: 'Approved', type: 'checkbox' }
    ],
    initialRows: [
      {
        'col-1': '10 Essential AI Prompts for Product Managers',
        'col-2': 'LinkedIn',
        'col-3': 'Published',
        'col-4': '2025-03-15',
        'col-5': 'Alex Rivera',
        'col-6': ['Thought Leadership', 'Tutorial'],
        'col-7': 'https://docs.google.com/document/d/10prompts',
        'col-8': 25000,
        'col-9': true
      },
      {
        'col-1': 'How We Scaled from 0 to 100k Users (Deep Dive)',
        'col-2': 'YouTube',
        'col-3': 'Scheduled',
        'col-4': '2025-03-22',
        'col-5': 'Sarah Chen',
        'col-6': ['Case Study'],
        'col-7': 'https://youtube.com/watch?v=sample123',
        'col-8': 50000,
        'col-9': true
      },
      {
        'col-1': 'March Product Changelog & Feature Drop',
        'col-2': 'Newsletter',
        'col-3': 'Drafting',
        'col-4': '2025-03-28',
        'col-5': 'Alex Rivera',
        'col-6': ['Product Launch'],
        'col-7': 'https://substack.com/draft/march-update',
        'col-8': 12000,
        'col-9': false
      }
    ]
  },
  {
    id: 'preset-product-roadmap',
    name: 'Product Roadmap & Sprint Tracker',
    category: 'Engineering',
    icon: '🚀',
    description: 'Manage quarterly epics, sprint tasks, feature prioritization, and engineering assignments.',
    tags: ['Product', 'Agile', 'Engineering'],
    columns: [
      { id: 'col-1', name: 'Feature / Story', type: 'title', required: true },
      { 
        id: 'col-2', 
        name: 'Sprint / Epic', 
        type: 'select',
        options: [
          { id: 'sp1', name: 'Sprint 24.1', color: 'purple' },
          { id: 'sp2', name: 'Sprint 24.2', color: 'blue' },
          { id: 'sp3', name: 'Q2 Growth', color: 'orange' },
          { id: 'sp4', name: 'Infrastructure', color: 'gray' }
        ]
      },
      { 
        id: 'col-3', 
        name: 'Priority', 
        type: 'select',
        options: [
          { id: 'p1', name: 'P0 - Blocker', color: 'red' },
          { id: 'p2', name: 'P1 - High', color: 'orange' },
          { id: 'p3', name: 'P2 - Medium', color: 'yellow' },
          { id: 'p4', name: 'P3 - Low', color: 'gray' }
        ]
      },
      { 
        id: 'col-4', 
        name: 'Status', 
        type: 'status',
        options: [
          { id: 'st1', name: 'Backlog', color: 'gray' },
          { id: 'st2', name: 'In Development', color: 'blue' },
          { id: 'st3', name: 'QA / Testing', color: 'purple' },
          { id: 'st4', name: 'Shipped', color: 'green' }
        ]
      },
      { id: 'col-5', name: 'Lead Engineer', type: 'person' },
      { id: 'col-6', name: 'Target Release', type: 'date' },
      { id: 'col-7', name: 'Story Points', type: 'number' },
      { id: 'col-8', name: 'Progress', type: 'progress' },
      { id: 'col-9', name: 'PR / Figma Link', type: 'url' }
    ],
    initialRows: [
      {
        'col-1': 'One-Click OAuth 2.0 Google Sign-In',
        'col-2': 'Sprint 24.1',
        'col-3': 'P0 - Blocker',
        'col-4': 'Shipped',
        'col-5': 'David Kim',
        'col-6': '2025-03-10',
        'col-7': 5,
        'col-8': 100,
        'col-9': 'https://github.com/org/repo/pull/402'
      },
      {
        'col-1': 'Real-time Document Collaboration Engine',
        'col-2': 'Sprint 24.2',
        'col-3': 'P1 - High',
        'col-4': 'In Development',
        'col-5': 'Elena Rostova',
        'col-6': '2025-04-01',
        'col-7': 13,
        'col-8': 65,
        'col-9': 'https://figma.com/file/collab-engine'
      },
      {
        'col-1': 'Stripe Subscription Billing & Invoicing',
        'col-2': 'Sprint 24.2',
        'col-3': 'P1 - High',
        'col-4': 'QA / Testing',
        'col-5': 'David Kim',
        'col-6': '2025-03-25',
        'col-7': 8,
        'col-8': 85,
        'col-9': 'https://github.com/org/repo/pull/415'
      }
    ]
  },
  {
    id: 'preset-habit-tracker',
    name: 'Personal Habit Tracker & Daily Routine',
    category: 'Personal',
    icon: '⚡',
    description: 'Build daily consistency with streaks, weekly check-ins, difficulty ratings, and categories.',
    tags: ['Productivity', 'Self-Care', 'Habits'],
    columns: [
      { id: 'col-1', name: 'Habit Name', type: 'title', required: true },
      { 
        id: 'col-2', 
        name: 'Area of Life', 
        type: 'select',
        options: [
          { id: 'a1', name: 'Health & Fitness', color: 'green' },
          { id: 'a2', name: 'Deep Work', color: 'blue' },
          { id: 'a3', name: 'Mindfulness', color: 'purple' },
          { id: 'a4', name: 'Financial', color: 'orange' }
        ]
      },
      { 
        id: 'col-3', 
        name: 'Frequency', 
        type: 'select',
        options: [
          { id: 'f1', name: 'Daily', color: 'blue' },
          { id: 'f2', name: 'Weekdays', color: 'yellow' },
          { id: 'f3', name: '3x / Week', color: 'orange' }
        ]
      },
      { id: 'col-4', name: 'Mon', type: 'checkbox' },
      { id: 'col-5', name: 'Tue', type: 'checkbox' },
      { id: 'col-6', name: 'Wed', type: 'checkbox' },
      { id: 'col-7', name: 'Thu', type: 'checkbox' },
      { id: 'col-8', name: 'Fri', type: 'checkbox' },
      { id: 'col-9', name: 'Sat', type: 'checkbox' },
      { id: 'col-10', name: 'Sun', type: 'checkbox' },
      { id: 'col-11', name: 'Current Streak (Days)', type: 'number' },
      { id: 'col-12', name: 'Priority Rating', type: 'rating' }
    ],
    initialRows: [
      {
        'col-1': 'Morning 5km Run or 45m Gym Workout',
        'col-2': 'Health & Fitness',
        'col-3': 'Daily',
        'col-4': true,
        'col-5': true,
        'col-6': true,
        'col-7': true,
        'col-8': true,
        'col-9': false,
        'col-10': false,
        'col-11': 14,
        'col-12': 5
      },
      {
        'col-1': '2 Hours Focused Deep Work (No Phone)',
        'col-2': 'Deep Work',
        'col-3': 'Weekdays',
        'col-4': true,
        'col-5': true,
        'col-6': true,
        'col-7': true,
        'col-8': false,
        'col-9': false,
        'col-10': false,
        'col-11': 22,
        'col-12': 5
      },
      {
        'col-1': 'Read 20 Pages Non-Fiction Book',
        'col-2': 'Mindfulness',
        'col-3': 'Daily',
        'col-4': true,
        'col-5': true,
        'col-6': true,
        'col-7': true,
        'col-8': true,
        'col-9': true,
        'col-10': true,
        'col-11': 30,
        'col-12': 4
      }
    ]
  },
  {
    id: 'preset-job-crm',
    name: 'Job Application & Interview CRM',
    category: 'Career',
    icon: '💼',
    description: 'Track applications, recruiters, salary expectations, interview stages, and follow-ups.',
    tags: ['Career', 'Jobs', 'CRM'],
    columns: [
      { id: 'col-1', name: 'Company Name', type: 'title', required: true },
      { id: 'col-2', name: 'Position / Role', type: 'text' },
      { 
        id: 'col-3', 
        name: 'Stage', 
        type: 'status',
        options: [
          { id: 's1', name: 'Wishlist', color: 'gray' },
          { id: 's2', name: 'Applied', color: 'blue' },
          { id: 's3', name: 'Recruiter Screen', color: 'yellow' },
          { id: 's4', name: 'Technical Round', color: 'orange' },
          { id: 's5', name: 'Onsite / Final', color: 'purple' },
          { id: 's6', name: 'Offer Received', color: 'green' },
          { id: 's7', name: 'Rejected', color: 'red' }
        ]
      },
      { id: 'col-4', name: 'Application Date', type: 'date' },
      { id: 'col-5', name: 'Recruiter Contact', type: 'email' },
      { id: 'col-6', name: 'Salary Range ($k)', type: 'number' },
      { id: 'col-7', name: 'Job Post URL', type: 'url' },
      { id: 'col-8', name: 'Excitement Rating', type: 'rating' },
      { id: 'col-9', name: 'Next Action Due', type: 'date' }
    ],
    initialRows: [
      {
        'col-1': 'Stripe Inc.',
        'col-2': 'Senior Frontend Engineer',
        'col-3': 'Technical Round',
        'col-4': '2025-02-28',
        'col-5': 'recruiter@stripe.com',
        'col-6': 185000,
        'col-7': 'https://stripe.com/jobs/sr-fe',
        'col-8': 5,
        'col-9': '2025-03-18'
      },
      {
        'col-1': 'Linear',
        'col-2': 'Product Designer & UI',
        'col-3': 'Offer Received',
        'col-4': '2025-02-15',
        'col-5': 'careers@linear.app',
        'col-6': 195000,
        'col-7': 'https://linear.app/careers',
        'col-8': 5,
        'col-9': '2025-03-25'
      },
      {
        'col-1': 'Vercel',
        'col-2': 'Developer Relations Lead',
        'col-3': 'Recruiter Screen',
        'col-4': '2025-03-05',
        'col-5': 'talent@vercel.com',
        'col-6': 175000,
        'col-7': 'https://vercel.com/careers/devrel',
        'col-8': 4,
        'col-9': '2025-03-20'
      }
    ]
  },
  {
    id: 'preset-sales-crm',
    name: 'Client & CRM Sales Pipeline',
    category: 'Business',
    icon: '📊',
    description: 'Track inbound leads, deal value, pipeline stages, closing dates, and follow-up activities.',
    tags: ['Sales', 'Business', 'Revenue'],
    columns: [
      { id: 'col-1', name: 'Client / Account Name', type: 'title', required: true },
      { id: 'col-2', name: 'Deal Value ($)', type: 'number' },
      { 
        id: 'col-3', 
        name: 'Deal Stage', 
        type: 'select',
        options: [
          { id: 'd1', name: 'New Lead', color: 'gray' },
          { id: 'd2', name: 'Discovery Call', color: 'blue' },
          { id: 'd3', name: 'Proposal Sent', color: 'yellow' },
          { id: 'd4', name: 'Negotiation', color: 'orange' },
          { id: 'd5', name: 'Closed Won', color: 'green' },
          { id: 'd6', name: 'Closed Lost', color: 'red' }
        ]
      },
      { id: 'col-4', name: 'Key Contact Email', type: 'email' },
      { id: 'col-5', name: 'Contact Phone', type: 'phone' },
      { id: 'col-6', name: 'Account Executive', type: 'person' },
      { id: 'col-7', name: 'Expected Close Date', type: 'date' },
      { id: 'col-8', name: 'Probability (%)', type: 'progress' },
      { id: 'col-9', name: 'Contract Sent', type: 'checkbox' }
    ],
    initialRows: [
      {
        'col-1': 'Acme Global Enterprises',
        'col-2': 48000,
        'col-3': 'Proposal Sent',
        'col-4': 'sarah.j@acmeglobal.com',
        'col-5': '+1 (555) 234-5678',
        'col-6': 'Michael Torres',
        'col-7': '2025-04-15',
        'col-8': 75,
        'col-9': true
      },
      {
        'col-1': 'Nexus Fintech Labs',
        'col-2': 24000,
        'col-3': 'Discovery Call',
        'col-4': 'ceo@nexusfintech.io',
        'col-5': '+1 (555) 987-6543',
        'col-6': 'Michael Torres',
        'col-7': '2025-04-30',
        'col-8': 40,
        'col-9': false
      },
      {
        'col-1': 'Horizon Media Network',
        'col-2': 95000,
        'col-3': 'Closed Won',
        'col-4': 'procurement@horizonmedia.com',
        'col-5': '+1 (555) 456-7890',
        'col-6': 'Lisa Vance',
        'col-7': '2025-03-01',
        'col-8': 100,
        'col-9': true
      }
    ]
  },
  {
    id: 'preset-student-coursework',
    name: 'Student Coursework & Assignment Tracker',
    category: 'Education',
    icon: '📚',
    description: 'Keep track of college courses, homework deadlines, exam schedules, and grade weightings.',
    tags: ['Study', 'College', 'Homework'],
    columns: [
      { id: 'col-1', name: 'Assignment / Project', type: 'title', required: true },
      { 
        id: 'col-2', 
        name: 'Course / Subject', 
        type: 'select',
        options: [
          { id: 'c1', name: 'CS 101 - Algorithms', color: 'blue' },
          { id: 'c2', name: 'MATH 220 - Calculus', color: 'purple' },
          { id: 'c3', name: 'PHYS 150 - Mechanics', color: 'orange' },
          { id: 'c4', name: 'ENG 202 - Literature', color: 'green' }
        ]
      },
      { 
        id: 'col-3', 
        name: 'Status', 
        type: 'status',
        options: [
          { id: 's1', name: 'Not Started', color: 'gray' },
          { id: 's2', name: 'Researching', color: 'yellow' },
          { id: 's3', name: 'Writing Draft', color: 'blue' },
          { id: 's4', name: 'Submitted', color: 'green' }
        ]
      },
      { id: 'col-4', name: 'Due Date', type: 'date' },
      { id: 'col-5', name: 'Grade Weight (%)', type: 'number' },
      { id: 'col-6', name: 'Difficulty', type: 'rating' },
      { id: 'col-7', name: 'Submission Portal', type: 'url' },
      { id: 'col-8', name: 'Completed', type: 'checkbox' }
    ],
    initialRows: [
      {
        'col-1': 'Binary Search Tree & AVL Implementation',
        'col-2': 'CS 101 - Algorithms',
        'col-3': 'Writing Draft',
        'col-4': '2025-03-24',
        'col-5': 20,
        'col-6': 4,
        'col-7': 'https://canvas.university.edu/cs101/p3',
        'col-8': false
      },
      {
        'col-1': 'Multivariable Optimization Problem Set #4',
        'col-2': 'MATH 220 - Calculus',
        'col-3': 'Submitted',
        'col-4': '2025-03-18',
        'col-5': 15,
        'col-6': 3,
        'col-7': 'https://canvas.university.edu/math220/hw4',
        'col-8': true
      },
      {
        'col-1': 'Literary Analysis: Modernist Poetry Term Paper',
        'col-2': 'ENG 202 - Literature',
        'col-3': 'Researching',
        'col-4': '2025-04-10',
        'col-5': 30,
        'col-6': 3,
        'col-7': 'https://canvas.university.edu/eng202/final',
        'col-8': false
      }
    ]
  },
  {
    id: 'preset-finance-budget',
    name: 'Personal Finance & Monthly Expense Log',
    category: 'Finance',
    icon: '💰',
    description: 'Track daily expenses, categorizations, payment methods, tax deductibility, and receipts.',
    tags: ['Finance', 'Budget', 'Money'],
    columns: [
      { id: 'col-1', name: 'Expense Description', type: 'title', required: true },
      { id: 'col-2', name: 'Amount ($)', type: 'number' },
      { 
        id: 'col-3', 
        name: 'Category', 
        type: 'select',
        options: [
          { id: 'cat1', name: 'Housing & Rent', color: 'red' },
          { id: 'cat2', name: 'Groceries & Food', color: 'green' },
          { id: 'cat3', name: 'Tech & SaaS', color: 'blue' },
          { id: 'cat4', name: 'Transport & Gas', color: 'yellow' },
          { id: 'cat5', name: 'Entertainment', color: 'purple' },
          { id: 'cat6', name: 'Investments', color: 'orange' }
        ]
      },
      { 
        id: 'col-4', 
        name: 'Payment Method', 
        type: 'select',
        options: [
          { id: 'pm1', name: 'Credit Card', color: 'blue' },
          { id: 'pm2', name: 'Debit Card', color: 'green' },
          { id: 'pm3', name: 'Bank Transfer', color: 'purple' },
          { id: 'pm4', name: 'Cash', color: 'gray' }
        ]
      },
      { id: 'col-5', name: 'Date', type: 'date' },
      { id: 'col-6', name: 'Tax Deductible', type: 'checkbox' },
      { id: 'col-7', name: 'Receipt Link', type: 'url' },
      { id: 'col-8', name: 'Notes', type: 'text' }
    ],
    initialRows: [
      {
        'col-1': 'GitHub Pro & Claude API Subscription',
        'col-2': 42.50,
        'col-3': 'Tech & SaaS',
        'col-4': 'Credit Card',
        'col-5': '2025-03-01',
        'col-6': true,
        'col-7': 'https://drive.google.com/file/receipt-github.pdf',
        'col-8': 'Business engineering expense'
      },
      {
        'col-1': 'Whole Foods Monthly Family Groceries',
        'col-2': 185.20,
        'col-3': 'Groceries & Food',
        'col-4': 'Debit Card',
        'col-5': '2025-03-12',
        'col-6': false,
        'col-7': 'https://drive.google.com/file/receipt-wf.pdf',
        'col-8': 'Weekly stock up'
      },
      {
        'col-1': 'Apartment Monthly Rent & Utilities',
        'col-2': 1650.00,
        'col-3': 'Housing & Rent',
        'col-4': 'Bank Transfer',
        'col-5': '2025-03-05',
        'col-6': false,
        'col-7': '',
        'col-8': 'Paid on time'
      }
    ]
  },
  {
    id: 'preset-bug-tracker',
    name: 'Bug Tracker & Issue Resolution',
    category: 'Engineering',
    icon: '🐛',
    description: 'Track software bugs, severity levels, reproduction steps, environments, and fixes.',
    tags: ['Dev', 'Bugs', 'QA'],
    columns: [
      { id: 'col-1', name: 'Issue Summary', type: 'title', required: true },
      { 
        id: 'col-2', 
        name: 'Severity', 
        type: 'select',
        options: [
          { id: 'sv1', name: 'Critical (P0)', color: 'red' },
          { id: 'sv2', name: 'Major (P1)', color: 'orange' },
          { id: 'sv3', name: 'Minor (P2)', color: 'yellow' },
          { id: 'sv4', name: 'Cosmetic (P3)', color: 'gray' }
        ]
      },
      { 
        id: 'col-3', 
        name: 'Status', 
        type: 'status',
        options: [
          { id: 'st1', name: 'Open / Triaged', color: 'red' },
          { id: 'st2', name: 'In Progress', color: 'blue' },
          { id: 'st3', name: 'Fixed / PR Ready', color: 'yellow' },
          { id: 'st4', name: 'Verified & Closed', color: 'green' }
        ]
      },
      { 
        id: 'col-4', 
        name: 'Environment', 
        type: 'select',
        options: [
          { id: 'e1', name: 'Production', color: 'red' },
          { id: 'e2', name: 'Staging', color: 'yellow' },
          { id: 'e3', name: 'Localhost', color: 'blue' }
        ]
      },
      { id: 'col-5', name: 'Assigned Dev', type: 'person' },
      { id: 'col-6', name: 'Date Reported', type: 'date' },
      { id: 'col-7', name: 'Pull Request URL', type: 'url' },
      { id: 'col-8', name: 'Verified in QA', type: 'checkbox' }
    ],
    initialRows: [
      {
        'col-1': 'PDF Export fails on Safari iOS 17 when file exceeds 20MB',
        'col-2': 'Major (P1)',
        'col-3': 'Fixed / PR Ready',
        'col-4': 'Production',
        'col-5': 'Elena Rostova',
        'col-6': '2025-03-12',
        'col-7': 'https://github.com/org/repo/pull/512',
        'col-8': true
      },
      {
        'col-1': 'Payment webhook signature verification timeout',
        'col-2': 'Critical (P0)',
        'col-3': 'Verified & Closed',
        'col-4': 'Production',
        'col-5': 'David Kim',
        'col-6': '2025-03-08',
        'col-7': 'https://github.com/org/repo/pull/501',
        'col-8': true
      },
      {
        'col-1': 'Dark mode toggle flicker on initial page load',
        'col-2': 'Minor (P2)',
        'col-3': 'In Progress',
        'col-4': 'Staging',
        'col-5': 'Elena Rostova',
        'col-6': '2025-03-15',
        'col-7': 'https://github.com/org/repo/pull/520',
        'col-8': false
      }
    ]
  },
  {
    id: 'preset-reading-list',
    name: 'Reading List & Book Summaries',
    category: 'Personal',
    icon: '📖',
    description: 'Catalog books you want to read, currently reading, ratings, format, and key wisdom.',
    tags: ['Books', 'Learning', 'Personal'],
    columns: [
      { id: 'col-1', name: 'Book Title', type: 'title', required: true },
      { id: 'col-2', name: 'Author', type: 'text' },
      { 
        id: 'col-3', 
        name: 'Genre', 
        type: 'select',
        options: [
          { id: 'g1', name: 'Business & Startups', color: 'blue' },
          { id: 'g2', name: 'Psychology', color: 'purple' },
          { id: 'g3', name: 'Sci-Fi / Fiction', color: 'green' },
          { id: 'g4', name: 'Biography', color: 'orange' },
          { id: 'g5', name: 'Philosophy', color: 'yellow' }
        ]
      },
      { 
        id: 'col-4', 
        name: 'Status', 
        type: 'status',
        options: [
          { id: 's1', name: 'To Read', color: 'gray' },
          { id: 's2', name: 'Reading', color: 'blue' },
          { id: 's3', name: 'Completed', color: 'green' },
          { id: 's4', name: 'Abandoned', color: 'red' }
        ]
      },
      { id: 'col-5', name: 'Rating', type: 'rating' },
      { id: 'col-6', name: 'Date Finished', type: 'date' },
      { id: 'col-7', name: 'Pages / Audio Hours', type: 'number' },
      { id: 'col-8', name: 'Key Summary URL', type: 'url' },
      { id: 'col-9', name: 'Recommended', type: 'checkbox' }
    ],
    initialRows: [
      {
        'col-1': 'Atomic Habits',
        'col-2': 'James Clear',
        'col-3': 'Psychology',
        'col-4': 'Completed',
        'col-5': 5,
        'col-6': '2025-01-20',
        'col-7': 320,
        'col-8': 'https://jamesclear.com/atomic-habits',
        'col-9': true
      },
      {
        'col-1': 'Thinking in Systems',
        'col-2': 'Donella H. Meadows',
        'col-3': 'Philosophy',
        'col-4': 'Reading',
        'col-5': 5,
        'col-6': '',
        'col-7': 240,
        'col-8': '',
        'col-9': true
      },
      {
        'col-1': 'Chip War: The Fight for the World\'s Most Critical Technology',
        'col-2': 'Chris Miller',
        'col-3': 'Business & Startups',
        'col-4': 'Completed',
        'col-5': 5,
        'col-6': '2025-02-14',
        'col-7': 460,
        'col-8': '',
        'col-9': true
      }
    ]
  },
  {
    id: 'preset-meal-planner',
    name: 'Weekly Meal Planner & Grocery List',
    category: 'Lifestyle',
    icon: '🥗',
    description: 'Plan breakfasts, lunches, and dinners, store recipes, ingredients, and prep times.',
    tags: ['Food', 'Health', 'Cooking'],
    columns: [
      { id: 'col-1', name: 'Meal / Recipe', type: 'title', required: true },
      { 
        id: 'col-2', 
        name: 'Day of Week', 
        type: 'select',
        options: [
          { id: 'd1', name: 'Monday', color: 'blue' },
          { id: 'd2', name: 'Tuesday', color: 'green' },
          { id: 'd3', name: 'Wednesday', color: 'yellow' },
          { id: 'd4', name: 'Thursday', color: 'orange' },
          { id: 'd5', name: 'Friday', color: 'purple' },
          { id: 'd6', name: 'Weekend', color: 'pink' }
        ]
      },
      { 
        id: 'col-3', 
        name: 'Meal Type', 
        type: 'select',
        options: [
          { id: 'm1', name: 'Breakfast', color: 'yellow' },
          { id: 'm2', name: 'Lunch', color: 'green' },
          { id: 'm3', name: 'Dinner', color: 'blue' },
          { id: 'm4', name: 'Snack / Protein', color: 'orange' }
        ]
      },
      { id: 'col-4', name: 'Calories (kcal)', type: 'number' },
      { id: 'col-5', name: 'Prep Time (Min)', type: 'number' },
      { id: 'col-6', name: 'Recipe Link', type: 'url' },
      { id: 'col-7', name: 'Ingredients Bought', type: 'checkbox' },
      { id: 'col-8', name: 'Taste Rating', type: 'rating' }
    ],
    initialRows: [
      {
        'col-1': 'Avocado Toast with Poached Eggs & Microgreens',
        'col-2': 'Monday',
        'col-3': 'Breakfast',
        'col-4': 450,
        'col-5': 15,
        'col-6': 'https://food.com/avocado-poached-eggs',
        'col-7': true,
        'col-8': 5
      },
      {
        'col-1': 'Grilled Salmon Bowl with Quinoa & Steamed Broccoli',
        'col-2': 'Monday',
        'col-3': 'Dinner',
        'col-4': 680,
        'col-5': 30,
        'col-6': 'https://food.com/salmon-bowl',
        'col-7': true,
        'col-8': 5
      },
      {
        'col-1': 'Mediterranean Chickpea & Feta Salad',
        'col-2': 'Tuesday',
        'col-3': 'Lunch',
        'col-4': 520,
        'col-5': 10,
        'col-6': 'https://food.com/chickpea-salad',
        'col-7': false,
        'col-8': 4
      }
    ]
  },
  {
    id: 'preset-workout-log',
    name: 'Workout & Fitness Training Log',
    category: 'Fitness',
    icon: '🏋️',
    description: 'Track exercises, target muscle groups, sets, reps, load weight, and personal records.',
    tags: ['Fitness', 'Gym', 'Health'],
    columns: [
      { id: 'col-1', name: 'Exercise Name', type: 'title', required: true },
      { 
        id: 'col-2', 
        name: 'Target Muscle', 
        type: 'select',
        options: [
          { id: 'm1', name: 'Chest & Triceps', color: 'red' },
          { id: 'm2', name: 'Back & Biceps', color: 'blue' },
          { id: 'm3', name: 'Legs & Glutes', color: 'green' },
          { id: 'm4', name: 'Shoulders', color: 'yellow' },
          { id: 'm5', name: 'Core / Cardio', color: 'purple' }
        ]
      },
      { id: 'col-3', name: 'Sets', type: 'number' },
      { id: 'col-4', name: 'Reps Target', type: 'number' },
      { id: 'col-5', name: 'Weight (kg/lbs)', type: 'number' },
      { id: 'col-6', name: 'RPE Intensity (1-10)', type: 'number' },
      { id: 'col-7', name: 'Personal Record!', type: 'checkbox' },
      { id: 'col-8', name: 'Form Notes', type: 'text' }
    ],
    initialRows: [
      {
        'col-1': 'Barbell Bench Press',
        'col-2': 'Chest & Triceps',
        'col-3': 4,
        'col-4': 8,
        'col-5': 95,
        'col-6': 8,
        'col-7': true,
        'col-8': 'Paused at chest, smooth lockout'
      },
      {
        'col-1': 'Barbell Squat (High Bar)',
        'col-2': 'Legs & Glutes',
        'col-3': 5,
        'col-4': 5,
        'col-5': 130,
        'col-6': 9,
        'col-7': false,
        'col-8': 'Good depth, focus on knee stability'
      },
      {
        'col-1': 'Weighted Pull-Ups',
        'col-2': 'Back & Biceps',
        'col-3': 4,
        'col-4': 6,
        'col-5': 20,
        'col-6': 8,
        'col-7': true,
        'col-8': 'Strict form, chin over bar'
      }
    ]
  },
  {
    id: 'preset-travel-itinerary',
    name: 'Travel Itinerary & Trip Planner',
    category: 'Travel',
    icon: '✈️',
    description: 'Plan flight details, hotels, daily attractions, restaurant bookings, and travel budgets.',
    tags: ['Travel', 'Vacation', 'Planner'],
    columns: [
      { id: 'col-1', name: 'Activity / Destination', type: 'title', required: true },
      { id: 'col-2', name: 'City / Location', type: 'text' },
      { 
        id: 'col-3', 
        name: 'Category', 
        type: 'select',
        options: [
          { id: 't1', name: 'Flight / Transit', color: 'blue' },
          { id: 't2', name: 'Hotel / Airbnb', color: 'purple' },
          { id: 't3', name: 'Sightseeing', color: 'green' },
          { id: 't4', name: 'Restaurant / Dining', color: 'orange' },
          { id: 't5', name: 'Experience / Tour', color: 'yellow' }
        ]
      },
      { id: 'col-4', name: 'Date & Time', type: 'date' },
      { id: 'col-5', name: 'Cost ($)', type: 'number' },
      { id: 'col-6', name: 'Booking Confirmation', type: 'text' },
      { id: 'col-7', name: 'Confirmed & Paid', type: 'checkbox' },
      { id: 'col-8', name: 'Maps / Ticket URL', type: 'url' }
    ],
    initialRows: [
      {
        'col-1': 'Tokyo Skytree Sunset Observation Deck',
        'col-2': 'Tokyo, Japan',
        'col-3': 'Sightseeing',
        'col-4': '2025-05-12',
        'col-5': 35,
        'col-6': 'SKYTREE-88392-JP',
        'col-7': true,
        'col-8': 'https://tokyo-skytree.jp/tickets'
      },
      {
        'col-1': 'Shinkansen Bullet Train Tokyo to Kyoto',
        'col-2': 'Tokyo Station',
        'col-3': 'Flight / Transit',
        'col-4': '2025-05-15',
        'col-5': 110,
        'col-6': 'JR-PASS-772183',
        'col-7': true,
        'col-8': 'https://jr-central.co.jp'
      },
      {
        'col-1': 'Gion Traditional Kaiseki Dinner',
        'col-2': 'Kyoto, Japan',
        'col-3': 'Restaurant / Dining',
        'col-4': '2025-05-16',
        'col-5': 150,
        'col-6': 'TABLE-RESERVATION-991',
        'col-7': true,
        'col-8': 'https://tabelog.com'
      }
    ]
  },
  {
    id: 'preset-freelance-tracker',
    name: 'Freelance Invoicing & Time Tracker',
    category: 'Business',
    icon: '⏱️',
    description: 'Track billable client hours, hourly rates, project invoices, payment statuses, and deliverables.',
    tags: ['Freelance', 'Billing', 'Invoicing'],
    columns: [
      { id: 'col-1', name: 'Project / Deliverable', type: 'title', required: true },
      { id: 'col-2', name: 'Client Name', type: 'text' },
      { id: 'col-3', name: 'Hours Worked', type: 'number' },
      { id: 'col-4', name: 'Hourly Rate ($)', type: 'number' },
      { id: 'col-5', name: 'Total Fee ($)', type: 'number' },
      { 
        id: 'col-6', 
        name: 'Invoice Status', 
        type: 'status',
        options: [
          { id: 'i1', name: 'Drafting', color: 'gray' },
          { id: 'i2', name: 'Sent to Client', color: 'yellow' },
          { id: 'i3', name: 'Paid in Full', color: 'green' },
          { id: 'i4', name: 'Overdue', color: 'red' }
        ]
      },
      { id: 'col-7', name: 'Due Date', type: 'date' },
      { id: 'col-8', name: 'Invoice PDF URL', type: 'url' },
      { id: 'col-9', name: 'Tax Deducted', type: 'checkbox' }
    ],
    initialRows: [
      {
        'col-1': 'Next.js App Redesign & Performance Optimization',
        'col-2': 'Vanguard Media Group',
        'col-3': 32,
        'col-4': 120,
        'col-5': 3840,
        'col-6': 'Paid in Full',
        'col-7': '2025-02-28',
        'col-8': 'https://invoicing.co/inv-1002.pdf',
        'col-9': true
      },
      {
        'col-1': 'Figma Design System & Token Generation',
        'col-2': 'Fintech Startup XYZ',
        'col-3': 20,
        'col-4': 100,
        'col-5': 2000,
        'col-6': 'Sent to Client',
        'col-7': '2025-03-25',
        'col-8': 'https://invoicing.co/inv-1003.pdf',
        'col-9': false
      }
    ]
  },
  {
    id: 'preset-meeting-notes',
    name: 'Meeting Notes & Action Items',
    category: 'Productivity',
    icon: '📝',
    description: 'Structure agenda items, attendees, decisions made, and follow-up action deliverables.',
    tags: ['Productivity', 'Meetings', 'Work'],
    columns: [
      { id: 'col-1', name: 'Meeting Title', type: 'title', required: true },
      { id: 'col-2', name: 'Date', type: 'date' },
      { 
        id: 'col-3', 
        name: 'Meeting Type', 
        type: 'select',
        options: [
          { id: 'm1', name: '1-on-1 Sync', color: 'blue' },
          { id: 'm2', name: 'Sprint Planning', color: 'purple' },
          { id: 'm3', name: 'Client Presentation', color: 'orange' },
          { id: 'm4', name: 'All Hands', color: 'green' }
        ]
      },
      { id: 'col-4', name: 'Attendees', type: 'person' },
      { id: 'col-5', name: 'Key Decisions', type: 'text' },
      { id: 'col-6', name: 'Action Items Assigned', type: 'checkbox' },
      { id: 'col-7', name: 'Recording URL', type: 'url' }
    ],
    initialRows: [
      {
        'col-1': 'Q2 Product Strategy & Growth Alignment',
        'col-2': '2025-03-14',
        'col-3': 'Sprint Planning',
        'col-4': 'Alex, Elena, David, Sarah',
        'col-5': 'Approved expansion of Notion Builder and Dev Suite tools for March release.',
        'col-6': true,
        'col-7': 'https://zoom.us/rec/meeting-39210'
      },
      {
        'col-1': 'Weekly 1:1 Engineering Sync',
        'col-2': '2025-03-12',
        'col-3': '1-on-1 Sync',
        'col-4': 'Alex, David Kim',
        'col-5': 'Discussed performance optimizations for client-side PDF rendering.',
        'col-6': true,
        'col-7': ''
      }
    ]
  },
  {
    id: 'preset-okr-dashboard',
    name: 'Goal Setting & OKR Dashboard',
    category: 'Leadership',
    icon: '🎯',
    description: 'Track Objectives and Key Results, quarter target dates, owners, and confidence scores.',
    tags: ['OKR', 'Leadership', 'Strategy'],
    columns: [
      { id: 'col-1', name: 'Key Result / Objective', type: 'title', required: true },
      { 
        id: 'col-2', 
        name: 'Objective Pillar', 
        type: 'select',
        options: [
          { id: 'p1', name: 'User Growth', color: 'green' },
          { id: 'p2', name: 'Product Excellence', color: 'blue' },
          { id: 'p3', name: 'Monetization', color: 'orange' },
          { id: 'p4', name: 'Brand & Community', color: 'purple' }
        ]
      },
      { 
        id: 'col-3', 
        name: 'Quarter', 
        type: 'select',
        options: [
          { id: 'q1', name: 'Q1 2025', color: 'blue' },
          { id: 'q2', name: 'Q2 2025', color: 'yellow' },
          { id: 'q3', name: 'Q3 2025', color: 'orange' },
          { id: 'q4', name: 'Q4 2025', color: 'green' }
        ]
      },
      { id: 'col-4', name: 'Progress', type: 'progress' },
      { id: 'col-5', name: 'Confidence (1-5)', type: 'rating' },
      { id: 'col-6', name: 'Owner', type: 'person' },
      { id: 'col-7', name: 'Target Deadline', type: 'date' },
      { id: 'col-8', name: 'Goal Met', type: 'checkbox' }
    ],
    initialRows: [
      {
        'col-1': 'Reach 500k Monthly Active Users with Zero Ad Spend',
        'col-2': 'User Growth',
        'col-3': 'Q1 2025',
        'col-4': 88,
        'col-5': 5,
        'col-6': 'Sarah Chen',
        'col-7': '2025-03-31',
        'col-8': false
      },
      {
        'col-1': 'Maintain 99.9% Client-Side Tool Availability & Sub-100ms Latency',
        'col-2': 'Product Excellence',
        'col-3': 'Q1 2025',
        'col-4': 100,
        'col-5': 5,
        'col-6': 'David Kim',
        'col-7': '2025-03-31',
        'col-8': true
      }
    ]
  },
  {
    id: 'preset-inventory-stock',
    name: 'Inventory & Stock Management',
    category: 'Operations',
    icon: '📦',
    description: 'Track product SKU numbers, stock on hand, reorder thresholds, supplier contacts, and costs.',
    tags: ['Inventory', 'E-Commerce', 'Operations'],
    columns: [
      { id: 'col-1', name: 'Product Name', type: 'title', required: true },
      { id: 'col-2', name: 'SKU Code', type: 'text' },
      { 
        id: 'col-3', 
        name: 'Stock Status', 
        type: 'select',
        options: [
          { id: 's1', name: 'In Stock', color: 'green' },
          { id: 's2', name: 'Low Stock', color: 'yellow' },
          { id: 's3', name: 'Out of Stock', color: 'red' },
          { id: 's4', name: 'On Order', color: 'blue' }
        ]
      },
      { id: 'col-4', name: 'Units in Stock', type: 'number' },
      { id: 'col-5', name: 'Unit Cost ($)', type: 'number' },
      { id: 'col-6', name: 'Selling Price ($)', type: 'number' },
      { id: 'col-7', name: 'Supplier Email', type: 'email' },
      { id: 'col-8', name: 'Reorder Alert', type: 'checkbox' }
    ],
    initialRows: [
      {
        'col-1': 'Ergonomic Mechanical Keyboard (Wireless)',
        'col-2': 'KB-ERG-001',
        'col-3': 'In Stock',
        'col-4': 140,
        'col-5': 45.00,
        'col-6': 129.99,
        'col-7': 'supplier@ergotech.cn',
        'col-8': false
      },
      {
        'col-1': 'USB-C 10-in-1 Aluminum Hub Dock',
        'col-2': 'DOCK-USB-10',
        'col-3': 'Low Stock',
        'col-4': 18,
        'col-5': 18.50,
        'col-6': 59.99,
        'col-7': 'sales@donglelab.com',
        'col-8': true
      }
    ]
  },
  {
    id: 'preset-home-renovation',
    name: 'Home Renovation & Maintenance Planner',
    category: 'Home',
    icon: '🏡',
    description: 'Plan room renovations, contractor quotes, DIY budgets, materials, and due dates.',
    tags: ['Home', 'Renovation', 'DIY'],
    columns: [
      { id: 'col-1', name: 'Project / Repair Item', type: 'title', required: true },
      { 
        id: 'col-2', 
        name: 'Room / Area', 
        type: 'select',
        options: [
          { id: 'r1', name: 'Kitchen', color: 'orange' },
          { id: 'r2', name: 'Master Bathroom', color: 'blue' },
          { id: 'r3', name: 'Living Room', color: 'green' },
          { id: 'r4', name: 'Garden / Patio', color: 'purple' }
        ]
      },
      { id: 'col-3', name: 'Budget ($)', type: 'number' },
      { id: 'col-4', name: 'Actual Cost ($)', type: 'number' },
      { 
        id: 'col-5', 
        name: 'Status', 
        type: 'status',
        options: [
          { id: 'st1', name: 'Planning', color: 'gray' },
          { id: 'st2', name: 'Getting Quotes', color: 'yellow' },
          { id: 'st3', name: 'Underway', color: 'blue' },
          { id: 'st4', name: 'Completed', color: 'green' }
        ]
      },
      { id: 'col-6', name: 'Contractor Contact', type: 'phone' },
      { id: 'col-7', name: 'Target Completion', type: 'date' },
      { id: 'col-8', name: 'DIY Project', type: 'checkbox' }
    ],
    initialRows: [
      {
        'col-1': 'Install Quartz Kitchen Countertops',
        'col-2': 'Kitchen',
        'col-3': 3500,
        'col-4': 3200,
        'col-5': 'Completed',
        'col-6': '+1 (555) 302-8819',
        'col-7': '2025-02-15',
        'col-8': false
      },
      {
        'col-1': 'Build Cedar Raised Garden Beds',
        'col-2': 'Garden / Patio',
        'col-3': 400,
        'col-4': 350,
        'col-5': 'Underway',
        'col-6': '',
        'col-7': '2025-04-01',
        'col-8': true
      }
    ]
  },
  {
    id: 'preset-podcast-video',
    name: 'Podcast & YouTube Production Pipeline',
    category: 'Media',
    icon: '🎙️',
    description: 'Track episode ideas, recording dates, guest outreach, editing status, thumbnails, and sponsors.',
    tags: ['Podcast', 'YouTube', 'Video'],
    columns: [
      { id: 'col-1', name: 'Episode Title', type: 'title', required: true },
      { id: 'col-2', name: 'Episode #', type: 'number' },
      { 
        id: 'col-3', 
        name: 'Production Stage', 
        type: 'status',
        options: [
          { id: 'p1', name: 'Guest Outreach', color: 'gray' },
          { id: 'p2', name: 'Scripting', color: 'yellow' },
          { id: 'p3', name: 'Recorded', color: 'blue' },
          { id: 'p4', name: 'Audio/Video Editing', color: 'purple' },
          { id: 'p5', name: 'Ready to Publish', color: 'orange' },
          { id: 'p6', name: 'Published', color: 'green' }
        ]
      },
      { id: 'col-4', name: 'Guest Name', type: 'person' },
      { id: 'col-5', name: 'Recording Date', type: 'date' },
      { id: 'col-6', name: 'Sponsor Name', type: 'text' },
      { id: 'col-7', name: 'Script Doc URL', type: 'url' },
      { id: 'col-8', name: 'Thumbnail Approved', type: 'checkbox' }
    ],
    initialRows: [
      {
        'col-1': 'Ep 42: Building Local-First AI Web Apps with Zero Server Cost',
        'col-2': 42,
        'col-3': 'Published',
        'col-4': 'Guillermo Rauch',
        'col-5': '2025-03-01',
        'col-6': 'Supabase',
        'col-7': 'https://docs.google.com/doc/ep42-script',
        'col-8': true
      },
      {
        'col-1': 'Ep 43: How To Ace Technical System Design Interviews',
        'col-2': 43,
        'col-3': 'Audio/Video Editing',
        'col-4': 'Alex Xu',
        'col-5': '2025-03-12',
        'col-6': 'NordVPN',
        'col-7': 'https://docs.google.com/doc/ep43-script',
        'col-8': true
      }
    ]
  },
  {
    id: 'preset-gift-wishlist',
    name: 'Gift Ideas & Holiday Wishlist',
    category: 'Personal',
    icon: '🎁',
    description: 'Track gift ideas for birthdays and holidays, recipient preferences, store links, and budgets.',
    tags: ['Gifts', 'Holidays', 'Shopping'],
    columns: [
      { id: 'col-1', name: 'Gift Idea', type: 'title', required: true },
      { id: 'col-2', name: 'Recipient', type: 'text' },
      { 
        id: 'col-3', 
        name: 'Occasion', 
        type: 'select',
        options: [
          { id: 'o1', name: 'Birthday', color: 'pink' },
          { id: 'o2', name: 'Christmas / Holiday', color: 'red' },
          { id: 'o3', name: 'Anniversary', color: 'purple' },
          { id: 'o4', name: 'Thank You', color: 'green' }
        ]
      },
      { id: 'col-4', name: 'Estimated Price ($)', type: 'number' },
      { id: 'col-5', name: 'Store Link', type: 'url' },
      { id: 'col-6', name: 'Purchased', type: 'checkbox' },
      { id: 'col-7', name: 'Wrapped & Ready', type: 'checkbox' },
      { id: 'col-8', name: 'Desire Rating', type: 'rating' }
    ],
    initialRows: [
      {
        'col-1': 'Kindle Paperwhite 16GB Signature Edition',
        'col-2': 'Mom',
        'col-3': 'Birthday',
        'col-4': 149.99,
        'col-5': 'https://amazon.com/dp/B08N3TCP2F',
        'col-6': true,
        'col-7': true,
        'col-8': 5
      },
      {
        'col-1': 'Noise-Cancelling Sony WH-1000XM5 Headphones',
        'col-2': 'Brother',
        'col-3': 'Christmas / Holiday',
        'col-4': 348.00,
        'col-5': 'https://amazon.com/dp/sony-xm5',
        'col-6': false,
        'col-7': false,
        'col-8': 5
      }
    ]
  },
  {
    id: 'preset-daily-journal',
    name: 'Daily Reflection & Mood Journal',
    category: 'Mindfulness',
    typeTag: 'Logbook',
    icon: '🧘',
    description: 'Reflect on daily wins, gratitude, mood ratings, energy levels, and personal highlights.',
    tags: ['Journal', 'Mental Health', 'Mindfulness'],
    columns: [
      { id: 'col-1', name: 'Daily Theme / Entry', type: 'title', required: true },
      { id: 'col-2', name: 'Date', type: 'date' },
      { 
        id: 'col-3', 
        name: 'Mood', 
        type: 'select',
        options: [
          { id: 'm1', name: '⚡ Energetic & Joyful', color: 'green' },
          { id: 'm2', name: '🧘 Calm & Balanced', color: 'blue' },
          { id: 'm3', name: '🔥 Super Productive', color: 'orange' },
          { id: 'm4', name: '🌧️ Tired / Low Energy', color: 'gray' },
          { id: 'm5', name: '🌪️ Stressed', color: 'red' }
        ]
      },
      { id: 'col-4', name: 'Mood Rating', type: 'rating' },
      { id: 'col-5', name: 'What I Am Grateful For', type: 'text' },
      { id: 'col-6', name: 'Biggest Win Today', type: 'text' },
      { id: 'col-7', name: 'Meditation Completed', type: 'checkbox' }
    ],
    initialRows: [
      {
        'col-1': 'Launched Notion Builder Suite to 50k Users',
        'col-2': '2025-03-15',
        'col-3': '🔥 Super Productive',
        'col-4': 5,
        'col-5': 'Great health, supportive team, and quiet morning coffee',
        'col-6': 'Completed the entire 2,753-tool suite with flawless zero-error build',
        'col-7': true
      },
      {
        'col-1': 'Sunday Nature Walk & Deep Thinking',
        'col-2': '2025-03-16',
        'col-3': '🧘 Calm & Balanced',
        'col-4': 5,
        'col-5': 'Sunny weather and fresh mountain air',
        'col-6': 'Read 50 pages of book with zero screen distraction',
        'col-7': true
      }
    ]
  },
  {
    id: 'preset-subscription-tracker',
    name: 'SaaS & Recurring Subscriptions Tracker',
    category: 'Finance',
    typeTag: 'Tracker',
    icon: '💳',
    description: 'Track software tools, monthly billing cycles, renewal dates, and cancel reminders.',
    tags: ['Tracker', 'Subscriptions', 'Finance', 'SaaS'],
    columns: [
      { id: 'col-1', name: 'Service / Tool Name', type: 'title', required: true },
      { 
        id: 'col-2', 
        name: 'Billing Frequency', 
        type: 'select',
        options: [
          { id: 'b1', name: 'Monthly', color: 'blue' },
          { id: 'b2', name: 'Annual', color: 'green' },
          { id: 'b3', name: 'Quarterly', color: 'purple' }
        ]
      },
      { id: 'col-3', name: 'Cost ($)', type: 'number' },
      { id: 'col-4', name: 'Next Renewal Date', type: 'date' },
      { 
        id: 'col-5', 
        name: 'Status', 
        type: 'status',
        options: [
          { id: 's1', name: 'Active (Keep)', color: 'green' },
          { id: 's2', name: 'Under Review', color: 'yellow' },
          { id: 's3', name: 'Cancel Before Renewal', color: 'red' }
        ]
      },
      { id: 'col-6', name: 'Payment Card', type: 'text' },
      { id: 'col-7', name: 'Auto-Renew Enabled', type: 'checkbox' },
      { id: 'col-8', name: 'Login / Manage URL', type: 'url' }
    ],
    initialRows: [
      {
        'col-1': 'Notion Plus Team Plan',
        'col-2': 'Monthly',
        'col-3': 10,
        'col-4': '2025-04-01',
        'col-5': 'Active (Keep)',
        'col-6': 'Visa •••• 4242',
        'col-7': true,
        'col-8': 'https://notion.so/billing'
      },
      {
        'col-1': 'GitHub Copilot Business',
        'col-2': 'Monthly',
        'col-3': 19,
        'col-4': '2025-04-05',
        'col-5': 'Active (Keep)',
        'col-6': 'Mastercard •••• 8812',
        'col-7': true,
        'col-8': 'https://github.com/settings/billing'
      },
      {
        'col-1': 'Midjourney Pro AI',
        'col-2': 'Monthly',
        'col-3': 60,
        'col-4': '2025-03-29',
        'col-5': 'Cancel Before Renewal',
        'col-6': 'Visa •••• 4242',
        'col-7': false,
        'col-8': 'https://midjourney.com/account'
      }
    ]
  },
  {
    id: 'preset-recipe-vault',
    name: 'Recipe Vault & Kitchen Cookbook',
    category: 'Lifestyle',
    typeTag: 'Database',
    icon: '🍲',
    description: 'Catalog personal kitchen recipes, prep times, ingredients, dietary tags, and difficulty ratings.',
    tags: ['Database', 'Cooking', 'Food', 'Lifestyle'],
    columns: [
      { id: 'col-1', name: 'Recipe Name', type: 'title', required: true },
      { 
        id: 'col-2', 
        name: 'Meal Type', 
        type: 'select',
        options: [
          { id: 'm1', name: 'Breakfast', color: 'yellow' },
          { id: 'm2', name: 'Lunch', color: 'blue' },
          { id: 'm3', name: 'Dinner', color: 'orange' },
          { id: 'm4', name: 'Dessert & Snack', color: 'pink' }
        ]
      },
      { 
        id: 'col-3', 
        name: 'Dietary Tags', 
        type: 'multi_select',
        options: [
          { id: 'd1', name: 'High Protein', color: 'green' },
          { id: 'd2', name: 'Vegetarian', color: 'green' },
          { id: 'd3', name: 'Gluten-Free', color: 'purple' },
          { id: 'd4', name: 'Quick < 20 Min', color: 'red' }
        ]
      },
      { id: 'col-4', name: 'Prep Time (Mins)', type: 'number' },
      { id: 'col-5', name: 'Difficulty Rating', type: 'rating' },
      { id: 'col-6', name: 'Calories / Serving', type: 'number' },
      { id: 'col-7', name: 'Video / Source URL', type: 'url' },
      { id: 'col-8', name: 'Tried & Approved', type: 'checkbox' }
    ],
    initialRows: [
      {
        'col-1': 'Avocado Toast with Poached Egg & Chili Crisp',
        'col-2': 'Breakfast',
        'col-3': ['High Protein', 'Quick < 20 Min'],
        'col-4': 12,
        'col-5': 2,
        'col-6': 380,
        'col-7': 'https://cooking.nytimes.com/recipes/sample1',
        'col-8': true
      },
      {
        'col-1': 'Creamy Tuscan Garlic Salmon Bowl',
        'col-2': 'Dinner',
        'col-3': ['High Protein', 'Gluten-Free'],
        'col-4': 25,
        'col-5': 3,
        'col-6': 560,
        'col-7': 'https://cooking.nytimes.com/recipes/salmon-tuscan',
        'col-8': true
      }
    ]
  },
  {
    id: 'preset-client-contracts',
    name: 'Client Contracts & Invoicing Archive',
    category: 'Business',
    typeTag: 'Database',
    icon: '📑',
    description: 'Store client service agreements, contract values, signed statuses, and renewal milestones.',
    tags: ['Database', 'Contracts', 'Legal', 'Clients'],
    columns: [
      { id: 'col-1', name: 'Client / Company Name', type: 'title', required: true },
      { 
        id: 'col-2', 
        name: 'Contract Type', 
        type: 'select',
        options: [
          { id: 'ct1', name: 'Monthly Retainer', color: 'blue' },
          { id: 'ct2', name: 'Fixed Project Scope', color: 'green' },
          { id: 'ct3', name: 'Hourly Advisory', color: 'purple' },
          { id: 'ct4', name: 'NDA / Partner', color: 'gray' }
        ]
      },
      { id: 'col-3', name: 'Contract Value ($)', type: 'number' },
      { id: 'col-4', name: 'Effective Date', type: 'date' },
      { id: 'col-5', name: 'Expiry Date', type: 'date' },
      { 
        id: 'col-6', 
        name: 'Signing Status', 
        type: 'status',
        options: [
          { id: 'ss1', name: 'Drafting', color: 'gray' },
          { id: 'ss2', name: 'Sent for Signature', color: 'yellow' },
          { id: 'ss3', name: 'Signed & Active', color: 'green' },
          { id: 'ss4', name: 'Expired / Completed', color: 'blue' }
        ]
      },
      { id: 'col-7', name: 'DocuSign Link', type: 'url' },
      { id: 'col-8', name: 'Client Primary Email', type: 'email' }
    ],
    initialRows: [
      {
        'col-1': 'Acme Corp - Q2 Growth Retainer',
        'col-2': 'Monthly Retainer',
        'col-3': 7500,
        'col-4': '2025-04-01',
        'col-5': '2025-09-30',
        'col-6': 'Signed & Active',
        'col-7': 'https://docusign.net/contract/acme-2025',
        'col-8': 'legal@acmecorp.com'
      },
      {
        'col-1': 'Starlight Ventures - UX Overhaul',
        'col-2': 'Fixed Project Scope',
        'col-3': 18000,
        'col-4': '2025-03-20',
        'col-5': '2025-05-30',
        'col-6': 'Sent for Signature',
        'col-7': 'https://docusign.net/contract/starlight-ux',
        'col-8': 'partners@starlight.vc'
      }
    ]
  },
  {
    id: 'preset-wedding-event-planner',
    name: 'Wedding & Major Event Planner',
    category: 'Events',
    typeTag: 'Planner',
    icon: '💒',
    description: 'Master checklist for wedding ceremonies, catering vendor selections, seating charts, and budget.',
    tags: ['Planner', 'Wedding', 'Events', 'Checklist'],
    columns: [
      { id: 'col-1', name: 'Milestone / Deliverable', type: 'title', required: true },
      { 
        id: 'col-2', 
        name: 'Event Area', 
        type: 'select',
        options: [
          { id: 'ea1', name: 'Venue & Logistics', color: 'blue' },
          { id: 'ea2', name: 'Catering & Drinks', color: 'orange' },
          { id: 'ea3', name: 'Photography & Media', color: 'purple' },
          { id: 'ea4', name: 'Attire & Styling', color: 'pink' },
          { id: 'ea5', name: 'Music & Entertainment', color: 'green' }
        ]
      },
      { id: 'col-3', name: 'Target Due Date', type: 'date' },
      { id: 'col-4', name: 'Budget Allocated ($)', type: 'number' },
      { id: 'col-5', name: 'Actual Cost ($)', type: 'number' },
      { 
        id: 'col-6', 
        name: 'Stage', 
        type: 'status',
        options: [
          { id: 'st1', name: 'Researching Vendors', color: 'gray' },
          { id: 'st2', name: 'Contract Review', color: 'yellow' },
          { id: 'st3', name: 'Deposit Paid', color: 'blue' },
          { id: 'st4', name: 'Finalized & Confirmed', color: 'green' }
        ]
      },
      { id: 'col-7', name: 'Vendor Contact Phone', type: 'phone' },
      { id: 'col-8', name: 'Completed', type: 'checkbox' }
    ],
    initialRows: [
      {
        'col-1': 'Book Garden Terrace Reception Venue',
        'col-2': 'Venue & Logistics',
        'col-3': '2025-04-15',
        'col-4': 8000,
        'col-5': 7800,
        'col-6': 'Finalized & Confirmed',
        'col-7': '+1 (555) 492-1002',
        'col-8': true
      },
      {
        'col-1': 'Select 4-Course Dinner & Wine Tasting',
        'col-2': 'Catering & Drinks',
        'col-3': '2025-05-01',
        'col-4': 6500,
        'col-5': 6200,
        'col-6': 'Deposit Paid',
        'col-7': '+1 (555) 301-8840',
        'col-8': false
      }
    ]
  },
  {
    id: 'preset-hardware-asset-manager',
    name: 'Office Hardware & IT Asset Manager',
    category: 'Engineering',
    typeTag: 'Database',
    icon: '💻',
    description: 'Track laptops, monitors, serial numbers, warranty expirations, and team member assignments.',
    tags: ['Database', 'IT', 'Hardware', 'Operations'],
    columns: [
      { id: 'col-1', name: 'Asset Name & Model', type: 'title', required: true },
      { 
        id: 'col-2', 
        name: 'Category', 
        type: 'select',
        options: [
          { id: 'c1', name: 'Laptop / PC', color: 'blue' },
          { id: 'c2', name: '4K Monitor', color: 'purple' },
          { id: 'c3', name: 'Smartphone / Tablet', color: 'green' },
          { id: 'c4', name: 'Audio / Peripheral', color: 'orange' }
        ]
      },
      { id: 'col-3', name: 'Serial Number / Asset Tag', type: 'text' },
      { id: 'col-4', name: 'Assigned To', type: 'person' },
      { 
        id: 'col-5', 
        name: 'Condition & Status', 
        type: 'status',
        options: [
          { id: 'cs1', name: 'In Active Use', color: 'green' },
          { id: 'cs2', name: 'In Inventory (Available)', color: 'blue' },
          { id: 'cs3', name: 'Under Repair', color: 'yellow' },
          { id: 'cs4', name: 'Retired / Recycled', color: 'gray' }
        ]
      },
      { id: 'col-6', name: 'Purchase Price ($)', type: 'number' },
      { id: 'col-7', name: 'Warranty Expiry Date', type: 'date' },
      { id: 'col-8', name: 'AppleCare / Insurance Active', type: 'checkbox' }
    ],
    initialRows: [
      {
        'col-1': 'MacBook Pro 16" M3 Max 64GB',
        'col-2': 'Laptop / PC',
        'col-3': 'C02G8492MD6R',
        'col-4': 'Alex Rivera',
        'col-5': 'In Active Use',
        'col-6': 3499,
        'col-7': '2027-01-15',
        'col-8': true
      },
      {
        'col-1': 'Studio Display 27" 5K Nano-Texture',
        'col-2': '4K Monitor',
        'col-3': 'SD27-883019',
        'col-4': 'Sarah Chen',
        'col-5': 'In Active Use',
        'col-6': 1899,
        'col-7': '2026-11-20',
        'col-8': true
      },
      {
        'col-1': 'Dell UltraSharp 32" 4K USB-C Hub',
        'col-2': '4K Monitor',
        'col-3': 'DELL-U3223QE-04',
        'col-4': 'Available',
        'col-5': 'In Inventory (Available)',
        'col-6': 820,
        'col-7': '2026-08-10',
        'col-8': false
      }
    ]
  }
];

export const getPresetTypeTag = (preset: NotionPresetTemplate): 'Tracker' | 'Planner' | 'Logbook' | 'Database' => {
  if (preset.typeTag) return preset.typeTag;
  const name = preset.name.toLowerCase();
  const cat = preset.category.toLowerCase();
  const tags = preset.tags.map(t => t.toLowerCase());
  
  if (tags.includes('database') || cat.includes('database') || name.includes('database') || name.includes('vault') || name.includes('inventory') || name.includes('asset') || name.includes('archive') || name.includes('recipe')) {
    return 'Database';
  }
  if (tags.includes('planner') || name.includes('planner') || name.includes('calendar') || name.includes('roadmap') || name.includes('coursework') || name.includes('renovation') || name.includes('pipeline') || name.includes('okr') || name.includes('itinerary') || name.includes('wedding')) {
    return 'Planner';
  }
  if (tags.includes('logbook') || tags.includes('journal') || name.includes('journal') || name.includes('log') || name.includes('notes') || name.includes('budget') || name.includes('reading list')) {
    return 'Logbook';
  }
  return 'Tracker';
};
