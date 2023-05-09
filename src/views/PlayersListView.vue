<script setup>
import { useMunchkinStore } from '@/stores/MunchkinStore'
import MunchkinItem from '@/components/MunchkinItem.vue'
import Dropdown from '@/components/Dropdown.vue'

const store = useMunchkinStore()

const dropdownItems = [
    {
        label: 'New Game',
        icon: 'fa-rotate-right',
        callback: store.newGame
    }
]
</script>

<template>
    <div>
        <button class="float-btn btn-primary rounded-full"
                @click="$router.push({ name: 'addPlayer' })"
                title="add player"
        >
            <i class="fa-solid fa-plus"></i>
        </button>
        <div v-if="!store.getPlayersList.length"
             class="bg-secondary-700 rounded-lg p-4 border-secondary-500 border-2 text-center font-bold"
        >
            Not have munchkins yet
        </div>
        <ul role="list" class="flex flex-col gap-4">
            <MunchkinItem
              v-for="player in store.getPlayersList"
              :key="player.id"
              :player="player"

            />
        </ul>
        <div class="fixed bottom-36">
            <dropdown :items="dropdownItems">
                <div class="btn-primary-outline float-btn rounded-full left-5"
                     title="more"
                >
                    <i class="fa fa-ellipsis-vertical"></i>
                </div>
            </dropdown>
        </div>
    </div>
</template>

<style scoped lang="sass">
</style>
