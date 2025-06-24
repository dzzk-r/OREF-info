# 📦 CHANGELOG

## [v6.0.0-beta] – 2025-06-24 - Language and Sharing Enhancements

### Added
- Auto-detection of user's language via `navigator.language`
- URL deep-linking with `?lang=xx` for pre-selected language
- Language switch updates the `<html lang>` and reloads content dynamically
- `.pdf` and `.apk` download tracking via GoatCounter
- Native Share API on mobile, clipboard fallback on desktop

### Changed
- "Share This Slide" button updated to be mobile-aware
- OREF App Download section moved to the second slide for visibility

### Fixed
- Only valid `lang` values are accepted and applied
- Service Worker now includes updated `language.js` path


## [v5.0.0-beta] - 2025-06-22
### Added
- navigator.share() with clipboard fallback and toast message
- GoatCounter analytics for Share button
- Offline-capable APK with manifest+icons
- Subtle redesign of topbar and language toggles
- QR code section and image display improvements

### Upcoming
- Workbox cache strategy
- Open Graph / Twitter meta tags
- Contact form integration via Zapier

## [v4] - 2025-06-22

### ✨ Added
- 🌍 Multilingual toggle system via `[data-set-lang]` and `[data-lang]`.
- 📲 PWA installability: `manifest.json`, icons, and service worker (`sw.js`).
- 📥 Android APK download link added to header and `README.md`.
- 🔗 Share button in top bar using `navigator.share()` with clipboard fallback.
- 📊 GoatCounter analytics for share button interactions.
- 📦 LocalStorage-based language persistence.

### 💄 Improved
- Subtle toast message for link-copy feedback.
- Responsive top bar with cleaner icons and styling.
- QR code slide structure updated (centering WIP).
- Modular `main.js` with clearer language/share logic.

### 🐞 Fixed
- Fallback logic for devices not supporting `navigator.share`.
- Language toggle reloading on initial page load from saved preference.

### 🧪 In Progress (planned for v5)
- 🖼 Open Graph & Twitter meta tags.
- 📨 Google Forms integration (via Zapier).
- 🧱 Workbox-based caching strategy.
- 🔁 Versioned service worker cache management.
- 📱 Improved mobile QR centering and offline fallback UX.
