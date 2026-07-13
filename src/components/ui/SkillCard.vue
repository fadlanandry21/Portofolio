<template>
  <div class="skill-card reveal" :class="{ 'is-in': isInView }" ref="cardRef">
    <div class="circle-wrapper">
      <svg class="progress-ring" viewBox="0 0 180 180">
        <circle class="circle-bg" cx="90" cy="90" r="76" />
        <circle class="circle-progress" cx="90" cy="90" r="76" :style="circleStyle" />
      </svg>

      <div class="skill-content">
        <i :class="`fa-brands fa-${icon}`" id="skill-icon" ></i>
        <h3 class="skill-percent">{{ animatedPercent }}%</h3>
      </div>
    </div>

    <p class="skill-name">{{ name }}</p>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps({
  name: String,
  percent: Number,
  icon: String,
})

const radius = 76
const circumference = 2 * Math.PI * radius

const cardRef = ref(null)
const isInView = ref(false)
const animatedPercent = ref(0)

let started = false
function runCount() {
  if (started) return
  started = true

  const duration = 1200
  const target = props.percent
  const start = performance.now()

  function step(now) {
    const progress = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    animatedPercent.value = Math.round(eased * target)
    if (progress < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

const offset = computed(() => {
  return circumference - (animatedPercent.value / 100) * circumference
})

const circleStyle = computed(() => ({
  strokeDasharray: circumference,
  strokeDashoffset: offset.value,
}))

let observer
onMounted(() => {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  if (prefersReducedMotion) {
    isInView.value = true
    animatedPercent.value = props.percent
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isInView.value = true
          runCount()
          observer.disconnect()
        }
      })
    },
    { threshold: 0.3 }
  )
  if (cardRef.value) observer.observe(cardRef.value)
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>

<style scoped>
.skill-card {
  text-align: center;
  padding: 1.75rem 1.25rem 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: #141414;
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.35s ease, box-shadow 0.35s ease;
}

.skill-card:hover {
  transform: translateY(-6px);
  border-color: rgba(210, 255, 0, 0.35);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35),
    0 0 0 1px rgba(210, 255, 0, 0.08);
}

.circle-wrapper {
  position: relative;
  width: 100%;
  max-width: 150px;
  aspect-ratio: 1 / 1;
  margin: 0 auto;
}

.progress-ring {
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.circle-bg {
  fill: transparent;
  stroke: #1f1f1f;
  stroke-width: 10;
}

.circle-progress {
  fill: transparent;
  stroke: #d2ff00;
  stroke-width: 10;
  stroke-linecap: round;
  transition: stroke-dashoffset 0.3s ease;
}

.skill-content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  color: #f5f5f0;
}

#skill-icon {
  font-size: 2rem;
  transition: transform 0.35s ease;
}

.skill-card:hover .skill-icon {
  transform: scale(1.12);
}

.skill-percent {
  font-family: 'Syne', sans-serif;
  font-weight: 700;
  font-size: 1.15rem;
  margin: 0;
}

.skill-name {
  margin-top: 1.1rem;
  color: rgba(245, 245, 240, 0.55);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.78rem;
  font-family: 'Space Mono', monospace;
}

/* reveal animation, delay driven by parent via --delay */
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
  .skill-card {
    transition: none;
  }
}

@media (max-width: 560px) {
  .circle-wrapper {
    max-width: 130px;
  }
}
</style>