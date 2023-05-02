<script setup>
import TopHeader from '@/components/Header.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <TopHeader>
      <template #actions>
      </template>
    </TopHeader>
    <main class="container mx-auto p-4 flex flex-col">
      <RouterView />
    </main>
  </div>
</template>

<style lang="sass">
.app
  @apply bg-secondary-300
  height: 100vh
.float-btn
  @apply drop-shadow-md h-14 w-14 justify-center
  position: fixed
  bottom: 1rem
  right: 1rem
</style>
