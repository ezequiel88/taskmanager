import type { ISignin } from '@/models/Auth'
import type { ITask } from '@/models/Task'
import type { IUser } from '@/models/User'
import axios, {
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig
} from 'axios'
import apiRoutes from '../config/apiRoutes'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'

export default class ApiService {
  private axiosInstance: AxiosInstance
  private router = useRouter()

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    this.axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
      const token = localStorage.getItem('session.token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    })

    // TODO: Lógica do refreshToken não foi implementada no backend
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: any) => {
        if (error.response && error.response.data) {
          toast(error.response.data.message, {
            closeButton: true,
            type: 'error',
            theme: 'colored',
            autoClose: 5000,
            transition: 'slide'
          })
        }

        if (error.response && error.response.status === 401) {
          localStorage.removeItem('session.token')
          localStorage.removeItem('user')
          this.router.replace('/login')

          //   const refreshToken = localStorage.getItem('session.refreshToken')
          //   if (refreshToken) {
          //     try {
          //       const response = await this.refreshTokenRequest(refreshToken)
          //       const newToken = response.data.token
          //       localStorage.setItem('session.token', newToken)

          //       if (error.config) {
          //         error.config.headers.Authorization = `Bearer ${newToken}`
          //         return this.axiosInstance.request(error.config)
          //       }
          //     } catch (refreshError) {
          //       console.error('Erro ao atualizar token:', refreshError)

          //       localStorage.removeItem('session.token')
          //       localStorage.removeItem('session.refreshToken')
          //     }
          //   } else {
          //     localStorage.removeItem('session.token')
          //     localStorage.removeItem('session.refreshToken')
          //     this.router.replace('/login')
          //     return
          //   }
        }
        return Promise.reject(error)
      }
    )
  }

  // TODO: Lógica do refreshToken não foi implementada no backend
  private async refreshTokenRequest(
    refreshToken: string
  ): Promise<AxiosResponse<{ token: string }>> {
    return this.axiosInstance.post(apiRoutes.auth.refreshToken, { refreshToken })
  }

  public async signin(data: ISignin): Promise<{ user: IUser; token: string } | null> {
    try {
      const response = await this.axiosInstance.post(apiRoutes.auth.login, data)
      const user: IUser = response.data.user
      const token: string = response.data.token

      localStorage.setItem('session.token', token)

      return { user, token }
    } catch (error) {
      console.error(error)
      return null
    }
  }

  public async getTask(taskId: number): Promise<AxiosResponse<{ task: ITask }>> {
    return this.axiosInstance.get(apiRoutes.tasks.show(taskId))
  }

  public async createTask(task: ITask): Promise<AxiosResponse<{ task: ITask }>> {
    return this.axiosInstance.post(apiRoutes.tasks.store, task)
  }

  public async updateTask(task: ITask): Promise<AxiosResponse<{ task: ITask }>> {
    return this.axiosInstance.put(apiRoutes.tasks.update(task.id), task)
  }

  public async deleteTask(taskId: number): Promise<AxiosResponse<{ taskId: number }>> {
    return this.axiosInstance.delete(apiRoutes.tasks.destroy(taskId))
  }

  public async fetchTasks(): Promise<AxiosResponse> {
    return this.axiosInstance.get(apiRoutes.tasks.index)
  }
}
