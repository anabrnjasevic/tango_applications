/**
 * Same Apps Script project as the form (the one that already has FormApp access).
 *
 * 1. Paste this file into that project (or add it as a second script file).
 * 2. Set WEBHOOK_SECRET to a long random string. Use the same value in Vercel as
 *    GOOGLE_FORM_WEBHOOK_SECRET.
 * 3. Deploy → New deployment → Type: Web app
 *      Execute as: Me
 *      Who has access: Anyone
 *    After editing, use Manage deployments → Edit (pencil) → New version.
 * 4. Copy the web app URL into Vercel as GOOGLE_APPS_SCRIPT_URL, then redeploy.
 *
 * "Execute as Me" only lets THIS script append one form response / Sheet row
 * and send the confirmation from your Gmail. Visitors never receive your Google
 * login. The secret stops strangers from calling the URL if they find it.
 *
 * Collect-email must stay OFF. FormApp cannot fill Google's built-in email field,
 * which throws "Invalid data updating form". The regular Email question still saves.
 *
 * The linked response Sheet is not rewritten. We only append a confirmation_email
 * column on the far right (TRUE/FALSE). Existing rows and form columns stay as they are.
 */

const FORM_ID = '11a5lco0iKT2nRjr2tRmCszmAQiE_KzMfpfdO7yOpj8A';
const WEBHOOK_SECRET = 'PASTE_THE_SAME_VALUE_AS_GOOGLE_FORM_WEBHOOK_SECRET';

const CONTACT_EMAIL = 'camino.serbia@gmail.com';
const EMAIL_FROM_NAME = 'Camino Tango';
const EMAIL_SUBJECT =
  'Uspešna prijava za Camino Tango Vikend! / Successful registration for the Camino Tango Weekend!';
const CONFIRMATION_EMAIL_COLUMN = 'confirmation_email';

const PAYMENT = {
  recipient: 'UDRUŽENJE KULTURA POKRETA',
  recipientEn: 'UDRUŽENJE KULTURA POKRETA, Jug Bogdana 24, Novi Sad, Serbia',
  accountRsd: '340-1000198521-39',
  iban: 'RS35340000100019852624',
};

/**
 * Edit this table when a new price period starts or when RSD amounts arrive.
 * Keys must match the Google Form / website values exactly.
 * Leave rsd as null until you have the dinar amount for that period.
 */
const PRICE_TABLE = {
  'super-early': {
    'Full Pass: 3 Milongas + 4 Workshops': { eur: 110, rsd: 12980 },
    'Milonga Pass: 3 Milongas': { eur: 50, rsd: 5900 },
    'Workshop Pass: 4 Workshops': { eur: 70, rsd: 8260 },
    'Masterclass: Escenario 1 & 2 (Masterclass registration is subject to approval.)': {
      eur: 40,
      rsd: 4720,
    },
  },
  early: {
    'Full Pass: 3 Milongas + 4 Workshops': { eur: 130, rsd: null },
    'Milonga Pass: 3 Milongas': { eur: 60, rsd: null },
    'Workshop Pass: 4 Workshops': { eur: 80, rsd: null },
    'Masterclass: Escenario 1 & 2 (Masterclass registration is subject to approval.)': {
      eur: 50,
      rsd: null,
    },
  },
  regular: {
    'Full Pass: 3 Milongas + 4 Workshops': { eur: 150, rsd: null },
    'Milonga Pass: 3 Milongas': { eur: 70, rsd: null },
    'Workshop Pass: 4 Workshops': { eur: 90, rsd: null },
    'Masterclass: Escenario 1 & 2 (Masterclass registration is subject to approval.)': {
      eur: 55,
      rsd: null,
    },
    'Individual Milonga: Friday Welcome Milonga': { eur: 25, rsd: null },
    'Individual Milonga: Saturday Milonga': { eur: 25, rsd: null },
    'Individual Milonga: Sunday Gala Milonga and Show': { eur: 25, rsd: null },
    'Individual Workshop: Key Knowledge': { eur: 25, rsd: null },
    'Individual Workshop: Tango Vals': { eur: 25, rsd: null },
    'Individual Workshop: Complex Salon Sequences': { eur: 25, rsd: null },
    'Individual Workshop: Milonga': { eur: 25, rsd: null },
    'Individual Masterclass: Escenario 1: Introductory': { eur: 30, rsd: null },
    'Individual Masterclass: Escenario 2: Stage elements': { eur: 30, rsd: null },
  },
  'day-of': {
    'Full Pass: 3 Milongas + 4 Workshops': { eur: 180, rsd: null },
    'Milonga Pass: 3 Milongas': { eur: 80, rsd: null },
    'Workshop Pass: 4 Workshops': { eur: 110, rsd: null },
    'Masterclass: Escenario 1 & 2 (Masterclass registration is subject to approval.)': {
      eur: 65,
      rsd: null,
    },
    'Individual Milonga: Friday Welcome Milonga': { eur: 30, rsd: null },
    'Individual Milonga: Saturday Milonga': { eur: 30, rsd: null },
    'Individual Milonga: Sunday Gala Milonga and Show': { eur: 30, rsd: null },
    'Individual Workshop: Key Knowledge': { eur: 30, rsd: null },
    'Individual Workshop: Tango Vals': { eur: 30, rsd: null },
    'Individual Workshop: Complex Salon Sequences': { eur: 30, rsd: null },
    'Individual Workshop: Milonga': { eur: 30, rsd: null },
    'Individual Masterclass: Escenario 1: Introductory': { eur: 35, rsd: null },
    'Individual Masterclass: Escenario 2: Stage elements': { eur: 35, rsd: null },
  },
};

