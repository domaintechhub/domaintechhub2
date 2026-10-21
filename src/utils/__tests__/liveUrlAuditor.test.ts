import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { isValidWebUrl } from '../liveUrlAuditor';

describe('liveUrlAuditor utility - isValidWebUrl', () => {
  it('validates common domain names with or without protocol', () => {
    assert.equal(isValidWebUrl('domaintechhubs.com'), true);
    assert.equal(isValidWebUrl('https://domaintechhubs.com'), true);
    assert.equal(isValidWebUrl('http://subdomain.example.co.ke'), true);
    assert.equal(isValidWebUrl('https://shop.kenyabusiness.org/catalog?id=123'), true);
  });

  it('validates country code TLDs and modern gTLDs', () => {
    assert.equal(isValidWebUrl('mybusiness.co.ke'), true);
    assert.equal(isValidWebUrl('startup.africa'), true);
    assert.equal(isValidWebUrl('company.technology'), true);
    assert.equal(isValidWebUrl('portal.gov.ke'), true);
  });

  it('accepts localhost and IP addresses for development testing', () => {
    assert.equal(isValidWebUrl('localhost'), true);
    assert.equal(isValidWebUrl('127.0.0.1'), true);
    assert.equal(isValidWebUrl('192.168.1.1'), true);
  });

  it('rejects null, undefined, and empty string', () => {
    assert.equal(isValidWebUrl(null), false);
    assert.equal(isValidWebUrl(undefined), false);
    assert.equal(isValidWebUrl(''), false);
    assert.equal(isValidWebUrl('   '), false);
  });

  it('rejects plain text sentences and multi-word inputs', () => {
    assert.equal(isValidWebUrl('hello world'), false);
    assert.equal(isValidWebUrl('this is a random question'), false);
    assert.equal(isValidWebUrl('make my website faster please'), false);
  });

  it('rejects single-word non-domains without dots or TLDs', () => {
    assert.equal(isValidWebUrl('someword'), false);
    assert.equal(isValidWebUrl('website'), false);
  });

  it('rejects malformed domains with trailing or leading dots', () => {
    assert.equal(isValidWebUrl('.domain.com'), false);
    assert.equal(isValidWebUrl('domain.com.'), false);
    assert.equal(isValidWebUrl('domain..com'), false);
  });
});
