<script setup>
import { ref } from 'vue'
import VueTailwindDatepicker from 'vue-tailwind-datepicker'
import { useSalesStore } from '@/stores/sales'
import NoData from '@/components/NoData.vue'
import SalesDetail from '@/components/SalesDetail.vue'
import { formatCurrency } from '@/helpers'

const sales = useSalesStore()

const formatter = ref({
  date: 'DD/MM/YYYY',
  month: 'MMMM',
})
</script>

<template>
  <div
    class="flex flex-col gap-4 md:h-[calc(100vh-96px)] max-w-screen-lg mx-auto"
  >
    <h1>Sales</h1>
    <div class="flex flex-col gap-4 md:flex-row md:h-[calc(100%-64px)]">
      <div class="card flex flex-col gap-4 w-full md:w-[400px] md:h-max">
        <h2>Select a date</h2>
        <VueTailwindDatepicker
          as-single
          no-input
          v-model="sales.dateValue"
          :formatter="formatter"
        />
      </div>
      <div
        class="card flex flex-col gap-4 md:grow md:overflow-y-auto md:h-full"
      >
        <h2>Summary</h2>
        <div v-if="sales.isDateSelected" class="flex flex-col gap-4">
          <p>
            Sale of the date
            <span class="font-bold">{{ sales.dateValue }}</span>
          </p>
          <NoData v-if="!sales.salesCollection.length"
            >No sales on this selected day</NoData
          >
          <div v-else class="flex flex-col gap-4">
            <p>
              Total for the day:
              <span class="font-bold">{{
                formatCurrency(sales.totalDailySales)
              }}</span>
            </p>
            <SalesDetail
              v-for="sale in sales.salesCollection"
              :key="sale.id"
              :sale="sale"
            />
          </div>
        </div>
        <NoData v-else>Select a date to show sales</NoData>
      </div>
    </div>
  </div>
</template>
