<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  photoSrc: {
    type: String,
    default: '/assets/img/porto-profile.webp',
  },
  photoAlt: {
    type: String,
    default: 'Fadlan Andry Al Faris',
  },
  Tag: {
    type: String,
    default: 'Open To Work',
  },
  paragraphs: {
    type: Array,
    default: () => [
      'Hai, Saya Fadlan Andry Al Faris, seorang pelajar di SMKN 1 Banyuwangi yang fokus mendalami bidang web programming. Dengan semangat belajar dan ketertarikan besar pada teknologi, saya terus mengembangkan keterampilan dalam membangun website sekaligus memahami perkembangan dunia digital.',
      'Bagi saya, pemrograman bukan hanya soal menulis kode, tetapi juga cara untuk menghadirkan ide menjadi nyata — where innovation meets creativity. Dengan prinsip itu, saya berkomitmen untuk terus tumbuh, berinovasi, dan menciptakan solusi digital yang bermanfaat.',
    ],
  },
  stats: {
    type: Array,
    default: () => [
      { label: 'Year Of Experience', value: 2, suffix: '+' },
      { label: 'Complete Project', value: 15, suffix: '+' },
      { label: 'Happy Client', value: 10, suffix: '+' },
    ],
  },
})

const sectionRef = ref(null)
const visualRef = ref(null)
const statsRef = ref(null)
const isInView = ref(false)
const displayValues = reactive(props.stats.map(() => 0))

const tilt = reactive({ x: 0, y: 0 })
const tiltStyle = reactive({ transform: 'rotateX(0deg) rotateY(0deg)' })

