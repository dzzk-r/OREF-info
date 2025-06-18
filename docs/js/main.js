const setLanguage = (lang) => {
    document.querySelectorAll('[data-lang]').forEach(el => {
    if (el.getAttribute('data-lang') === lang) {
        el.classList.add('active-lang');
    } else {
        el.classList.remove('active-lang');
    }
    });
    localStorage.setItem('lang', lang); // сохранить выбор
};

document.querySelectorAll('[data-set-lang]').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.getAttribute('data-set-lang')));
});

// при загрузке страницы
const saved = localStorage.getItem('lang') || 'en';
setLanguage(saved);
