<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Logo from '@/components/Logo.vue'

const email = ref('')
const password = ref('')

const authStore = useAuthStore()

const router = useRouter()

const handleSubmit = async (e: Event) => {
  e.preventDefault()
  try {
    await authStore.signin({ email: email.value, password: password.value })
    await router.push({ name: 'home' })
  } catch (error) {
    console.error('Erro ao fazer login:', error)
  }
}
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-10 py-12 lg:px-14">
    <div class="flex flex-col items-center mt-12">
      <Logo fill="darkorange" style="transform: scale(2)" />
      <h2 class="mt-10 text-3xl font-bold leading-9 tracking-tight text-gray-900">Login</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-4" @submit="handleSubmit">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
          <div class="mt-1">
            <input
              v-model="email"
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              autofocus
              class="block w-full rounded-md p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900"
            >Senha</label
          >
          <div class="mt-1">
            <input
              v-model="password"
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="block w-full rounded-md p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            :class="{ 'bg-slate-300 hover:bg-slate-300': authStore.isLoading }"
            :disabled="authStore.isLoading"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <span>Login</span>
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        <a href="#" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >@ezequiel_tav</a
        >
      </p>
    </div>
  </div>
</template>

<style scoped>
.loading-button {
  position: relative;
}

.loading-button:after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid #fff;
  border-radius: 50%;
  border-top-color: transparent;
  width: 1.5em;
  height: 1.5em;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
