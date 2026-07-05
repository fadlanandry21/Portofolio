<script setup>
// Pure CSS animated background — no JS logic needed.
// Drop this as the FIRST child inside your hero <main>, before hero-content.
</script>

<template>
  <div class="hero-bg" aria-hidden="true">
    <div class="hero-bg__grid"></div>
    <div class="hero-bg__blob hero-bg__blob--1"></div>
    <div class="hero-bg__blob hero-bg__blob--2"></div>
    <div class="hero-bg__noise"></div>
  </div>
</template>

<style scoped>
.hero-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 0;
  pointer-events: none;
  background: #0e0e0e;
}

/* --- Moving grid pattern --- */
.hero-bg__grid {
  position: absolute;
  inset: -50%;
  background-image:
    linear-gradient(to right, rgba(210, 255, 0, 0.035) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(210, 255, 0, 0.035) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(circle at 50% 40%, rgba(0, 0, 0, 0.9) 0%, transparent 70%);
  animation: gridFade 14s ease-in-out infinite;
}

@keyframes gridFade {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.15; }
}

/* --- Floating glow blobs --- */
.hero-bg__blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(110px);
  opacity: 0.16;
  will-change: opacity;
}

.hero-bg__blob--1 {
  width: 420px;
  height: 420px;
  top: -10%;
  left: 5%;
  background: #d2ff00;
  animation: breathe 12s ease-in-out infinite;
}

.hero-bg__blob--2 {
  width: 340px;
  height: 340px;
  top: 45%;
  right: 0%;
  background: #7de600;
  opacity: 0.1;
  animation: breathe 12s ease-in-out infinite;
  animation-delay: -6s;
}

@keyframes breathe {
  0%, 100% { opacity: 0.16; }
  50% { opacity: 0.08; }
}

/* --- Subtle grain/noise overlay for texture --- */
.hero-bg__noise {
  position: absolute;
  inset: 0;
  opacity: 0.02;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  mix-blend-mode: overlay;
}

/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .hero-bg__grid,
  .hero-bg__blob {
    animation: none;
  }
}
</style>