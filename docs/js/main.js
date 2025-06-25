import { supportedLangs } from './language.js';

document.addEventListener('DOMContentLoaded', () => {
    const setLanguage = (lang) => {
        if (!supportedLangs.includes(lang)) {
            console.warn(`Unsupported language: ${lang}. Falling back to 'en'.`);
            lang = 'en';
        }

        document.querySelectorAll('[data-lang]').forEach(el => {
            el.classList.toggle('active-lang', el.getAttribute('data-lang') === lang);
        });

        localStorage.setItem('lang', lang);

        document.documentElement.setAttribute('lang', lang);
        document.documentElement.setAttribute('data-lang', lang);

        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set('lang', lang);
        window.history.pushState({ lang }, document.title, currentUrl.href);

        console.log("Language set to:", lang);
    };

    const urlParams = new URLSearchParams(window.location.search);
    const langFromUrl = urlParams.get('lang')?.toLowerCase();
    const storedLang = localStorage.getItem('lang');

    let initialLang = 'en';

    if (langFromUrl && supportedLangs.includes(langFromUrl)) {
        initialLang = langFromUrl;
        localStorage.setItem('lang', initialLang);
    } else if (storedLang && supportedLangs.includes(storedLang)) {
        initialLang = storedLang;
    } else {
        const browserLang = navigator.language?.split('-')[0];
        if (supportedLangs.includes(browserLang)) {
            initialLang = browserLang;
            localStorage.setItem('lang', browserLang);
        }
    }

    setLanguage(initialLang);

    document.querySelectorAll('[data-set-lang]').forEach(btn => {
        btn.addEventListener('click', () => {
            const selected = btn.getAttribute('data-set-lang');
            setLanguage(selected);
            window.location.reload(); // Optional: reload for language text update
        });
    });


    const shareOrCopy = () => {
        if (typeof goatcounter !== 'undefined') {
            goatcounter.count({ path: '/share-click', title: 'Share button clicked' });
        }

        const shareData = {
            title: document.title,
            text: 'Stay safe – multilingual OREF instructions',
            url: location.href
        };

        const isMobileDevice = /Mobi|Android|iPhone|iPad|iPod|BlackBerry|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);

        if (navigator.share && isMobileDevice) {
            navigator.share(shareData).catch(console.error);
        } else if (navigator.clipboard) {
            navigator.clipboard.writeText(location.href).then(showShareToast);
        } else {
            alert('Sharing not supported on this device');
        }
    }

    const showShareToast = () => {
        const msg = document.getElementById('shareFallbackMsg');
        if (!msg) return;
        msg.style.display = 'block';
        msg.style.opacity = '1';
        setTimeout(() => {
            msg.style.opacity = '0';
            setTimeout(() => msg.style.display = 'none', 300);
        }, 2500);
    }

    const shareLink = document.getElementById('shareLink');
    if (shareLink) { // Check if the element exists
        shareLink.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent the default link behavior (jumping to #)
            shareOrCopy();
        });
    }

    document.querySelectorAll('a[href$=".pdf"], a[href$=".apk"]').forEach(link => {
        link.addEventListener('click', () => {
            const path = '/download/' + link.getAttribute('href').split('/').pop();
            goatcounter.count({ path });
        });
    });

    document.getElementById('slack-form').addEventListener('submit', async function (e) {
        e.preventDefault();

        const message = document.getElementById('message').value;
        const statusDiv = document.getElementById('status');
        const button = this.querySelector('button');

        // Clear any old status
        statusDiv.textContent = '';
        statusDiv.classList.remove('fade-out');

        // Disable button and show sending status
        button.disabled = true;
        button.textContent = 'Sending…';

        try {
            const response = await fetch('https://oref-slack-proxy.daniel-workload.workers.dev/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({ message }),
            });

            if (response.ok) {
                statusDiv.textContent = '✅ Message sent to Slack!';
                document.getElementById('slack-form').reset();
            } else {
                statusDiv.textContent = `❌ Error: ${response.statusText}`;
            }

            // Smooth scroll to status
            statusDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Fade-out timing
            setTimeout(() => {
                statusDiv.classList.add('fade-out');
            }, 14000);

            setTimeout(() => {
                statusDiv.textContent = '';
                statusDiv.classList.remove('fade-out');
            }, 15000);

        } catch (err) {
            statusDiv.textContent = `❌ Exception: ${err.message}`;
            statusDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } finally {
            // Re-enable button
            button.disabled = false;
            button.textContent = 'Send';
        }
    });
});
