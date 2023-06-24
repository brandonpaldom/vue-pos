<script setup>
import { useCartStore } from '@/stores/cart'
import { useCouponStore } from '@/stores/coupons'
import NoData from '@/components/NoData.vue'
import ShoppingCartItem from './ShoppingCartItem.vue'
import Amount from './Amount.vue'
import CouponForm from './CouponForm.vue'
import { formatCurrency } from '@/helpers'

const cart = useCartStore()
const coupons = useCouponStore()
</script>

<template>
  <NoData v-if="cart.isCartEmpty">Cart is empty</NoData>
  <div v-else class="flex flex-col gap-4">
    <h2>Sales Summary</h2>
    <div class="flex flex-col gap-4">
      <ShoppingCartItem
        v-for="item in cart.cartItems"
        :key="item.id"
        :item="item"
      />
    </div>
    <Amount>
      <template #label>Subtotal</template>
      {{ formatCurrency(cart.subtotal) }}
    </Amount>
    <Amount>
      <template #label>Taxes</template>
      {{ formatCurrency(cart.taxes) }}
    </Amount>
    <Amount v-if="coupons.isValidCoupon">
      <template #label>Discount</template>
      {{ formatCurrency(coupons.discount) }}
    </Amount>
    <Amount>
      <template #label>Total</template>
      {{ formatCurrency(cart.total) }}
    </Amount>
    <CouponForm />
    <button
      type="button"
      class="btn btn-primary self-end"
      @click="cart.checkout"
    >
      Confirm purchase
    </button>
  </div>
</template>
