<script setup>
import { useMunchkinStore } from '@/stores/MunchkinStore'
const { getPlayer } = useMunchkinStore()
import Dropdown from '@/components/Dropdown.vue'
import PlayerStats from '@/components/PlayerStats.vue'
import { computed, reactive, ref } from 'vue'
import StatButton from '@/components/StatButton.vue'

const props = defineProps({
    id: {
        required: true
    }
})

const players = reactive([
    Object.assign(getPlayer(props.id), { modifier: 0 })
])

const dropdownItems = [
    {
        label: 'Add Player',
        icon: 'fa-user',
        callback: () => {}
    },
    {
        label: 'Add Monster',
        icon: 'fa-ghost',
        callback: () => addMonster()
    }
]


// TODO componentizar en monsterList.vue
let monsters = reactive([])
const addMonster = () => {
    monsters.push({
        level: 1,
        modifier: 0
    })
}
const deleteMonster = (id) => {
    monsters = monsters.filter((_, idx) => idx !== id)
}
addMonster()

</script>

<template>
    <div>
        <PlayerStats v-for="player in players" :key="player.id"
                     :playerId="id"
                     v-model:modifier="player.modifier"
                     :show-attack="false" />
        <div class="counters py-10 flex">
            <div class="text-center w-1/2">
                <p class="text-red-900 text-3xl font-bold"
                   title="atack"
                >
                    <i class="fa fa-hand-fist mr-1"></i>
                    22
                </p>
            </div>
            <div class="text-center w-1/2">
                <p class="text-blue-700 text-3xl font-bold"
                   title="atack"
                >
                    <i class="fa fa-ghost mr-1"></i>
                    22
                </p>
            </div>
        </div>

        <div class="flex flex-nowrap overflow-auto">
            <div v-for="(monster, monsterId) in monsters" :key="`monster${monsterId}`" class="min-w-full p-2 px-5">
                <div class="flex justify-between items-center">
                    <div class="flex items-center space-x-4 mb-2">
                        <img class="w-20 h-20 rounded-full drop-shadow border-primary-300 border-2"
                             src="../assets/images/monster.png"
                        >
                        <div class="font-medium">
                            <div>Monster {{ monsterId + 1 }}</div>
                        </div>
                    </div>
                    <div
                      v-if="monsterId !== 0"
                      @click="deleteMonster(monsterId)"
                      class="flex w-8 h-8 p-2 bg-amber-100 rounded text-gray-500 drop-shadow items-center justify-center"
                    >
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                </div>

                <div class="flex flex-col gap-3">
                    <StatButton :value="monster.level"
                                label="Level"
                                color="text-primary-900"
                                icon="fa-crown"
                                @update-counter="e => monster.level += e"
                    >
                        {{ monster.level }}
                    </StatButton>
                    <StatButton :value="monster.modifier"
                                label="Modifier"
                                color="text-indigo-900"
                                icon="fa-scale-balanced"
                                @update-counter="e => monster.modifier += e"
                    >
                        {{ monster.items }}
                    </StatButton>
                </div>
            </div>
        </div>
        <dropdown :items="dropdownItems" class="right-3">
            <div class="btn-primary-outline float-btn rounded-full"
                 title="more"
            >
                <i class="fa fa-people-group"></i>
            </div>
        </dropdown>
    </div>
</template>

<style lang="sass" scoped>
:deep(.attack-counter)
    display: none
</style>
