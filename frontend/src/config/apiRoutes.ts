const apiRoutes = {
  auth: {
    login: 'auth/login',
    logout: 'auth/logout',
    refreshToken: 'auth/refresh-token'
  },
  tasks: {
    index: 'tasks',
    show: (id: number) => `tasks/${id}`,
    store: 'tasks',
    update: (id: number) => `tasks/${id}`,
    destroy: (id: number) => `tasks/${id}`
  }
}

export default apiRoutes
