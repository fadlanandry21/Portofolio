<template>
  <section class="tech-stack-section" ref="sectionRef">
    <p class="eyebrow reveal" :class="{ 'is-in': isInView }">
      <span class="eyebrow__bracket">[</span>
      What I work with
      <span class="eyebrow__bracket">]</span>
    </p>

    <h2 class="techStack-title reveal" :class="{ 'is-in': isInView }">
      Tech Stack
    </h2>

    <div class="tabs reveal" :class="{ 'is-in': isInView }" role="tablist">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        class="tabs__item"
        :class="{ 'is-active': activeTab === tab.key }"
        role="tab"
        :aria-selected="activeTab === tab.key"
        data-cursor-hover
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
        <span class="tabs__count">{{ countFor(tab.key) }}</span>
      </button>
    </div>

    <TransitionGroup
      name="skill-fade"
      tag="div"
      class="skills-grid"
      role="tabpanel"
    >
      <SkillCard
        v-for="skill in filteredSkills"
        :key="skill.name"
        :name="skill.name"
        :percent="skill.percent"
        :icon="skill.icon"
      />
    </TransitionGroup>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import SkillCard from '@/components/ui/SkillCard.vue'
import { skills } from '@/data/Skills.js'

const tabs = [
  { key: 'all', label: 'All' },
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'tools', label: 'Tools' },
]

const activeTab = ref('all')

const filteredSkills = computed(() => {
  if (activeTab.value === 'all') return skills
  return skills.filter((skill) => skill.category === activeTab.value)
})

function countFor(key) {
  if (key === 'all') return skills.length
  return skills.filter((skill) => skill.category === key).length
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
  margin-bottom: 2rem;
  font-size: clamp(2.2rem, 5vw, 3rem);
  letter-spacing: -0.01em;
}

/* ---------- TABS ---------- */
.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: clamp(2rem, 5vw, 3rem);
}

.tabs__item {
  font-family: 'Space Mono', monospace;
  font-size: 0.82rem;
  letter-spacing: 0.03em;
  color: rgba(245, 245, 240, 0.55);
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  padding: 0.55rem 1.1rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.3s ease, border-color 0.3s ease, background 0.3s ease;
}

.tabs__item:hover {
  color: #f5f5f0;
  border-color: rgba(210, 255, 0, 0.3);
}

.tabs__item.is-active {
  color: #0e0e0e;
  background: #d2ff00;
  border-color: #d2ff00;
}

.tabs__count {
  font-size: 0.7rem;
  opacity: 0.6;
}

.tabs__item.is-active .tabs__count {
  opacity: 0.7;
}

/* ---------- GRID ---------- */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 160px));
  justify-content: space-between;
  align-items: center;
  gap: 15px 10px;
  min-height: 200px;
}

/* tab switch transition */
.skill-fade-enter-active,
.skill-fade-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.skill-fade-enter-from {
  opacity: 0;
  transform: translateY(16px) scale(0.96);
}

.skill-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.96);
}

.skill-fade-leave-active {
  position: absolute;
}

.skill-fade-move {
  transition: transform 0.35s ease;
}

/* section entrance reveal */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal.is-in {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .reveal,
  .skill-fade-enter-active,
  .skill-fade-leave-active,
  .skill-fade-move {
    transition: none;
    transform: none;
  }
}

@media (max-width: 560px) {
  .tech-stack-section {
    margin: 16% auto;
  }

  .tabs__item {
    font-size: 0.75rem;
    padding: 0.5rem 0.9rem;
  }
}
</style>