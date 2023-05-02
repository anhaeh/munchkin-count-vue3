<script setup>
import { useMunchkinStore } from '@/stores/MunchkinStore'
import MunchkinItem from '@/components/MunchkinItem.vue'

const { players } = useMunchkinStore()
</script>

<template>
    <div>
        <button class="float-btn btn-primary rounded-full"
                @click="$router.push({ name: 'addPlayer' })"
                title="add player"
        >
            <i class="fa-solid fa-plus"></i>
        </button>
        <ul role="list" class="flex flex-col gap-4">
            <MunchkinItem
              v-for="player in players"
              :key="player.id"
              :player="player"

            />
            <div v-if="!players.length"
                 class="bg-secondary-700 rounded-lg p-4 border-secondary-500 border-2 text-center font-bold"
            >
                Not have munchkins yet
            </div>
        </ul>
    </div>
</template>

<style scoped lang="sass">
</style>
