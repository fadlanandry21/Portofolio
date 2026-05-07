<template>
  <Teleport to="body">
    <div class="cursor-dot" :style="dotStyle" />
    <div class="cursor-ring" :style="ringStyle" />
  </Teleport>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from "vue";

const props = defineProps({
  color: {
    type: String,
    default: "#efefef",
  },
  hoverSelector: {
    type: String,
    default: "[data-cursor-hover]",
  },
});

const mouse = reactive({ x: -200, y: -200 });
const ring = reactive({ x: -200, y: -200 });
const isHover = ref(false);
let rafId = null;

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function buildArrowSvg(color) {
  const c = encodeURIComponent(color);
  return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M4 2L20 12L12 13.5L8 21L4 2Z' fill='${c}' stroke='white' stroke-width='1'/%3E%3C/svg%3E")`;
}

const dotStyle = computed(() => {
  if (isHover.value) {
    return {
      left: mouse.x + "px",
      top: mouse.y + "px",
      width: "24px",
      height: "24px",
      background: "transparent",
      backgroundImage: buildArrowSvg(props.color),
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
    };
  }
  return {
    left: mouse.x + "px",
    top: mouse.y + "px",
    width: "10px",
    height: "10px",
    background: props.color,
    backgroundImage: "none",
  };
});

const ringStyle = computed(() => ({
  left: ring.x + "px",
  top: ring.y + "px",
  width: isHover.value ? "52px" : "40px",
  height: isHover.value ? "52px" : "40px",
  borderColor: props.color,
  opacity: isHover.value ? "1" : "0.6",
}));

function tick() {
  ring.x = lerp(ring.x, mouse.x, 0.1);
  ring.y = lerp(ring.y, mouse.y, 0.1);
  rafId = requestAnimationFrame(tick);
}

function onMouseMove(e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
}

function onMouseOver(e) {
  if (e.target.closest(props.hoverSelector)) {
    isHover.value = true;
  }
}

function onMouseOut(e) {
  if (e.target.closest(props.hoverSelector)) {
    isHover.value = false;
  }
}

onMounted(() => {
  document.body.style.cursor = "none";
  window.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseover", onMouseOver);
  document.addEventListener("mouseout", onMouseOut);
  rafId = requestAnimationFrame(tick);
});

onUnmounted(() => {
  document.body.style.cursor = "";
  window.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("mouseover", onMouseOver);
  document.removeEventListener("mouseout", onMouseOut);
  cancelAnimationFrame(rafId);
});
</script>

<style scoped>
.cursor-dot {
  position: fixed;
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  z-index: 9999;
  transition: width 0.2s ease, height 0.2s ease, background 0.2s ease,
    border-radius 0.2s ease;
  will-change: left, top;
}

.cursor-ring {
  position: fixed;
  border-radius: 50%;
  border: 2px solid;
  pointer-events: none;
  transform: translate(-50%, -50%);
  z-index: 9998;
  transition: width 0.25s ease, height 0.25s ease, border-color 0.25s ease,
    opacity 0.25s ease;
  will-change: left, top;
}
</style>