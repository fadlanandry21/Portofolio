<script setup>;
import ProjectCard from '../ui/ProjectCard.vue';
import { Projects } from '@/data/Projects.js';
</script>

<template>
    <section class="project-section" id="projects">
        <div class="section-header">
            <h2 class="section-title">My Latest Project's</h2>

            <router-link to="/projects" class="view-all-link">
                View All →
            </router-link>
        </div>

        <div class="project-grid">
            <ProjectCard
                v-for="Project in Projects"
                :key="Project.id"
                :project="Project"
            />
        </div>
    </section>
</template>

<style scoped>
.project-grid {
  columns: 320px;
  column-gap: 20px;
}

.project-grid > .project-section {
  break-inside: avoid;
  margin-bottom: 20px;
}
</style>