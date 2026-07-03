<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";

const props = defineProps({
  heading: {
    type: String,
    default: "Let's Build Something Great Together",
  },
  subheading: {
    type: String,
    default:
      "Have an idea? Let's turn it into a scalable digital solution that drives real results.",
  },
  placeholder: {
    type: String,
    default: "Tell me about your project...",
  },
  name: {
    type: String,
    default: "Fadlan Andry Al Faris",
  },
  tagline: {
    type: String,
    default: "Available for Freelance Projects",
  },
  navItems: {
    type: Array,
    default: () => [
      { label: "Home", href: "#home" },
      { label: "About", href: "#About" },
      { label: "Project", href: "#Project" },
      { label: "Contact", href: "#contact" },
    ],
  },
});

const emit = defineEmits(["send"]);

const message = ref("");

function handleSend() {
  const trimmed = message.value.trim();
  if (!trimmed) return;

  emit("send", trimmed);
  message.value = "";
}
</script>

<template>
  <footer class="contact-footer">
    <!-- ===== CTA Section ===== -->
    <div class="cta-banner">
      <div class="cta">
        <h1 class="cta__heading">{{ heading }}</h1>
        <p class="cta__subheading">{{ subheading }}
          
        </p>

        <form class="cta__form" @submit.prevent="handleSend">
          <input
            v-model="message"
            type="text"
            class="cta__input"
            :placeholder="placeholder"
          />
          <button type="submit" class="cta__send-btn">
            Send
            <Icon icon="ph:paper-plane-tilt-fill" width="18" height="18" />
          </button>
        </form>
      </div>
    </div>

    <!-- ===== Footer Bar ===== -->
    <div class="footer-bar">
      <div class="footer-bar__inner">
        <div class="footer-bar__brand">
          <div class="footer-bar__logo">
            <img
              src="/public/assets/img/Logo-Fadlan-Andry-Al-Faris/icon-black.webp"
              alt=""
              class="footer-logo"
            />
          </div>
          <div class="footer-bar__brand-text">
            <p class="footer-bar__name">{{ name }}</p>
            <p class="footer-bar__tagline">{{ tagline }}</p>
          </div>
        </div>

        <nav class="footer-bar__nav" data-cursor-hover>
          <a
            v-for="item in navItems"
            :key="item.label"
            :href="item.href"
            class="footer-bar__nav-link"
          >
            {{ item.label }}
          </a>
        </nav>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.contact-footer {   
  position: relative;
  margin-top: 6rem;
}

/* ---------- CTA ---------- */

.cta-banner {
  position: relative;
  padding: 6rem 4rem 3em;
  text-align: center;
}
.cta {
  background:
    radial-gradient(circle at 15% 25%, #dbff3d 0%, transparent 45%),
    radial-gradient(circle at 85% 15%, #5b6f00 0%, transparent 55%),
    linear-gradient(135deg, rgb(91, 92, 87) 0%, rgb(188, 188, 188) 60%, #e2d8d8 100%);
  padding: 6rem 1.5rem 5rem;
  text-align: center;
  border-radius: 20px;
  box-shadow: 0 10px 30px -12px rgba(49, 49, 49, 0.25);
}

.cta__heading {
  font-size: clamp(2rem, 4.5vw, 3.25rem);
  font-weight: 700;
  color: #f1f1f1;
  line-height: 1.15;
  max-width: 45rem;
  margin: 0 auto 1.25rem;
}

.cta__subheading {
  color: var(--footer-muted);
  font-size: 1.05rem;
  max-width: 32rem;
  margin: 0 auto 2.5rem;
}

.cta__form {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  max-width: 34rem;
  margin: 0 auto;
  background: #ffffff;
  border-radius: var(--footer-radius);
  padding: 0.4rem 0.4rem 0.4rem 1.5rem;
  box-shadow: 0 10px 30px -12px rgba(80, 60, 200, 0.25);
    border-radius: 40px
}

.cta__input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 0.95rem;
  color: var(--footer-text);
}

.cta__input::placeholder {
  color: #9c9ca8;
}

.cta__send-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  border: none;
  cursor: pointer;
  color: #f3f3f3;
  font-weight: 600;
  font-size: 0.95rem;
  padding: 0.75rem 1.4rem;
  border-radius: 30px;
  background: linear-gradient(135deg, #343d0b 0%, #3b3b3b 100%);
  transition:
    transform 0.15s ease,
    opacity 0.15s ease;
}

.cta__send-btn:hover {
  transform: translateY(-1px);
  opacity: 0.92;
}

/* ---------- Footer bar ---------- */
.footer-bar {
  position: relative;
  background: #1a1a1a;
  padding: 1.75rem 1.5rem;
}

.footer-bar__inner {
  max-width: 72rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.footer-bar__brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.footer-bar__logo {
  width: 2.8rem;
  height: 2.8rem;
  flex-shrink: 0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f1f1f1;
  padding: 0.50em;
}

.footer-logo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.footer-bar__name {
  margin: 0;
  font-weight: 600;
  color: #f1f1f1;
  font-size: 0.95rem;
}

.footer-bar__tagline {
  margin: 0;
  font-size: 0.8rem;
  color: var(--footer-muted);
}

.footer-bar__nav {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.footer-bar__nav-link {
  color: var(--footer-muted);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.15s ease;
}

.footer-bar__nav-link:hover {
  color: var(--footer-accent);
}

/* ---------- Responsive ---------- */
@media (max-width: 640px) {
  .cta {
    padding: 4rem 1rem 3rem;
  }

  .cta__form {
    flex-direction: column;
    align-items: stretch;
    padding: 1rem;
    border-radius: 1.25rem;
  }

  .cta__input {
    padding: 0.5rem 0.25rem;
  }

  .cta__send-btn {
    justify-content: center;
  }

  .footer-bar__inner {
    flex-direction: column;
    align-items: flex-start;
  }

  .footer-bar__status-dot {
    display: none;
  }
}
</style>
