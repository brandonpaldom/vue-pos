import { computed, ref } from 'vue'
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytesResumable,
} from 'firebase/storage'
import { useFirebaseStorage } from 'vuefire'
import { uid } from 'uid'

export function useImage() {
  const url = ref('')
  const storage = useFirebaseStorage()

  const onFileChange = (e) => {
    const file = e.target.files[0]
    const fileName = uid() + '.jpg'
    const sRef = storageRef(storage, `/products/${fileName}`)

    const uploadTask = uploadBytesResumable(sRef, file)

    uploadTask.on(
      'state_changed',
      () => {},
      (error) => {
        console.log(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          url.value = downloadUrl
        })
      }
    )
  }

  const isImageUploaded = computed(() => {
    return url.value ? url.value : null
  })

  return { url, onFileChange, isImageUploaded }
}
