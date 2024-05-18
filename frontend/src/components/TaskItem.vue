<script setup lang="ts">
import dayjs from 'dayjs'
import { ref } from 'vue'
import type { ITask } from '@/models/Task'
import IconEdit from '@/components/icons/IconEdit.vue'
import IconTrash from '@/components/icons/IconTrash.vue'
import IconDone from '@/components/icons/IconDone.vue'

const props = defineProps<{
  task: ITask
}>()

const emit = defineEmits(['openModal', 'editTask', 'deleteTask', 'doneTask'])

function onOpenModal() {
  emit('openModal', props.task)
}

function onDoneTask(event: Event) {
  event.stopPropagation()
  emit('doneTask', props.task)
}

function onEditTask(event: Event) {
  event.stopPropagation()
  emit('editTask', props.task)
}

function onDeleteTask(event: Event) {
  event.stopPropagation()
  emit('deleteTask', props.task)
}
</script>

<template>
  <li class="flex justify-between gap-x-6 py-5 px-5 rounded-lg hover:bg-gray-100">
    <div class="flex gap-x-4 flex-1 cursor-pointer" @click="onOpenModal">
      <div class="h-8 w-8 mt-1 flex-none rounded-full bg-green-500"></div>
      <div>
        <p class="text-sm font-semibold text-gray-900">{{ props.task.title }}</p>
        <p class="mt-50 max-w-96 truncate text-xs leading-5 text-gray-500">
          {{ props.task.description }}
        </p>
      </div>
    </div>

    <div class="flex items-center">
      <p v-if="props.task.completed" class="text-xs text-gray-500 leading-5">
        Concluída em {{ dayjs(props.task.updated_at).format('DD/MM/YYYY') }}
      </p>
      <div v-else class="flex items-center gap-x-1.5">
        <div class="flex-none rounded-full bg-green-500/20 p-1">
          <div class="h-1.5 w-1.5 rounded-full bg-green-500" />
        </div>
        <p class="text-xs leading-5 text-gray-500">Em andamento</p>
      </div>
    </div>

    <div class="flex items-center space-x-2">
      <button
        @click="onDoneTask"
        title="Concluir Tarefa"
        class="flex items-center justify-center shadow-sm rounded-md outline-none w-8 h-8 focus:outline-none bg-green-100 hover:bg-green-400"
      >
        <IconDone class="hover:text-white" />
      </button>
      <button
        @click="onEditTask"
        title="Editar Tarefa"
        class="flex items-center justify-center shadow-sm rounded-md outline-none w-8 h-8 focus:outline-none bg-violet-100 hover:bg-violet-400"
      >
        <IconEdit class="hover:text-white" />
      </button>
      <button
        @click="onDeleteTask"
        title="Excluir Tarefa"
        class="flex items-center justify-center shadow-sm rounded-md outline-none w-8 h-8 focus:outline-none bg-red-100 hover:bg-red-400"
      >
        <IconTrash class="hover:text-white" />
      </button>
    </div>
  </li>
</template>

<style></style>
