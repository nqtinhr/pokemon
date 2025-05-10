<template>
  <div v-if="loading" class="loader">
    <div class="loader__rect loader__rect--1"></div>
    <div class="loader__rect loader__rect--2"></div>
    <div class="loader__rect loader__rect--3"></div>
    <div class="loader__rect loader__rect--4"></div>
    <div class="loader__rect loader__rect--5"></div>
    <div class="loader__rect loader__rect--6"></div>
  </div>
</template>

<script setup>
defineProps({
  loading: {
    type: Boolean,
    required: true
  }
})
</script>
