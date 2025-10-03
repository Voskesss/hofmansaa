-- Verwijder BSN kolom vanwege AVG/GDPR compliance
-- BSN is bijzonder persoonsgegeven en niet noodzakelijk voor trainingsadministratie

ALTER TABLE aanmeldingen DROP COLUMN IF EXISTS bsn;