const PERIOD_DATES = [
  { id: 'super-early', start: '2026-08-28', end: '2026-08-31' },
  { id: 'early', start: '2026-09-01', end: '2026-09-07' },
  { id: 'regular', start: '2026-09-08', end: '2026-11-15' },
  { id: 'day-of', start: '2026-11-20', end: '2026-11-22' },
];

function doGet() {
  return json_({ ok: true, service: 'camino-register' });
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return json_({ ok: false, error: 'Empty body' });
    }

    const data = JSON.parse(e.postData.contents);
    if (!WEBHOOK_SECRET || WEBHOOK_SECRET.indexOf('PASTE_') === 0 || data.secret !== WEBHOOK_SECRET) {
      return json_({ ok: false, error: 'Unauthorized' });
    }

    const form = FormApp.openById(FORM_ID);
    // Built-in collect-email cannot be set from Apps Script; it blocks submit().
    form.setCollectEmail(false);
    requireEmailQuestion_(form);
    try {
      form.setRequireLogin(false);
    } catch (loginError) {
      // Consumer Google accounts may not support this setting.
    }

    const formResponse = form.createResponse();

    const valuesByTitle = {
      Name: data.name,
      Email: data.email,
      'Phone number': data.phone,
      'Country and place': data.location,
      'How long have you been dancing?': data.dancingYears,
      'Have you performed as a tango dancer?': data.performed,
      'Are you a tango instructor?': data.instructor,
      'I apply as:': data.role,
      "Partner's surname and name": data.partnerName || '',
      'Choose your package': data.package || '',
      'Add-ons': data.addons || [],
      'Anything you want to share?': data.notes || '',
    };

    form.getItems().forEach(function (item) {
      const value = valuesByTitle[item.getTitle()];
      if (value === undefined || value === '' || (Array.isArray(value) && !value.length)) {
        return;
      }
      applyItem_(formResponse, item, value);
    });

    formResponse.submit();

    let emailSent = false;
    try {
      sendConfirmationEmail_(data);
      emailSent = true;
    } catch (emailError) {
      console.error('Confirmation email failed after a successful registration', emailError);
    }

    try {
      markConfirmationEmail_(form, data.email, emailSent);
    } catch (markError) {
      console.error('Could not write confirmation_email column', markError);
    }

    return json_({ ok: true, emailSent: emailSent });
  } catch (error) {
    return json_({ ok: false, error: String(error) });
  }
}

function findResponseSheet_(spreadsheet) {
  const sheets = spreadsheet.getSheets();
  for (let i = 0; i < sheets.length; i++) {
    const lastCol = sheets[i].getLastColumn();
    if (lastCol < 1) continue;
    const headers = sheets[i].getRange(1, 1, 1, lastCol).getValues()[0];
    const titles = headers.map(function (header) {
      return String(header || '').trim();
    });
    if (titles.indexOf('Email') !== -1 && titles.indexOf('Timestamp') !== -1) {
      return sheets[i];
    }
  }
  return sheets[0] || null;
}

function confirmationEmailColumn_(sheet) {
  const lastCol = Math.max(sheet.getLastColumn(), 1);
  const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  for (let i = 0; i < headers.length; i++) {
    if (String(headers[i] || '').trim() === CONFIRMATION_EMAIL_COLUMN) {
      return i + 1;
    }
  }
  const col = lastCol + 1;
  sheet.getRange(1, col).setValue(CONFIRMATION_EMAIL_COLUMN);
  return col;
}

