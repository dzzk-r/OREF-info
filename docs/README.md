## 📦 Android TWA Package (v5.1)

This project includes an offline-ready Android APK generated using [Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap), wrapping the PWA at:

🔗 https://dzzk-r.github.io/OREF-info/?v=6.0.0-beta

### 🔧 Configuration

- **Application Name:** OREFinfo
- **Package ID:** `io.github.dzzk_r.orefinfo`
- **Version Code:** `501`
- **Splash & Nav Color:** `#ffe040`
- **App Icon:** `icons/icon.svg`
- **APK Filename:** `OREF-Info-Offline-v5.1.apk`
- **Signing Key Alias:** `orefinfo-key`

### 📜 Build Instructions

```bash
npm install -g @bubblewrap/cli
bubblewrap init --manifest https://dzzk-r.github.io/OREF-info/manifest.json
bubblewrap build
```

**Note**: Signing key is stored at android.keystore (ignored in Git).

### 🔐 Signing Key Notes
- Keystore file: `android.keystore`
- Key alias: `orefinfo-key`
- Keep this file secret and **do not upload to GitHub**

---

