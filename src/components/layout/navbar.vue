<script setup>

import { ref, onMounted, onBeforeUnmount } from 'vue'

const isScrolled = ref(false)
const activeSection = ref('home')

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
}

// Handle Scroll
const handleScroll = () => {
  const navbar = document.querySelector('.navbar')
  const sections = document.querySelectorAll('section, main')

  // Navbar effect
  isScrolled.value = window.scrollY > 50

  // Active section
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

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
    <nav :class="['navbar', { scrolled: isScrolled }]">
    <a href="#" class="logo">
      <img src="/public/assets/img/fadddev-high-resolution-logo-transparent.png" />
    </a>

    <ul class="nav-links">
      <li v-for="link in links" :key="link.id">
        <a data-cursor-hover
          :href="'#' + link.id"
          :class="{ active: activeSection === link.id }"
          @click.prevent="scrollToSection(link.id)"
        >
          {{ link.name }}
        </a>
      </li>
    </ul>
  </nav>
</template>