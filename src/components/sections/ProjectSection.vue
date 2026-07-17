<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

import ProjectCard from '../ui/ProjectCard.vue'
import { Projects } from '@/data/Projects.js'

const slider = ref(null)
const wrapper = ref(null)

const projectList = [...Projects, ...Projects]

let animationFrame = null
let position = 0
let paused = false

const SPEED = 0.4

function animate() {
  if (!paused && slider.value) {
    position += SPEED

    const limit = slider.value.scrollWidth / 2

    if (position >= limit) {
      position = 0
    }

    slider.value.style.transform = `translateX(-${position}px)`
  }

  animationFrame = requestAnimationFrame(animate)
}

function pause() {
  paused = true
}

function resume() {
  paused = false
}

onMounted(() => {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  if (prefersReducedMotion) return

  animationFrame = requestAnimationFrame(animate)
})

onUnmounted(() => {
  cancelAnimationFrame(animationFrame)
})
</script>

<template>
  <section class="project-section" id="Project">
    <div class="section-header">
      <div>
        <p class="eyebrow">
          <span class="eyebrow__bracket">[</span>
          Selected work
          <span class="eyebrow__bracket">]</span>
        </p>
        <h2 class="section-title">My Latest Projects</h2>
      </div>

      <router-link to="/projects" class="see-all-link" data-cursor-hover>
        View All
        <span class="see-all-link__arrow">→</span>
      </router-link>
    </div>

    <div
      class="slider-wrapper"
      ref="wrapper"
      @mouseenter="pause"
      @mouseleave="resume"
      @focusin="pause"
      @focusout="resume"
    >
      <div class="slider-track" ref="slider">
        <ProjectCard
          v-for="(project, index) in projectList"
          :key="`${project.id}-${index}`"
          :project="project"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.project-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: clamp(3rem, 8vw, 80px) clamp(1.25rem, 6vw, 80px);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1.5rem;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.eyebrow {
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #d2ff00;
  margin: 0 0 0.75rem;
  display: flex;
  gap: 0.4rem;
}

.eyebrow__bracket {
  opacity: 0.5;
}

.section-title {
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  font-size: clamp(1.9rem, 5vw, 2.6rem);
  color: #f5f5f0;
  letter-spacing: -0.01em;
  margin: 0;
}

.see-all-link {
  color: rgba(245, 245, 240, 0.6);
  text-decoration: none;
  font-family: 'Space Mono', monospace;
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  transition: color 0.3s ease;
}

.see-all-link:hover {
  color: #d2ff00;
}

.see-all-link__arrow {
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.see-all-link:hover .see-all-link__arrow {
  transform: translateX(4px);
}

.slider-wrapper {
  position: relative;
  overflow: hidden;
  padding: 10px;
}

.slider-wrapper::before,
.slider-wrapper::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 90px;
  z-index: 2;
  pointer-events: none;
}

.slider-wrapper::before {
  left: 0;
  background: linear-gradient(to right, #0e0e0e, transparent);
}

.slider-wrapper::after {
  right: 0;
  background: linear-gradient(to left, #0e0e0e, transparent);
}

.slider-track {
  display: flex;
  gap: 24px;
  width: max-content;
  will-change: transform;
}

@media (max-width: 768px) {
  .project-section {
    padding: 40px 20px;
  }

  .slider-track {
    gap: 16px;
  }

  .slider-wrapper::before,
  .slider-wrapper::after {
    width: 50px;
  }
}
</style>