<template>
  <section class="contact-section" id="Contact" ref="sectionRef">
    <div class="contact-inner">
      <p class="section-label reveal" :class="{ 'is-in': isInView }">
        Get In Touch
      </p>

      <h2 class="contact-heading reveal" :class="{ 'is-in': isInView }">
        Let's build something<br />
        <span class="accent">worth remembering.</span>
      </h2>

      <p class="contact-sub reveal" :class="{ 'is-in': isInView }">
        Punya ide project atau sekadar mau ngobrol soal web development?
        Kotak masuk saya selalu terbuka.
      </p>

      <div class="contact-grid">
        <!-- LEFT: INFO -->
        <div class="info-col reveal" :class="{ 'is-in': isInView }">
          <a href="mailto:hello@fadlan.dev" class="info-item" data-cursor-hover>
            <span class="info-item__icon">
              <Icon icon="mdi:email-outline" />
            </span>
            <span class="info-item__text">
              <span class="info-label">Email</span>
              <span class="info-value">hello@fadlan.dev</span>
            </span>
          </a>

          <div class="info-item">
            <span class="info-item__icon">
              <Icon icon="mdi:map-marker-outline" />
            </span>
            <span class="info-item__text">
              <span class="info-label">Location</span>
              <span class="info-value info-value--static">Banyuwangi, Indonesia</span>
            </span>
          </div>

          <div class="divider"></div>

          <div class="availability">
            <span class="dot"></span>
            <span class="availability-text">Available for freelance work</span>
          </div>

          <div class="socials">
            <a href="#" class="social-link" data-cursor-hover aria-label="GitHub">
              <Icon icon="mdi:github" />
            </a>
            <a href="#" class="social-link" data-cursor-hover aria-label="LinkedIn">
              <Icon icon="mdi:linkedin" />
            </a>
            <a href="#" class="social-link" data-cursor-hover aria-label="Instagram">
              <Icon icon="mdi:instagram" />
            </a>
          </div>
        </div>

        <!-- RIGHT: FORM -->
        <form
          class="contact-form reveal"
          :class="{ 'is-in': isInView }"
          @submit.prevent="handleSubmit"
        >
          <div class="form-row">
            <div class="form-group">
              <label>Name</label>
              <div class="input-wrap">
                <Icon icon="mdi:account-outline" class="input-icon" />
                <input v-model="form.name" type="text" placeholder="John Doe" required />
              </div>
            </div>

            <div class="form-group">
              <label>Email</label>
              <div class="input-wrap">
                <Icon icon="mdi:at" class="input-icon" />
                <input v-model="form.email" type="email" placeholder="john@email.com" required />
              </div>
            </div>
          </div>

          <div class="form-group">
            <label>Subject</label>
            <div class="input-wrap">
              <Icon icon="mdi:tag-outline" class="input-icon" />
              <input v-model="form.subject" type="text" placeholder="Project Inquiry" required />
            </div>
          </div>

          <div class="form-group">
            <label>Message</label>
            <div class="input-wrap input-wrap--textarea">
              <Icon icon="mdi:message-text-outline" class="input-icon input-icon--top" />
              <textarea
                v-model="form.message"
                rows="6"
                placeholder="Tell me about your project..."
                required
              />
            </div>
          </div>

          <button
            type="submit"
            class="submit-btn"
            :disabled="status === 'sending'"
            :class="status"
          >
            <span class="submit-btn__spinner" v-if="status === 'sending'"></span>
            <span>{{ btnLabel }}</span>
            <Icon
              v-if="status === 'idle' || status === 'error'"
              icon="mdi:arrow-right"
              class="submit-btn__arrow"
            />
          </button>

          <Transition name="status-fade">
            <p v-if="statusMessage" class="status-msg" :class="status">
              <Icon :icon="status === 'sent' ? 'mdi:check-circle' : 'mdi:alert-circle'" />
              {{ statusMessage }}
            </p>
          </Transition>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { Icon } from '@iconify/vue'

// NOTE: submit di bawah ini masih SIMULASI (setTimeout) untuk fokus ke desain dulu.
// Untuk versi fungsional, ganti isi handleSubmit dengan pemanggilan sendEmail()
// dari @/services/email.js yang sudah disiapkan sebelumnya.

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const status = ref('idle')

const btnLabel = computed(() => {
  switch (status.value) {
    case 'sending':
      return 'Sending...'
    case 'sent':
      return 'Message Sent!'
    case 'error':
      return 'Try Again'
    default:
      return 'Send Message'
  }
})

const statusMessage = computed(() => {
  switch (status.value) {
    case 'sent':
      return "Your message has been sent. I'll get back to you soon!"
    case 'error':
      return 'Something went wrong. Please try again.'
    default:
      return ''
  }
})

async function handleSubmit() {
  if (status.value === 'sending') return

  status.value = 'sending'

  // --- Placeholder simulasi kirim (hapus saat sudah dihubungkan ke backend) ---
  await new Promise((resolve) => setTimeout(resolve, 1400))
  status.value = 'sent'
  form.value = { name: '', email: '', subject: '', message: '' }
  // -----------------------------------------------------------------------

  setTimeout(() => {
    status.value = 'idle'
  }, 4000)
}

