import { defineStore } from 'pinia'
import ApiService from '@/services/apiService'
import type { ITask, ITotalTask } from '@/models/Task'
import { computed, ref, watch } from 'vue'
import { useAuthStore } from './auth'
import { onValue, ref as dbRef, getDatabase, DataSnapshot } from 'firebase/database'
import firebaseApp from '@/services/firebaseService'

export const useTaskStore = defineStore('tasks', () => {
  const apiService = new ApiService()
  const authStore = useAuthStore()

  const taskList = ref<ITask[]>([])
  const totalTask = ref<ITotalTask>({
    completed: 0,
    pending: 0
  })

  const tasks = computed(() => taskList.value)
  const totalTasks = computed(() => totalTask.value)

  const db = getDatabase(firebaseApp)

  onValue(dbRef(db, 'tasks'), async (snapshot: DataSnapshot) => {
    const data = snapshot.val()
    if (data) {
      await fetchTasks()
      updateTotalTasks()
    }
  })

  function updateTotalTasks() {
    totalTask.value = {
      completed: taskList.value.filter((task: ITask) => task.completed === true).length,
      pending: taskList.value.length - totalTask.value.completed
    }
  }

  function isLoading(value: boolean) {
    authStore.setLoading(value)
  }

  async function fetchTasks() {
    isLoading(true)
    try {
      const { data } = await apiService.fetchTasks()
      taskList.value = data.data
    } catch (error) {
      console.error('Error fetching task lists:', error)
    } finally {
      isLoading(false)
    }
  }

  async function saveTask(task: ITask) {
    isLoading(true)
    try {
      if (task.id) {
        await apiService.updateTask(task)
        const index = taskList.value.findIndex((t) => t.id === task.id)
        if (index !== -1) {
          taskList.value.splice(index, 1, task)
        }
      } else {
        const { data } = await apiService.createTask(task)
        taskList.value = [...taskList.value, data.task]
      }
    } catch (error) {
      console.error('Error creating task:', error)
    } finally {
      isLoading(false)
    }
  }

  async function deleteTask(taskId: number) {
    isLoading(true)
    try {
      await apiService.deleteTask(taskId)
      taskList.value = taskList.value.filter((task: ITask) => task.id !== taskId)
    } catch (error) {
      console.error('Error deleting task:', error)
    } finally {
      isLoading(false)
    }
  }

  return {
    tasks,
    totalTasks,
    fetchTasks,
    saveTask,
    deleteTask
  }
})
