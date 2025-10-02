import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Simple EU countries subset to start with
const EU_COUNTRIES = [
  { code: 'NL' },
  { code: 'BE' },
  { code: 'DE' },
  { code: 'FR' },
  { code: 'LU' },
  { code: 'ES' },
  { code: 'IT' },
];

export default function AddressPicker({ value, onChange, apiBase = 'http://localhost:8000', defer = false }) {
  const { i18n } = useTranslation();
  const [local, setLocal] = useState(value || {});
  const v = defer ? (local || {}) : (value || {});
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  // Sync local when parent value changes externally (e.g., load/init)
  useEffect(() => {
    if (defer) setLocal(value || {});
  }, [defer, value]);

  const setField = useCallback((field, val) => {
    if (defer) {
      setLocal(prev => ({ ...(prev || {}), [field]: val }));
    } else {
      onChange?.({ ...(v || {}), [field]: val });
    }
    setStatus({ state: 'idle', message: '' });
  }, [defer, onChange, v]);

  const commitIfDeferred = useCallback(() => {
    if (defer) {
      onChange?.(local || {});
    }
  }, [defer, onChange, local]);

  const doLookup = useCallback(async () => {
    const country = (v.country_code || 'NL').toUpperCase();
    const postcode = (v.postcode || '').trim().replace(/\s+/g, '').toUpperCase();
    let number = (v.house_number || '').trim();
    let addition = (v.house_number_addition || '').trim();
    // NL: splits huisnummer met toevoeging automatisch, bv. "12A" -> 12 + A
    if (country === 'NL' && number) {
      const m = number.match(/^(\d+)[\s-]*([a-zA-Z]{1,3})?$/);
      if (m) {
        number = m[1];
        if (!addition && m[2]) addition = m[2].toUpperCase();
      }
    }
    if (!postcode || !number) {
      setStatus({ state: 'error', message: i18n.t('runner:address.fill_postcode_number', { defaultValue: 'Fill in postcode and house number' }) });
      return;
    }
    try {
      setStatus({ state: 'loading', message: i18n.t('runner:address.searching', { defaultValue: 'Searching…' }) });
      const url = new URL('/geo/lookup', apiBase);
      url.searchParams.set('country', country);
      url.searchParams.set('postcode', postcode);
      url.searchParams.set('number', number);
      if (addition) url.searchParams.set('addition', addition);
      const resp = await fetch(url.toString());
      if (!resp.ok) {
        const txt = await resp.text().catch(()=> '');
        console.error('[AddressPicker] lookup failed', resp.status, txt);
        throw new Error(`Lookup failed: HTTP ${resp.status}`);
      }
      const data = await resp.json();
      console.log('[AddressPicker] lookup result:', data);
      const next = {
        ...(v || {}),
        country_code: data.country_code || country,
        postcode: (data.postcode || postcode || '').replace(/\s+/g, '').toUpperCase(),
        house_number: data.house_number || number,
        house_number_addition: (data.addition || addition || '').toUpperCase(),
        street: data.street || v.street || '',
        city: data.city || v.city || '',
        lat: data.lat ?? v.lat ?? null,
        lon: data.lon ?? v.lon ?? null,
        geocode_confidence: data.confidence ?? 0.0,
        needs_review: false,
      };
      if (defer) {
        setLocal(next);
        onChange?.(next); // lookup is een bevestiging, committen is ok
      } else {
        onChange?.(next);
      }
      console.log('[AddressPicker] onChange sent street:', data.street || v.street || '');
      setStatus({ state: 'ok', message: i18n.t('runner:address.confirmed', { defaultValue: 'Address confirmed' }) });
    } catch (e) {
      setStatus({ state: 'error', message: i18n.t('runner:address.not_found', { defaultValue: 'Address not found, check input or type manually' }) });
      if (defer) setLocal(prev => ({ ...(prev || {}), needs_review: true }));
      else onChange?.({ ...(v || {}), needs_review: true });
    }
  }, [apiBase, onChange, v]);

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      doLookup();
    }
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{i18n.t('runner:address.country', { defaultValue: 'Country' })}</label>
          <select
            value={v.country_code || 'NL'}
            onChange={(e)=> setField('country_code', e.target.value)}
            onBlur={commitIfDeferred}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2" style={{ outlineColor: 'var(--role-primary)' }}
          >
            {EU_COUNTRIES.map(c => (
              <option key={c.code} value={c.code}>{i18n.t(`runner:countries.${c.code}`, { defaultValue: c.code })}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{i18n.t('runner:address.postcode', { defaultValue: 'Postcode' })}</label>
          <input
            type="text"
            value={(v.postcode || '').toUpperCase().replace(/\s+/g, '')}
            onChange={(e)=> setField('postcode', e.target.value)}
            placeholder={v.country_code === 'NL' ? i18n.t('runner:address.postcode_placeholder_nl', { defaultValue: '1234AB' }) : ''}
            onBlur={commitIfDeferred}
            onKeyDown={onKeyDown}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2" style={{ outlineColor: 'var(--role-primary)' }}
          />
        </div>
        <div className="grid grid-cols-5 gap-2 items-end">
          <div className="col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">{i18n.t('runner:address.house_number', { defaultValue: 'House number' })}</label>
            <input
              type="text"
              value={v.house_number || ''}
              onChange={(e)=> setField('house_number', e.target.value)}
              onBlur={commitIfDeferred}
              onKeyDown={onKeyDown}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2" style={{ outlineColor: 'var(--role-primary)' }}
            />
          </div>
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">{i18n.t('runner:address.addition', { defaultValue: 'Addition' })}</label>
            <input
              type="text"
              value={v.house_number_addition || ''}
              onChange={(e)=> setField('house_number_addition', e.target.value)}
              onBlur={commitIfDeferred}
              onKeyDown={onKeyDown}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2" style={{ outlineColor: 'var(--role-primary)' }}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <button type="button" onClick={doLookup} className="btn-role rounded-lg">{i18n.t('runner:address.lookup', { defaultValue: 'Lookup address' })}</button>
        {status.state === 'loading' && <span className="text-sm text-gray-600">{status.message}</span>}
        {status.state === 'ok' && <span className="text-sm text-role">{status.message}</span>}
        {status.state === 'error' && <span className="text-sm text-red-600">{status.message}</span>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{i18n.t('runner:address.street_editable', { defaultValue: 'Street (manually editable)' })}</label>
          <input
            type="text"
            value={v.street || ''}
            onChange={(e)=> { setField('street', e.target.value); console.log('[AddressPicker] manual street edit ->', e.target.value); }}
            onBlur={commitIfDeferred}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2" style={{ outlineColor: 'var(--role-primary)' }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{i18n.t('runner:address.city_editable', { defaultValue: 'City (manually editable)' })}</label>
          <input
            type="text"
            value={v.city || ''}
            onChange={(e)=> setField('city', e.target.value)}
            onBlur={commitIfDeferred}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2" style={{ outlineColor: 'var(--role-primary)' }}
          />
        </div>
      </div>

      {/* Hidden coords for parent save */}
      <input type="hidden" value={v.lat || ''} readOnly />
      <input type="hidden" value={v.lon || ''} readOnly />
    </div>
  );
}
