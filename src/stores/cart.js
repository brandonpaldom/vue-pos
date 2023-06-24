import { computed, ref, watchEffect } from 'vue'
import { defineStore } from 'pinia'
import { addDoc, collection, doc, runTransaction } from 'firebase/firestore'
import { useFirestore } from 'vuefire'
import { useCouponStore } from './coupons'
import { getCurrentDate } from '@/helpers'

export const useCartStore = defineStore('cart', () => {
  const coupon = useCouponStore()

  const db = useFirestore()

  const cartItems = ref([])
  const subtotal = ref(0)
  const taxes = ref(0)
  const total = ref(0)

  const MAX_PRODUCTS = 5
  const TAX_RATE = 0.16

  watchEffect(() => {
    subtotal.value = cartItems.value.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    )
    taxes.value = Number((subtotal.value * TAX_RATE).toFixed(2))
    total.value = Number(
      (subtotal.value + taxes.value - coupon.discount).toFixed(2)
    )
  })

  function addToCart(product) {
    const index = isProductInCart(product.id)
    if (index >= 0) {
      if (isProductAvailable(product, index)) {
        alert('You have reached the limit')
        return
      }
      cartItems.value[index].quantity++
    } else {
      cartItems.value.push({ ...product, quantity: 1, id: product.id })
    }
  }

  function updateQuantity(id, quantity) {
    cartItems.value = cartItems.value.map((item) =>
      item.id === id ? { ...item, quantity } : item
    )
  }

  function removeFromCart(id) {
    cartItems.value = cartItems.value.filter((item) => item.id !== id)
  }

  async function checkout() {
    try {
      await addDoc(collection(db, 'sales'), {
        cartItems: cartItems.value.map((item) => {
          const { stock, category, ...data } = item
          return data
        }),
        subtotal: subtotal.value,
        taxes: taxes.value,
        discount: coupon.discount,
        total: total.value,
        date: getCurrentDate(),
      })
      cartItems.value.forEach(async (item) => {
        const productRef = doc(db, 'products', item.id)
        await runTransaction(db, async (transaction) => {
          const currentProduct = await transaction.get(productRef)
          const stock = currentProduct.data().stock - item.quantity
          transaction.update(productRef, { stock })
        })
      })
      $reset()
      coupon.$reset()
    } catch (error) {
      console.log(error)
    }
  }

  function $reset() {
    cartItems.value = []
    subtotal.value = 0
    taxes.value = 0
    total.value = 0
  }

  const isProductInCart = (id) =>
    cartItems.value.findIndex((item) => item.id === id)

  const isProductAvailable = (item, index) => {
    return (
      cartItems.value[index].quantity >= item.stock ||
      cartItems.value[index].quantity >= MAX_PRODUCTS
    )
  }

  const isCartEmpty = computed(() => cartItems.value.length === 0)

  const checkProductStock = computed(() => {
    return (product) =>
      product.stock < MAX_PRODUCTS ? product.stock : MAX_PRODUCTS
  })

  return {
    cartItems,
    subtotal,
    taxes,
    total,
    addToCart,
    updateQuantity,
    removeFromCart,
    checkout,
    isCartEmpty,
    checkProductStock,
  }
})
