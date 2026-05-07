<script setup>
import ServicesCard from "../ui/ServicesCard.vue";
</script>


<template>
  <section class="services-section" id="Service">
    <div class="container-service">
      <h2 class="services-title">Services</h2>
      <div class="services-grid">
      <services-card
        tittle="Web <br>Design"
        number="01"
        description="Membuat tampilan website yang modern, responsif, dan
              user-friendly. Fokus saya adalah menghadirkan desain yang tidak
              hanya menarik secara visual, tetapi juga mudah digunakan sehingga
              memberikan pengalaman terbaik bagi pengguna."
      />

      <services-card
        tittle="Front End<br>Dev"
        number="02"
        description="Membuat tampilan website yang modern, responsif, dan
              user-friendly. Fokus saya adalah menghadirkan desain yang tidak
              hanya menarik secara visual, tetapi juga mudah digunakan sehingga
              memberikan pengalaman terbaik bagi pengguna."
      />

      <services-card
        tittle="Back End<br>Dev "
        number="03"
        description="Membuat tampilan website yang modern, responsif, dan
              user-friendly. Fokus saya adalah menghadirkan desain yang tidak
              hanya menarik secara visual, tetapi juga mudah digunakan sehingga
              memberikan pengalaman terbaik bagi pengguna."
      />
    </div>
    </div>
  </section>
</template>