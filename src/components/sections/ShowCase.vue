<script setup>
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

/**
 * ProjectShowcase.vue
 * 3 kolom project preview, masing-masing scroll infinite (marquee vertikal):
 *  - kolom kiri   : slide ke ATAS,  infinite loop
 *  - kolom tengah : slide ke BAWAH, infinite loop
 *  - kolom kanan  : slide ke ATAS,  infinite loop
 *
 * Trik seamless loop: tiap kolom di-duplikat isinya 2x, lalu di-animasikan
 * translateY(-50%) <-> translateY(0). Karena transform% dihitung dari
 * tinggi elemen itu sendiri (yang berisi 2 set identik), 50% selalu pas
 * sama dengan tinggi 1 set — jadi looping-nya mulus tanpa perlu hitung
 * pixel manual.
 *
 * Kartu stat "9+ Projects Published" sengaja dibuat overlay statis di atas
 * kolom tengah (tidak ikut scroll) supaya tetap enak dibaca.
 */

const props = defineProps({
  title: {
    type: String,
    default: 'A Showcase of My Projects'
  },
  leftItems: {
    type: Array,
    default: () => ([
      { alt: 'Landing Page Sekolah', color: 'linear-gradient(135deg,#3a3a45,#1c1c22)' },
      { alt: 'Point of Sale — For Restaurant', color: 'linear-gradient(135deg,#e8e8ec,#d3d3da)' },
      { alt: 'Analytics Dashboard', color: 'linear-gradient(135deg,#f4f6ff,#e3e7fb)' },
      { alt: 'Perpustakaan App', color: 'linear-gradient(135deg,#dfe3f5,#c7cdec)' }
    ])
  },
  middleItems: {
    type: Array,
    default: () => ([
      { alt: 'POS — For Restaurant', color: 'linear-gradient(135deg,#e9e9ee,#d6d6de)' },
      { alt: 'Booking Dashboard', color: 'linear-gradient(135deg,#3d4c63,#2a3547)' },
      { alt: 'Finance Tracker', color: 'linear-gradient(135deg,#efe6d8,#dccdb0)' }
    ])
  },
  rightItems: {
    type: Array,
    default: () => ([
      { alt: 'Cinema Ticket App', color: 'linear-gradient(135deg,#4a4a52,#2b2b31)' },
      { alt: 'Bali Explore App', color: 'linear-gradient(135deg,#6b7d6f,#465248)' },
      { alt: 'Dashboard + Mobile', color: 'linear-gradient(135deg,#e5e7ee,#cfd2dc)' }
    ])
  },
  stat: {
    type: Object,
    default: () => ({
      icon: 'ph:squares-four-fill',
      count: '9+',
      label: 'Projects Published',
      description:
        "Over the past 3 years, I've not only learned the theory but also applied it through real-world projects and practical experience.",
      ctaText: 'View Selected Projects',
      ctaHref: '#projects'
    })
  },
  frameHeight: {
    type: String,
    default: '760px'
  },
  // durasi 1 putaran penuh per kolom, makin kecil = makin cepat
  speeds: {
    type: Object,
    default: () => ({ left: 18, middle: 22, right: 20 })
  }
})

// duplikasi tiap kolom 2x supaya loop-nya mulus (lihat catatan di atas)
const loopedLeft = computed(() => [...props.leftItems, ...props.leftItems])
const loopedMiddle = computed(() => [...props.middleItems, ...props.middleItems])
const loopedRight = computed(() => [...props.rightItems, ...props.rightItems])
</script>

<template>
  <section class="showcase">
    <h2 class="showcase__title">{{ title }}</h2>

    <div class="showcase__frame" :style="{ '--frame-height': frameHeight }">
      <div class="showcase__grid">
        <!-- Kolom kiri: naik -->
        <div class="marquee-column">
          <div
            class="marquee-track marquee-track--up"
            :style="{ '--duration': `${speeds.left}s` }"
          >
            <a
              v-for="(item, i) in loopedLeft"
              :key="`l-${i}`"
              :href="item.href || '#'"
              class="project-card"
            >
              <img v-if="item.image" :src="item.image" :alt="item.alt" class="project-card__img" />
              <div v-else class="project-card__placeholder" :style="{ background: item.color }">
                <span>{{ item.alt }}</span>
              </div>
            </a>
          </div>
        </div>

        <!-- Kolom tengah: turun, + stat card overlay statis -->
        <div class="marquee-column">
          <div
            class="marquee-track marquee-track--down"
            :style="{ '--duration': `${speeds.middle}s` }"
          >
            <a
              v-for="(item, i) in loopedMiddle"
              :key="`m-${i}`"
              :href="item.href || '#'"
              class="project-card"
            >
              <img v-if="item.image" :src="item.image" :alt="item.alt" class="project-card__img" />
              <div v-else class="project-card__placeholder" :style="{ background: item.color }">
                <span>{{ item.alt }}</span>
              </div>
            </a>
          </div>

          <div class="stat-card">
            <div class="stat-card__icon">
              <Icon :icon="stat.icon" width="22" height="22" />
            </div>
            <p class="stat-card__count">{{ stat.count }}</p>
            <p class="stat-card__label">{{ stat.label }}</p>
            <p class="stat-card__desc">{{ stat.description }}</p>
            <a :href="stat.ctaHref" class="stat-card__cta">
              {{ stat.ctaText }}
              <Icon icon="ph:arrow-up-right-bold" width="16" height="16" />
            </a>
          </div>
        </div>

        <!-- Kolom kanan: naik -->
        <div class="marquee-column">
          <div
            class="marquee-track marquee-track--up"
            :style="{ '--duration': `${speeds.right}s` }"
          >
            <a
              v-for="(item, i) in loopedRight"
              :key="`r-${i}`"
              :href="item.href || '#'"
              class="project-card"
            >
              <img v-if="item.image" :src="item.image" :alt="item.alt" class="project-card__img" />
              <div v-else class="project-card__placeholder" :style="{ background: item.color }">
                <span>{{ item.alt }}</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.showcase {
  --accent: #6d5bf6;
  --accent-2: #8b7bff;
  font-family: 'Space Mono', monospace;
  padding: 4rem 1.5rem;
  text-align: center;
}

