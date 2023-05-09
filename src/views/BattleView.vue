<script setup>
import { ref } from 'vue'
import BattlePlayers from '@/components/BattlePlayers.vue'
import BattleMonsters from '@/components/BattleMonsters.vue'

const props = defineProps({
  id: {
    required: true
  }
})

const munchkinAttack = ref(0)
const monstersAttack = ref(0)

</script>

<template>
    <div>
        <BattlePlayers :initialPlayer="props.id" v-model:attack="munchkinAttack"></BattlePlayers>
        <div class="counters my-6 p-4 flex items-center justify-center gap-10 bg-amber-50 rounded-lg border-primary-300 border drop-shadow-lg">
            <div class="text-center">
                <p class="text-red-900 text-3xl font-bold"
                   title="atack"
                >
                    <i class="fa fa-hand-fist mr-1"></i>
                    {{ munchkinAttack }}
                </p>
            </div>
            <div class="text-lg font-bold"
                 :class="munchkinAttack > monstersAttack ? 'text-green-600' : 'text-red-600'"
                 v-text="munchkinAttack > monstersAttack ? 'You Win' : 'You Lose'"
            ></div>
            <div class="text-center">
                <p class="text-violet-700 text-3xl font-bold"
                   title="atack"
                >
                    <i class="fa fa-ghost mr-1"></i>
                    {{ monstersAttack }}
                </p>
            </div>
        </div>
        <BattleMonsters v-model:attack="monstersAttack"></BattleMonsters>
    </div>
</template>

<style lang="sass">
.--tab-active
  @apply border-b-primary-800 border-b-2 bg-secondary-100
</style>
