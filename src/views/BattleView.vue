<script setup>
import { computed, ref } from 'vue'
import StatButton from '@/components/StatButton.vue'
import { useMunchkinStore } from '@/stores/MunchkinStore'
const { getPlayer, getImageUrl, removePlayer } = useMunchkinStore()
import { useRouter } from 'vue-router'

const props = defineProps({
    id: {
        required: true
    }
})

const router = useRouter()
const player = getPlayer(props.id)
if (!player) router.push('/')
const modifier = ref(0)

const stats = [
    {
        value: computed(() => player.level),
        label: 'Level',
        color: 'text-primary-900',
        icon: 'fa-crown',
        callback: (count) => {
            const newLevel = player.level + count
            if (newLevel >= 1 && newLevel <= 10) player.level = newLevel
        }
    },
    {
        value: computed(() => player.items),
        label: 'Items',
        color: 'text-teal-700',
        icon: 'fa-shirt',
        callback: (count) => player.items += count
    },
    {
        value: computed(() => modifier.value),
        label:'Modifier',
        color: 'text-indigo-900',
        icon: 'fa-scale-balanced',
        callback: (count) => modifier.value += count
    }
]

</script>

<template>
    <div>
        <div v-if="player" class="p-2">
            <div class="flex items-center space-x-2 mb-2">
                <img class="w-12 h-12 rounded-full drop-shadow border-primary-300 border-2"
                     :src="getImageUrl(player.image)"
                >
                <div class="font-medium">
                    <div>{{ player.name }}</div>
                    <div class="leading-5 text-primary-300"
                         title="gender"
                         @click="player.isMale = !player.isMale"
                    >
                        <i class="fa" :class="player.isMale ? 'fa-mars': 'fa-venus'"></i>
                    </div>
                </div>
            </div>
            <div class="flex flex-col gap-1">
                <StatButton v-for="item in stats"
                            :key="item.label"
                            :value="item.value"
                            :label="item.label"
                            :color="item.color"
                            :icon="item.icon"
                            @update-counter="item.callback"
                >
                    {{ player.level }}
                </StatButton>
            </div>
        </div>
    </div>
</template>
