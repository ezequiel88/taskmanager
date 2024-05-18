<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import Loading from '@/components/Loading.vue'

const authStore = useAuthStore()
</script>

<template>
  <Loading v-if="authStore.isLoading" />
  <RouterView />
</template>
