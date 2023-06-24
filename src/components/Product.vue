<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { formatCurrency } from '@/helpers'
import { useProductStore } from '@/stores/products'

const products = useProductStore()

const props = defineProps({
  product: Object,
})

const isProductOutOfStock = computed(() => props.product.stock === 0)
</script>

<template>
  <div
    :class="{ 'bg-red-100': isProductOutOfStock }"
    class="bg-white rounded-lg flex w-full items-center"
  >
    <img :src="product.image" class="w-1/2 md:w-1/3 rounded-s-lg" />
    <div class="w-1/2 md:w-2/3 flex flex-col gap-2 p-4">
      <div>
        <p class="font-bold">{{ product.name }}</p>
        <p>
          {{ formatCurrency(product.price) }} / {{ product.stock }} in stock
        </p>
      </div>
      <div>
        <RouterLink
          :to="{ name: 'edit-product', params: { id: product.id } }"
          class="btn-small btn-secondary"
          >Edit</RouterLink
        >
        <button
          type="button"
          class="btn-small btn-error"
          @click="products.deleteProduct(product.id)"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>
