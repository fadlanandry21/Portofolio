<template>
  <article class="project-card" data-cursor-hover>
    <div class="card-image">
      <img :src="project.image" :alt="project.title" loading="lazy" />
      <div class="card-image__overlay"></div>
      <span class="card-image__year">{{ project.year }}</span>
    </div>

    <div class="card-body">
      <h3 class="project-title">{{ project.title }}</h3>

      <p class="project-description">
        {{ project.description }}
      </p>

      <div class="project-tags">
        <span v-for="tag in project.tags" :key="tag" class="tag">
          {{ tag }}
        </span>
      </div>
    </div>

    <div class="card-footer">
      <a :href="project.link" target="_blank" rel="noopener" class="project-link">
        View Project
        <span class="project-link__arrow">→</span>
      </a>
    </div>
  </article>
</template>

<script setup>
defineProps({
  project: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.project-card {
  width: 360px;
  flex-shrink: 0;

  background: #141414;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  overflow: hidden;

  display: flex;
  flex-direction: column;

  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.4s ease, box-shadow 0.4s ease;
}

.project-card:hover {
  transform: translateY(-8px);
  border-color: rgba(210, 255, 0, 0.35);
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(210, 255, 0, 0.06);
}

.card-image {
  position: relative;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  display: block;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.project-card:hover .card-image img {
  transform: scale(1.06);
}

.card-image__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(14, 14, 14, 0.85), transparent 55%);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.project-card:hover .card-image__overlay {
  opacity: 1;
}

.card-image__year {
  position: absolute;
  top: 12px;
  right: 12px;
  font-family: 'Space Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  color: #f5f5f0;
  background: rgba(14, 14, 14, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 999px;
  padding: 0.3rem 0.75rem;
  backdrop-filter: blur(4px);
}

.card-body {
  padding: 22px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.project-title {
  font-family: 'Syne', sans-serif;
  font-weight: 700;
  font-size: 1.35rem;
  color: #f5f5f0;
  margin: 0 0 10px;
}

.project-description {
  font-family: 'Space Mono', monospace;
  font-size: 0.88rem;
  color: rgba(245, 245, 240, 0.6);
  line-height: 1.65;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 20px;
}

.tag {
  font-family: 'Space Mono', monospace;
  background: rgba(210, 255, 0, 0.08);
  border: 1px solid rgba(210, 255, 0, 0.2);
  color: #d2ff00;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  letter-spacing: 0.03em;
}

.card-footer {
  padding: 16px 22px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.project-link {
  font-family: 'Space Mono', monospace;
  font-size: 0.85rem;
  color: rgba(245, 245, 240, 0.6);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  transition: color 0.3s ease;
}

.project-link__arrow {
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.project-link:hover {
  color: #d2ff00;
}

.project-link:hover .project-link__arrow {
  transform: translateX(4px);
}

@media (max-width: 768px) {
  .project-card {
    width: 280px;
  }

  .project-title {
    font-size: 1.15rem;
  }
}
</style>