<script setup>
import Link from '@/components/Link.vue'
import NoData from '@/components/NoData.vue'
import Product from '@/components/Product.vue'
import { useProductStore } from '../../stores/products'

const products = useProductStore()
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-end">
      <h1>Manage Products</h1>
      <Link to="new-product" class="btn-primary self-end">New product</Link>
    </div>
    <NoData v-if="products.noResults">No results</NoData>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Product
        v-for="product in products.productsCollection"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>
