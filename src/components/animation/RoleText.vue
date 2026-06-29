<template>
  <span class="neon-wrapper" aria-label="Where Innovation, Meets Creativity.">
    <span
      v-for="(segment, sIdx) in segments"
      :key="sIdx"
      :class="['neon-segment', segment.type]"
      :style="{ '--delay': `${sIdx * 320}ms` }"
    >
      {{ segment.text }}
    </span>
  </span>
</template>

<script setup>
const segments = [
  { text: '"Where ',    type: 'dim'     },
  { text: 'Innovation', type: 'keyword' },
  { text: ', ',         type: 'dim'     },
  { text: 'Meets ',     type: 'mid'     },
  { text: 'Creativity', type: 'keyword' },
  { text: '."',         type: 'dim'     },
]
</script>

<style scoped>
.neon-wrapper {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: baseline;
  font-family: 'Space Mono', monospace;
  font-size: clamp(0.85rem, 2vw, 1.1rem);
  letter-spacing: 0.2rem;
  line-height: 1.8;
  gap: 5px;
}


/*
  Satu siklus = 11s total per segment:
  0–5%   = flicker masuk  (~0.55s)
  5–95%  = diam / visible (~9.9s)
  95–99% = fade out cepat (~0.44s)
  99–100%= gelap sesaat sebelum cycle ulang
*/
.neon-segment {
  opacity: 0;
  animation: neonCycle 11s steps(1) var(--delay) infinite;
}

.neon-segment.dim     { color: #e0e0e0; }
.neon-segment.mid     { color: #ccc; }
.neon-segment.keyword {
  color: #d2ff00;
  text-shadow: 0 0 8px #d2ff00aa, 0 0 24px #d2ff0044;
}

@keyframes neonCycle {
  /* — flicker masuk — */
  0%    { opacity: 0; }
  1%    { opacity: 1; }
  2%    { opacity: 0; }
  3%    { opacity: 1; }
  4%    { opacity: 0.4; }
  5%    { opacity: 1; }
  /* — idle: teks menyala stabil — */
  90%   { opacity: 1; }
  /* — keluar cepat — */
  93%   { opacity: 0; }
  /* — gelap hingga cycle berikutnya — */
  99%   { opacity: 0; }
  100%  { opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .neon-segment { opacity: 1; animation: none; }
}
</style>


