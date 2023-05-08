<script setup>
import {ref, onMounted, onBeforeUnmount} from 'vue'

defineProps({
  items: {
    required: true,
    type: Array
  }
})

const show = ref(false)

onMounted(() => {
    document.addEventListener('click', checkOutsideComponent, 100)
})

onBeforeUnmount(() => {
    document.addEventListener('click', checkOutsideComponent)
})

const checkOutsideComponent = () => {
    show.value = false
}

</script>

<template>
    <div class="dropdown-component absolute left-3 bottom-20">
        <div @click="show = true">
            <slot></slot>
        </div>
        <Transition enter-from-class="transition duration-200 scale-100 opacity-0"
                    enter-to-class="transition duration-200 scale-100"
                    leave-from-class="transition duration-150 scale-100"
                    leave-to-class="transition duration-150 scale-100 opacity-0"
        >
            <div v-show="show" class="z-10 bg-white divide-y divide-gray-200 divide-solid rounded-lg shadow w-44 text-sm"
            >
                <div v-for="(item, id) in items" :key="id"
                     class="block p-4 text-primary-800 cursor-pointer"
                     @click="item.callback()"
                >
                    <i v-if="item.icon" class="fa mr-2" :class="item.icon"></i>
                    {{ item.label }}
                </div>
            </div>
        </Transition>
    </div>
</template>

