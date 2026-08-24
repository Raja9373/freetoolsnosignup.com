import Papa from 'papaparse';
import { NotionColumnConfig, NotionPropertyType } from '../../types';

export const NOTION_COLOR_CLASSES: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  default: { bg: 'bg-slate-100', text: 'text-slate-800', border: 'border-slate-300', dot: 'bg-slate-500' },
  gray: { bg: 'bg-slate-200/70', text: 'text-slate-800', border: 'border-slate-300', dot: 'bg-slate-400' },
  brown: { bg: 'bg-amber-100', text: 'text-amber-900', border: 'border-amber-300', dot: 'bg-amber-700' },
  orange: { bg: 'bg-orange-100', text: 'text-orange-900', border: 'border-orange-300', dot: 'bg-orange-600' },
  yellow: { bg: 'bg-yellow-100', text: 'text-yellow-900', border: 'border-yellow-300', dot: 'bg-yellow-500' },
  green: { bg: 'bg-emerald-100', text: 'text-emerald-900', border: 'border-emerald-300', dot: 'bg-emerald-600' },
  blue: { bg: 'bg-blue-100', text: 'text-blue-900', border: 'border-blue-300', dot: 'bg-blue-600' },
  purple: { bg: 'bg-purple-100', text: 'text-purple-900', border: 'border-purple-300', dot: 'bg-purple-600' },
  pink: { bg: 'bg-pink-100', text: 'text-pink-900', border: 'border-pink-300', dot: 'bg-pink-600' },
  red: { bg: 'bg-rose-100', text: 'text-rose-900', border: 'border-rose-300', dot: 'bg-rose-600' },
};

/**
 * Generate a sample initial dummy value for a specific property type
 */
export function generateSampleValue(type: NotionPropertyType, col: NotionColumnConfig, rowIndex: number = 0): any {
  switch (type) {
    case 'title': {
      const samples = ['Quarterly Strategy Objective', 'Design System Token Update', 'Client Onboarding Kickoff', 'SEO Content Performance Audit', 'Weekly Sync Deliverables'];
      return samples[rowIndex % samples.length];
    }
    case 'select': {
      if (col.options && col.options.length > 0) {
        return col.options[rowIndex % col.options.length].name;
      }
      return 'In Progress';
    }
    case 'multi_select': {
      if (col.options && col.options.length > 0) {
        const first = col.options[0].name;
        const second = col.options.length > 1 ? col.options[1].name : undefined;
        return second ? [first, second] : [first];
      }
      return ['Important', 'General'];
    }
    case 'status': {
      if (col.options && col.options.length > 0) {
        return col.options[rowIndex % col.options.length].name;
      }
      return 'In Progress';
    }
    case 'date': {
      const d = new Date();
      d.setDate(d.getDate() + (rowIndex * 7));
      return d.toISOString().split('T')[0];
    }
    case 'person': {
      const names = ['Sarah Chen', 'David Kim', 'Alex Rivera', 'Elena Rostova', 'Michael Torres'];
      return names[rowIndex % names.length];
    }
    case 'number': {
      const numbers = [100, 250, 500, 1200, 45];
      return numbers[rowIndex % numbers.length];
    }
    case 'checkbox': {
      return rowIndex % 2 === 0;
    }
    case 'url': {
      return 'https://example.com/item-' + (rowIndex + 1);
    }
    case 'email': {
      return `contact${rowIndex + 1}@example.com`;
    }
    case 'phone': {
      return `+1 (555) 019-${1000 + rowIndex * 12}`;
    }
    case 'text': {
      return 'Detailed notes, feedback, and action specifications for this row item.';
    }
    case 'files': {
      return `document_v${rowIndex + 1}.pdf`;
    }
    case 'rating': {
      return (rowIndex % 5) + 1;
    }
    case 'progress': {
      return ((rowIndex * 25 + 25) % 100) || 100;
    }
    case 'created_time': {
      return new Date().toISOString().split('T')[0];
    }
    case 'last_edited_time': {
      return new Date().toISOString().split('T')[0];
    }
    case 'formula': {
      return `Calc #${rowIndex + 1}`;
    }
    default:
      return '';
  }
}

/**
 * Generate CSV text compatible with Notion 1-click import
 */
