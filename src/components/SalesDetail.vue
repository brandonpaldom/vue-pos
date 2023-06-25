<script setup>
import Amount from '@/components/Amount.vue'
import { formatCurrency } from '@/helpers'

defineProps({
  sale: Object,
})
</script>

<template>
  <div
    class="flex flex-col gap-4 border-t-2 border-dashed pt-4 border-neutral-300"
  >
    <h3>Sales Detail</h3>
    <h4>Products Sold</h4>
    <div class="flex flex-col gap-4">
      <div
        v-for="item in sale.cartItems"
        class="bg-white p-2 flex gap-4 items-center rounded-lg shadow-md"
      >
        <img :src="item.image" class="w-24 rounded-lg" />
        <div>
          <p class="font-bold truncate">{{ item.name }}</p>
          <p>{{ formatCurrency(item.price) }}</p>
          <p>Quantity: {{ item.quantity }}</p>
        </div>
      </div>
    </div>
    <Amount>
      <template #label>Subtotal</template>
      {{ formatCurrency(sale.subtotal) }}
    </Amount>
    <Amount>
      <template #label>Taxes</template>
      {{ formatCurrency(sale.taxes) }}
    </Amount>
    <Amount
      v-if="sale.discount"
      class="py-2 border-y-2 border-green-300 border-dashed bg-green-50"
    >
      <template #label>Discount</template>
      {{ formatCurrency(sale.discount) }}
    </Amount>
    <Amount>
      <template #label>Total</template>
      {{ formatCurrency(sale.total) }}
    </Amount>
  </div>
</template>
