import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { collection, query, where } from 'firebase/firestore'
import { useCollection, useFirestore } from 'vuefire'

export const useSalesStore = defineStore('sales', () => {
  const dateValue = ref('')

  const db = useFirestore()

  const salesSource = computed(() => {
    if (dateValue.value) {
      const q = query(
        collection(db, 'sales'),
        where('date', '==', dateValue.value)
      )
      return q
    }
  })

  const salesCollection = useCollection(salesSource)

  const isDateSelected = computed(() => dateValue.value)

  const totalDailySales = computed(() => {
    return salesCollection.value
      ? salesCollection.value.reduce((total, sale) => total + sale.total, 0)
      : 0
  })

  return { dateValue, salesCollection, isDateSelected, totalDailySales }
})
