<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Icon } from "@iconify/vue";

const isScrolled = ref(false);
const activeSection = ref("home");
const menuOpen = ref(false);

const links = [
  { id: "home", name: "Home", icon: "material-symbols:home-rounded" },
  { id: "About", name: "About", icon: "proicons:person-circle" },
  { id: "Service", name: "Solution", icon: "hugeicons:ai-idea" },
  { id: "Project", name: "Project", icon: "mdi:code" },
  { id: "contact", name: "Contact", icon: "bxs:contact" },
];

const scrollToSection = (id) => {
  const section = document.getElementById(id);
  const navbar = document.querySelector(".navbar");

  if (section) {
    const offset = navbar.offsetHeight;
    const top = id === "home" ? 0 : section.offsetTop - offset + 1;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  }

  menuOpen.value = false;
};

const handleScroll = () => {
  const navbar = document.querySelector(".navbar");
  const sections = document.querySelectorAll("section, main");

  isScrolled.value = window.scrollY > 50;

  let current = "";
  const offset = navbar.offsetHeight;

  sections.forEach((section) => {
    const top = section.offsetTop - offset - 100;
    const height = section.clientHeight;

    if (window.scrollY >= top && window.scrollY < top + height) {
      current = section.id;
    }
  });

  activeSection.value = current;
};

