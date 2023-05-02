<script setup>
import { useMunchkinStore } from '@/stores/MunchkinStore'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const { addPlayer, getImageUrl } = useMunchkinStore()
const router = useRouter()

const newPlayer = reactive({
  name: '',
  isMale: true,
  image: 1
})

const genders = {
  male: {
      icon: 'fa-mars',
      value: true
  },
  female: {
    icon: 'fa-venus',
    value: false
  }
}

const addNewPlayer = () => {
  addPlayer(newPlayer)
  router.push('/')
}

</script>

<template>
 <div class="p-4">
     <form class="form flex flex-col gap-3" @submit.prevent="addNewPlayer">
         <div>
             <label for="name" class="block mb-2 font-medium text-primary-900">Name</label>
             <input required type="text" class="input" id="name" name="name"
                    v-model="newPlayer.name"
             >
         </div>
         <div class="gender">
             <label for="gender" class="block mb-2 font-medium text-primary-900">Gender</label>
             <div class="flex my-3 mx-1 gap-5" id="gender">
                 <div v-for="gender in Object.values(genders)"
                      class="flex items-center"
                 >
                     <label class="flex ml-2 text-primary-900 items-center cursor-pointer">
                         <input v-model="newPlayer.isMale"
                                type="radio"
                                :value="gender.value"
                                class="w-4 h-4 text-primary-900 cursor-pointer"
                         >
                         <i :class="`fa ${gender.icon} fa-xl ml-2`"></i>
                     </label>
                 </div>
             </div>
         </div>
         <div>
             <label for="image" class="block mb-2 font-medium text-primary-900">
                 Avatar
             </label>
             <div class="flex flex-wrap gap-3 gap-y-5 justify-center">
                 <div class="relative" v-for="x in 8">
                     <img class="w-16 h-16 rounded-full drop-shadow-lg border-primary-300 border-2 cursor-pointer"
                          :src="getImageUrl(x)" alt=""
                          :class="{ '--selected': x === newPlayer.image }"
                          @click="newPlayer.image = x"
                     >
                 </div>
             </div>
         </div>
         <button type="submit" class="float-btn btn-primary w-auto text-md">
             <i class="fa-solid fa-user-plus"></i>
             Create
         </button>
     </form>
 </div>

</template>

<style scoped lang="sass">
.--selected
    @apply border-green-600 border-4
</style>
