import ch from './raw/chenese.js';
import fr from './raw/fr.js';
import ital from './raw/ital.js';
import span from './raw/span.js';
import arab from './raw/arab.js';

export function getKeys(object) {
  let keys = [];
  let variables = [];
  let text = '';
  Object.keys(object).forEach(key => {
    keys.push(key);
    variables.push(object[key]);
    text += object[key] + '\n';
  });
  // getValues(keys);
  console.log(text);
  return {
    keys,
    variables
  };
}
export function getValues(enMessages) {
  const { keys, variables } = getKeys(enMessages);
  const langs = [ch, fr, ital, span, arab];
  const langsNm = ['ch', 'fr', 'ital', 'span', 'arab'];
  langs.forEach((lang, ii) => {
    const translatedDAta = lang.split('\n');
    const obj = {};
    keys.forEach((key, index) => {
      obj[key] = translatedDAta[index + 1];
    });
    console.log(
      langsNm[ii],
      translatedDAta.length,
      keys.length,
      '\n',
      JSON.stringify(obj, null, 2)
    );
  });
}
