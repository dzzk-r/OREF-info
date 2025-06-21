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

    function shareOrCopy() {
        if (typeof goatcounter !== 'undefined') {
            goatcounter.count({
            path: '/share-click',
            title: 'Share button clicked'
            });
        }

        const shareData = {
            title: document.title,
            text: 'Stay safe – multilingual OREF instructions',
            url: location.href
        };

        if (navigator.share) {
            navigator.share(shareData).catch(console.error);
        } else if (navigator.clipboard) {
            navigator.clipboard.writeText(location.href).then(() => {
            showShareToast();
            });
        } else {
            alert('Sharing not supported on this device');
        }
    }

    function showShareToast() {
        const msg = document.getElementById('shareFallbackMsg');
        if (!msg) return;
        msg.style.display = 'block';
        msg.style.opacity = '1';
        setTimeout(() => {
            msg.style.opacity = '0';
            setTimeout(() => msg.style.display = 'none', 300);
        }, 2500);
    }
});