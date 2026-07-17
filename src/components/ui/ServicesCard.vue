<template>
  <div class="service-card" data-cursor-hover>
    <span class="service-card__ghost-number" aria-hidden="true">{{ number }}</span>

    <div class="service-card__top">
      <div class="service-card__number">{{ number }}</div>
      <div class="service-card__arrow">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7 17L17 7M17 7H8M17 7V16"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
    </div>

    <h3 v-html="tittle" class="service-card__title"></h3>

    <p class="service-card__description">{{ description }}</p>

    <div class="service-card__line"></div>
  </div>
</template>

<script setup>
defineProps({
  tittle: String,
  number: String,
  description: String,
})
</script>

<style scoped>
.service-card {
  position: relative;
  padding: 2.25rem 2rem 2rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  background: #141414;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    border-color 0.4s ease, box-shadow 0.4s ease;
}

.service-card:hover {
  transform: translateY(-8px);
  border-color: rgba(210, 255, 0, 0.35);
  box-shadow: 0 20px 48px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(210, 255, 0, 0.06);
}

.service-card__ghost-number {
  position: absolute;
  top: -0.4em;
  right: -0.15em;
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  font-size: 7rem;
  line-height: 1;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.06);
  pointer-events: none;
  transition: -webkit-text-stroke 0.4s ease;
  user-select: none;
}

.service-card:hover .service-card__ghost-number {
  -webkit-text-stroke: 1px rgba(210, 255, 0, 0.18);
}

.service-card__top {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.75rem;
}

.service-card__number {
  font-family: 'Space Mono', monospace;
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  color: #d2ff00;
  border: 1px solid rgba(210, 255, 0, 0.3);
  border-radius: 999px;
  width: 2.25rem;
  height: 2.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.service-card__arrow {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(245, 245, 240, 0.55);
  transform: rotate(0deg);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    color 0.4s ease, border-color 0.4s ease, background 0.4s ease;
}

.service-card:hover .service-card__arrow {
  transform: rotate(45deg);
  color: #0e0e0e;
  background: #d2ff00;
  border-color: #d2ff00;
}

.service-card__title {
  position: relative;
  font-family: 'Syne', sans-serif;
  font-weight: 700;
  font-size: 1.6rem;
  line-height: 1.2;
  color: #f5f5f0;
  margin: 0 0 1rem;
}

.service-card__description {
  position: relative;
  font-family: 'Space Mono', monospace;
  font-size: 0.9rem;
  line-height: 1.75;
  color: rgba(245, 245, 240, 0.6);
  margin: 0 0 1.5rem;
}

.service-card__line {
  position: relative;
  height: 1px;
  width: 100%;
  background: linear-gradient(
    to right,
    rgba(210, 255, 0, 0.5),
    transparent
  );
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.service-card:hover .service-card__line {
  transform: scaleX(1);
}

@media (max-width: 560px) {
  .service-card {
    padding: 1.75rem 1.5rem 1.5rem;
  }

  .service-card__ghost-number {
    font-size: 5rem;
  }

  .service-card__title {
    font-size: 1.35rem;
  }
}
</style>