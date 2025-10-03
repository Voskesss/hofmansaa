import React, { useState } from 'react';
import { Box, TextField, Button, CircularProgress, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

/**
 * AddressPicker - Nederlandse adres autocomplete via postcode + huisnummer
 * Gebruikt gratis postcode.tech API (geen API key nodig voor basis gebruik)
 */
export default function AddressPicker({ formData, setFormData }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const lookupAddress = async () => {
    const { postalCode, houseNumber } = formData;
    
    // Validatie
    if (!postalCode || !houseNumber) {
      setError('Vul eerst postcode en huisnummer in');
      return;
    }

    // Clean postcode (verwijder spaties)
    const cleanPostcode = postalCode.replace(/\s+/g, '').toUpperCase();
    
    // Valideer Nederlands postcode format
    if (!/^[1-9][0-9]{3}[A-Z]{2}$/.test(cleanPostcode)) {
      setError('Ongeldige postcode (gebruik bijv. 1234AB)');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Gebruik Postcode API (gratis Nederlandse service)
      const response = await fetch(
        `https://postcode-api.apiwise.nl/v2/addresses/?postcode=${cleanPostcode}&number=${houseNumber}`
      );

      if (!response.ok) {
        throw new Error('Adres niet gevonden');
      }

      const result = await response.json();
      
      // Postcode API geeft array terug met addresses
      if (!result._embedded || !result._embedded.addresses || result._embedded.addresses.length === 0) {
        throw new Error('Geen adres gevonden');
      }
      
      const data = result._embedded.addresses[0];
      
      // Update formData met gevonden adres
      setFormData(prev => ({
        ...prev,
        street: data.street || '',
        city: data.city.label || '',
        postalCode: cleanPostcode,
        houseNumber: houseNumber
      }));

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);

    } catch (err) {
      setError('Adres niet gevonden. Controleer postcode en huisnummer of vul handmatig in.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      lookupAddress();
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 2, display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '2fr 1fr auto' }, gap: 2, alignItems: 'flex-start' }}>
        <TextField 
          label="Postcode"
          name="postalCode"
          value={formData.postalCode || ''}
          onChange={(e) => {
            setFormData(prev => ({ ...prev, postalCode: e.target.value }));
            setError('');
            setSuccess(false);
          }}
          onKeyPress={handleKeyPress}
          required
          autoComplete="postal-code"
          placeholder="1234 AB"
          inputProps={{ maxLength: 7 }}
        />
        
        <TextField 
          label="Huisnummer"
          name="houseNumber"
          value={formData.houseNumber || ''}
          onChange={(e) => {
            setFormData(prev => ({ ...prev, houseNumber: e.target.value }));
            setError('');
            setSuccess(false);
          }}
          onKeyPress={handleKeyPress}
          required
          autoComplete="off"
          placeholder="12"
        />
        
        <Button 
          variant="outlined"
          onClick={lookupAddress}
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : <SearchIcon />}
          sx={{ 
            height: '56px',
            whiteSpace: 'nowrap',
            minWidth: { xs: '100%', sm: 'auto' }
          }}
        >
          {loading ? 'Zoeken...' : 'Vind adres'}
        </Button>
      </Box>

      {error && (
        <Typography variant="body2" color="error" sx={{ mb: 2 }}>
          ⚠️ {error}
        </Typography>
      )}
      
      {success && (
        <Typography variant="body2" color="success.main" sx={{ mb: 2 }}>
          ✅ Adres gevonden en ingevuld!
        </Typography>
      )}

      <Box sx={{ mb: 2, display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr' }, gap: 2 }}>
        <TextField 
          label="Straatnaam"
          name="street"
          value={formData.street || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, street: e.target.value }))}
          required
          autoComplete="street-address"
          helperText={!formData.street ? "Gebruik 'Vind adres' knop of vul handmatig in" : ""}
        />
      </Box>

      <Box sx={{ mb: 2, display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr' }, gap: 2 }}>
        <TextField 
          label="Plaats"
          name="city"
          value={formData.city || ''}
          onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
          required
          autoComplete="address-level2"
          helperText={!formData.city ? "Gebruik 'Vind adres' knop of vul handmatig in" : ""}
        />
      </Box>
    </Box>
  );
}
