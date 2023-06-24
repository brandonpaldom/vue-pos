<script setup>
import { reactive } from 'vue'
import Link from '@/components/Link.vue'
import { useImage } from '@/composables/useImage'
import { useProductStore } from '@/stores/products'
import { useRouter } from 'vue-router'

const { url, onFileChange, isImageUploaded } = useImage()
const products = useProductStore()
const router = useRouter()

const formData = reactive({
  name: '',
  image: '',
  category: '',
  price: '',
  stock: '',
  description: '',
})

const submitHandler = async (data) => {
  const { image, ...values } = data

  try {
    await products.addProduct({
      ...values,
      image: url.value,
    })
    router.push({ name: 'products' })
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-end">
      <h1>New Product</h1>
      <Link to="products" class="btn-secondary self-end">Go back</Link>
    </div>
    <div class="w-full max-w-[640px] mx-auto rounded-lg p-4 card">
      <FormKit
        type="form"
        :actions="false"
        form-class="grid grid-cols-1 gap-6"
        incomplete-message="Product could not be added"
        @submit="submitHandler"
        :value="formData"
      >
        <FormKit
          type="text"
          label="Name"
          name="name"
          validation="required"
          :validation-messages="{
            required: 'Name of product is required',
          }"
          v-model.trim="formData.name"
        />
        <FormKit
          type="file"
          label="Product image"
          name="image"
          validation="required"
          :validation-messages="{
            required: 'Product image is required',
          }"
          accept=".jpg"
          @change="onFileChange"
          v-model.trim="formData.image"
        />
        <div v-if="isImageUploaded">
          <img :src="url" class="w-1/2 rounded-lg" />
        </div>
        <FormKit
          type="select"
          label="Category"
          name="category"
          validation="required"
          :validation-messages="{ required: 'Category is required' }"
          :options="products.categoryOptions"
          v-model.number="formData.category"
        />
        <FormKit
          type="number"
          label="Price"
          name="price"
          validation="required"
          :validation-messages="{
            required: 'Price of product is required',
          }"
          min="1"
          v-model.number="formData.price"
        />
        <FormKit
          type="number"
          label="Stock"
          name="stock"
          validation="required"
          :validation-messages="{
            required: 'Stock is required',
          }"
          min="1"
          v-model.number="formData.stock"
        />
        <FormKit
          type="textarea"
          label="Description"
          name="description"
          validation="required"
          :validation-messages="{
            required: 'Description is required',
          }"
          v-model.trim="formData.description"
        />
        <FormKit type="submit" label="Add product" />
      </FormKit>
    </div>
  </div>
</template>
