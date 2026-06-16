<script setup>
import ProjectCard from '../ui/ProjectCard.vue'
import { Projects } from '@/data/Projects.js'

const spanPattern = [8, 4, 4, 5, 3]
</script>

<template>
  <section class="project-section" id="Project">
    <div class="section-header">
      <h2 class="section-title">My Latest Projects</h2>
      <router-link to="/projects" class="see-all-link" data-cursor-hover>View All →</router-link>
    </div>

    <div class="project-grid">
      <ProjectCard
        v-for="(project, index) in Projects"
        :key="project.id"
        :project="project"
        :span="spanPattern[index % spanPattern.length]"
        data-cursor-hover
      />
    </div>
  </section>
</template>

<style scoped>

.project-section {
  max-width: 1200px;
  margin: 10% auto;
  padding: 20px 80px 50px;
}

.section-header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.section-title {
   font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.see-all-link {
   display: flex;
  align-items: center;
  gap: 8px;
  color: #888;
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.3s ease;
}
.see-all-link:hover {
  color: inherit;
}

.project-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 24px;
}
</style>