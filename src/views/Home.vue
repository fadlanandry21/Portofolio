<script setup>
import CustomCursor from "@/components/animation/CustomCursor.vue";
import Footer from "@/components/layout/footer.vue";
import Navbar from "@/components/layout/navbar.vue";
import HeroSection from "@/components/sections/HeroSection.vue";
import AboutSection from "@/components/sections/AboutSection.vue";
import JourneySection from "@/components/sections/JourneySection.vue";
import ServiceSection from "@/components/sections/ServiceSection.vue";
import TechStack from "@/components/sections/TechStack.vue";
import ProjectSection from "@/components/sections/ProjectSection.vue";
import ContactSection from "@/components/sections/ContactSection.vue";
import AnimationBackground from "@/components/animation/BackgroundAnimation.vue";
import { useLenis } from "@/components/composable/useLenis";

useLenis();
</script>


<template>
<AnimationBackground />

<CustomCursor/>


<Navbar/>

<HeroSection/>
<AboutSection/>
<JourneySection/>
<TechStack />
<ServiceSection/>
<ProjectSection />
<ContactSection/>
<Footer />
</template>



