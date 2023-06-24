import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { useCartStore } from './cart'

export const useCouponStore = defineStore('coupons', () => {
  const cart = useCartStore()

  const couponInput = ref('')
  const couponValidationMessage = ref('')
  const discountPercentage = ref(0)
  const discount = ref(0)

  const VALID_COUPONS = [
    { name: '10', dicount: 0.1 },
    { name: '10DISCOUNT', dicount: 0.1 },
    { name: '15DISCOUNT', dicount: 0.15 },
    { name: '20DISCOUNT', dicount: 0.2 },
  ]

  watch(discountPercentage, () => {
    discount.value = (cart.total * discountPercentage.value).toFixed(2)
  })

  function applyCoupon() {
    if (VALID_COUPONS.some((coupon) => coupon.name === couponInput.value)) {
      couponValidationMessage.value = 'Applying coupon...'
      setTimeout(() => {
        discountPercentage.value = VALID_COUPONS.find(
          (coupon) => coupon.name === couponInput.value
        ).dicount
        couponValidationMessage.value = 'Coupon applied'
      }, 3000)
    } else {
      couponValidationMessage.value = 'Coupon invalid'
    }
    setTimeout(() => {
      couponValidationMessage.value = ''
    }, 6000)
  }

  function $reset() {
    couponInput.value = ''
    couponValidationMessage.value = ''
    discountPercentage.value = 0
    discount.value = 0
  }

  const isValidCoupon = computed(() => discountPercentage.value > 0)

  return {
    couponInput,
    discount,
    applyCoupon,
    $reset,
    couponValidationMessage,
    isValidCoupon,
  }
})
