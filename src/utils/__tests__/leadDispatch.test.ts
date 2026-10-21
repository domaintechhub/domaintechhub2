import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { formatWhatsAppMessage, saveLead, getAllLeads } from '../leadDispatch';

describe('leadDispatch utility - formatWhatsAppMessage', () => {
  it('formats full lead record into readable WhatsApp message template', () => {
    const message = formatWhatsAppMessage({
      sourceTitle: 'Instant Quote Calculator',
      fullName: 'Amina Hassan',
      phone: '+254712345678',
      email: 'amina@example.co.ke',
      serviceOrItem: 'E-Commerce Store & M-Pesa STK Push',
      budgetOrPrice: 'KSh 120,000',
      meetingDetails: {
        date: '2026-06-25',
        time: '10:00 AM',
        type: 'Google Meet',
      },
      notes: 'Need WooCommerce catalog migration and KRA eTIMS invoice generation.',
    });

    assert.ok(message.includes('*Domain Tech Hub - New Inquiry*'));
    assert.ok(message.includes('*Name:* Amina Hassan'));
    assert.ok(message.includes('*Phone:* +254712345678'));
    assert.ok(message.includes('*Email:* amina@example.co.ke'));
    assert.ok(message.includes('*Service/Project:* E-Commerce Store & M-Pesa STK Push'));
    assert.ok(message.includes('*Estimated Total:* KSh 120,000'));
    assert.ok(message.includes('2026-06-25 at 10:00 AM (Google Meet)'));
    assert.ok(message.includes('WooCommerce catalog migration'));
    assert.ok(message.includes('Submitted via'));
  });

  it('handles partial lead data gracefully without missing field errors', () => {
    const minimalMessage = formatWhatsAppMessage({
      fullName: 'John Doe',
      phone: '+254700000000',
    });

    assert.ok(minimalMessage.includes('*Name:* John Doe'));
    assert.ok(minimalMessage.includes('*Phone:* +254700000000'));
    assert.ok(!minimalMessage.includes('*Email:*'));
    assert.ok(!minimalMessage.includes('*Estimated Total:*'));
  });
});

describe('leadDispatch utility - saveLead', () => {
  it('creates valid lead record with generated ID, status, and ISO timestamp', () => {
    const lead = saveLead({
      source: 'quick_contact',
      sourceTitle: 'Hero Consultation Form',
      fullName: 'David Kariuki',
      email: 'david@agency.ke',
      phone: '0711874667',
      serviceOrItem: 'Web Development',
    });

    assert.ok(lead.id.startsWith('lead_'));
    assert.equal(lead.status, 'new');
    assert.equal(lead.fullName, 'David Kariuki');
    assert.match(lead.createdAt, /^\d{4}-\d{2}-\d{2}T/);
  });

  it('getAllLeads returns clean array without crashing in non-browser environments', () => {
    const leads = getAllLeads();
    assert.ok(Array.isArray(leads));
  });
});
