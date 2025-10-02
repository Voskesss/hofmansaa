import emailjs from '@emailjs/browser';

// EmailJS configuratie - centrale plek voor alle email instellingen
export const EMAIL_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_m87ypy9',
  TEMPLATE_TO_COMPANY: 'template_hhpbyg3', // Contact Us template (naar bedrijf)
  TEMPLATE_AUTOREPLY: 'template_wcmhqto',  // Auto-Reply template (naar gebruiker)
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'rBcqZk3mmSP0xkpQh',
  TO_EMAIL: 'website@hofmansautomotiveacademie.nl'
};

// Initialiseer EmailJS (roep dit aan in useEffect)
export const initEmailJS = () => {
  emailjs.init(EMAIL_CONFIG.PUBLIC_KEY);
};

// HTML template helpers
const createContactEmailHTML = (formData) => `
<div style="font-family: system-ui, sans-serif, Arial; font-size: 16px; max-width: 600px;">
  <a style="text-decoration: none; outline: none" href="https://hofmansautomotiveacademie.nl" target="_blank">
    <img style="height: 40px; vertical-align: middle; margin-bottom: 20px;" height="40px" src="https://voskesss.github.io/hofmansaa/assets/logo-hofmans-wb.png" alt="Hofmans Automotive Academie" />
  </a>
  
  <h2 style="color: #006BB2; margin-bottom: 10px;">📩 Nieuw Contactbericht</h2>
  <p style="padding-top: 16px; border-top: 2px solid #006BB2; color: #1e293b;">
    Er is een nieuw contactbericht ontvangen via de website.
  </p>
  
  <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <p style="margin: 8px 0;"><strong>👤 Naam:</strong> ${formData.name}</p>
    <p style="margin: 8px 0;"><strong>📧 Email:</strong> <a href="mailto:${formData.email}" style="color: #006BB2;">${formData.email}</a></p>
    <p style="margin: 8px 0;"><strong>📱 Telefoon:</strong> ${formData.phone || 'Niet opgegeven'}</p>
    <p style="margin: 8px 0; padding-top: 12px; border-top: 1px solid #e5e7eb;"><strong>💬 Bericht:</strong></p>
    <p style="margin: 8px 0; white-space: pre-wrap;">${formData.message}</p>
  </div>
  
  <p style="padding-top: 16px; border-top: 1px solid #eaeaea; color: #64748b; font-size: 14px;">
    Dit bericht is automatisch gegenereerd via het contactformulier op hofmansautomotiveacademie.nl
  </p>
</div>
`;

const createContactReplyHTML = (name) => `
<div style="font-family: system-ui, sans-serif, Arial; font-size: 16px; max-width: 600px;">
  <a style="text-decoration: none; outline: none" href="https://hofmansautomotiveacademie.nl" target="_blank">
    <img style="height: 40px; vertical-align: middle; margin-bottom: 20px;" height="40px" src="https://voskesss.github.io/hofmansaa/assets/logo-hofmans-wb.png" alt="Hofmans Automotive Academie" />
  </a>
  
  <h2 style="color: #006BB2; margin-bottom: 10px;">Bedankt voor je bericht! 🎉</h2>
  
  <p style="padding-top: 16px; border-top: 2px solid #006BB2;">Beste ${name},</p>
  
  <p>
    Hartelijk dank voor je bericht! We hebben je contactverzoek goed ontvangen en 
    zullen zo spoedig mogelijk contact met je opnemen.
  </p>
  
  <p>
    Wij streven ernaar om binnen <strong>2 werkdagen</strong> te reageren.
  </p>
  
  <div style="background-color: #f0f9ff; padding: 16px; border-left: 4px solid #006BB2; margin: 20px 0; border-radius: 4px;">
    <p style="margin: 0; color: #1e293b;">
      <strong>💡 Direct contact nodig?</strong><br/>
      Bel ons op: <a href="tel:+31246413222" style="color: #006BB2; text-decoration: none;">+31 (0)24 641 32 22</a>
    </p>
  </div>
  
  <p style="padding-top: 16px; border-top: 1px solid #eaeaea;">
    Met vriendelijke groet,<br />
    <strong>Het Hofmans Automotive Academie Team</strong>
  </p>
  
  <div style="margin-top: 20px; padding-top: 16px; border-top: 1px solid #eaeaea; color: #64748b; font-size: 14px;">
    <p style="margin: 4px 0;">📍 Boskantse Broekstraat 3, 6603 LD Wijchen</p>
    <p style="margin: 4px 0;">📧 <a href="mailto:support@hofmansautomotiveacademie.nl" style="color: #006BB2;">support@hofmansautomotiveacademie.nl</a></p>
    <p style="margin: 4px 0;">🌐 <a href="https://hofmansautomotiveacademie.nl" style="color: #006BB2;">hofmansautomotiveacademie.nl</a></p>
  </div>
</div>
`;