function markConfirmationEmail_(form, email, sent) {
  const destId = form.getDestinationId();
  if (!destId) return;

  const sheet = findResponseSheet_(SpreadsheetApp.openById(destId));
  if (!sheet) return;

  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return;

  const confirmCol = confirmationEmailColumn_(sheet);
  const lastCol = Math.max(sheet.getLastColumn(), 1);
  const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  let emailCol = -1;
  for (let i = 0; i < headers.length; i++) {
    if (String(headers[i] || '').trim() === 'Email') {
      emailCol = i + 1;
      break;
    }
  }

  let row = lastRow;
  if (emailCol > 0 && email) {
    const emails = sheet.getRange(2, emailCol, lastRow - 1, 1).getValues();
    const needle = String(email).trim().toLowerCase();
    for (let i = emails.length - 1; i >= 0; i--) {
      if (String(emails[i][0] || '').trim().toLowerCase() === needle) {
        row = i + 2;
        break;
      }
    }
  }

  sheet.getRange(row, confirmCol).setValue(sent);
}

function requireEmailQuestion_(form) {
  form.getItems().forEach(function (item) {
    if (item.getTitle() !== 'Email') return;
    const type = item.getType();
    if (type === FormApp.ItemType.TEXT) {
      item.asTextItem().setRequired(true);
    } else if (type === FormApp.ItemType.PARAGRAPH_TEXT) {
      item.asParagraphTextItem().setRequired(true);
    }
  });
}

function selectedItems_(data) {
  const items = [];
  if (data.package) items.push(String(data.package));
  const addons = Array.isArray(data.addons) ? data.addons : data.addons ? [data.addons] : [];
  addons.forEach(function (addon) {
    if (addon) items.push(String(addon));
  });
  return items;
}

function belgradeDayNumber_(date) {
  const parts = Utilities.formatDate(date, 'Europe/Belgrade', 'yyyyMMdd');
  return Number(parts);
}

function isoDayNumber_(isoDate) {
  return Number(isoDate.replace(/-/g, ''));
}

function periodIdFromToday_() {
  const today = belgradeDayNumber_(new Date());
  for (let i = 0; i < PERIOD_DATES.length; i++) {
    const period = PERIOD_DATES[i];
    if (today >= isoDayNumber_(period.start) && today <= isoDayNumber_(period.end)) {
      return period.id;
    }
  }
  return 'super-early';
}

function resolvePeriodId_(data) {
  if (data.periodId && PRICE_TABLE[data.periodId]) return data.periodId;

  const notes = String(data.notes || '');
  if (/Super Early Bird/i.test(notes)) return 'super-early';
  if (/Early Bird/i.test(notes)) return 'early';
  if (/Regular/i.test(notes)) return 'regular';
  if (/Day of Event/i.test(notes)) return 'day-of';

  return periodIdFromToday_();
}

function quoteForItems_(periodId, items) {
  const table = PRICE_TABLE[periodId] || {};
  let eur = 0;
  let rsd = 0;
  let missingRsd = false;
  let missingItem = false;

  items.forEach(function (item) {
    const price = table[item];
    if (!price) {
      missingItem = true;
      return;
    }
    eur += price.eur;
    if (typeof price.rsd === 'number') {
      rsd += price.rsd;
    } else {
      missingRsd = true;
    }
  });

  return { eur: eur, rsd: rsd, missingRsd: missingRsd || missingItem, missingItem: missingItem };
}

