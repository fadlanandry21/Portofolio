<template>
  <section class="journey-section" id="Journey" ref="sectionRef">
    <div class="journey-inner">
      <p class="eyebrow reveal" :class="{ 'is-in': headerInView }">
        <span class="eyebrow__bracket">[</span>
        My Journey
        <span class="eyebrow__bracket">]</span>
      </p>

      <h2 class="journey-title reveal" :class="{ 'is-in': headerInView }">
        Journey & Achievements
      </h2>

      <p class="journey-sub reveal" :class="{ 'is-in': headerInView }">
        Dari bangku SMK sampai melangkah ke jenjang Computer Science —
        tiap tahap adalah proses belajar yang membentuk cara saya membangun sesuatu hari ini.
      </p>

      <ol class="timeline">
        <li
          v-for="(item, i) in journey"
          :key="item.year + item.title"
          class="timeline-item"
          :class="[
            i % 2 === 0 ? 'timeline-item--left' : 'timeline-item--right',
            { 'is-in': visibleItems[i], 'is-current': item.current },
          ]"
          :ref="(el) => setItemRef(el, i)"
        >
          <div class="timeline-item__marker">
            <span class="timeline-item__dot">
              <Icon :icon="item.icon" />
            </span>
            <span v-if="item.current" class="timeline-item__pulse"></span>
          </div>

          <div class="timeline-item__card" data-cursor-hover>
            <span class="timeline-item__year">
              {{ item.year }}
              <span v-if="item.current" class="timeline-item__badge">Ongoing</span>
            </span>
            <h3 class="timeline-item__title">{{ item.title }}</h3>
            <p class="timeline-item__desc">{{ item.description }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import { Icon } from '@iconify/vue'
import { journey } from '@/data/Journey.js'

const sectionRef = ref(null)
const headerInView = ref(false)

const visibleItems = reactive(journey.map(() => false))
const itemRefs = []

function setItemRef(el, index) {
  if (el) itemRefs[index] = el
}

let headerObserver
let itemObserver

onMounted(() => {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  if (prefersReducedMotion) {
    headerInView.value = true
    journey.forEach((_, i) => (visibleItems[i] = true))
    return
  }

  headerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          headerInView.value = true
          headerObserver.disconnect()
        }
      })
    },
    { threshold: 0.2 }
  )
  if (sectionRef.value) headerObserver.observe(sectionRef.value)

  itemObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const index = itemRefs.indexOf(entry.target)
        if (entry.isIntersecting && index !== -1) {
          visibleItems[index] = true
          itemObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.3, rootMargin: '0px 0px -10% 0px' }
  )
  itemRefs.forEach((el) => el && itemObserver.observe(el))
})

onBeforeUnmount(() => {
  if (headerObserver) headerObserver.disconnect()
  if (itemObserver) itemObserver.disconnect()
})
</script>

<style scoped>
.journey-section {
  background: #0e0e0e;
  padding: clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 4rem);
}

.journey-inner {
  max-width: 1000px;
  margin: 0 auto;
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

.journey-title {
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  color: #f5f5f0;
  font-size: clamp(2.2rem, 5vw, 3.25rem);
  letter-spacing: -0.01em;
  margin: 0 0 1rem;
}

.journey-sub {
  font-family: 'Space Mono', monospace;
  font-size: 0.9rem;
  line-height: 1.75;
  color: rgba(245, 245, 240, 0.55);
  margin: 0 0 clamp(3rem, 8vw, 5rem);
}

/* ---------- TIMELINE ---------- */
.timeline {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
}

.timeline::before {
  content: '';
  position: absolute;
  top: 6px;
  bottom: 6px;
  left: 50%;
  width: 2px;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.03)
  );
  transform: translateX(-50%);
}

.timeline-item {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 64px 1fr;
  gap: 32px;
  padding-bottom: clamp(2.5rem, 6vw, 3.5rem);
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-item__marker {
  grid-column: 2;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  position: relative;
}

.timeline-item__dot {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: #141414;
  border: 2px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #555;
  font-size: 1.3rem;
  z-index: 2;
  transition: border-color 0.5s cubic-bezier(0.16, 1, 0.3, 1),
    color 0.5s ease, box-shadow 0.5s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.timeline-item.is-in .timeline-item__dot {
  border-color: #d2ff00;
  color: #d2ff00;
  box-shadow: 0 0 0 6px rgba(210, 255, 0, 0.08);
  transform: scale(1.05);
}

.timeline-item__pulse {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 2px solid #d2ff00;
  opacity: 0;
}

.timeline-item.is-current.is-in .timeline-item__pulse {
  animation: pulse-ring 2.4s ease-out infinite;
}

@keyframes pulse-ring {
  0% { opacity: 0.6; transform: scale(1); }
  100% { opacity: 0; transform: scale(1.6); }
}

.timeline-item__card {
  background: #141414;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 1.5rem 1.75rem;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.4s ease, box-shadow 0.4s ease;
}

.timeline-item__card:hover {
  transform: translateY(-4px);
  border-color: rgba(210, 255, 0, 0.3);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35);
}

.timeline-item--left .timeline-item__card {
  grid-column: 1;
}

.timeline-item--right .timeline-item__card {
  grid-column: 3;
}

.timeline-item__year {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-family: 'Space Mono', monospace;
  font-size: 0.78rem;
  letter-spacing: 0.08em;
  color: #d2ff00;
  margin-bottom: 0.6rem;
}

.timeline-item__badge {
  font-size: 0.65rem;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  background: rgba(210, 255, 0, 0.12);
  border: 1px solid rgba(210, 255, 0, 0.3);
  color: #d2ff00;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.timeline-item__title {
  font-family: 'Syne', sans-serif;
  font-weight: 700;
  font-size: 1.15rem;
  color: #f5f5f0;
  margin: 0 0 0.5rem;
}

.timeline-item__desc {
  font-family: 'Space Mono', monospace;
  font-size: 0.85rem;
  line-height: 1.65;
  color: rgba(245, 245, 240, 0.55);
  margin: 0;
}

/* ---------- REVEAL ---------- */
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

.timeline-item--left .timeline-item__card {
  opacity: 0;
  transform: translate(-24px, 16px);
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.timeline-item--right .timeline-item__card {
  opacity: 0;
  transform: translate(24px, 16px);
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.timeline-item.is-in .timeline-item__card {
  opacity: 1;
  transform: translate(0, 0);
}

@media (prefers-reduced-motion: reduce) {
  .reveal,
  .timeline-item__card,
  .timeline-item__dot {
    transition: none;
    transform: none;
  }
  .timeline-item__pulse {
    animation: none;
  }
}

/* ---------- RESPONSIVE ---------- */
@media (max-width: 720px) {
  .timeline::before {
    left: 26px;
  }

  .timeline-item {
    grid-template-columns: 52px 1fr;
    gap: 16px;
  }

  .timeline-item__marker {
    grid-column: 1;
    justify-content: flex-start;
  }

  .timeline-item__dot {
    width: 44px;
    height: 44px;
    font-size: 1.1rem;
  }

  .timeline-item--left .timeline-item__card,
  .timeline-item--right .timeline-item__card {
    grid-column: 2;
    transform: translate(0, 16px);
  }

  .timeline-item.is-in .timeline-item__card {
    transform: translate(0, 0);
  }

  .timeline-item__card {
    padding: 1.25rem 1.4rem;
  }
}
</style>