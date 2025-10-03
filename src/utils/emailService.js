import emailjs from '@emailjs/browser';

// EmailJS configuratie - centrale plek voor alle email instellingen
export const EMAIL_CONFIG = {
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_m87ypy9',
  TEMPLATE_TO_COMPANY: 'template_hhpbyg3', // Contact Us template (naar bedrijf)
  TEMPLATE_AUTOREPLY: 'template_wcmhqto',  // Auto-Reply template (naar gebruiker)
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'rEq2RCCaocFAkpk72',
  TO_EMAIL: 'support@hofmansautomotiveacademie.nl'
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
    <p style="margin: 8px 0;"><strong>🎓 Interesse in training:</strong> ${formData.training || 'Niet opgegeven'}</p>
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
  console.log('Template Company:', EMAIL_CONFIG.TEMPLATE_TO_COMPANY);
  console.log('Template Reply:', EMAIL_CONFIG.TEMPLATE_AUTOREPLY);
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

// HTML template voor aanmelding naar bedrijf (Excel-vriendelijk)
const createAanmeldEmailHTML = (formData, selectedTrainings, sessionInfo = null) => {
  const fullName = [formData.firstName, formData.middleName, formData.lastName].filter(Boolean).join(' ');
  
  return `
<div style="font-family: system-ui, sans-serif, Arial; font-size: 16px; max-width: 600px;">
  <h2 style="color: #006BB2; margin-bottom: 10px;">📝 Nieuwe Trainingsaanmelding</h2>
  <p style="padding-top: 16px; border-top: 2px solid #006BB2; color: #1e293b;">
    Er is een nieuwe aanmelding ontvangen via de website.
  </p>
  
  <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <h3 style="margin-top: 0; color: #006BB2;">Persoonlijke Gegevens</h3>
    <p style="margin: 8px 0;"><strong>Voornaam:</strong> ${formData.firstName}</p>
    <p style="margin: 8px 0;"><strong>Tussenvoegsel:</strong> ${formData.middleName || '-'}</p>
    <p style="margin: 8px 0;"><strong>Achternaam:</strong> ${formData.lastName}</p>
    <p style="margin: 8px 0;"><strong>Geboortedatum:</strong> ${formData.birthDate}</p>
    <p style="margin: 8px 0;"><strong>Geboorteplaats:</strong> ${formData.birthPlace}</p>
    <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${formData.email}">${formData.email}</a></p>
    <p style="margin: 8px 0;"><strong>Telefoon:</strong> ${formData.phone}</p>
  </div>

  <div style="background-color: #fff7ed; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <h3 style="margin-top: 0; color: #ff6b35;">Adresgegevens</h3>
    <p style="margin: 8px 0;"><strong>Straat + Huisnummer:</strong> ${formData.street} ${formData.houseNumber}</p>
    <p style="margin: 8px 0;"><strong>Postcode:</strong> ${formData.postalCode}</p>
    <p style="margin: 8px 0;"><strong>Plaats:</strong> ${formData.city}</p>
    <p style="margin: 8px 0;"><strong>Land:</strong> ${formData.country}</p>
  </div>

  <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <h3 style="margin-top: 0; color: #006BB2;">Organisatie</h3>
    <p style="margin: 8px 0;"><strong>Organisatie:</strong> ${formData.orgName || 'Niet opgegeven'}</p>
    <p style="margin: 8px 0;"><strong>Contactpersoon:</strong> ${formData.contactName || 'Niet opgegeven'}</p>
    <p style="margin: 8px 0;"><strong>Contact Email:</strong> ${formData.contactEmail || 'Niet opgegeven'}</p>
  </div>

  <div style="background-color: #fff7ed; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <h3 style="margin-top: 0; color: #ff6b35;">Geselecteerde Training(en)</h3>
    <p style="margin: 8px 0; font-size: 18px;"><strong>${selectedTrainings}</strong></p>
  </div>

  ${sessionInfo ? `
  <div style="background-color: #dcfce7; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <h3 style="margin-top: 0; color: #16a34a;">📅 Geselecteerde Sessie</h3>
    <p style="margin: 8px 0;"><strong>Datum:</strong> ${sessionInfo.date}</p>
    <p style="margin: 8px 0;"><strong>Tijd:</strong> ${sessionInfo.time}</p>
    <p style="margin: 8px 0;"><strong>Locatie:</strong> ${sessionInfo.location}</p>
    <p style="margin: 8px 0;"><strong>Training:</strong> ${sessionInfo.training}</p>
  </div>
  ` : ''}

  ${formData.message ? `
  <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <h3 style="margin-top: 0; color: #006BB2;">Aanvullend Bericht</h3>
    <p style="margin: 8px 0; white-space: pre-wrap;">${formData.message}</p>
  </div>
  ` : ''}

  <hr style="margin: 30px 0; border: none; border-top: 1px solid #eaeaea;">
  
  <h3 style="color: #006BB2;">📊 Excel Copy-Paste Data:</h3>
  <p style="color: #64748b; font-size: 14px; margin-bottom: 10px;">Selecteer de onderstaande tabel en kopieer/plak in Excel. Elke kolom komt automatisch in een aparte cel.</p>
  
  <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; font-size: 11px; background-color: #f9fafb;">
    <thead>
      <tr style="background-color: #006BB2; color: white;">
        <th>Voornaam</th>
        <th>Tussenvoegsel</th>
        <th>Achternaam</th>
        <th>Geboortedatum</th>
        <th>Geboorteplaats</th>
        <th>Email</th>
        <th>Telefoon</th>
        <th>Straat</th>
        <th>Huisnr</th>
        <th>Postcode</th>
        <th>Plaats</th>
        <th>Land</th>
        <th>Organisatie</th>
        <th>Contactpersoon</th>
        <th>Contact Email</th>
        <th>Training</th>
        <th>Bericht</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background-color: white;">
        <td>${formData.firstName}</td>
        <td>${formData.middleName || ''}</td>
        <td>${formData.lastName}</td>
        <td>${formData.birthDate}</td>
        <td>${formData.birthPlace}</td>
        <td>${formData.email}</td>
        <td>${formData.phone}</td>
        <td>${formData.street}</td>
        <td>${formData.houseNumber}</td>
        <td>${formData.postalCode}</td>
        <td>${formData.city}</td>
        <td>${formData.country}</td>
        <td>${formData.orgName || ''}</td>
        <td>${formData.contactName || ''}</td>
        <td>${formData.contactEmail || ''}</td>
        <td>${selectedTrainings}</td>
        <td>${formData.message || ''}</td>
      </tr>
    </tbody>
  </table>
</div>
`;
};

// HTML template voor aanmelding auto-reply
const createAanmeldReplyHTML = (name, selectedTrainings, sessionInfo = null) => `
<div style="font-family: system-ui, sans-serif, Arial; font-size: 16px; max-width: 600px;">
  <h2 style="color: #006BB2; margin-bottom: 10px;">Bedankt voor je aanmelding! 🎉</h2>
  
  <p style="padding-top: 16px; border-top: 2px solid #006BB2;">Beste ${name},</p>
  
  <p>
    Hartelijk dank voor je aanmelding voor <strong>${selectedTrainings}</strong>!
  </p>
  
  ${sessionInfo ? `
  <div style="background-color: #dcfce7; padding: 16px; border-radius: 8px; margin: 20px 0;">
    <p style="margin: 0; color: #15803d;"><strong>📅 Jouw Geselecteerde Sessie:</strong></p>
    <p style="margin: 8px 0 0 0; color: #15803d;">${sessionInfo.date} om ${sessionInfo.time}</p>
    <p style="margin: 4px 0 0 0; color: #15803d;">📍 ${sessionInfo.location}</p>
  </div>
  ` : ''}
  
  <p>
    We hebben je aanmelding goed ontvangen en zullen deze beoordelen. Je ontvangt binnen <strong>3 werkdagen</strong> een bevestiging van ons met verdere informatie over de training.
  </p>
  
  <div style="background-color: #f0f9ff; padding: 16px; border-left: 4px solid #006BB2; margin: 20px 0; border-radius: 4px;">
    <p style="margin: 0; color: #1e293b;">
      <strong>💡 Vragen over je aanmelding?</strong><br/>
      Neem gerust contact met ons op via <a href="mailto:support@hofmansautomotiveacademie.nl" style="color: #006BB2;">support@hofmansautomotiveacademie.nl</a>
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

// Verstuur aanmeld formulier
export const sendAanmeldEmail = async (formData, selectedTrainings, sessionInfo = null) => {
  const fullName = [
    formData.firstName,
    formData.middleName,
    formData.lastName
  ].filter(Boolean).join(' ');

  // Email naar bedrijf
  const companyEmailParams = {
    to_email: EMAIL_CONFIG.TO_EMAIL,
    email_subject: `Nieuwe trainingsaanmelding: ${fullName} - ${selectedTrainings}${sessionInfo ? ' [SESSIE GEKOZEN]' : ''}`,
    html_content: createAanmeldEmailHTML(formData, selectedTrainings, sessionInfo)
  };

  await emailjs.send(
    EMAIL_CONFIG.SERVICE_ID,
    EMAIL_CONFIG.TEMPLATE_TO_COMPANY,
    companyEmailParams,
    EMAIL_CONFIG.PUBLIC_KEY
  );

  // Auto-reply naar aanmelder
  const replyParams = {
    to_email: formData.email,
    email_subject: 'Bevestiging aanmelding - Hofmans Automotive Academie',
    html_content: createAanmeldReplyHTML(fullName, selectedTrainings, sessionInfo)
  };

  return await emailjs.send(
    EMAIL_CONFIG.SERVICE_ID,
    EMAIL_CONFIG.TEMPLATE_AUTOREPLY,
    replyParams,
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
