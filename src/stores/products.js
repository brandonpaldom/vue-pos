import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useCollection, useFirestore, useFirebaseStorage } from 'vuefire'
import {
  addDoc,
  collection,
  getDoc,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
  deleteDoc,
  doc,
} from 'firebase/firestore'
import { ref as storageRef, deleteObject } from 'firebase/storage'

export const useProductStore = defineStore('products', () => {
  const db = useFirestore()
  const storage = useFirebaseStorage()

  const selectedCategory = ref(1)

  const categories = [
    { id: 1, name: 'Men' },
    { id: 2, name: 'Women' },
  ]

  const q = query(collection(db, 'products'))

  const productsCollection = useCollection(q)

  async function addProduct(product) {
    await addDoc(collection(db, 'products'), product)
  }

  async function updateProduct(docRef, product) {
    const { image, url, ...values } = product
    if (image.length) {
      await updateDoc(docRef, {
        ...values,
        image: url.value,
      })
    } else {
      await updateDoc(docRef, values)
    }
  }

  async function deleteProduct(id) {
    if (confirm('Are you sure you want to delete product?')) {
      const docRef = doc(db, 'products', id)
      const docSnap = await getDoc(docRef)
      const { image } = docSnap.data()
      const imageRef = storageRef(storage, image)

      await Promise.all([deleteDoc(docRef), deleteObject(imageRef)])
    }
  }

  const categoryOptions = computed(() => {
    const options = [
      { label: '- Select category -', value: '', attrs: { disabled: true } },
      ...categories.map((category) => ({
        label: category.name,
        value: category.id,
      })),
    ]

    return options
  })

  const noResults = computed(() => productsCollection.value.length === 0)

  const filteredProducts = computed(() => {
    return productsCollection.value
      .filter((product) => product.category === selectedCategory.value)
      .filter((product) => product.stock > 0)
  })

  return {
    addProduct,
    updateProduct,
    deleteProduct,
    productsCollection,
    categories,
    selectedCategory,
    categoryOptions,
    noResults,
    filteredProducts,
  }
})