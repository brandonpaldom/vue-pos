<script setup>
import { RouterView } from 'vue-router'
import AdminNavbar from '@/components/AdminNavbar.vue'
</script>

<template>
  <AdminNavbar />
  <main class="p-4">
    <RouterView />
  </main>
</template>