function onTilt(e) {
  const el = visualRef.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const px = (e.clientX - rect.left) / rect.width - 0.5
  const py = (e.clientY - rect.top) / rect.height - 0.5
  tilt.x = py * -8
  tilt.y = px * 10
  tiltStyle.transform = `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
}

function resetTilt() {
  tiltStyle.transform = 'rotateX(0deg) rotateY(0deg)'
}

let countStarted = false
function animateCount(index, target) {
  const duration = 1400
  const start = performance.now()

  function step(now) {
    const progress = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    displayValues[index] = Math.floor(eased * target)
    if (progress < 1) {
      requestAnimationFrame(step)
    } else {
      displayValues[index] = target
    }
  }
  requestAnimationFrame(step)
}

function startCounts() {
  if (countStarted) return
  countStarted = true
  props.stats.forEach((stat, i) => animateCount(i, stat.value))
}

let observer
onMounted(() => {
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  if (prefersReducedMotion) {
    isInView.value = true
    props.stats.forEach((stat, i) => (displayValues[i] = stat.value))
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isInView.value = true
          startCounts()
          observer.disconnect()
        }
      })
    },
    { threshold: 0.25 }
  )
  if (sectionRef.value) observer.observe(sectionRef.value)
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>



<template>
  <section class="about" id="about" ref="sectionRef">
    <div class="about__bg-grid" aria-hidden="true"></div>

    <div class="about__inner">
      <!-- LEFT: PHOTO -->
      <div
        class="about__visual reveal"
        :class="{ 'is-in': isInView }"
        ref="visualRef"
        @mousemove="onTilt"
        @mouseleave="resetTilt"
        data-cursor-hover
      >
        <div class="frame" :style="tiltStyle">
          <span class="frame__corner frame__corner--tl"></span>
          <span class="frame__corner frame__corner--tr"></span>
          <span class="frame__corner frame__corner--bl"></span>
          <span class="frame__corner frame__corner--br"></span>

          <div class="frame__grid-lines" aria-hidden="true">
            <span></span><span></span><span></span>
          </div>

          <img
            :src="photoSrc"
            :alt="photoAlt"
            class="frame__img"
            loading="lazy"
          />

          <div class="frame__glow"></div>
        </div>

        <div class="tag-badge">
          <span class="tag-badge__dot"></span>
          <span class="tag-badge__text">{{ Tag }}</span>
        </div>
      </div>

      <!-- RIGHT: CONTENT -->
      <div class="about__content">
        <p class="eyebrow reveal" :class="{ 'is-in': isInView }">
          <span class="eyebrow__bracket">[</span>
          Get to know me
          <span class="eyebrow__bracket">]</span>
        </p>

        <h2 class="heading reveal" :class="{ 'is-in': isInView }">
          Who Am I?
        </h2>

        <div class="copy">
          <p
            v-for="(para, i) in paragraphs"
            :key="i"
            class="copy__p reveal"
            :class="{ 'is-in': isInView }"
            :style="{ '--delay': `${0.15 + i * 0.1}s` }"
          >
            {{ para }}
          </p>
        </div>

        <!-- STATS -->
        <div class="stats reveal" :class="{ 'is-in': isInView }" ref="statsRef">
          <div
            class="stats__item"
            v-for="(stat, i) in stats"
            :key="stat.label"
            :style="{ '--delay': `${0.1 * i}s` }"
          >
            <span class="stats__number">
              {{ displayValues[i] }}<span class="stats__suffix">{{ stat.suffix }}</span>
            </span>
            <span class="stats__label">{{ stat.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<style scoped>
.about {
  position: relative;
  background: #0e0e0e;
  color: #f5f5f0;
  padding: clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 4rem);
  overflow: hidden;
  font-family: 'Space Mono', monospace;
}

.about__bg-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.035) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse 80% 60% at 30% 40%, black 0%, transparent 75%);
  pointer-events: none;
}

.about__inner {
  position: relative;
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: clamp(2.5rem, 6vw, 5rem);
  align-items: center;
}

/* ---------- VISUAL / PHOTO ---------- */
.about__visual {
  position: relative;
  display: flex;
  justify-content: center;
  perspective: 1200px;
}

.frame {
  position: relative;
  width: 100%;
  max-width: 420px;
  aspect-ratio: 4 / 5;
  border: 1px solid rgba(210, 255, 0, 0.25);
  border-radius: 4px;
  overflow: hidden;
  transform-style: preserve-3d;
  transition: transform 0.25s ease-out;
  background: #141414;
}

.frame__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(35%) contrast(1.05);
  transition: filter 0.4s ease;
  display: block;
}

.about__visual:hover .frame__img {
  filter: grayscale(0%) contrast(1.05);
}

.frame__glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at 50% 0%,
    rgba(210, 255, 0, 0.15),
    transparent 60%
  );
  pointer-events: none;
}

.frame__corner {
  position: absolute;
  width: 22px;
  height: 22px;
  border: 2px solid #d2ff00;
  z-index: 2;
  opacity: 0.9;
}
.frame__corner--tl { top: -1px; left: -1px; border-right: none; border-bottom: none; }
.frame__corner--tr { top: -1px; right: -1px; border-left: none; border-bottom: none; }
.frame__corner--bl { bottom: -1px; left: -1px; border-right: none; border-top: none; }
.frame__corner--br { bottom: -1px; right: -1px; border-left: none; border-top: none; }

.frame__grid-lines {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  pointer-events: none;
  z-index: 1;
}
.frame__grid-lines span {
  border-right: 1px solid rgba(255, 255, 255, 0.06);
}
.frame__grid-lines span:last-child {
  border-right: none;
}

.tag-badge {
  position: absolute;
  bottom: -18px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #0e0e0e;
  border: 1px solid rgba(210, 255, 0, 0.35);
  border-radius: 999px;
  padding: 0.5rem 1rem;
  font-size: 0.7rem;
  letter-spacing: 0.05em;
  white-space: nowrap;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}

.tag-badge__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #d2ff00;
  box-shadow: 0 0 8px #d2ff00;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.8); }
}

/* ---------- CONTENT ---------- */
.about__content {
  min-width: 0;
}

.eyebrow {
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #d2ff00;
  margin: 0 0 1rem;
  display: flex;
  gap: 0.4rem;
}

.eyebrow__bracket {
  opacity: 0.5;
}

.heading {
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  line-height: 0.95;
  letter-spacing: -0.02em;
  margin: 0 0 1.75rem;
}

.copy {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  max-width: 60ch;
}

.copy__p {
  font-size: 0.98rem;
  line-height: 1.75;
  color: rgba(245, 245, 240, 0.72);
  margin: 0;
}

/* ---------- STATS ---------- */
.stats {
  display: flex;
  gap: clamp(1.5rem, 4vw, 3rem);
  margin-top: clamp(2rem, 5vw, 3rem);
  padding-top: clamp(1.5rem, 4vw, 2rem);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.stats__item {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  position: relative;
  padding-right: clamp(1.5rem, 4vw, 3rem);
}

.stats__item:not(:last-child)::after {
  content: '';
  position: absolute;
  right: 0;
  top: 0.2em;
  bottom: 0.2em;
  width: 1px;
  background: rgba(255, 255, 255, 0.12);
}

.stats__number {
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  color: #f5f5f0;
  line-height: 1;
  display: inline-flex;
  align-items: baseline;
}

.stats__suffix {
  color: #d2ff00;
  font-size: 0.55em;
  margin-left: 0.15em;
}

.stats__label {
  font-size: 0.72rem;
  letter-spacing: 0.04em;
  color: rgba(245, 245, 240, 0.55);
  text-transform: uppercase;
}

/* ---------- REVEAL ANIMATION ---------- */
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: var(--delay, 0s);
}

.reveal.is-in {
  opacity: 1;
  transform: translateY(0);
}

.about__visual.reveal {
  transform: translateY(28px) scale(0.96);
}
.about__visual.reveal.is-in {
  transform: translateY(0) scale(1);
}

@media (prefers-reduced-motion: reduce) {
  .reveal,
  .about__visual.reveal {
    transition: none;
    transform: none;
  }
  .frame {
    transition: none;
  }
  .tag-badge__dot {
    animation: none;
  }
}

/* ---------- RESPONSIVE ---------- */
@media (max-width: 960px) {
  .about__inner {
    grid-template-columns: 1fr;
    gap: 3.5rem;
  }

  .about__visual {
    order: -1;
  }

  .frame {
    max-width: 320px;
    margin: 0 auto;
  }

  .stats {
    flex-wrap: wrap;
    row-gap: 1.5rem;
  }

  .stats__item {
    flex: 1 1 40%;
  }
}

@media (max-width: 560px) {
  .heading {
    font-size: 2.75rem;
  }

  .stats {
    flex-direction: column;
    gap: 1.25rem;
  }

  .stats__item {
    padding-right: 0;
    padding-bottom: 1.25rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .stats__item:not(:last-child)::after {
    display: none;
  }

  .stats__item:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
}
</style>