<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isScrolled = ref(false)
const activeSection = ref('home')
const menuOpen = ref(false)

const links = [
  { id: 'home', name: 'Home' },
  { id: 'About', name: 'About' },
  { id: 'Service', name: 'Service' },
  { id: 'Project', name: 'Project' },
  { id: 'contact', name: 'Contact' },
]

// Smooth Scroll
const scrollToSection = (id) => {
  const section = document.getElementById(id)
  const navbar = document.querySelector('.navbar')

  if (section) {
    const offset = navbar.offsetHeight
    const top = id === 'home' ? 0 : section.offsetTop - offset + 1

    window.scrollTo({
      top,
      behavior: 'smooth',
    })
  }

  menuOpen.value = false
}

// Handle Scroll
const handleScroll = () => {
  const navbar = document.querySelector('.navbar')
  const sections = document.querySelectorAll('section, main')

  isScrolled.value = window.scrollY > 50

  let current = ''
  const offset = navbar.offsetHeight

  sections.forEach((section) => {
    const top = section.offsetTop - offset - 100
    const height = section.clientHeight

    if (window.scrollY >= top && window.scrollY < top + height) {
      current = section.id
    }
  })

  activeSection.value = current
}

// Close menu on outside click
const handleClickOutside = (e) => {
  if (!e.target.closest('.nav-right')) {
    menuOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <nav :class="['navbar', { scrolled: isScrolled }]">
    <!-- Logo kiri -->
    <a href="#" class="logo" @click.prevent="scrollToSection('home')">
      <img src="/public/assets/img/fadddev-high-resolution-logo-transparent.png" />
    </a>

    <!-- Kanan: tombol collaborate + menu -->
    <div class="nav-right">
      <a
        data-cursor-hover
        href="#contact"
        class="btn-collaborate"
        @click.prevent="scrollToSection('contact')"
      >
        Collaborate with me
      </a>

      <button
        data-cursor-hover
        class="btn-menu"
        :class="{ open: menuOpen }"
        @click.stop="menuOpen = !menuOpen"
        aria-label="Toggle menu"
      >
        <span class="menu-label">{{ menuOpen ? '×' : 'Menu' }}</span>
      </button>

      <!-- Dropdown -->
      <Transition name="dropdown">
        <ul v-if="menuOpen" class="dropdown">
          <li v-for="link in links" :key="link.id">
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
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem 2.5rem;
  transition: background 0.3s ease, backdrop-filter 0.3s ease;
  box-sizing: border-box;
}

.navbar.scrolled {
  background: rgba(14, 14, 14, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.logo img {
 width: 160px;
  text-decoration: none;
  transition: all 0.3s ease;
}

/* === Kanan === */
.nav-right {
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
}

/* Tombol Collaborate */
.btn-collaborate {
  font-family: 'Space Mono', monospace;
  font-size: 0.78rem;
  color: #0e0e0e;
  background: #d2ff00;
  padding: 0.55rem 1.2rem;
  border-radius: 999px;
  text-decoration: none;
  letter-spacing: 0.02em;
  transition: opacity 0.2s ease, transform 0.2s ease;
  white-space: nowrap;
}

.btn-collaborate:hover {
  opacity: 0.85;
  transform: translateY(-1px);
}

/* Tombol Menu */
.btn-menu {
  font-family: 'Space Mono', monospace;
  font-size: 0.78rem;
  color: #fff;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.25);
  padding: 0.55rem 1.2rem;
  border-radius: 999px;
  cursor: pointer;
  letter-spacing: 0.05em;
  transition: border-color 0.2s ease, color 0.2s ease;
  white-space: nowrap;
}

.btn-menu:hover,
.btn-menu.open {
  border-color: #d2ff00;
  color: #d2ff00;
}

.menu-label {
  display: inline-block;
  min-width: 1.4ch;
  text-align: center;
  transition: transform 0.2s ease;
}

/* === Dropdown === */
.dropdown {
  position: absolute;
  top: calc(100% + 0.75rem);
  right: 0;
  background: rgba(14, 14, 14, 0.95);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  list-style: none;
  padding: 0.5rem 0;
  margin: 0;
  min-width: 160px;
  overflow: hidden;
}

.dropdown li a {
  display: block;
  font-family: 'Syne', sans-serif;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  padding: 0.65rem 1.4rem;
  text-decoration: none;
  letter-spacing: 0.02em;
  transition: color 0.2s ease, background 0.2s ease;
}

.dropdown li a:hover {
  color: #d2ff00;
  background: rgba(210, 255, 0, 0.05);
}

.dropdown li a.active {
  color: #d2ff00;
}

/* === Transition === */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>