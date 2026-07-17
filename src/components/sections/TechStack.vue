<template>
  <section class="tech-stack-section" ref="sectionRef">
    <p class="eyebrow reveal" :class="{ 'is-in': isInView }">
      <span class="eyebrow__bracket">[</span>
      Some Cool tech I use
      <span class="eyebrow__bracket">]</span>
    </p>

    <h2 class="techStack-title reveal" :class="{ 'is-in': isInView }">
      Tech Stack
    </h2>

    <div class="skills-grid">
      <div
        v-for="(skill, i) in skills"
        :key="skill.name"
        class="skills-grid__item reveal"
        :class="{ 'is-in': isInView }"
        :style="{ '--delay': `${0.08 * i}s` }"
      >
        <SkillCard
          :name="skill.name"
          :percent="skill.percent"
          :icon="skill.icon"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import SkillCard from '@/components/ui/SkillCard.vue'
import { skills } from '@/data/Skills.js'

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
.tech-stack-section {
  max-width: 1200px;
  margin: 10% auto;
  padding: 20px clamp(1.5rem, 6vw, 80px) 50px;
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

.techStack-title {
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  color: white;
  margin-bottom: 50px;
  font-size: clamp(2.2rem, 5vw, 3rem);
  letter-spacing: -0.01em;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: clamp(1.25rem, 3vw, 2.5rem);
}

/* scroll reveal */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: var(--delay, 0s);
}

.reveal.is-in {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .reveal {
    transition: none;
    transform: none;
  }
}

@media (max-width: 560px) {
  .tech-stack-section {
    margin: 16% auto;
  }
}
</style>