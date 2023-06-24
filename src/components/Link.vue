<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  to: String,
})
</script>

<template>
  <RouterLink :to="{ name: to }" class="btn">
    <slot></slot>
  </RouterLink>
</template>
