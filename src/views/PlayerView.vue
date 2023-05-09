<script setup>
import { useMunchkinStore } from '@/stores/MunchkinStore'
const { getPlayer, removePlayer } = useMunchkinStore()
import Dropdown from '@/components/Dropdown.vue'
import PlayerStats from '@/components/PlayerStats.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const props = defineProps({
  id: {
    required: true
  }
})

const router = useRouter()
const player = getPlayer(props.id)
if (!player) router.push('/')
const modifier = ref(0)

const dropdownItems = [
  {
    label: 'Kill Player',
    icon: 'fa-skull',
    callback: () => {
        const player = getPlayer(props.id)
        player.items = 0
        modifier.value = 0
    }
  },
  {
    label: 'Remove Player',
    icon: 'fa-trash',
    callback: () => {
        removePlayer(props.id)
        router.push({ name: 'home' })
    }
  }
]
</script>

<template>
    <div>
        <PlayerStats :playerId="id" v-model:modifier="modifier"></PlayerStats>
        <div class="btn-primary float-btn rounded-full" @click="router.push({name: 'battle', params: { id: props.id }})">
            <i class="fa fa-dungeon"></i>
        </div>
        <div class="fixed bottom-48">
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
