/**
 * Configuratie voor easyEmployer.
 * Bevat instellingen die los van de applicatie beheerd worden.
 */

/**
 * Lijst van Loket-producten (modules) die geactiveerd worden bij stap 3.
 * Elk object bevat: id (GUID), action ("enable"), description (naam product).
 * De description wordt alleen in de UI getoond; naar de API gaat enkel id + action.
 */
const MODULES = [
  { id: '4890248c-721e-4b26-b88d-0e5a04dcef93', action: 'enable', description: 'Personeelsregistratie' },
  { id: 'e7b78018-316d-4725-8610-112be09c8f7b', action: 'enable', description: 'Ziekteverzuimregistratie' },
  { id: 'e1a57976-3987-4c1d-a899-131727545174', action: 'enable', description: 'Salarisverwerking' },
  { id: '11be5720-6e07-42d2-9074-19416a51fd5f', action: 'enable', description: 'Gezin' },
  { id: '4ff6ce00-8185-4336-86af-22a8f9839fe0', action: 'enable', description: 'Verlofregeling' },
  { id: 'df25d366-5269-4b70-b6f2-5e021eb3bbbc', action: 'enable', description: 'Grondslagen' },
  { id: 'f9d9483a-8138-403e-b483-5f10d02e05b4', action: 'enable', description: 'Opleidingen' },
  { id: '4e7362cb-16a7-48eb-8496-61742efaaa2f', action: 'enable', description: 'Verstrekkingen' },
  { id: '5b122343-43dc-422c-b8d9-655837d02c1e', action: 'enable', description: 'Verlofregistratie' },
  { id: 'ecb0693b-9525-4712-afda-68d8e7fa8a52', action: 'enable', description: 'Signaleringen' },
  { id: '0ac70bca-1656-449d-9dd7-698177cd6194', action: 'enable', description: 'Mutatieverslag' },
  { id: '45f364a1-c9ee-4f40-88a9-74c76695a757', action: 'enable', description: 'Financieel' },
  { id: 'ba123031-26e9-4c34-b5a6-7e5746395423', action: 'enable', description: 'Rekenregels' },
  { id: 'ae0e876b-8eb0-4ffd-a09f-82d6f76b331b', action: 'enable', description: 'Import variabele gegevens' },
  { id: 'f6bbfe88-701d-4d99-877d-8ee780ad2296', action: 'enable', description: 'Salarisschalen' },
  { id: 'e55e2e90-a1e0-4bf0-ba57-a2c9161afeee', action: 'enable', description: 'Consolidatie' },
  { id: '96073cdf-b7a3-4304-a022-a5802f50de1b', action: 'enable', description: 'Verlofkaart in ESS' },
  { id: 'e3cd6964-aba0-459e-9ad7-a6d559634141', action: 'enable', description: 'Notities' },
  { id: '08268b7d-d632-4895-8565-af657ac56039', action: 'enable', description: 'Excasso buitenland' },
  { id: 'ff76005c-0cbf-4f73-b3db-b2604f42d519', action: 'enable', description: 'Personeelsdossier in ESS' },
  { id: '3875a4ed-51e6-4c93-99aa-bd53f2a49013', action: 'enable', description: 'Verlofaanvragen via ESS' },
  { id: 'd6a4e1a9-2541-4d9b-b801-cfffd703007a', action: 'enable', description: 'Automatisch journaliseren' },
  { id: '27df1287-15bc-43e6-b4b3-d30c86bec7ac', action: 'enable', description: 'Verstrekkingen in ESS' },
  { id: 'c2997c59-65f4-4ed9-bb36-d7b1bd2581c4', action: 'enable', description: 'Concept entiteit' },
  { id: '6bb8fa8a-3ee8-4609-8267-ea102240fb75', action: 'enable', description: 'Dossiervorming Qwoater Lite' },
  { id: '23ca49ee-deff-4c79-9d53-f19357c24181', action: 'enable', description: 'WKR Grafiek' },
  { id: '6e385e0f-9bf5-4512-bbfd-f1a956159516', action: 'enable', description: 'APG Pensioenaangifte' },
  { id: '066eef86-6a52-4b01-870a-f2b620222c3c', action: 'enable', description: 'Muteren door werknemer' },
  { id: 'cbafd290-bde6-4c0d-96c8-f3c14b884bab', action: 'enable', description: 'Dossiervorming Qwoater Documentgeneratie' },
  { id: 'd65b14c5-6ee6-4231-a68b-f5d923fa6aa9', action: 'enable', description: 'Bepalen afstand woon-werkverkeer' },
  { id: '3de81266-043e-4336-bd97-f98e5b824464', action: 'enable', description: 'UPA Pensioenaangifte' },
  { id: '37be72b5-ef1c-4f06-8a04-fcd20b175714', action: 'enable', description: 'Journaliseren' },
  { id: '9dd99930-1a19-421c-8d96-fdb4a6fc2359', action: 'enable', description: 'KPU rekenregel' },
  { id: '63da9f4b-d777-41c2-9cf7-6e86c60d344d', action: 'enable', description: 'Dashboard werkgever' },
  { id: '9b58cc4e-0a34-44ad-be25-38c320563014', action: 'enable', description: 'Ondertekenen documenten' },
  { id: '1b067c44-0fb0-4b60-9d2a-86d72d17912f', action: 'enable', description: 'Link naar nieuwe versie Loket' },
  { id: 'ca11f337-3258-424c-956c-3926b6d32cb0', action: 'enable', description: 'Preboarding' },
  { id: 'd9cd37b9-5f0e-4349-8197-50b70d831dbd', action: 'enable', description: 'Werving en selectie' },
  { id: '45a5cc5d-c93f-43e5-a14f-602ba9f84cb8', action: 'enable', description: 'Salarissimulator' },
  { id: '21ef0573-0334-430c-a4cb-e088353c3687', action: 'enable', description: 'PAWW aangifte' },
  { id: '5fca8828-5935-46de-a3cb-2e8832b0a80b', action: 'enable', description: 'MijnLoket' },
  { id: '12522f18-f8d0-46ee-9de5-c850034bee9c', action: 'enable', description: 'Workflow editor' },
  { id: '49daac3b-4008-46de-81d3-3f927b929d09', action: 'enable', description: 'Verlofkalender in ESS' },
  { id: '32cb5059-ef11-4e45-a6bd-d2c8ff995a98', action: 'enable', description: 'MijnLoket Assistent' },
  { id: '5989e393-fc91-4a77-9deb-51d0626ac560', action: 'enable', description: 'MijnLoket Declaraties' },
  { id: '7eb1622d-29c3-488d-aa5b-5eb071728c81', action: 'enable', description: 'MijnLoket Documenten' },
  { id: '07b6f19b-5118-4b46-a29c-2e6fe4ecdae8', action: 'enable', description: 'MijnLoket Persoonsgegevens inzien' },
  { id: 'fd265beb-056d-4c80-8364-80b41194615d', action: 'enable', description: 'MijnLoket Persoonsgegevens wijzigen' },
  { id: 'cd0b2cb3-1353-49b7-a140-107b923c27af', action: 'enable', description: 'MijnLoket Preboarding' },
  { id: '9b0440f9-d83f-4d8e-b52f-d8fcf1bfde0b', action: 'enable', description: 'MijnLoket Salaris berekenen' },
  { id: '60fa21df-c390-4470-b835-36d84735f9b2', action: 'enable', description: 'MijnLoket Verlofaanvragen' },
  { id: 'dcb0a89e-ac96-454b-bb01-a61abd2956dc', action: 'enable', description: 'MijnLoket Verlofkaart' },
  { id: '0c138c1e-c8b1-437e-ba29-0454413c6767', action: 'enable', description: 'MijnLoket Verlofkalender' },
  { id: '790aa6c7-7da1-448b-9927-a9f8ea333bd6', action: 'enable', description: 'MijnLoket Verzekeringen vergelijken' },
  { id: 'aecc7799-2b83-47f4-950e-6645762274c4', action: 'enable', description: 'Salaris agent' },
  { id: '2bf3ee3e-a377-434b-ac6a-c555966389ac', action: 'enable', description: 'HR-processen' },
  { id: '8aa4d415-f0c3-4a2e-be9a-23e87459e0a3', action: 'enable', description: 'MijnLoket Assistent bedrijfsregelingen' },
  { id: '36b5b0b4-8f37-494f-970d-3b6dec2b896b', action: 'enable', description: 'Salarismonitor (provider)' },
  { id: '0ec1e9ee-92ab-42cf-be34-55d434702716', action: 'enable', description: 'Workflow editor Pro' },
];

