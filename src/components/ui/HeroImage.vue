<script setup>
import { reactive } from 'vue'

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
  overflow: hidden;
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
  position: relative;
  z-index: 1;
}
</style>