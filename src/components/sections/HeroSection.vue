<script setup>
import { onBeforeMount, onBeforeUnmount, onMounted, ref } from "vue";
import Terminaltypewritter from "../animation/Terminaltypewritter.vue";
import HeroImage from "../ui/HeroImage.vue";
import { Icon } from "@iconify/vue";
import RoleText from "../animation/RoleText.vue";

const social = [
  {
    name: "Instagram",
    Link: "https://www.instagram.com/fadlanandry_/",
    Text: "@fadlanandry_",
    icon: "mdi:instagram",
  },
  {
    name: "Linkedin",
    Link: "https://www.linkedin.com/in/fadlan-andry-al-faris-a4a759335/   ",
    Text: "@fadlanandry",
    icon: "mdi:linkedin",
  },
];

const button = [
  {
    name: "CTA-Button",
    Text: "See My Porto",
    icon: "mdi:arrow-right",
    Link: "#portofolio",
    Class: "porto-btn",
  },

  {
    name: "Talk-Btn",
    Text: "Let's Talk",
    icon: "tabler:message-filled",
    Class: "talk-btn",
    Link: "mailto:andryalfarisfadlan@gmail.com"
  },
];

const phrases = ["HELLO, I'M", "JUNIOR SOFTWARE ENGINEER",];
</script>

<template>
  <main class="hero" id="home">
  
    <div class="hero-content">
      <Terminaltypewritter :phrases="phrases" style="color: #ffffff" />
      <h1 class="name" data-cursor-hover>Fadlan Andry Al Faris.</h1>
      <RoleText />

      <!-- Social Links -->
      <div class="social-link" data-cursor-hover>
        <a
          v-for="item in social"
          :key="item.name"
          :href="item.Link"
          :aria-label="item.Text"
        >
          <icon :icon="item.icon" width="25"></icon>

          {{ item.Text }}
        </a>
      </div>

      <!-- CTA Button -->
      <div class="cta-btn">
        <a
          v-for="item in button"
          :key="item.name"
          :href="item.Link"
          :class="item.Class"
          data-cursor-hover
        >
          {{ item.Text }}

          <icon :icon="item.icon" width="25"></icon>
        </a>
      </div>
    </div>

    <HeroImage data-cursor-hover />
  </main>
</template>
