import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import ApiService from '@/services/apiService'
import type { IUser } from '@/models/User'
import type { ISignin } from '@/models/Auth'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const apiService = new ApiService()
  const router = useRouter()
  const loading = ref(false)
  const user = ref<IUser | null>(null)

  if (localStorage.getItem('user')) {
    user.value = JSON.parse(localStorage.getItem('user') as string)
  }

  const isAuthenticated = computed(() => !!user.value)
  const currentUser = computed(() => user.value)
  const isLoading = computed(() => loading.value)

  async function signin(data: ISignin) {
    loading.value = true
    try {
      const res = await apiService.signin(data)
      if (res && res.user) {
        user.value = res.user
        localStorage.setItem('user', JSON.stringify(res.user))
      }
    } catch (error) {
      console.error('Error signing in:', error)
    } finally {
      loading.value = false
    }
  }

  function setLoading(value: boolean) {
    loading.value = value
  }

  function logout() {
    user.value = null
    localStorage.removeItem('session.token')
    localStorage.removeItem('session.refreshToken')
    router.replace('/login')
  }

  return {
    isAuthenticated,
    currentUser,
    isLoading,
    setLoading,
    signin,
    logout
  }
})
