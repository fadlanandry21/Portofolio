<template>
  <div class="terminal-box">
    <span class="prompt">&gt;_</span>
    <span class="typed-text">{{ displayed }}</span>
    <span class="cursor-blink"></span>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  phrases: {
    type: Array,
    required: true,
  },
  color: {
    type: String,
    default: '#ffffff',
  },
  typeSpeed: {
    type: Number,
    default: 100,
  },
  deleteSpeed: {
    type: Number,
    default: 55,
  },
  pauseAfterType: {
    type: Number,
    default: 1400,
  },
  pauseAfterDelete: {
    type: Number,
    default: 300,
  },
})

const displayed = ref('')

let pi       = 0
let ci       = 0
let deleting = false
let timer    = null

function tick() {
  const word = props.phrases[pi]

  if (!deleting) {
    displayed.value = word.slice(0, ++ci)
    if (ci === word.length) {
      deleting = true
      timer = setTimeout(tick, props.pauseAfterType)
      return
    }
    timer = setTimeout(tick, props.typeSpeed)
  } else {
    displayed.value = word.slice(0, --ci)
    if (ci === 0) {
      deleting = false
      pi = (pi + 1) % props.phrases.length
      timer = setTimeout(tick, props.pauseAfterDelete)
      return
    }
    timer = setTimeout(tick, props.deleteSpeed)
  }
}

onMounted(() => {
  timer = setTimeout(tick, props.pauseAfterDelete)
})

onUnmounted(() => {
  clearTimeout(timer)
})
</script>

<style scoped>
.terminal-box {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  border: 1.5px solid v-bind(color);
  border-radius: 4px;
  padding: 10px 18px;
  font-family: monospace;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.05em;
  color: v-bind(color);
}

.prompt {
  opacity: 0.45;
  user-select: none;
}

.cursor-blink {
  display: inline-block;
  width: 2px;
  height: 1.1em;
  background: v-bind(color);
  margin-left: 2px;
  vertical-align: middle;
  animation: blink 0.9s step-start infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}
</style>  