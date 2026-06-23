<script setup>
defineProps({
  project: { type: Object, required: true },
  span: { type: Number, default: 6 }
})
</script>

<template>
  <article class="project-card" :style="`grid-column: span ${span}`">
    <div class="card-image">
      <img :src="project.image" :alt="project.title" />
    </div>

    <div class="card-body">
      <h3 class="project-title">{{ project.title }}</h3>
      <p class="project-description">{{ project.description }}</p>
      <div class="project-tags">
        <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </div>

    <div class="card-footer">
      <span class="project-year">{{ project.year }}</span>
      <a :href="project.link" target="_blank" class="project-link">View Project →</a>
    </div>
  </article>
</template>

<style scoped>
.project-card {
  background: #111;
  border: 1px solid #222;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: border-color 0.2s, transform 0.2s;
}

.project-card:hover {
  transform: translateY(-8px);
  border-color: #3a3a3a;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  aspect-ratio: 16 / 9;
}

.card-body {
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.project-title {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 8px;
  line-height: 1.3;
}

.project-description {
   color: #888;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-tags {
 display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.tag {
    background: #2a2a2a;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  color: #ccc;
  transition: all 0.2s ease-in;
}

.tag:hover {
  background: #3a3a3a;
  color: #fff;
}

.card-footer {
  padding: 10px 16px;
  border-top: 1px solid #1e1e1e;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.project-year {
  font-size: 12px;
  color: #555;
}

.project-link {
  font-size: 12px;
  color: #888;
  text-decoration: none;
  transition: color 0.2s;
}

.project-link:hover {
  color: #fff;
}

@media (max-width: 768px) {
  .project-card {
    grid-column: span 12 !important;
  }
}
</style>