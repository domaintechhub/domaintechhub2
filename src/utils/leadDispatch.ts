import { AGENCY_INFO } from '../data/portfolioData';

export interface LeadRecord {
  id: string;
  source: 'booking' | 'calculator' | 'audit' | 'domain' | 'ticket' | 'quick_contact';
  sourceTitle: string;
  fullName: string;
  email: string;
  phone: string;
  serviceOrItem: string;
  notes?: string;
  budgetOrPrice?: string;
  meetingDetails?: {
    date: string;
    time: string;
    type: string;
  };
  createdAt: string;
  status: 'new' | 'contacted' | 'closed';
}

const STORAGE_KEY = 'dth_all_leads';

export function saveLead(lead: Omit<LeadRecord, 'id' | 'createdAt' | 'status'>): LeadRecord {
  const newLead: LeadRecord = {
    ...lead,
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    status: 'new',
  };

  try {
    const existing: LeadRecord[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const updated = [newLead, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Also mirror to legacy keys for compatibility
    if (lead.source === 'booking') {
      const existingBookings = JSON.parse(localStorage.getItem('dth_bookings') || '[]');
      localStorage.setItem('dth_bookings', JSON.stringify([newLead, ...existingBookings]));
    }
  } catch (err) {
    console.error('Error saving lead to storage:', err);
  }

  return newLead;
}

export function getAllLeads(): LeadRecord[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export function deleteLead(id: string): void {
  try {
    const existing = getAllLeads();
    const updated = existing.filter(l => l.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error deleting lead:', err);
  }
}

export function updateLeadStatus(id: string, status: LeadRecord['status']): void {
  try {
    const existing = getAllLeads();
    const updated = existing.map(l => l.id === id ? { ...l, status } : l);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error updating lead status:', err);
  }
}

/**
 * Generates formatted text message for WhatsApp
 */
export function formatWhatsAppMessage(lead: Partial<LeadRecord>): string {
  let msg = `*Domain Tech Hub - New Inquiry*\n`;
  msg += `--------------------------------\n`;
  msg += `*Source:* ${lead.sourceTitle || lead.source || 'Website'}\n`;
  if (lead.fullName) msg += `*Name:* ${lead.fullName}\n`;
  if (lead.phone) msg += `*Phone:* ${lead.phone}\n`;
  if (lead.email) msg += `*Email:* ${lead.email}\n`;
  if (lead.serviceOrItem) msg += `*Service/Project:* ${lead.serviceOrItem}\n`;
  if (lead.budgetOrPrice) msg += `*Estimated Total:* ${lead.budgetOrPrice}\n`;

  if (lead.meetingDetails) {
    msg += `*Date & Time:* ${lead.meetingDetails.date} at ${lead.meetingDetails.time} (${lead.meetingDetails.type})\n`;
  }

  if (lead.notes) {
    msg += `\n*Details / Requirements:*\n${lead.notes}\n`;
  }
  msg += `--------------------------------\n`;
  msg += `Submitted via domaintechhub.com`;

  return msg;
}

/**
 * Triggers WhatsApp directly to the agency's primary number
 */
export function sendToWhatsApp(lead: Partial<LeadRecord>): void {
  const text = formatWhatsAppMessage(lead);
  const url = `https://wa.me/${AGENCY_INFO.whatsapp}?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

/**
 * Triggers an Email directly to domaintechhub@gmail.com
 */
export function sendToEmail(lead: Partial<LeadRecord>): void {
  const subject = `[Domain Tech Hub Inquiry] ${lead.serviceOrItem || lead.sourceTitle || 'New Customer Lead'}${lead.fullName ? ` - ${lead.fullName}` : ''}`;
  
  let body = `Hello Domain Tech Hub Team,\n\n`;
  body += `A new inquiry has been submitted through the website:\n\n`;
  body += `Source: ${lead.sourceTitle || lead.source || 'Website'}\n`;
  if (lead.fullName) body += `Client Name: ${lead.fullName}\n`;
  if (lead.phone) body += `Phone / WhatsApp: ${lead.phone}\n`;
  if (lead.email) body += `Email Address: ${lead.email}\n`;
  if (lead.serviceOrItem) body += `Service / Product: ${lead.serviceOrItem}\n`;
  if (lead.budgetOrPrice) body += `Budget / Investment: ${lead.budgetOrPrice}\n`;
  if (lead.meetingDetails) {
    body += `Requested Consultation: ${lead.meetingDetails.date} at ${lead.meetingDetails.time} (${lead.meetingDetails.type})\n`;
  }
  if (lead.notes) {
    body += `\nProject Notes & Requirements:\n${lead.notes}\n`;
  }
  body += `\nPlease reply directly to this email or contact the client via WhatsApp at ${lead.phone || 'their phone number'}.\n`;

  const mailtoUrl = `mailto:${AGENCY_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoUrl;
}

/**
 * Export all leads to a downloaded CSV file
 */
export function exportLeadsToCsv(): void {
  const leads = getAllLeads();
  if (leads.length === 0) {
    alert('No leads recorded in local store yet.');
    return;
  }

  const headers = ['ID', 'Date', 'Source', 'Client Name', 'Email', 'Phone', 'Service / Scope', 'Budget', 'Notes', 'Status'];
  const rows = leads.map(l => [
    `"${l.id}"`,
    `"${new Date(l.createdAt).toLocaleString()}"`,
    `"${l.sourceTitle || l.source}"`,
    `"${(l.fullName || '').replace(/"/g, '""')}"`,
    `"${(l.email || '').replace(/"/g, '""')}"`,
    `"${(l.phone || '').replace(/"/g, '""')}"`,
    `"${(l.serviceOrItem || '').replace(/"/g, '""')}"`,
    `"${(l.budgetOrPrice || '').replace(/"/g, '""')}"`,
    `"${(l.notes || '').replace(/"/g, '""').replace(/\n/g, ' ')}"`,
    `"${l.status}"`,
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `DomainTechHub_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
