<script setup>
import { useCouponStore } from '@/stores/coupons'

const coupons = useCouponStore()
</script>

<template>
  <div class="flex flex-col gap-4">
    <p class="font-bold">Redeem coupon</p>
    <div class="flex">
      <input
        type="text"
        placeholder="e.g. HOTSALE"
        class="block w-full rounded-l-md bg-neutral-100 border-transparent focus:border-neutral-500 focus:bg-white focus:ring-0 disabled:opacity-25"
        v-model="coupons.couponInput"
        :disabled="coupons.isValidCoupon"
      />
      <button
        type="button"
        class="px-4 font-semibold bg-green-500/10 text-green-600 rounded-r-md hover:bg-green-500/20 transition-colors duration-300 disabled:opacity-25"
        @click="coupons.applyCoupon"
        :disabled="coupons.isValidCoupon"
      >
        Redeem
      </button>
    </div>
    <p class="font-bold text-center">{{ coupons.couponValidationMessage }}</p>
  </div>
</template>
