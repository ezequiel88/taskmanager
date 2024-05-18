<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import { useTaskStore } from '@/stores/tasks'
import TaskItem from '@/components/TaskItem.vue'
import ModalTask from '@/components/ModalTask.vue'
import IconFilter from '@/components/icons/IconFilter.vue'
import { computed, ref } from 'vue'
import type { ITask } from '@/models/Task'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import Swal from 'sweetalert2'

const optionsFilter = [
  { label: 'Pendentes', value: 'PENDING' },
  { label: 'Concluídas', value: 'DONE' },
  { label: 'Todas', value: 'ALL' }
]

const taskStore = useTaskStore()

const isModalOpen = ref(false)
const taskSelected = ref()
const currentFilter = ref('ALL')

function openModal(task: ITask) {
  taskSelected.value = task
  isModalOpen.value = true
}

function newTask() {
  taskSelected.value = {} as ITask
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
  taskSelected.value = null
}

const handleSubmit = async (task: ITask) => {
  try {
    isModalOpen.value = false
    taskSelected.value = null
    await taskStore.saveTask(task)
  } catch (error) {
    console.error('Erro ao criar task:', error)
  }
}

const handleEdit = (task: ITask) => {
  taskSelected.value = task
  isModalOpen.value = true
}

const handleDelete = async (task: ITask) => {
  try {
    Swal.fire({
      icon: 'question',
      title: 'TaskManager',
      text: 'Deseja excluir a tarefa?',
      focusCancel: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      reverseButtons: true
    }).then(async (res) => {
      if (res.isConfirmed) {
        await taskStore.deleteTask(task.id)
      }
    })
  } catch (error) {
    console.error('Erro ao criar task:', error)
  }
}

const handleDone = async (task: ITask) => {
  try {
    Swal.fire({
      icon: 'question',
      title: 'TaskManager',
      text: 'Deseja concluir a tarefa?',
      focusCancel: true,
      confirmButtonText: 'Sim, concluir!',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      reverseButtons: true
    }).then(async (res) => {
      if (res.isConfirmed) {
        task.completed = true
        await taskStore.saveTask(task)
      }
    })
  } catch (error) {
    console.error('Erro ao criar task:', error)
  }
}

const filteredTasks = computed(() => {
  if (currentFilter.value === 'PENDING') {
    return taskStore.tasks.filter((task: ITask) => !task.completed)
  } else if (currentFilter.value === 'DONE') {
    return taskStore.tasks.filter((task: ITask) => task.completed)
  } else {
    return taskStore.tasks
  }
})

function filterStatus(status: string) {
  currentFilter.value = status
}
</script>

<template>
  <div>
    <Navbar />

    <div class="pt-24 mx-auto max-w-7xl px-2 sm:px-8 lg:px-8 py-12">
      <div class="flex items-center space-x-4 bg-gray-100 px-6 py-4 rounded-lg mb-4">
        <div class="">
          <button
            type="button"
            @click="newTask"
            class="inline-flex items-center justify-center rounded-md bg-gray-500 px-4 h-8 text-sm font-semibold text-white shadow-sm hover:bg-green-600"
          >
            Criar Tarefa
          </button>
        </div>
        <div class="flex flex-1 justify-center">
          <div class="flex items-center space-x-4" v-if="filteredTasks.length > 0">
            <p class="text-sm text-gray-500">{{ taskStore.totalTasks.completed }} concluída(s)</p>
            <p class="text-sm text-gray-500">{{ taskStore.totalTasks.pending }} pendente(s)</p>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <p class="text-sm font-semibold leading-4 text-gray-900">
            {{ filteredTasks.length }} registro(s)
          </p>

          <Menu as="div" class="relative">
            <div class="flex flex-row items-center space-x-4">
              <MenuButton
                class="relative flex items-center justify-center shadow-sm rounded-md outline-none w-8 h-8 focus:outline-none hover:bg-gray-300"
              >
                <IconFilter />
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
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <MenuItem v-for="option in optionsFilter" :key="option.value">
                  <span
                    class="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-slate-100 hover:font-semibold"
                    :class="{ 'bg-slate-200': currentFilter === String(option.value) }"
                    @click="filterStatus(option.value)"
                    >{{ option.label }}</span
                  >
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>

      <ul role="list" class="divide-y divide-gray-100">
        <div v-for="(task, index) in filteredTasks" :key="index">
          <TaskItem
            v-if="task"
            :task="task"
            @openModal="openModal"
            @doneTask="handleDone"
            @editTask="handleEdit"
            @deleteTask="handleDelete"
          />
        </div>
      </ul>

      <ModalTask
        v-if="taskSelected"
        :isOpen="isModalOpen"
        :task="taskSelected"
        @closeModal="closeModal"
        @submitTask="handleSubmit"
      />
    </div>
  </div>
</template>