function formatRsd_(amount) {
  return String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function amountLineSr_(quote) {
  if (!quote.missingRsd && quote.rsd > 0) return formatRsd_(quote.rsd) + ' RSD';
  if (quote.eur > 0) return '€' + quote.eur + ' (RSD iznos ćemo potvrditi)';
  return 'biće potvrđen';
}

function amountLineEn_(quote) {
  if (quote.eur > 0) return '€' + quote.eur;
  return 'to be confirmed';
}

function partnerLine_(data) {
  return data.partnerName ? ' (partner: ' + data.partnerName + ')' : '';
}

function confirmationBody_(data) {
  const items = selectedItems_(data);
  const periodId = resolvePeriodId_(data);
  const quote = quoteForItems_(periodId, items);
  const packageList = items.length ? items.join('; ') : '—';
  const role = data.role || '—';
  const name = data.name || '';

  return [
    'Poštovani/a ' + name + ',',
    '',
    'Hvala vam na prijavi za Camino Tango Vikend u Novom Sadu!',
    'Veoma nas raduje što ćete biti deo ovog tango događaja.',
    '',
    'Ovim putem potvrđujemo da smo primili vašu prijavu za sledeće stavke:',
    '● Izabrani paket: ' + packageList,
    '● Uloga u plesu: ' + role + partnerLine_(data),
    '',
    'Kako biste osigurali svoje mesto, potrebno je da izvršite uplatu kotizacije u narednih 48 sati.',
    '',
    'Podaci za uplatu:',
    '● Primalac: ' + PAYMENT.recipient,
    '● Broj računa: ' + PAYMENT.accountRsd,
    '● Iznos: ' + amountLineSr_(quote),
    '● Svrha uplate: Camino Tango Vikend - ' + name,
    '',
    '⚠ Važna napomena: Molimo vas da pažljivo planirate svoje vreme, jer uplaćene kotizacije nisu refundabilne (nema povraćaja novca). Ukoliko iz bilo kog razloga budete sprečeni da dođete, svoju registraciju možete prebaciti na drugu osobu (iste plesne uloge), uz prethodnu najavu organizatorima.',
    '',
    'Nakon što izvršite uplatu, molimo vas da nam (kao odgovor na ovaj e-mail) pošaljete potvrdu o uplati (skrinšot, sliku uplatnice ili PDF) kako bismo vam konačno potvrdili i rezervisali mesto na događaju.',
    '',
    'Sve dodatne detalje o satnici i lokacijama možete u svakom trenutku proveriti na našem zvaničnom sajtu caminotangovikend.com.',
    '',
    'Ukoliko imate bilo kakva pitanja u vezi sa događajem, ili boravkom u Novom Sadu, slobodno nas kontaktirajte.',
    '',
    'Vidimo se u Novom Sadu na podijumu!',
    '',
    'Srdačan pozdrav,',
    EMAIL_FROM_NAME,
    '',
    '────────────────',
    '',
    'Dear ' + name + ',',
    '',
    'Thank you for registering for the Camino Tango Weekend in Novi Sad!',
    'We are very excited to have you as part of this tango event.',
    '',
    'We hereby confirm that we have received your registration for the following items:',
    '● Selected package: ' + packageList,
    '● Dance role: ' + role + partnerLine_(data),
    '',
    'To secure your spot, you need to make the registration fee payment within the next 48 hours.',
    '',
    'Payment details:',
    '● Recipient: ' + PAYMENT.recipientEn,
    '● Account number: IBAN ' + PAYMENT.iban,
    '● Amount: ' + amountLineEn_(quote),
    '● Purpose of payment: Camino Tango Weekend - ' + name,
    '',
    '⚠ Important note: Please plan your time carefully, as paid registration fees are non-refundable. If for any reason you are unable to come, you can transfer your registration to another person (with the same dance role), with prior notice to the organizers.',
    '',
    'After you make the payment, please send us a payment confirmation (screenshot, photo of the payment slip, or a PDF) as a reply to this email, so we can finally confirm and reserve your spot at the event.',
    '',
    'You can check all additional details about the schedule and locations at any time on our official website caminotangovikend.com.',
    '',
    'If you have any questions regarding the event or your stay in Novi Sad, feel free to contact us.',
    '',
    'See you on the dance floor in Novi Sad!',
    '',
    'Kind regards,',
    EMAIL_FROM_NAME,
  ].join('\n');
}

function sendConfirmationEmail_(data) {
  const to = String(data.email || '').trim();
  if (!to) {
    throw new Error('Missing applicant email');
  }

  MailApp.sendEmail({
    to: to,
    replyTo: CONTACT_EMAIL,
    name: EMAIL_FROM_NAME,
    subject: EMAIL_SUBJECT,
    body: confirmationBody_(data),
  });
}

function applyItem_(formResponse, item, value) {
  const type = item.getType();

  if (
    type === FormApp.ItemType.PAGE_BREAK ||
    type === FormApp.ItemType.SECTION_HEADER ||
    type === FormApp.ItemType.IMAGE ||
    type === FormApp.ItemType.VIDEO
  ) {
    return;
  }

  // Google's built-in collect-email item cannot be filled from a script.
  if (FormApp.ItemType.EMAIL && type === FormApp.ItemType.EMAIL) {
    return;
  }

  try {
    if (type === FormApp.ItemType.MULTIPLE_CHOICE) {
      formResponse.withItemResponse(item.asMultipleChoiceItem().createResponse(String(value)));
      return;
    }

    if (type === FormApp.ItemType.CHECKBOX) {
      const choices = Array.isArray(value) ? value.map(String) : [String(value)];
      formResponse.withItemResponse(item.asCheckboxItem().createResponse(choices));
      return;
    }

    if (type === FormApp.ItemType.PARAGRAPH_TEXT) {
      formResponse.withItemResponse(item.asParagraphTextItem().createResponse(String(value)));
      return;
    }

    if (type === FormApp.ItemType.LIST) {
      formResponse.withItemResponse(item.asListItem().createResponse(String(value)));
      return;
    }

    if (type === FormApp.ItemType.TEXT) {
      formResponse.withItemResponse(item.asTextItem().createResponse(String(value)));
      return;
    }
  } catch (error) {
    throw new Error(item.getTitle() + ' (' + type + '): ' + error);
  }
}

function json_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
