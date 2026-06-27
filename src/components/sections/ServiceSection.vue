<script setup>
import ServicesCard from "../ui/ServicesCard.vue";
</script>


<template>
  <section class="services-section" id="Service">
    <div class="container-service">
      <h2 class="services-title">Solution I Specialize in</h2>
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
        description="Mengubah desain menjadi website interaktif dengan teknologi web
              seperti HTML, CSS, dan JavaScript. Saya berusaha menghadirkan
              antarmuka yang rapi, responsif di berbagai perangkat, serta sesuai
              dengan kebutuhan pengguna."
      />

      <services-card
        tittle="Back End<br>Dev "
        number="03"
        description="Mengembangkan logika dan sistem di balik layar sebuah website.
              Mulai dari pengelolaan data, integrasi database, hingga membangun
              API sederhana untuk mendukung fungsionalitas aplikasi web secara
              menyeluruh."
      />
    </div>
    </div>
  </section>
</template>