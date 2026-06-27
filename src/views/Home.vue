<script setup>
import CustomCursor from "@/components/animation/CustomCursor.vue";
import Footer from "@/components/layout/footer.vue";
import Navbar from "@/components/layout/navbar.vue";
import HeroSection from "@/components/sections/HeroSection.vue";
import AboutSection from "@/components/sections/AboutSection.vue";
import ServiceSection from "@/components/sections/ServiceSection.vue";
import TechStack from "@/components/sections/TechStack.vue";
import ProjectSection from "@/components/sections/ProjectSection.vue";
</script>


<template>

<CustomCursor/>

<Navbar/>

<HeroSection/>
<AboutSection/>
<TechStack />
<ServiceSection/>
<ProjectSection />

<Footer />
</template>



