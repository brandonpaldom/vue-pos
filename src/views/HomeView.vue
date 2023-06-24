<script setup>
import { storeToRefs } from 'pinia'
import Navbar from '@/components/Navbar.vue'
import Filters from '@/components/Filters.vue'
import NoData from '@/components/NoData.vue'
import ProductItem from '@/components/ProductItem.vue'
import ShoppingCart from '../components/ShoppingCart.vue'
import { useProductStore } from '@/stores/products'

const products = useProductStore()

const { filteredProducts, noResults } = storeToRefs(products)
</script>

<template>
  <Navbar />
  <div class="flex flex-col sm:flex-row gap-4 h-[calc(100vh-96px)] m-4">
    <div class="card overflow-y-auto flex flex-col gap-4 grow h-1/2 sm:h-full">
      <h1>All Products</h1>
      <Filters />
      <NoData v-if="noResults">No results</NoData>
      <div
        v-else
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4"
      >
        <ProductItem
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
    <div
      class="card w-full sm:w-[400px] shrink-0 overflow-y-auto h-1/2 sm:h-full"
    >
      <ShoppingCart />
    </div>
  </div>
</template>
