<template>
  <section class="tech-stack-section">

    <h2 class="techStack-title">
      Tech Stack
    </h2>

    <div class="skills-grid">
      <SkillCard
        v-for="skill in skills"
        :key="skill.name"

        :name="skill.name"
        :percent="skill.percent"
        :icon="skill.icon"
      />
    </div>

  </section>
</template>

<script setup>
import SkillCard from '@/components/ui/SkillCard.vue'
import { skills } from '@/data/Skills.js'
</script>

<style scoped>
.tech-stack-section {
  max-width: 1200px;
  margin: 10% auto;
  padding: 20px 80px 50px;
}

.techStack-title {
  color: white;
  margin-bottom: 50px;
  font-size: 3rem;
}

.skills-grid {
  display: grid;

  grid-template-columns:
    repeat(auto-fit, minmax(200px, 1fr));

  gap: 40px;
}
</style>