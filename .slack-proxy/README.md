# 🛰️ Slack Proxy Worker

A Cloudflare Worker that securely proxies messages from a public-facing static form (e.g., GitHub Pages) to a private Slack channel using an incoming webhook. This allows you to keep secrets hidden from the frontend and avoid abuse.

---

## 📦 Structure

```

.slack-proxy/
├── src/index.js          # Main Worker logic
├── wrangler.jsonc        # Worker configuration
├── package.json          # Dependencies
├── test/index.spec.js    # (optional) Unit tests
├── vitest.config.js      # Test config
└── README.md             # You are here

````

---

## 🚀 Quick Setup

### 🧰 Requirements

- Node.js & npm
- A Cloudflare account
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install/):

```bash
npm install -g wrangler
````

---

### 🔐 One-Time Secret Setup

Store your Slack Webhook (never expose this in public):

```bash
wrangler secret put SLACK_WEBHOOK_URL
```

(Optional) If you're using [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/):

```bash
wrangler secret put TURNSTILE_SECRET_KEY
```

---

### 🛠️ Deploy the Worker

```bash
npm install
wrangler deploy
```

> 🌐 This will deploy the Worker to your Cloudflare Worker domain (e.g., `https://your-app.workers.dev/`)

---

## 💡 Features

* Accepts POST requests with `application/x-www-form-urlencoded` payloads
* Supports honeypot field (`website`) to detect bots
* Includes CORS headers for use with browser-based `fetch()`
* Automatically sends valid messages to your Slack webhook
* Auto-fades response messages after 15 seconds (on frontend side)

---

## 🔒 Notes & Security

* ✅ Webhook secrets are stored using `wrangler secret` (not exposed)
* ⚠️ No rate limiting or abuse protection included by default — you can add it via Workers KV (see `isRateLimited()` design pattern)
* ❌ This project **does not expose your Slack webhook publicly**
* 💬 Messages sent from GitHub Pages forms should be passed via `fetch()` from JavaScript, not raw `<form action>` posts

---

## 🧪 Example Client (Frontend)

```html
<form id="slack-form">
  <input type="text" name="website" style="display: none">
  <input type="text" name="message" id="message" required />
  <button type="submit">Send</button>
</form>
<div id="status"></div>
```

```js
// Simplified JS handler using fetch() with fade-out, scroll, and disabled button
```

*See `docs/js/main.js` in the main project for full logic.*

---

## 🧠 Roadmap

* [ ] Add rate-limiting via Workers KV
* [ ] Optional Turnstile CAPTCHA validation
* [ ] Custom Slack message formatting via attachments/blocks
* [ ] GitHub Actions auto-deploy on tag

---

## 🗂️ Repo Practices

* This Worker is tracked on a separate Git branch: `v6.1-slack-proxy`
* `.gitignore` excludes `node_modules`, `.wrangler/`, and other local artifacts
* No secrets or Slack webhook URLs are committed

---

## 📄 License

MIT — free to use, fork, or improve with credit.
**Please don’t hardcode secrets or webhook URLs in forks.**

---
