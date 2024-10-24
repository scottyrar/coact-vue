import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('user', () => {
    const auth = ref(null)
    const name = ref(null)

    return { auth,name }
})