const handleClickOutside = (e) => {
  if (!e.target.closest(".nav-right")) {
    menuOpen.value = false;
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <nav :class="['navbar', { scrolled: isScrolled }]">
    <a
      href="#"
      class="logo"
      @click.prevent="scrollToSection('home')"
      data-cursor-hover
    >
      <img
        src="/public/assets/img/Logo-Fadlan-Andry-Al-Faris/logo.webp"
        alt="fadddev logo"
      />
    </a>

    <div class="nav-right">
      <!-- Collaborate button: hidden on mobile, visible on tablet+ -->
      <a
        data-cursor-hover
        href="mailto:andryalfarisfadlan@gmail.com"
        class="btn-collaborate"
      >
        Collaborate with me ↗
      </a>

      <button
        data-cursor-hover
        class="btn-menu"
        :class="{ open: menuOpen }"
        @click.stop="menuOpen = !menuOpen"
        :aria-expanded="menuOpen"
        aria-label="Toggle menu"
      >
        <span class="bar-h"></span>
        <span class="bar-v"></span>
        <span class="menu-label">Menu</span>
      </button>

      <!-- Dropdown -->
      <Transition name="dropdown">
        <ul v-if="menuOpen" class="dropdown">
          <!-- Collaborate link inside dropdown on mobile -->
          <li class="dropdown-collab">
            <a
              href="mailto:andryalfaris@gmail.com"
              class="dropdown-collab-link"
            >
              Collaborate with me ↗
            </a>
          </li>
          <li
            v-for="link in links"
            :key="link.id"
            :style="`--i: ${links.indexOf(link)}`"
            :icon="link.icon"
            class="dropdown-item"
          >
            <div class="icon-box">
              <Icon :icon="link.icon" width="20" />
            </div>
            <a
              data-cursor-hover
              :href="'#' + link.id"
              :class="{ active: activeSection === link.id }"
              @click.prevent="scrollToSection(link.id)"
            >
              {{ link.name }}
            </a>
          </li>
        </ul>
      </Transition>
    </div>
  </nav>
</template>

<style scoped>
/* ===========================
   BASE NAVBAR
=========================== */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 5rem;
  transition:
    background 0.3s ease,
    backdrop-filter 0.3s ease;
  box-sizing: border-box;
}

.navbar.scrolled {
  background: rgba(26, 26, 26, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

/* ===========================
   LOGO
=========================== */
.logo img {
  width: 180px;
  display: block;
  transition: opacity 0.3s ease;
}

.logo:hover img {
  opacity: 0.75;
}

/* ===========================
   RIGHT SIDE
=========================== */
.nav-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  position: relative;
}

/* ===========================
   COLLABORATE BUTTON
=========================== */
.btn-collaborate {
  font-family: "Space Mono", monospace;
  font-size: 0.78rem;
  color: #0e0e0e;
  background: #d2ff00;
  padding: 0.8rem 1.2rem;
  border-radius: 11px;
  text-decoration: none;
  letter-spacing: 0.02em;
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
  white-space: nowrap;
}

.btn-collaborate:hover {
  opacity: 0.85;
  transform: translateY(-1px);
}

/* ===========================
   MENU BUTTON
=========================== */
.btn-menu {
  font-family: "Space Mono", monospace;
  font-size: 0.78rem;
  color: #fff;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.25);
  padding: 0.8rem 1.2rem;
  border-radius: 11px;
  cursor: pointer;
  letter-spacing: 0.05em;
  transition:
    border-color 0.2s ease,
    color 0.2s ease;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-menu:hover,
.btn-menu.open {
  border-color: #d2ff00;
  color: #d2ff00;
}

/* +/× icon using two bars */
.bar-h,
.bar-v {
  position: absolute;
  width: 10px;
  height: 1.5px;
  background: currentColor;
  border-radius: 2px;
  transition:
    transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
    opacity 0.2s ease;
  pointer-events: none;
  /* hide visually since we're using text label; keep for icon variant if needed */
  display: none;
}

.menu-label {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
}

/* "+" / "×" via ::after on the label */
.menu-label::after {
  content: "+";
  font-size: 1.1rem;
  line-height: 1;
  transition:
    transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
    opacity 0.2s ease;
  display: inline-block;
}

.btn-menu.open .menu-label::after {
  content: "×";
  transform: rotate(90deg);
}

/* ===========================
   DROPDOWN
=========================== */
.dropdown {
  position: absolute;
  top: calc(100% + 0.75rem);
  right: 0;
  background: rgba(14, 14, 14, 0.97);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  list-style: none;
  padding: 0.5rem 0;
  margin: 0;
  min-width: 180px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0.25rem 1.20rem;
}

.icon-box {
  width: 38px;
  height: 38px;
  min-width: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  color: #d2ff00;
  transition: all 0.25s ease;
}


.dropdown li a {
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
    padding: .75rem .5rem !important;
  text-decoration: none;
  letter-spacing: 0.02em;
  transition:
    color 0.2s ease,
    background 0.2s ease;
}

.dropdown li a:hover {
  color: #d2ff00;
}

.dropdown li a.active {
  color: #d2ff00;
}

/* Collaborate link inside dropdown (mobile only) */
.dropdown-collab {
  display: none;
}

.dropdown-collab-link {
  font-family: "Space Mono", monospace !important;
  font-size: 0.72rem !important;
  color: #d2ff00 !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  margin-bottom: 0.25rem;
}

/* ===========================
   TRANSITION
=========================== */
.dropdown-enter-active {
  transition:
    opacity 0.22s ease,
    transform 0.22s cubic-bezier(0.34, 1.2, 0.64, 1);
}

.dropdown-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.97);
}

/* ===========================
   RESPONSIVE — TABLET (≤768px)
=========================== */
@media (max-width: 768px) {
  .navbar {
    padding: 1rem 1.5rem;
  }

  .logo img {
    width: 120px;
  }

  /* Hide collaborate button from navbar, show inside dropdown */
  .btn-collaborate {
    display: none;
  }

  .dropdown-collab {
    display: block;
  }

  /* Dropdown becomes full-width */
  .dropdown {
    position: fixed;
    top: 64px; /* match navbar height */
    left: 0;
    right: 0;
    width: 100%;
    border-radius: 0 0 16px 16px;
    min-width: unset;
    padding: 0.75rem 0 1rem;
    border-left: none;
    border-right: none;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  .dropdown li a {
    font-size: 1rem;
    padding: 0.85rem 1.75rem;
  }
}

/* ===========================
   RESPONSIVE — SMALL MOBILE (≤480px)
=========================== */
@media (max-width: 480px) {
  .navbar {
    padding: 0.9rem 1.2rem;
  }

  .logo img {
    width: 108px;
  }

  .btn-menu {
    font-size: 0.73rem;
    padding: 0.5rem 0.85rem;
  }

  .dropdown {
    top: 58px;
  }

  .dropdown li a {
    font-size: 0.95rem;
    padding: 0.8rem 1.5rem;
  }
}

@media (min-width: 1400px) {
  .navbar {
    padding: 1.4rem 4rem;
  }

  .logo img {
    width: 160px;
  }
}
</style>