/**
 * Standaard team ID voor stap 2 (team koppelen).
 */
const DEFAULT_TEAM_ID = '2a5b3d83-89e5-461b-bccd-e294b4c4f62a';

/* ----- Test number generators ----- */

// IBAN Generator
const DUTCH_BANK_CODES = ['ABNA', 'INGB', 'RABO', 'SNSB', 'TRIO', 'KNAB', 'BUNQ', 'ASNB'];

function _ibanLettersToNumbers(str) {
  return str.split('').map(c => {
    const code = c.charCodeAt(0);
    return (code >= 65 && code <= 90) ? (code - 55).toString() : c;
  }).join('');
}

function _mod97(numStr) {
  let r = 0;
  for (let i = 0; i < numStr.length; i++) r = (r * 10 + parseInt(numStr[i], 10)) % 97;
  return r;
}

function generateIBAN() {
  const bank = DUTCH_BANK_CODES[Math.floor(Math.random() * DUTCH_BANK_CODES.length)];
  let acct = '';
  for (let i = 0; i < 10; i++) acct += Math.floor(Math.random() * 10).toString();
  const checkDigits = (98 - _mod97(_ibanLettersToNumbers(bank + acct + 'NL00'))).toString().padStart(2, '0');
  return 'NL' + checkDigits + bank + acct;
}

// Loonheffingennummer Generator
function generateLoonheffingennummer() {
  const weights = [9, 8, 7, 6, 5, 4, 3, 2];
  while (true) {
    const digits = [];
    digits.push(Math.floor(Math.random() * 9) + 1);
    for (let i = 1; i < 8; i++) digits.push(Math.floor(Math.random() * 10));
    let sum = 0;
    for (let i = 0; i < 8; i++) sum += digits[i] * weights[i];
    const check = sum % 11;
    if (check > 9) continue;
    digits.push(check);
    return digits.join('') + 'L01';
  }
}

// BSN Generator
function generateBSN() {
  const weights = [9, 8, 7, 6, 5, 4, 3, 2];
  while (true) {
    const digits = [];
    digits.push(Math.floor(Math.random() * 7) + 1);
    for (let i = 1; i < 8; i++) digits.push(Math.floor(Math.random() * 10));
    let sum = 0;
    for (let i = 0; i < 8; i++) sum += digits[i] * weights[i];
    const d9 = sum % 11;
    if (d9 > 9) continue;
    digits.push(d9);
    return digits.join('');
  }
}
