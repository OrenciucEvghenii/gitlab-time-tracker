const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', redirect: 'dashboard' },
      { path: 'dashboard', name: 'dashboard', component: () => import('pages/Dashboard') },
      { path: 'dashboard/projects', name: 'projects', component: () => import('pages/Projects') },
      { path: 'dashboard/projects/:projectId/issues', name: 'issues', props: true, component: () => import('pages/Issues') },
      { path: 'dashboard/report', name: 'report', component: () => import('pages/Report') },
      { path: 'settings', name: 'settings', component: () => import('pages/Settings') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