.showcase__title {
  font-family: 'Syne', sans-serif;
  font-size: clamp(1.8rem, 3.5vw, 2.5rem);
  font-weight: 700;
  margin-bottom: 2.5rem;
}

.showcase__frame {
  position: relative;
  max-width: 68rem;
  height: var(--frame-height);
  margin: 0 auto;
  padding: 1.5rem;
  overflow: hidden;
  border-radius: 1.5rem;
  background: #f7f7fa;

  /* fade halus di atas & bawah, sesuai gambar referensi */
  mask-image: linear-gradient(to bottom, transparent 0%, black 12%, black 82%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 12%, black 82%, transparent 100%);
}

.showcase__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.35rem;
  height: 100%;
}

/* ---------- Kolom & marquee track ---------- */
.marquee-column {
  position: relative;
  height: 100%;
  overflow: hidden;
}

.marquee-track {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  will-change: transform;
  animation-duration: var(--duration, 20s);
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.marquee-track--up {
  animation-name: scrollUp;
}

.marquee-track--down {
  animation-name: scrollDown;
  /* mulai dari posisi -50% supaya arah turun terasa natural dari awal render */
  transform: translateY(-50%);
}

@keyframes scrollUp {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-50%);
  }
}

@keyframes scrollDown {
  from {
    transform: translateY(-50%);
  }
  to {
    transform: translateY(0);
  }
}

/* ---------- Project card ---------- */
.project-card {
  display: block;
  flex-shrink: 0;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 10px 25px -10px rgba(20, 20, 30, 0.15);
  filter: grayscale(0.15);
  transition: filter 0.25s ease;
}

.project-card:hover {
  filter: grayscale(0);
}

.project-card__img {
  width: 100%;
  display: block;
  object-fit: cover;
}

.project-card__placeholder {
  width: 100%;
  min-height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.project-card__placeholder span {
  color: rgba(0, 0, 0, 0.55);
  font-size: 0.8rem;
  font-weight: 600;
  text-align: center;
}

/* ---------- Stat card (overlay statis di tengah) ---------- */
.stat-card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100% - 0.5rem);
  background: #ffffff;
  border-radius: 1.25rem;
  padding: 1.75rem;
  text-align: left;
  box-shadow: 0 15px 35px -12px rgba(20, 20, 30, 0.2);
  z-index: 2;
}

.stat-card__icon {
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  margin-bottom: 1rem;
}

.stat-card__count {
  font-family: 'Syne', sans-serif;
  font-size: 1.6rem;
  font-weight: 700;
  margin: 0;
  display: inline-block;
}

.stat-card__label {
  display: inline-block;
  margin: 0 0 0.75rem 0.5rem;
  color: #55555f;
  font-size: 0.9rem;
}

.stat-card__desc {
  color: #6b6b76;
  font-size: 0.88rem;
  line-height: 1.5;
  margin: 0 0 1.5rem;
}

.stat-card__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.75rem 1.4rem;
  border-radius: 999px;
  color: #fff;
  font-weight: 600;
  font-size: 0.88rem;
  text-decoration: none;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  transition: transform 0.15s ease, opacity 0.15s ease;
}

.stat-card__cta:hover {
  transform: translateY(-1px);
  opacity: 0.92;
}

/* ---------- Responsive ---------- */
@media (max-width: 860px) {
  .showcase__grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .marquee-column:nth-child(3) {
    display: none;
  }
}

@media (max-width: 560px) {
  .showcase__frame {
    height: auto;
    max-height: none;
    mask-image: none;
    -webkit-mask-image: none;
  }

  .showcase__grid {
    grid-template-columns: 1fr;
  }

  .marquee-track {
    animation: none;
    transform: none;
  }

  .stat-card {
    position: static;
    transform: none;
    width: 100%;
    margin-top: 1rem;
  }
}
</style>