// Verstuur contact formulier
export const sendContactEmail = async (formData) => {
  console.log('=== EMAILJS DEBUG ===');
  console.log('Service ID:', EMAIL_CONFIG.SERVICE_ID);
  console.log('Public Key:', EMAIL_CONFIG.PUBLIC_KEY);
  console.log('Form Data:', formData);
  
  // Email naar bedrijf (info@hofmansautomotiveacademie.nl)
  const companyEmailParams = {
    to_email: EMAIL_CONFIG.TO_EMAIL,
    email_subject: `Nieuw contactbericht van ${formData.name}`,
    html_content: createContactEmailHTML(formData)
  };

  console.log('Versturen naar bedrijf:', companyEmailParams.to_email);
  console.log('Template:', EMAIL_CONFIG.TEMPLATE_TO_COMPANY);
  
  const response1 = await emailjs.send(
    EMAIL_CONFIG.SERVICE_ID,
    EMAIL_CONFIG.TEMPLATE_TO_COMPANY,
    companyEmailParams,
    EMAIL_CONFIG.PUBLIC_KEY
  );
  
  console.log('Response bedrijf:', response1);

  // Auto-reply naar gebruiker
  const replyParams = {
    to_email: formData.email,
    email_subject: 'Bedankt voor je bericht - Hofmans Automotive Academie',
    html_content: createContactReplyHTML(formData.name)
  };

  console.log('Versturen auto-reply naar:', replyParams.to_email);
  console.log('Template:', EMAIL_CONFIG.TEMPLATE_AUTOREPLY);
  
  const response2 = await emailjs.send(
    EMAIL_CONFIG.SERVICE_ID,
    EMAIL_CONFIG.TEMPLATE_AUTOREPLY,
    replyParams,
    EMAIL_CONFIG.PUBLIC_KEY
  );
  
  console.log('Response auto-reply:', response2);
  console.log('=== EMAILJS DEBUG END ===');
  
  return response2;
};

// Verstuur aanmeld formulier
export const sendAanmeldEmail = async (formData, selectedTrainings) => {
  const fullName = [
    formData.firstName,
    formData.middleName,
    formData.lastName
  ].filter(Boolean).join(' ');

  const templateParams = {
    from_name: fullName,
    first_name: formData.firstName,
    middle_name: formData.middleName || '-',
    last_name: formData.lastName,
    birth_date: formData.birthDate,
    birth_place: formData.birthPlace,
    bsn: formData.bsn,
    from_email: formData.email,
    phone: formData.phone,
    org_name: formData.orgName || 'Niet opgegeven',
    contact_name: formData.contactName || 'Niet opgegeven',
    contact_email: formData.contactEmail || 'Niet opgegeven',
    training: selectedTrainings,
    message: formData.message || 'Geen aanvullend bericht',
    to_email: EMAIL_CONFIG.TO_EMAIL
  };

  return await emailjs.send(
    EMAIL_CONFIG.SERVICE_ID,
    EMAIL_CONFIG.TEMPLATE_AANMELDEN,
    templateParams,
    EMAIL_CONFIG.PUBLIC_KEY
  );
};

// Verstuur automatische reply (optioneel)
export const sendAutoReply = async (toEmail, userName) => {
  const templateParams = {
    to_email: toEmail,
    user_name: userName
  };

  return await emailjs.send(
    EMAIL_CONFIG.SERVICE_ID,
    EMAIL_CONFIG.TEMPLATE_AUTOREPLY,
    templateParams,
    EMAIL_CONFIG.PUBLIC_KEY
  );
};
