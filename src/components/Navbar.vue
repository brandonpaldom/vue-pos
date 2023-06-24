<script setup>
import Link from './Link.vue'
import Logo from './Logo.vue'
</script>

<template>
  <div class="bg-white h-16 flex items-center px-4 justify-between">
    <Logo />
    <Link to="products" class="btn-primary">Manage</Link>
  </div>
</template>
