// js/language.js
export const supportedLangs = ['he', 'en', 'ru', 'ar', 'fr', 'uk', 'am', 'tl', 'th', 'hi', 'zh'];

async function applyLanguage(lang = 'en') {
  try {
    const res = await fetch('assets/lang.json');
    const translations = await res.json();

    const langData = translations.language[lang];
    if (!langData) {
      console.warn(`No translations found for language: ${lang}`);
      return;
    }

    document.querySelectorAll('[data-key]').forEach(el => {
      const key = el.getAttribute('data-key');
      if (langData[key]) {
        el.innerText = langData[key];
      }
    });

    document.documentElement.setAttribute('data-lang', lang);
    localStorage.setItem('lang', lang); // сохраняем выбор
  } catch (err) {
    console.error('Error loading language file:', err);
  }
}

function detectLanguage() {
  const urlLang = new URLSearchParams(window.location.search).get('lang');
  const storedLang = localStorage.getItem('lang');
  const browserLang = navigator.language?.split('-')[0];

  return urlLang || storedLang || browserLang || 'en';
}

document.addEventListener('DOMContentLoaded', () => {
    //   const lang = detectLanguage();
    //   applyLanguage(lang);
    const userLang = new URLSearchParams(window.location.search).get('lang') || localStorage.getItem('lang') || 'en';
    applyLanguage(userLang);
});
