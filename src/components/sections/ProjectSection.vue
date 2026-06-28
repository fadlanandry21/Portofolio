<script setup>
import { ref, onMounted, onUnmounted } from "vue";

import ProjectCard from "../ui/ProjectCard.vue";
import { Projects } from "@/data/Projects.js";

const slider = ref(null);

const projectList = [...Projects, ...Projects];

let animationFrame = null;
let position = 0;
let paused = false;

const SPEED = 0.4;

function animate() {
  if (paused) {
    animationFrame = requestAnimationFrame(animate);
    return;
  }

  position += SPEED;

  const limit = slider.value.scrollWidth / 2;

  if (position >= limit) {
    position = 0;
  }

  slider.value.style.transform = `translateX(-${position}px)`;

  animationFrame = requestAnimationFrame(animate);
}

function pause() {
  paused = true;
}

function resume() {
  paused = false;
}

onMounted(() => {
  animationFrame = requestAnimationFrame(animate);
});

onUnmounted(() => {
  cancelAnimationFrame(animationFrame);
});
</script>

<template>
  <section class="project-section" id="Project">
    <div class="section-header">
      <h2 class="section-title">My Latest Projects</h2>

      <router-link to="/projects" class="see-all-link">
        View All →
      </router-link>
    </div>

    <div class="slider-wrapper" @mouseenter="pause" @mouseleave="resume">
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

  margin:0 auto;

  padding: 80px;
}

.section-header {
  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 40px;
}

.section-title {
  font-size: 42px;

  font-weight: 700;
}

.see-all-link {
  color: #888;

  text-decoration: none;
}

.slider-wrapper {
  position: relative;

  overflow: hidden;
}

/* fade kiri */

.slider-wrapper::before {
  content: "";

  position: absolute;

  left: 0;

  top: 0;

  width: 140px;

  height: 100%;

  background: linear-gradient(to right, #000, transparent);

  z-index: 2;

  pointer-events: none;
}

/* fade kanan */

.slider-wrapper::after {
  content: "";

  position: absolute;

  right: 0;

  top: 0;

  width: 140px;

  height: 100%;

  background: linear-gradient(to left, #000, transparent);

  z-index: 2;

  pointer-events: none;
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

  .section-title {
    font-size: 30px;
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
