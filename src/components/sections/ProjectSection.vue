<template>
  <div class="container">
    <div class="project-section" ref="sectionRef">
      <h1 class="section-title">PROJECT</h1>

      <!-- STATS -->
      <div class="stats-container">
        <div
          class="stat-item"
          v-for="item in stats"
          :key="item.title"
        >
          <div class="stat-title">{{ item.title }}</div>

          <div class="stat-number">
            <span class="counter">{{ item.count }}</span>
            {{ item.suffix }}
          </div>
        </div>
      </div>

      <!-- SKILLS -->
      <div class="programming-section">
        <h2 class="programming-title">Tech Stack</h2>

        <div class="skills-container">
          <div
            class="skill-item"
            v-for="skill in skills"
            :key="skill.name"
          >
            <div class="circle-container">
              <div
                class="circle-bg"
                :class="skill.class"
              >
                <div class="percentage">{{ skill.percent }}%</div>
              </div>
            </div>
            <div class="skill-name">{{ skill.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const sectionRef = ref(null)
const stats = ref([
  {
    title: 'Year Of Experience',
    target: 2,
    count: 0,
    suffix: '+ Years Experience',
  },
  {
    title: 'Complete Project',
    target: 999,
    count: 0,
    suffix: '+ Complete Project',
  },
  {
    title: 'Client',
    target: 9999,
    count: 0,
    suffix: '+ Happy Client',
  },
])


const skills = [
  { name: 'HTML', percent: 85, class: 'circle-php' },
  { name: 'CSS', percent: 45, class: 'circle-js' },
  { name: 'JS', percent: 27, class: 'circle-dart' },
  { name: 'Node', percent: 80, class: 'circle-node' },
]

const animateCounters = () => {
  stats.value.forEach((item) => {
    const increment = item.target / 100

    const update = () => {
      if (item.count < item.target) {
        item.count = Math.ceil(item.count + increment)
        requestAnimationFrame(update)
      } else {
        item.count = item.target
      }
    }

    update()
  })
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters()
        }
      })
    },
    { threshold: 0.5 }
  )

  observer.observe(sectionRef.value)
})
</script>