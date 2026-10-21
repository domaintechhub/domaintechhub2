import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { detectDynamicIntent, DEFAULT_HERO_INTENT } from '../dynamicIntent';

describe('dynamicIntent utility - detectDynamicIntent', () => {
  it('returns DEFAULT_HERO_INTENT for empty, null, or short queries', () => {
    assert.deepEqual(detectDynamicIntent(undefined), DEFAULT_HERO_INTENT);
    assert.deepEqual(detectDynamicIntent(''), DEFAULT_HERO_INTENT);
    assert.deepEqual(detectDynamicIntent('a'), DEFAULT_HERO_INTENT);
    assert.deepEqual(detectDynamicIntent('   '), DEFAULT_HERO_INTENT);
  });

  it('detects e-commerce and M-Pesa intent', () => {
    const resultMpesa = detectDynamicIntent('m-pesa integration kenya');
    assert.equal(resultMpesa.intentKey, 'ecommerce');
    assert.equal(resultMpesa.calculatorPreselect, 'ecommerce-development');

    const resultDaraja = detectDynamicIntent('daraja stk push online store');
    assert.equal(resultDaraja.intentKey, 'ecommerce');

    const resultWoocommerce = detectDynamicIntent('woocommerce checkout');
    assert.equal(resultWoocommerce.intentKey, 'ecommerce');
  });

  it('detects SEO intent keywords', () => {
    const resultSeo = detectDynamicIntent('seo optimization nairobi');
    assert.equal(resultSeo.intentKey, 'seo');
    assert.equal(resultSeo.calculatorPreselect, 'seo-services');
  });

  it('dynamically adapts for custom business queries', () => {
    const result = detectDynamicIntent('boutique law firm');
    assert.ok(result.intentKey.startsWith('custom-'));
    assert.ok(result.titleHighlight.includes('Boutique Law Firm'));
    assert.equal(result.primaryButtonTarget, 'calculator');
  });
});
