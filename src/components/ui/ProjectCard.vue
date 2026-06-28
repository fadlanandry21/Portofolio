<script setup>
defineProps({
  project: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <article class="project-card" data-cursor-hover>
    <div class="card-image">
      <img :src="project.image" :alt="project.title" />
    </div>

    <div class="card-body">
      <h3 class="project-title">{{ project.title }}</h3>

      <p class="project-description">
        {{ project.description }}
      </p>

      <div class="project-tags">
        <span
          v-for="tag in project.tags"
          :key="tag"
          class="tag"
        >
          {{ tag }}
        </span>
      </div>
    </div>

    <div class="card-footer">
      <span class="project-year">
        {{ project.year }}
      </span>

      <a
        :href="project.link"
        target="_blank"
        class="project-link"
      >
        View Project →
      </a>
    </div>
  </article>
</template>

<style scoped>
.project-card{
    width:360px;
    flex-shrink:0;

    background:#111;
    border:1px solid #222;
    border-radius:14px;
    overflow:hidden;

    display:flex;
    flex-direction:column;

    transition:.3s;
}

.project-card:hover{
    transform:translateY(-8px);
    border-color:#333;
}

.card-image img{
    width:100%;
    aspect-ratio:16/9;
    object-fit:cover;
    display:block;
}

.card-body{
    padding:18px;
    display:flex;
    flex-direction:column;
    flex:1;
}

.project-title{
    font-size:22px;
    margin-bottom:10px;
}

.project-description{
    color:#999;
    line-height:1.6;
    display:-webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient:vertical;
    overflow:hidden;
}

.project-tags{
    display:flex;
    flex-wrap:wrap;
    gap:8px;
    margin-top:20px;
}

.tag{
    background:#222;
    padding:5px 12px;
    border-radius:20px;
    font-size:13px;
}

.card-footer{
    padding:18px;
    display:flex;
    justify-content:space-between;
    border-top:1px solid #1d1d1d;
}

.project-link{
    color:#999;
    text-decoration:none;
}

.project-link:hover{
    color:white;
}

@media(max-width:768px){

.project-card{
    width:280px;
}

}
</style>