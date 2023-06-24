<script setup>
import { reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { doc } from 'firebase/firestore'
import { useFirestore, useDocument } from 'vuefire'
import Link from '@/components/Link.vue'
import { useImage } from '@/composables/useImage'
import { useProductStore } from '@/stores/products'

const route = useRoute()
const router = useRouter()

const db = useFirestore()
const docRef = doc(db, 'products', route.params.id)
const product = useDocument(docRef)

const { url, onFileChange, isImageUploaded } = useImage()
const products = useProductStore()

const formData = reactive({
  name: '',
  image: '',
  category: '',
  price: '',
  stock: '',
  description: '',
})

watch(product, (product) => {
  if (!product) {
    router.push({ name: 'products' })
  }
  Object.assign(formData, product)
})

const submitHandler = async (data) => {
  try {
    await products.updateProduct(docRef, { ...data, url })
    router.push({ name: 'products' })
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-end">
      <h1>Edit Product</h1>
      <Link to="products" class="btn-secondary self-end">Go back</Link>
    </div>
    <div class="w-full max-w-[640px] mx-auto rounded-lg p-4 card">
      <FormKit
        type="form"
        :actions="false"
        :value="formData"
        form-class="grid grid-cols-1 gap-6"
        incomplete-message="Product could not be added"
        @submit="submitHandler"
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
          label="Change product image"
          name="image"
          accept=".jpg"
          @change="onFileChange"
        />
        <div v-if="isImageUploaded">
          <img :src="url" class="w-1/2 rounded-lg" />
        </div>
        <div v-else>
          <p class="font-bold">Current image</p>
          <img :src="formData.image" class="w-1/2 rounded-lg mt-4" />
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
        <FormKit type="submit" label="Save changes" />
      </FormKit>
    </div>
  </div>
</template>
