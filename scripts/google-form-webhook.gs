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
 * "Execute as Me" only lets THIS script append one form response / Sheet row.
 * Visitors never receive your Google login. They cannot open Drive, the Sheet,
 * or other files. The secret stops strangers from calling the URL if they find it.
 *
 * Collect-email must stay OFF. FormApp cannot fill Google's built-in email field,
 * which throws "Invalid data updating form". The regular Email question still saves.
 */
const FORM_ID = '11a5lco0iKT2nRjr2tRmCszmAQiE_KzMfpfdO7yOpj8A';
const WEBHOOK_SECRET = 'PASTE_THE_SAME_VALUE_AS_GOOGLE_FORM_WEBHOOK_SECRET';

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
    return json_({ ok: true });
  } catch (error) {
    return json_({ ok: false, error: String(error) });
  }
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
