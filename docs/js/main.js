document.addEventListener('DOMContentLoaded', () => {
    const setLanguage = (lang) => {
        document.querySelectorAll('[data-lang]').forEach(el => {
        if (el.getAttribute('data-lang') === lang) {
            el.classList.add('active-lang');
        } else {
            el.classList.remove('active-lang');
        }
        });
        localStorage.setItem('lang', lang);
        console.log("Language set to:", lang);
    };

    document.querySelectorAll('[data-set-lang]').forEach(btn => {
        btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-set-lang');
        setLanguage(lang);
        });
    });

    // Init on load
    const saved = localStorage.getItem('lang') || 'en';
    setLanguage(saved);
});