<script setup>
import ShoppingCartIcon from '@/components/icons/ShoppingCartIcon.vue'
import { formatCurrency } from '@/helpers'
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()

defineProps({
  product: Object,
})
</script>

<template>
  <div class="rounded-lg shadow-md">
    <img :src="product.image" class="rounded-t-lg" />
    <div class="flex flex-col gap-2 p-4">
      <p class="font-bold truncate">{{ product.name }}</p>
      <div class="flex items-center justify-between">
        <div class="flex flex-col">
          <p class="text-neutral-500 text-sm">Price</p>
          <p>{{ formatCurrency(product.price) }}</p>
        </div>
        <div
          class="bg-green-500/10 text-green-600 hover:bg-green-500/20 transition-colors duration-300 rounded-full cursor-pointer w-8 h-8 grid place-content-center"
          @click="cart.addToCart(product)"
        >
          <ShoppingCartIcon />
        </div>
      </div>
    </div>
  </div>
</template>
