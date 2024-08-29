import Cache from './cache';
import messages from '../i18n/messages.json';

/**
 * @param {string}  namespace
 * @param {string}  key
 * @param {object}  [data]
 * @returns {string}
 */
const i18n = function (namespace, key, data = {}) {
    let locale = Cache.locale;
    // check that the locale exists
    if (typeof messages[locale] === 'undefined') {
        locale = 'en';
    }

    let message = messages[locale]?.[namespace]?.[key] || messages['en']?.[namespace]?.[key];

    if (typeof message === 'string') {
        message = message.replace(/{(\w+)}/g, (_, placeholder) => data[placeholder] || `{${placeholder}}`);
        return message;
    }

    return `(MISSING: ${namespace}/${key})`;
}

export default i18n