const sectionRef = ref(null)
const isInView = ref(false)

let observer
onMounted(() => {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  if (prefersReducedMotion) {
    isInView.value = true
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isInView.value = true
          observer.disconnect()
        }
      })
    },
    { threshold: 0.15 }
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>

<style scoped>
.contact-section {
  background: #0e0e0e;
  padding: 100px 0;
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
  margin-bottom: 16px;
}
.accent {
  color: #d2ff00;
}

.contact-sub {
  font-family: 'Space Mono', monospace;
  font-size: 13px;
  color: #666;
  line-height: 1.7;
  margin-bottom: 64px;
  max-width: 52ch;
}

/* ── Grid ── */
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 64px;
  align-items: start;
}

/* ── Info kiri ── */
.info-col {
  display: flex;
  flex-direction: column;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 14px;
  text-decoration: none;
  padding: 14px 0;
  border-bottom: 1px solid #1a1a1a;
  transition: padding-left 0.3s ease;
}

a.info-item:hover {
  padding-left: 6px;
}

.info-item__icon {
  width: 38px;
  height: 38px;
  flex-shrink: 0;
  border-radius: 10px;
  border: 1px solid #1e1e1e;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #d2ff00;
  font-size: 18px;
  transition: border-color 0.3s ease, background 0.3s ease;
}

a.info-item:hover .info-item__icon {
  border-color: rgba(210, 255, 0, 0.4);
  background: rgba(210, 255, 0, 0.06);
}

.info-item__text {
  display: flex;
  flex-direction: column;
  gap: 3px;
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

.info-value--static {
  color: #d0d0d0;
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
  margin-bottom: 32px;
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
  50% { opacity: 0.25; }
}
.availability-text {
  font-family: 'Space Mono', monospace;
  font-size: 12px;
  color: #666;
}

.socials {
  display: flex;
  gap: 10px;
}

.social-link {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid #1e1e1e;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  font-size: 19px;
  text-decoration: none;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
    color 0.3s ease, border-color 0.3s ease, background 0.3s ease;
}

.social-link:hover {
  transform: translateY(-4px);
  color: #0e0e0e;
  background: #d2ff00;
  border-color: #d2ff00;
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

.input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 14px;
  color: #3a3a3a;
  font-size: 16px;
  pointer-events: none;
  transition: color 0.25s ease;
}

.input-icon--top {
  top: 14px;
  align-self: flex-start;
}

.input-wrap:focus-within .input-icon {
  color: #d2ff00;
}

input,
textarea {
  background: #111;
  border: 1px solid #1e1e1e;
  color: #f0f0f0;
  font-family: 'Space Mono', monospace;
  font-size: 13px;
  padding: 12px 16px 12px 42px;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
  width: 100%;
}

input::placeholder,
textarea::placeholder {
  color: #2a2a2a;
}

input:focus,
textarea:focus {
  border-color: #d2ff00;
  box-shadow: 0 0 0 3px rgba(210, 255, 0, 0.08);
}

textarea {
  resize: vertical;
  min-height: 130px;
  line-height: 1.6;
}

/* ── Submit button ── */
.submit-btn {
  width: 100%;
  padding: 16px;
  background: #d2ff00;
  color: #111;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background 0.25s ease, transform 0.2s ease;
}

.submit-btn:hover:not(:disabled) {
  background: #e6ff55;
  transform: translateY(-2px);
}

.submit-btn:active:not(:disabled) {
  transform: translateY(0);
}

.submit-btn__arrow {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.submit-btn:hover:not(:disabled) .submit-btn__arrow {
  transform: translateX(4px);
}

.submit-btn:disabled {
  cursor: not-allowed;
  opacity: 0.85;
}

.submit-btn.sending {
  background: #333;
  color: #d0d0d0;
}

.submit-btn.sent {
  background: #00c853;
  color: #0e0e0e;
}

.submit-btn.error {
  background: #ff5252;
  color: #0e0e0e;
}

.submit-btn__spinner {
  width: 15px;
  height: 15px;
  border: 2px solid rgba(255, 255, 255, 0.25);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.status-msg {
  margin-top: 15px;
  font-size: 0.85rem;
  font-family: 'Space Mono', monospace;
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-msg.sent {
  color: #00c853;
}

.status-msg.error {
  color: #ff5252;
}

.status-fade-enter-active,
.status-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.status-fade-enter-from,
.status-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* ── Scroll reveal ── */
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal.is-in {
  opacity: 1;
  transform: translateY(0);
}

.info-col.reveal { transition-delay: 0.1s; }
.contact-form.reveal { transition-delay: 0.2s; }

@media (prefers-reduced-motion: reduce) {
  .reveal {
    transition: none;
    transform: none;
  }
  .dot {
    animation: none;
  }
  .submit-btn__spinner {
    animation: none;
  }
}

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