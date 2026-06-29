<script setup>
import { reactive } from 'vue'
import { Icon } from '@iconify/vue'

const style = reactive({
  transform: '',
  boxShadow: '',
  transition: 'transform 0.4s ease, box-shadow 0.4s ease'
})

const shine = reactive({ opacity: 0, background: '' })

function onMove(e) {
  const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
  const x = e.clientX - left
  const y = e.clientY - top
  const rotY = ((x - width / 2) / (width / 2)) * 15
  const rotX = -((y - height / 2) / (height / 2)) * 15

  style.transition = 'transform 0.05s ease, box-shadow 0.05s ease'
  style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.04,1.04,1.04)`
  style.boxShadow = `${-rotY * 1.5}px ${rotX * 1.5}px 30px rgba(0,0,0,0.4)`
  shine.opacity = 1
  shine.background = `radial-gradient(circle at ${Math.round((x / width) * 100)}% ${Math.round((y / height) * 100)}%, rgba(255,255,255,0.12) 0%, transparent 65%)`
}

function onLeave() {
  style.transition = 'transform 0.4s ease, box-shadow 0.4s ease'
  style.transform = ''
  style.boxShadow = ''
  shine.opacity = 0
}

const techLogos = [
  { icon: 'logos:vue',        class: 't1' },
  { icon: 'logos:tailwindcss-icon', class: 't2' },
  { icon: 'logos:laravel',    class: 't3' },
  { icon: 'logos:javascript', class: 't4' },
  { icon: 'logos:react',      class: 't5' },
  { icon: 'logos:nodejs-icon', class: 't6' },
  { icon: 'logos:git-icon',   class: 't7' },
]
</script>



<template>
  <div
    class="hero-image"
    :style="style"
    @mousemove="onMove"
    @mouseleave="onLeave"
  >
    <div class="shine" :style="shine" />
    <img src="/assets/img/porto-profile.webp" alt="" class="profile-image" />

    <div
      v-for="tech in techLogos"
      :key="tech.icon"
      :class="['tech-logo', tech.class]"
    >
      <Icon :icon="tech.icon" />
    </div>
  </div>
</template>

<style scoped>
.hero-image {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  width: 350px;
  height: 100%;
  background: linear-gradient(135deg, #2a2a2a 0%, #1f1f1f 100%);
  border-radius: 10px;
  overflow: visible; /* penting: ubah dari hidden ke visible */
  margin: auto;
  cursor: pointer;
  transform-style: preserve-3d;
  will-change: transform;
  position: relative;
}

.shine {
  position: absolute;
  inset: 0;
  border-radius: 10px;
  pointer-events: none;
  z-index: 2;
  transition: opacity 0.2s;
}

.profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  position: relative;
  z-index: 1;
}

.tech-logo {
  position: absolute;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: techFloat var(--dur) ease-in-out infinite;
  animation-delay: var(--delay);
  pointer-events: none;
  z-index: 3;
}

.tech-logo :deep(svg) {
  width: 26px;
  height: 26px;
}

@keyframes techFloat {
  0%, 100% { transform: translateY(0px) rotate(var(--tilt, 0deg)); }
  50%       { transform: translateY(-10px) rotate(var(--tilt, 0deg)); }
}

.t1 { --dur: 3.2s; --delay: 0s;   --tilt: -6deg; top: -18px;    left: -22px;  }
.t2 { --dur: 3.8s; --delay: 0.5s; --tilt:  5deg; top:  80px;    left: -52px;  }
.t3 { --dur: 2.9s; --delay: 1.1s; --tilt: -4deg; bottom: 40px;  left: -50px;  }
.t4 { --dur: 3.5s; --delay: 0.3s; --tilt:  7deg; bottom: -14px; left:  30px;  }
.t5 { --dur: 3.1s; --delay: 0.8s; --tilt: -5deg; top: -18px;    right: 30px;  }
.t6 { --dur: 3.6s; --delay: 1.4s; --tilt:  6deg; top:  40px;    right: -52px; }
.t7 { --dur: 2.8s; --delay: 0.2s; --tilt: -3deg; bottom: 30px;  right: -50px; }
</style>