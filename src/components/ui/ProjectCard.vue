<script setup>
defineProps({
    project: {
        type: Object,
    }
})
</script>

<template>
     <article class="project-card" data-cursor-hover>
    <div class="card-image">
      <img
        :src="project.image"
        :alt="project.title"
      />
    </div>

    <div class="card-content">
      <div>
        <h3 class="project-title">
          {{ project.title }}
        </h3>

        <p class="project-description">
          {{ project.description }}
        </p>

        <div class="project-tags">
          <span
            v-for="tag in project.tags"
            :key="tag"
            class="tag"
          >
            {{ tag }}
          </span>
        </div>
      </div>

      <a
        :href="project.link"
        target="_blank"
        class="project-link"
      >
        View Project →
      </a>
    </div>
  </article>
</template>