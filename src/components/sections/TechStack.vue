<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
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

/* ---------- sliding tab indicator ---------- */
const tabRefs = ref([])
const indicatorStyle = ref({ width: '0px', transform: 'translateX(0px)', opacity: 0 })

function setTabRef(el, index) {
  if (el) tabRefs.value[index] = el
}

function updateIndicator() {
  const index = tabs.findIndex((t) => t.key === activeTab.value)
  const el = tabRefs.value[index]
  if (!el) return
  indicatorStyle.value = {
    width: `${el.offsetWidth}px`,
    transform: `translateX(${el.offsetLeft}px)`,
    opacity: 1,
  }
}

watch(activeTab, () => nextTick(updateIndicator))

/* ---------- section reveal ---------- */
const sectionRef = ref(null)
const isInView = ref(false)
let observer
let resizeHandler

onMounted(() => {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  nextTick(updateIndicator)
  resizeHandler = () => updateIndicator()
  window.addEventListener('resize', resizeHandler)

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
  if (resizeHandler) window.removeEventListener('resize', resizeHandler)
})
</script>

<template>
  <section class="tech-stack-section" ref="sectionRef">
    <div class="ambient-glow" aria-hidden="true"></div>

    <p class="eyebrow reveal" :class="{ 'is-in': isInView }">
      <span class="eyebrow__bracket">[</span>
      Core Technologies
      <span class="eyebrow__bracket">]</span>
    </p>

    <h2 class="techStack-title reveal" :class="{ 'is-in': isInView }">
      Tech Stack
    </h2>

    <div class="tabs reveal" :class="{ 'is-in': isInView }" role="tablist">
      <span class="tabs__indicator" :style="indicatorStyle" aria-hidden="true"></span>
      <button
        v-for="(tab, index) in tabs"
        :key="tab.key"
        :ref="(el) => setTabRef(el, index)"
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
      <div
        v-for="(skill, index) in filteredSkills"
        :key="skill.name"
        class="skill-item"
        :style="{ '--i': index % 8 }"
      >
        <SkillCard
          :name="skill.name"
          :percent="skill.percent"
          :icon="skill.icon"
        />
      </div>
    </TransitionGroup>
  </section>
</template>

<style scoped>
.tech-stack-section {
  position: relative;
  max-width: 1200px;
  margin: 10% auto;
  padding: 20px clamp(1.5rem, 6vw, 80px) 50px;
  isolation: isolate;
}

/* ---------- ambient glow ---------- */
.ambient-glow {
  position: absolute;
  top: -10%;
  left: 50%;
  width: min(720px, 90%);
  height: 420px;
  transform: translateX(-50%);
  background: radial-gradient(
    ellipse at center,
    rgba(210, 255, 0, 0.09) 0%,
    rgba(210, 255, 0, 0.03) 40%,
    transparent 70%
  );
  filter: blur(40px);
  pointer-events: none;
  z-index: -1;
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
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: clamp(2rem, 5vw, 3rem);
  padding: 0.35rem;
  width: fit-content;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
}

.tabs__indicator {
  position: absolute;
  top: 0.35rem;
  left: 0;
  height: calc(100% - 0.7rem);
  border-radius: 999px;
  background: #d2ff00;
  box-shadow: 0 0 18px rgba(210, 255, 0, 0.35);
  transition: transform 0.5s cubic-bezier(0.65, 0, 0.35, 1),
    width 0.5s cubic-bezier(0.65, 0, 0.35, 1);
  z-index: 0;
}

.tabs__item {
  position: relative;
  z-index: 1;
  font-family: 'Space Mono', monospace;
  font-size: 0.82rem;
  letter-spacing: 0.03em;
  color: rgba(245, 245, 240, 0.55);
  background: transparent;
  border: none;
  border-radius: 999px;
  padding: 0.55rem 1.1rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.tabs__item:hover:not(.is-active) {
  color: #f5f5f0;
}

.tabs__item:focus-visible {
  outline: 2px solid rgba(210, 255, 0, 0.6);
  outline-offset: 2px;
}

.tabs__item.is-active {
  color: #0e0e0e;
}

.tabs__count {
  font-size: 0.7rem;
  opacity: 0.6;
}

.tabs__item.is-active .tabs__count {
  opacity: 0.75;
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

.skill-item {
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.skill-item:hover {
  transform: translateY(-4px);
}

/* tab switch / filter transition, staggered by column position */
.skill-fade-enter-active {
  transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: calc(var(--i, 0) * 40ms);
}

.skill-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
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
  transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
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

.techStack-title.reveal {
  transition-delay: 0.08s;
}

.tabs.reveal {
  transition-delay: 0.16s;
}

@media (prefers-reduced-motion: reduce) {
  .reveal,
  .skill-item,
  .tabs__indicator,
  .skill-fade-enter-active,
  .skill-fade-leave-active,
  .skill-fade-move {
    transition: none !important;
    transform: none !important;
  }
}

@media (max-width: 560px) {
  .tech-stack-section {
    margin: 16% auto;
  }

  .tabs {
    width: 100%;
    justify-content: space-between;
  }

  .tabs__item {
    font-size: 0.75rem;
    padding: 0.5rem 0.9rem;
  }

  .ambient-glow {
    height: 280px;
  }
}
</style>