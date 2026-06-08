<script setup>
defineProps({
    project: {
        type: Object,
    }
})
</script>

<template>
     <article class="project-card">
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

<style scoped>
.project-card {
  background: #0f0f0f;

  border: 1px solid rgba(255, 255, 255, 0.08);

  border-radius: 24px;

  overflow: hidden;

  transition:
    transform 0.3s ease,
    border-color 0.3s ease;
}

.portfolio-card:hover {
  transform: translateY(-8px);

  border-color: #00ffcc;
}

.card-image {
  height: 220px;

  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;

  object-fit: cover;

  transition: transform 0.4s ease;
}

.portfolio-card:hover img {
  transform: scale(1.05);
}

.card-content {
  padding: 24px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  gap: 24px;
}

.project-title {
  color: white;

  font-size: 1.4rem;
  font-weight: 700;

  margin-bottom: 12px;
}

.project-description {
  color: #b3b3b3;

  line-height: 1.7;

  margin-bottom: 20px;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;

  gap: 10px;
}

.tag {
  padding: 8px 14px;

  border-radius: 999px;

  background: rgba(255, 255, 255, 0.05);

  color: #00ffcc;

  font-size: 0.8rem;
}

.project-link {
  width: fit-content;

  color: #00ffcc;

  text-decoration: none;

  font-weight: 600;

  transition: opacity 0.3s ease;
}

.project-link:hover {
  opacity: 0.7;
}
</style>