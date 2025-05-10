<template>
  <NavContainer />
  <div class="container">
    <div id="pokes" class="pokes">
      <Suspense>
        <template #default>
          <RouterView />
        </template>
        <template #fallback>
          <Loading :loading="true" />
        </template>
      </Suspense>
    </div>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
import NavContainer from '@/components/NavBar.vue'
import Loading from '@/components/Loading.vue'
</script>
