<script setup>
import { useProductStore } from '@/stores/products'

const products = useProductStore()
</script>

<template>
  <div class="flex items-center gap-4">
    <p class="font-bold">Filters:</p>
    <div v-for="category in products.categories" :key="category.id">
      <label class="inline-flex items-center">
        <input
          type="radio"
          class="rounded-full bg-neutral-200 border-transparent focus:border-transparent focus:bg-green-200 text-green-700 focus:ring-1 focus:ring-offset-2 focus:ring-green-500"
          name="category"
          :value="category.id"
          :checked="products.selectedCategory === category.id"
          @change="products.selectedCategory = +$event.target.value"
        />
        <span class="ml-2">{{ category.name }}</span>
      </label>
    </div>
  </div>
</template>
