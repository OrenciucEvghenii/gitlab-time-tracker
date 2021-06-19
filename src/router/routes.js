const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index') },
      { path: 'settings', name: 'settings', component: () => import('pages/Settings') },
      {
        path: 'projects',
        name: 'projects',
        component: () => import('pages/Projects'),
        children: [
          { path: ':id/issues', name: 'issues', component: () => import('pages/Issues') }
        ]
      }
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
