<template>
  <div class="skill-card">
    <div class="circle-wrapper">
      <svg class="progress-ring" width="180" height="180">

        <circle
          class="circle-bg"
          cx="90"
          cy="90"
          r="80"
        />

        <circle
          class="circle-progress"
          cx="90"
          cy="90"
          r="80"
          :style="circleStyle"
        />
      </svg>

      <div class="skill-content">
        <i :class="`fa-brands fa-${icon}`"></i>

        <h3>{{ animatedPercent }}%</h3>
      </div>
      
      <p class="skill-name">
        {{ name }}
      </p>
    </div >
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
const props = defineProps({
  name: String,
  percent: Number,
  icon: String,
})

const radius = 70
const circumference = 2 * Math.PI * radius

const animatedPercent = ref(0)

onMounted(() => {
  let start = 0

  const interval = setInterval(() => {
    if (start >= props.percent) {
      clearInterval(interval)
    } else {
      start++
      animatedPercent.value = start
    }
  }, 15)
})

const offset = computed(() => {
  return circumference - (animatedPercent.value / 100) * circumference
})

const circleStyle = computed(() => ({
  strokeDasharray: circumference,
  strokeDashoffset: offset.value,
}))
</script>

<style scoped>

.skill-card {
  text-align: center;
}

.circle-wrapper {
  position: relative;
  width: 180px;
  height: 180px;
}

.progress-ring {
  transform: rotate(-90deg);
}

.circle-bg {
  fill: transparent;
  stroke: #111;
  stroke-width: 11;
}

.circle-progress {
  fill: transparent;
  stroke: #ffd700;
  stroke-width: 11;
  stroke-linecap: round;

  transition: stroke-dashoffset 1s ease;
}

.skill-content {
  margin: 100px 0 100px;
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
}

.skill-content i {
  font-size: 2.5rem;
  margin-bottom: 7px;
}

.skill-content h3 {
  font-size: 1.4rem;
}

.skill-name {
  margin-top: 20px;
  color: #888;
  letter-spacing: 2px;
  font-size: 1.1rem
}
</style>