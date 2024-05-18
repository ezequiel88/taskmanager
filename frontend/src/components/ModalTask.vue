<script setup lang="ts">
import { defineEmits, ref } from 'vue'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import { defineProps } from 'vue'
import type { ITask } from '@/models/Task'
import IconClose from '@/components/icons/IconClose.vue'

// Definindo as props
const props = defineProps<{
  isOpen: boolean
  task: ITask
}>()

const title = ref(props.task.title)
const description = ref(props.task.description)

const emit = defineEmits(['closeModal', 'submitTask'])

function onCloseModal() {
  emit('closeModal')
}

const handleSubmit = async (e: Event) => {
  e.preventDefault()
  try {
    emit('submitTask', { ...props.task, title: title.value, description: description.value })
  } catch (error) {
    console.error('Erro ao criar task:', error)
  }
}
</script>

<template>
  <TransitionRoot appear :show="props.isOpen" as="template">
    <Dialog as="div" @close="onCloseModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <div class="flex items-center justify-between">
                <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                  {{ props.task.id ? 'Editar' : 'Adicionar' }} Tarefa
                </DialogTitle>
                <button
                  @click="onCloseModal"
                  class="flex items-center justify-center shadow-sm rounded-full outline-none w-8 h-8 focus:outline-none hover:bg-gray-200"
                >
                  <IconClose />
                </button>
              </div>

              <form class="space-y-4" @submit="handleSubmit">
                <div class="mt-4">
                  <label for="title" class="block text-sm font-medium leading-6 text-gray-900"
                    >Título</label
                  >
                  <div class="mt-1">
                    <input
                      v-model="title"
                      id="title"
                      name="title"
                      required
                      autofocus
                      class="block w-full rounded-md p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div class="mt-4">
                  <label for="description" class="block text-sm font-medium leading-6 text-gray-900"
                    >Descrição</label
                  >
                  <div class="mt-1">
                    <textarea
                      v-model="description"
                      rows="4"
                      id="description"
                      name="description"
                      class="resize-none block w-full rounded-md p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    >
                    </textarea>
                  </div>
                </div>

                <div class="mt-4">
                  <button
                    type="submit"
                    class="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-100 px-6 h-8 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    Salvar
                  </button>
                </div>
              </form>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
