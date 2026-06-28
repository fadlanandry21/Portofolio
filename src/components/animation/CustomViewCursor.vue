<template>
  <Teleport to="body">
    <div
      class="cursor"
      :class="{ hover: isHover }"
      :style="cursorStyle"
    >
      <span v-if="isHover" class="cursor-label">
        {{ cursorText }}
      </span>
    </div>
  </Teleport>
</template>

<script setup>
import { computed, onMounted, onUnmounted, reactive, ref } from "vue";

const props = defineProps({
  color: {
    type: String,
    default: "#efefef",
  },
  hoverSelector: {
    type: String,
    default: "[data-cursor-hover-view]",
  },
});

const mouse = reactive({
  x: -100,
  y: -100,
});

const cursor = reactive({
  x: -100,
  y: -100,
});

const isHover = ref(false);
const cursorText = ref("VIEW");

let raf = null;

function lerp(start, end, amount) {
  return start + (end - start) * amount;
}

function animate() {
  cursor.x = lerp(cursor.x, mouse.x, 0.18);
  cursor.y = lerp(cursor.y, mouse.y, 0.18);

  raf = requestAnimationFrame(animate);
}

const cursorStyle = computed(() => ({
  left: `${cursor.x}px`,
  top: `${cursor.y}px`,
  background: isHover.value ? props.color : props.color,
}));

function onMouseMove(e) {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
}

function onMouseOver(e) {
  const target = e.target.closest(props.hoverSelector);

  if (!target) return;

  isHover.value = true;

  cursorText.value =
    target.dataset.cursorText ||
    target.getAttribute("data-cursor-text") ||
    "VIEW";
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

  raf = requestAnimationFrame(animate);
});

onUnmounted(() => {
  document.body.style.cursor = "";

  window.removeEventListener("mousemove", onMouseMove);

  document.removeEventListener("mouseover", onMouseOver);

  document.removeEventListener("mouseout", onMouseOut);

  cancelAnimationFrame(raf);
});
</script>

<style scoped>
.cursor {
  position: fixed;

  left: 0;
  top: 0;

  width: 10px;
  height: 10px;

  border-radius: 50%;

  transform: translate(-50%, -50%);

  pointer-events: none;

  z-index: 999999;

  transition:
    width .25s cubic-bezier(.22,1,.36,1),
    height .25s cubic-bezier(.22,1,.36,1),
    background .25s,
    transform .25s;
}

.cursor.hover {

  width: 84px;
  height: 84px;

  background: white;

  color: black;

  display: flex;

  align-items: center;

  justify-content: center;

  transform: translate(-50%, -50%) scale(1.05);

  box-shadow:
      0 15px 45px rgba(0,0,0,.25);
}

.cursor-label {

  font-size: 12px;

  font-weight: 700;

  letter-spacing: 2px;

  text-transform: uppercase;

  user-select: none;

  animation: fade .25s ease;
}

@keyframes fade {

from {

opacity:0;

transform:scale(.6);

}

to {

opacity:1;

transform:scale(1);

}

}
</style>