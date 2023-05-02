<script setup>
defineProps([
  'value',
  'label',
  'icon',
  'color'
])
</script>

<template>
    <div class="flex justify-between items-center">
        <div :class="`text-2xl ${color} font-bold`" :title="label">
            <i :class="`fa-solid ${icon} mr-1`"></i>
            {{ label }} {{ value }}
        </div>
        <div class="inline-flex rounded-md drop-shadow" role="group">
            <button type="button"
                    @click="$emit('update-counter', -1)"
                    class="px-4 py-2 text-sm font-medium text-primary-900 bg-white border border-primary-300 rounded-l-lg hover:bg-gray-100 hover:text-primary-900 focus:z-10 focus:ring-2 focus:ring-primary-700 focus:text-primary-700
            ">
                <i class="fa-solid fa-minus"></i>
            </button>
            <button type="button"
                    @click="$emit('update-counter', 1)"
                    class="px-4 py-2 text-sm font-medium text-primary-900 bg-secondary-700 border border-primary-300 rounded-r-md hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-2 focus:ring-primary-700 focus:text-primary-700"
            >
                <i class="fa-solid fa-plus"></i>
            </button>
        </div>
    </div>
</template>

<style scoped>
</style>
