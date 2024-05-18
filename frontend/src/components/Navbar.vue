<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import Logo from '@/components/Logo.vue'
import { useRouter } from 'vue-router'
import IconLogout from '@/components/icons/IconLogout.vue'

const authStore = useAuthStore()
const router = useRouter()

const logout = () => {
  authStore.logout()
}
</script>

<template>
  <nav class="bg-gray-800 fixed w-full">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="flex items-center space-x-2 cursor-pointer" @click="router.replace('/')">
          <Logo fill="darkorange" />
          <h2 class="text-white text-xl font-bold">TaskManager</h2>
        </div>
        <div
          class="absolute right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <!-- Profile dropdown -->
          <Menu as="div" class="relative ml-3">
            <div class="flex flex-row items-center space-x-4">
              <span class="text-md font-semibold text-white">{{
                authStore.currentUser?.name
              }}</span>
              <MenuButton
                class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span class="absolute -inset-1.5"></span>
                <span class="sr-only">Open user menu</span>
                <img class="h-8 w-8 rounded-full" src="@/assets/user.jpg" alt="" />
              </MenuButton>
            </div>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <MenuItem>
                  <span
                    class="cursor-pointer flex space-x-2 items-center px-4 py-2 hover:bg-slate-100 hover:font-semibold"
                    @click="logout"
                  >
                    <IconLogout />
                    <span class="text-sm text-gray-700">Sair</span>
                  </span>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>
  </nav>
</template>
