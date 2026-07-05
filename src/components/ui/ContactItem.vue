<!-- <script setup>
import { ref, computed } from "vue";
import { sendEmail } from "@/services/email";

const form = ref({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const status = ref("idle");

const btnLabel = computed(() => {
  switch (status.value) {
    case "sending":
      return "Sending...";
    case "sent":
      return "Message Sent!";
    case "error":
      return "Try Again";
    default:
      return "Send Message";
  }
});

const statusMessage = computed(() => {
  switch (status.value) {
    case "sent":
      return "✓ Your message has been sent. I'll get back to you soon!";
    case "error":
      return "✗ Something went wrong. Please try again.";
    default:
      return "";
  }
});

async function handleSubmit() {
  if (status.value === "sending") return;

  status.value = "sending";

  try {
    await sendEmail({
      from_name: form.value.name,
      from_email: form.value.email,
      subject: form.value.subject,
      message: form.value.message,
    });

    status.value = "sent";

    form.value = {
      name: "",
      email: "",
      subject: "",
      message: "",
    };

    setTimeout(() => {
      status.value = "idle";
    }, 4000);
  } catch (error) {
    console.error(error);

    status.value = "error";

    setTimeout(() => {
      status.value = "idle";
    }, 4000);
  }
}
</script> -->

<template>
<form class="contact-form" @submit.prevent="handleSubmit">

<div class="form-row">

<div class="form-group">
<label>Name</label>

<input
v-model="form.name"
type="text"
placeholder="John Doe"
required
/>

</div>

<div class="form-group">

<label>Email</label>

<input
v-model="form.email"
type="email"
placeholder="john@email.com"
required
/>

</div>

</div>

<div class="form-group">

<label>Subject</label>

<input
v-model="form.subject"
type="text"
placeholder="Project Inquiry"
required
/>

</div>

<div class="form-group">

<label>Message</label>

<textarea
v-model="form.message"
rows="6"
placeholder="Tell me about your project..."
required
/>

</div>

<button
type="submit"
class="submit-btn"
:disabled="status==='sending'"
:class="status"
>

{{ btnLabel }}

</button>

<p
v-if="statusMessage"
class="status-msg"
:class="status"
>

{{ statusMessage }}

</p>

</form>
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
  text-decoration: none;
}

.info-value-mail {
  font-family: 'Space Mono', monospace;
  font-size: 14px;
  color: #d2ff00;
  text-decoration: none;
}

.info-value-mail:hover {
  color: #9fc300;
  animation: all ease-in 2s;

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
.submit-btn{
width:100%;
padding:16px;
background:#d2ff00;
color:#111;
border:none;
cursor:pointer;
font-weight:bold;
transition:.25s;
}

.submit-btn:hover{
background:#e6ff55;
}

.submit-btn:disabled{
cursor:not-allowed;
opacity:.7;
}

.submit-btn.sending{
background:#444;
color:white;
}

.submit-btn.sent{
background:#00c853;
color:white;
}

.submit-btn.error{
background:#ff5252;
color:white;
}

.status-msg{
margin-top:15px;
font-size:.9rem;
}

.status-msg.sent{
color:#00c853;
}

.status-msg.error{
color:#ff5252;
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