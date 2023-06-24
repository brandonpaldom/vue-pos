<script setup>
import { RouterLink } from 'vue-router'
import Link from './Link.vue'
import Logo from './Logo.vue'
</script>

<template>
  <div class="bg-white h-16 flex items-center px-4 justify-between">
    <Logo />
    <div class="flex items-center gap-4">
      <RouterLink :to="{ name: 'products' }" class="link">Products</RouterLink>
      <RouterLink :to="{ name: 'sales' }" class="link">Sales</RouterLink>
      <Link to="home" class="btn-primary">Go shop</Link>
    </div>
  </div>
</template>
