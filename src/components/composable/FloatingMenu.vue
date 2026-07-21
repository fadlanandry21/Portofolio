      <script setup>
      import { ref, onMounted, onBeforeUnmount } from 'vue'
      import { Icon } from '@iconify/vue'
      
      const props = defineProps({
        cvLink: {
          type: String,
          default: '/files/CV.Fadlan-Andry-Al-Faris.pdf',
        },
        certificatesLink: {
          type: String,
          default: '#certificates',
        },
        WhatsAppLink: {
          type: String,
          default: 'https://wa.me/6285143111299',
        },

      })
      
      const isOpen = ref(false)
      const fabRef = ref(null)
      
      function toggle() {
        isOpen.value = !isOpen.value
      }
      
      function close() {
        isOpen.value = false
      }
      
      function onClickOutside(e) {
        if (fabRef.value && !fabRef.value.contains(e.target)) {
          close()
        }
      }
      
      function onKeydown(e) {
        if (e.key === 'Escape') close()
      }
      
      onMounted(() => {
        window.addEventListener('click', onClickOutside)
        window.addEventListener('keydown', onKeydown)
      })
      
      onBeforeUnmount(() => {
        window.removeEventListener('click', onClickOutside)
        window.removeEventListener('keydown', onKeydown)
      })
      </script>

<template>
  <div class="fab" ref="fabRef">
    <transition-group name="fab-item" tag="div" class="fab__menu">
      <a
        v-if="isOpen"
        key="cv"
        :href="cvLink"
        download
        class="fab__item"
        style="--i: 0"
        data-cursor-hover
        @click="close"
      >
        <span class="fab__item-icon">
          <Icon icon="mdi:download" />
        </span>
        <span class="fab__item-label">Download CV</span>
      </a>

      <a
        v-if="isOpen"
        key="cert"
        :href="certificatesLink"
        class="fab__item"
        style="--i: 1"
        data-cursor-hover
        @click="close"
      >
        <span class="fab__item-icon">
          <Icon icon="mdi:certificate-outline" />
        </span>
        <span class="fab__item-label">Lihat Sertifikasi</span>
      </a>

      <a
        v-if="isOpen"
        key="wa"
        :href="WhatsAppLink"
        target="_blank"
        class="fab__item"
        style="--i: 2"
        data-cursor-hover
        @click="close">
        <span class="fab__item-icon">
          <Icon icon="mdi:whatsapp" />
        </span>
        <span class="fab__item-label">WhatsApp</span>
      </a>
    </transition-group>

    <button
      class="fab__main"
      :class="{ 'is-open': isOpen }"
      data-cursor-hover
      :aria-expanded="isOpen"
      aria-label="Buka menu cepat"
      @click="toggle"
    >
      <span class="fab__main-ring"></span>
      <Icon icon="mdi:plus" class="fab__icon" />
    </button>
  </div>
</template>


<style scoped>
.fab {
  position: fixed;
  right: clamp(1.25rem, 4vw, 2.5rem);
  bottom: clamp(1.25rem, 4vw, 2.5rem);
  z-index: 60;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.9rem;
}

/* ---------- MAIN BUTTON ---------- */
.fab__main {
  position: relative;
  width: 58px;
  height: 58px;
  border-radius: 50%;
  border: none;
  background: #d2ff00;
  color: #0e0e0e;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 8px 28px rgba(210, 255, 0, 0.25), 0 4px 14px rgba(0, 0, 0, 0.4);
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
    background 0.3s ease, box-shadow 0.3s ease;
}

.fab__main:hover {
  transform: translateY(-3px) scale(1.05);
}

.fab__main.is-open {
  background: #f5f5f0;
  transform: rotate(0deg);
}

.fab__icon {
  font-size: 1.6rem;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.fab__main.is-open .fab__icon {
  transform: rotate(135deg);
}

.fab__main-ring {
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  border: 1.5px solid rgba(210, 255, 0, 0.5);
  opacity: 0;
  pointer-events: none;
}

.fab__main:not(.is-open) .fab__main-ring {
  animation: fab-pulse 2.6s ease-out infinite;
}

@keyframes fab-pulse {
  0% { opacity: 0.6; transform: scale(0.9); }
  100% { opacity: 0; transform: scale(1.35); }
}

/* ---------- MENU ITEMS ---------- */
.fab__menu {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.75rem;
}

.fab__item {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  background: #141414;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 999px;
  padding: 0.6rem 1.1rem 0.6rem 0.6rem;
  text-decoration: none;
  color: #f5f5f0;
  font-family: 'Space Mono', monospace;
  font-size: 0.82rem;
  white-space: nowrap;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.3s ease, background 0.3s ease;
}

.fab__item:hover {
  border-color: rgba(210, 255, 0, 0.4);
  background: #1a1a1a;
  transform: translateX(-4px);
}

.fab__item-icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(210, 255, 0, 0.1);
  color: #d2ff00;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
}

/* ---------- TRANSITIONS ---------- */
.fab-item-enter-active {
  transition: opacity 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
    transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: calc(var(--i) * 0.06s);
}

.fab-item-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fab-item-enter-from {
  opacity: 0;
  transform: translateY(14px) scale(0.85);
}

.fab-item-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.9);
}

@media (prefers-reduced-motion: reduce) {
  .fab__main,
  .fab__icon,
  .fab__item,
  .fab-item-enter-active,
  .fab-item-leave-active {
    transition: none;
  }
  .fab__main-ring {
    animation: none;
  }
}

@media (max-width: 480px) {
  .fab__item-label {
    display: inline;
  }

  .fab__item {
    font-size: 0.78rem;
  }
}
</style>