export function generateNotionCSV(columns: NotionColumnConfig[], rows: Record<string, any>[]): string {
  const header = columns.map(c => c.name);
  const data = rows.map(row => {
    return columns.map(col => {
      const val = row[col.id];
      if (val === undefined || val === null) return '';
      if (Array.isArray(val)) {
        // Multi-select in Notion CSV is comma-separated
        return val.join(', ');
      }
      if (typeof val === 'boolean') {
        return val ? 'Yes' : 'No';
      }
      return String(val);
    });
  });

  return Papa.unparse({
    fields: header,
    data: data
  });
}

/**
 * Generate Notion API compliant Database Schema JSON
 */
export function generateNotionJSON(title: string, icon: string, columns: NotionColumnConfig[], rows: Record<string, any>[]): string {
  const propertiesSchema: Record<string, any> = {};

  columns.forEach(col => {
    switch (col.type) {
      case 'title':
        propertiesSchema[col.name] = { title: {} };
        break;
      case 'select':
        propertiesSchema[col.name] = {
          select: {
            options: (col.options || []).map(opt => ({ name: opt.name, color: opt.color }))
          }
        };
        break;
      case 'multi_select':
        propertiesSchema[col.name] = {
          multi_select: {
            options: (col.options || []).map(opt => ({ name: opt.name, color: opt.color }))
          }
        };
        break;
      case 'status':
        propertiesSchema[col.name] = {
          status: {
            options: (col.options || []).map(opt => ({ name: opt.name, color: opt.color }))
          }
        };
        break;
      case 'date':
        propertiesSchema[col.name] = { date: {} };
        break;
      case 'person':
        propertiesSchema[col.name] = { people: {} };
        break;
      case 'number':
        propertiesSchema[col.name] = { number: { format: col.numberFormat || 'number' } };
        break;
      case 'checkbox':
        propertiesSchema[col.name] = { checkbox: {} };
        break;
      case 'url':
        propertiesSchema[col.name] = { url: {} };
        break;
      case 'email':
        propertiesSchema[col.name] = { email: {} };
        break;
      case 'phone':
        propertiesSchema[col.name] = { phone_number: {} };
        break;
      case 'text':
        propertiesSchema[col.name] = { rich_text: {} };
        break;
      case 'files':
        propertiesSchema[col.name] = { files: {} };
        break;
      case 'rating':
        propertiesSchema[col.name] = { number: { format: 'number' } };
        break;
      case 'progress':
        propertiesSchema[col.name] = { number: { format: 'percent' } };
        break;
      case 'created_time':
        propertiesSchema[col.name] = { created_time: {} };
        break;
      case 'last_edited_time':
        propertiesSchema[col.name] = { last_edited_time: {} };
        break;
      case 'formula':
        propertiesSchema[col.name] = { formula: { expression: col.formulaExpression || 'prop("Name")' } };
        break;
      default:
        propertiesSchema[col.name] = { rich_text: {} };
    }
  });

  const payload = {
    parent: { type: 'page_id', page_id: 'your-notion-page-id-here' },
    icon: { type: 'emoji', emoji: icon },
    title: [
      {
        type: 'text',
        text: { content: title }
      }
    ],
    properties: propertiesSchema,
    sample_records: rows.map(r => {
      const recordObj: Record<string, any> = {};
      columns.forEach(c => {
        recordObj[c.name] = r[c.id];
      });
      return recordObj;
    })
  };

  return JSON.stringify(payload, null, 2);
}

/**
 * Generate Markdown Table representation
 */
export function generateNotionMarkdown(title: string, icon: string, columns: NotionColumnConfig[], rows: Record<string, any>[]): string {
  let md = `# ${icon} ${title}\n\n`;
  md += `> Generated with FreeToolsNoSignup Notion Template Builder (100% Free)\n\n`;

  // Header row
  md += `| ${columns.map(c => c.name).join(' | ')} |\n`;
  md += `| ${columns.map(() => '---').join(' | ')} |\n`;

  // Rows
  rows.forEach(r => {
    const rowVals = columns.map(c => {
      const val = r[c.id];
      if (val === undefined || val === null) return '';
      if (Array.isArray(val)) return val.join(', ');
      if (typeof val === 'boolean') return val ? '✅' : '⬜';
      if (c.type === 'rating') return '★'.repeat(Math.max(1, Math.min(5, Number(val) || 1)));
      return String(val).replace(/\|/g, '\\|');
    });
    md += `| ${rowVals.join(' | ')} |\n`;
  });

  return md;
}

/**
 * Trigger real browser download with blob
 */
export function triggerFileDownload(content: string, filename: string, mimeType: string = 'text/csv;charset=utf-8;') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
