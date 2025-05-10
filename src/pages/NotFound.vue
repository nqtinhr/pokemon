<template>
  <div class="content-404">
    <img :src="LogoPoke" alt="logo" />
    <div class="text-404">
      <img :src="Pika" alt="pika" />
      >4o4
    </div>
    <div class="text-404-alert">
      <span>Oops!</span>
      A wild Snorlax has blocked your path!
    </div>
    <router-link to="/" class="btn-goback">Go back</router-link>
  </div>
</template>

<script setup>
import LogoPoke from '@/assets/logo.png'
import Pika from '@/assets/pika.png'
</script>
