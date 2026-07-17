<template>
  <section class="services-section" id="Service" ref="sectionRef">
    <div class="container-service">
      <p class="eyebrow reveal" :class="{ 'is-in': isInView }">
        <span class="eyebrow__bracket">[</span>
        What I offer
        <span class="eyebrow__bracket">]</span>
      </p>

      <h2 class="services-title reveal" :class="{ 'is-in': isInView }">
        Solution I Specialize in
      </h2>

      <div class="services-grid">
        <div
          v-for="(service, i) in services"
          :key="service.number"
          class="services-grid__item reveal"
          :class="{ 'is-in': isInView }"
          :style="{ '--delay': `${0.1 * i}s` }"
        >
          <ServicesCard
            :tittle="service.tittle"
            :number="service.number"
            :description="service.description"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import ServicesCard from '../ui/ServicesCard.vue'

const services = [
  {
    number: '01',
    tittle: 'Web <br>Design',
    description:
      'Membuat tampilan website yang modern, responsif, dan user-friendly. Fokus saya adalah menghadirkan desain yang tidak hanya menarik secara visual, tetapi juga mudah digunakan sehingga memberikan pengalaman terbaik bagi pengguna.',
  },
  {
    number: '02',
    tittle: 'Front End<br>Dev',
    description:
      'Mengubah desain menjadi website interaktif dengan teknologi web seperti HTML, CSS, dan JavaScript. Saya berusaha menghadirkan antarmuka yang rapi, responsif di berbagai perangkat, serta sesuai dengan kebutuhan pengguna.',
  },
  {
    number: '03',
    tittle: 'Back End<br>Dev',
    description:
      'Mengembangkan logika dan sistem di balik layar sebuah website. Mulai dari pengelolaan data, integrasi database, hingga membangun API sederhana untuk mendukung fungsionalitas aplikasi web secara menyeluruh.',
  },
]

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
.services-section {
  background: #0e0e0e;
  padding: clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 4rem);
}

.container-service {
  max-width: 1200px;
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

.services-title {
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  color: #f5f5f0;
  font-size: clamp(2.2rem, 5vw, 3.25rem);
  letter-spacing: -0.01em;
  margin: 0 0 clamp(2.5rem, 6vw, 4rem);
  max-width: 20ch;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: clamp(1.25rem, 3vw, 2rem);
}

/* scroll reveal */
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

@media (prefers-reduced-motion: reduce) {
  .reveal {
    transition: none;
    transform: none;
  }
}

@media (max-width: 640px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
}
</style>