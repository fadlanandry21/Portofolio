<script setup>

defineProps({
    tittle: String,
    number: String,
    description: String
})
</script>

<template>
    <div class="service-card web-design" data-cursor-hover>
            <div class="service-header">
              <h3 v-html="tittle" class="service-name"></h3>
              <div class="service-number">{{ number }}</div>
            </div>
            <div class="service-description">
                {{ description }}
            </div>
          </div>
</template>

