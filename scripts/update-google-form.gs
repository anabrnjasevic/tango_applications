/**
 * Run this in the SAME Apps Script project that created the form
 * (script.google.com → the project → paste → save → run updateCaminoRegistrationForm).
 *
 * Safe to run more than once. It turns the single checkbox list into:
 *   1. Choose your package — multiple choice, one answer, not required
 *   2. Add-ons — checkboxes (Escenario + individual tickets), not required
 *
 * Individual-only purchases are allowed; the website only offers them from 8 September.
 */
function updateCaminoRegistrationForm() {
  const FORM_ID = '11a5lco0iKT2nRjr2tRmCszmAQiE_KzMfpfdO7yOpj8A';
  const form = FormApp.openById(FORM_ID);

  const MAIN_PACKAGES = [
    'Full Pass: 3 Milongas + 4 Workshops',
    'Milonga Pass: 3 Milongas',
    'Workshop Pass: 4 Workshops',
  ];

  const ADDONS = [
    'Masterclass: Escenario 1 & 2 (Masterclass registration is subject to approval.)',
    'Individual Milonga: Friday Welcome Milonga',
    'Individual Milonga: Saturday Milonga',
    'Individual Milonga: Sunday Gala Milonga and Show',
    'Individual Workshop: Key Knowledge',
    'Individual Workshop: Tango Vals',
    'Individual Workshop: Complex Salon Sequences',
    'Individual Workshop: Milonga',
    'Individual Masterclass: Escenario 1: Introductory',
    'Individual Masterclass: Escenario 2: Stage elements',
  ];

  // Must stay off: FormApp.createResponse() cannot fill Google's built-in
  // collect-email field ("Invalid data updating form"). The Email question is enough.
  form.setCollectEmail(false);

  let addonsItem = null;
  let packageItem = null;

  form.getItems().forEach((item) => {
    const title = item.getTitle();
    if (title === 'What are you registering for?' || title === 'Add-ons') {
      addonsItem = item.asCheckboxItem();
    }
    if (title === 'Choose your package') {
      packageItem = item.asMultipleChoiceItem();
    }
    if (title === 'Email') {
      const type = item.getType();
      if (type === FormApp.ItemType.TEXT) {
        item.asTextItem().setRequired(true);
      } else if (type === FormApp.ItemType.PARAGRAPH_TEXT) {
        item.asParagraphTextItem().setRequired(true);
      }
    }
  });

  if (!addonsItem) {
    throw new Error('Could not find the registration checkbox question.');
  }

  addonsItem.setTitle('Add-ons');
  addonsItem.setHelpText(
    'Escenario is not part of Full Pass. Individual tickets are only sold on the website from 8 September (Regular registration). You can select more than one.',
  );
  addonsItem.setChoiceValues(ADDONS);
  addonsItem.setRequired(false);

  if (!packageItem) {
    packageItem = form.addMultipleChoiceItem();
  }

  packageItem.setTitle('Choose your package');
  packageItem.setHelpText(
    'Pick one. Skip this if you only want add-ons (Escenario, or individual tickets from 8 September).',
  );
  packageItem.setChoiceValues(MAIN_PACKAGES);
  packageItem.setRequired(false);

  const items = form.getItems();
  const addonsIndex = items.findIndex((item) => item.getId() === addonsItem.getId());
  const packageIndex = items.findIndex((item) => item.getId() === packageItem.getId());
  if (addonsIndex >= 0 && packageIndex > addonsIndex) {
    form.moveItem(packageIndex, addonsIndex);
  }

  Logger.log('Done. Check the form: Choose your package (radio) then Add-ons (checkboxes).');
  Logger.log('Edit URL: ' + form.getEditUrl());
  Logger.log('Public URL: ' + form.getPublishedUrl());
}
