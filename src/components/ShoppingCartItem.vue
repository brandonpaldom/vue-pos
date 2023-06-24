<script setup>
import { useCartStore } from '@/stores/cart'
import DeleteIcon from '@/components/icons/DeleteIcon.vue'
import { formatCurrency } from '@/helpers'

const cart = useCartStore()

defineProps({
  item: Object,
})
</script>

<template>
  <div class="flex flex-col gap-4 rounded-lg bg-white shadow-md p-2">
    <div class="flex gap-4 items-center">
      <img :src="item.image" class="w-16 rounded-lg" />
      <div>
        <p class="font-bold truncate">{{ item.name }}</p>
        <p>{{ formatCurrency(item.price) }}</p>
      </div>
    </div>
    <div class="flex items-center justify-between gap-4">
      <select
        class="block w-32 mt-1 rounded-md bg-neutral-100 border-transparent focus:border-neutral-500 focus:bg-white focus:ring-0"
        @change="cart.updateQuantity(item.id, +$event.target.value)"
        :value="item.quantity"
      >
        <option v-for="n in cart.checkProductStock(item)" :value="n">
          {{ n }}
        </option>
      </select>
      <button
        type="button"
        class="bg-red-500/10 text-red-600 hover:bg-red-500/20 transition-colors duration-300 rounded-full w-8 h-8 grid place-content-center cursor-pointer"
        @click="cart.removeFromCart(item.id)"
      >
        <DeleteIcon />
      </button>
    </div>
  </div>
</template>
