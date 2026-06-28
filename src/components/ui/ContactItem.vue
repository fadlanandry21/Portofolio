<script setup>
import { ref, computed, onMounted } from 'vue'

// ─── EmailJS Config ───────────────────────────────────────────────
// 1. Daftar gratis di https://www.emailjs.com/
// 2. Buat Email Service → salin Service ID
// 3. Buat Email Template → salin Template ID
// 4. Salin Public Key dari Account > API Keys
// Ganti tiga nilai di bawah ini:
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY'

// ─── State ────────────────────────────────────────────────────────
const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const status = ref('idle') // idle | sending | sent | error

const btnLabel = computed(() => {
  if (status.value === 'sending') return 'Sending...'
  if (status.value === 'sent')    return 'Message Sent!'
  if (status.value === 'error')   return 'Try Again'
  return 'Send Message'
})

const statusMessage = computed(() => {
  if (status.value === 'sent')  return `✓ Your message has been sent. I'll get back to you soon!`
  if (status.value === 'error') return '✗ Something went wrong. Please try again or email me directly.'
  return ''
})

// ─── Load EmailJS SDK ─────────────────────────────────────────────
onMounted(() => {
  if (window.emailjs) return
  const script = document.createElement('script')
  script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js'
  script.onload = () => window.emailjs.init(EMAILJS_PUBLIC_KEY)
  document.head.appendChild(script)
})

// ─── Submit handler ───────────────────────────────────────────────
async function handleSubmit() {
  if (status.value === 'sending') return

  status.value = 'sending'

  const templateParams = {
    from_name:    form.value.name,
    from_email:   form.value.email,
    subject:      form.value.subject,
    message:      form.value.message,
  }

  try {
    await window.emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    )
    status.value = 'sent'
    form.value = { name: '', email: '', subject: '', message: '' }
  } catch (err) {
    console.error('EmailJS error:', err)
    status.value = 'error'
  }
}
</script>


<template>
  <section class="contact-item" id="contact">
    <div class="contact-inner">

      <span class="section-label">Contact</span>
      <h2 class="contact-heading">
        Let's work<br>
        <span class="accent">together.</span>
      </h2>
      <p class="contact-sub">
        Got a project in mind? Drop me a message and I'll get back to you.
      </p>

      <div class="contact-grid">

        <!-- Info kolom kiri -->
        <div class="contact-info">
          <div class="info-item">
            <span class="info-label">Email</span>
            <span class="info-value">hello@fadlan.dev</span>
          </div>
          <div class="info-item">
            <span class="info-label">Based in</span>
            <span class="info-value">East Java, Indonesia</span>
          </div>
          <div class="divider"></div>
          <div class="availability">
            <span class="dot"></span>
            <span class="availability-text">Available for freelance work</span>
          </div>
        </div>

        <!-- Form kolom kanan -->
        <form class="contact-form" @submit.prevent="handleSubmit" novalidate>
          <div class="form-row">
            <div class="form-group">
              <label for="name">Name</label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                placeholder="Jane Doe"
                required
              />
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                placeholder="jane@example.com"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <label for="subject">Subject</label>
            <input
              id="subject"
              v-model="form.subject"
              type="text"
              placeholder="Project Inquiry"
              required
            />
          </div>

          <div class="form-group">
            <label for="message">Message</label>
            <textarea
              id="message"
              v-model="form.message"
              placeholder="Tell me about your project..."
              rows="5"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            class="submit-btn"
            :class="{
              sending: status === 'sending',
              sent: status === 'sent',
              error: status === 'error'
            }"
            :disabled="status === 'sending'"
          >
            <span>{{ btnLabel }}</span>
            <span aria-hidden="true">→</span>
          </button>

          <p
            v-if="statusMessage"
            class="status-msg"
            :class="{
              success: status === 'sent',
              error: status === 'error'
            }"
            role="status"
          >
            {{ statusMessage }}
          </p>
        </form>

      </div>
    </div>
  </section>
</template>


<style scoped>
.contact-item {
  background: #0e0e0e;
  padding: 100px 0;
  border-radius: 15px;
}

.contact-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 48px;
}

/* ── Label & Heading ── */
.section-label {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #d2ff00;
  margin-bottom: 20px;
}
.section-label::before {
  content: '';
  display: inline-block;
  width: 28px;
  height: 1px;
  background: #d2ff00;
}

.contact-heading {
  font-family: 'Syne', sans-serif;
  font-size: clamp(36px, 5vw, 60px);
  font-weight: 800;
  line-height: 1.05;
  color: #f0f0f0;
  margin-bottom: 12px;
}
.accent { color: #d2ff00; }

.contact-sub {
  font-family: 'Space Mono', monospace;
  font-size: 13px;
  color: #555;
  line-height: 1.7;
  margin-bottom: 64px;
}

/* ── Grid ── */
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 64px;
  align-items: start;
}

/* ── Info kiri ── */
.info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 28px;
}
.info-label {
  font-family: 'Space Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #3a3a3a;
}
.info-value {
  font-family: 'Space Mono', monospace;
  font-size: 14px;
  color: #d2ff00;
}

.divider {
  width: 100%;
  height: 1px;
  background: #1c1c1c;
  margin: 28px 0;
}

.availability {
  display: flex;
  align-items: center;
  gap: 10px;
}
.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #d2ff00;
  flex-shrink: 0;
  animation: blink 2s ease-in-out infinite;
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.25; }
}
.availability-text {
  font-family: 'Space Mono', monospace;
  font-size: 12px;
  color: #555;
}

/* ── Form ── */
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}

label {
  font-family: 'Space Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #3a3a3a;
}

input,
textarea {
  background: #111;
  border: 1px solid #1e1e1e;
  color: #f0f0f0;
  font-family: 'Space Mono', monospace;
  font-size: 13px;
  padding: 12px 16px;
  border-radius: 0;
  outline: none;
  transition: border-color 0.2s ease;
  width: 100%;
}

input::placeholder,
textarea::placeholder {
  color: #2a2a2a;
}

input:focus,
textarea:focus {
  border-color: #d2ff00;
}

textarea {
  resize: vertical;
  min-height: 130px;
  line-height: 1.6;
}

/* ── Submit button ── */
.submit-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: #d2ff00;
  color: #0e0e0e;
  font-family: 'Space Mono', monospace;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 16px 24px;
  border: 1px solid #d2ff00;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, transform 0.1s ease;
  margin-top: 4px;
}

.submit-btn:hover:not(:disabled) {
  background: #e8ff4d;
}

.submit-btn:active:not(:disabled) {
  transform: scale(0.98);
}

.submit-btn:disabled {
  cursor: not-allowed;
}

.submit-btn.sending {
  background: #0e0e0e;
  color: #d2ff00;
}

.submit-btn.sent {
  background: #0e0e0e;
  color: #d2ff00;
  border-color: #d2ff00;
}

.submit-btn.error {
  background: #0e0e0e;
  color: #ff5c5c;
  border-color: #ff5c5c;
}

/* ── Status message ── */
.status-msg {
  font-family: 'Space Mono', monospace;
  font-size: 11px;
  text-align: center;
  margin-top: 12px;
  line-height: 1.6;
  color: #555;
}

.status-msg.success { color: #d2ff00; }
.status-msg.error   { color: #ff5c5c; }

/* ── Responsive ── */
@media (max-width: 768px) {
  .contact-inner {
    padding: 0 24px;
  }

  .contact-grid {
    grid-template-columns: 1fr;
    gap: 48px;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 0;
  }
}
</style>