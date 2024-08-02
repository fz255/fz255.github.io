import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Реестр иноагентов',
      component: () => import('../views/HomeView.vue'),
      meta: {
        title: "Реестр иноагентов",
        reestr: "inoagent"
      }
    },
    {
      path: '/stats',
      name: 'Реестр иноагентов (Статистика)',
      component: () => import('../views/StatsView.vue'),
      meta: {
        title: "Реестр иноагентов",
        reestr: "inoagent"
      }
    },
    {
      path: '/orgs',
      name: 'Реестр нежелательных организаций',
      component: () => import('../views/orgs/HomeView.vue'),
      meta: {
        title: "Реестр нежелательных организаций",
        reestr: "orgs"
      }
    },
    {
      path: '/orgs/stats',
      name: 'Реестр нежелательных организаций (Статистика)',
      component: () => import('../views/orgs/StatsView.vue'),
      meta: {
        title: "Реестр нежелательных организаций",
        reestr: "orgs"
      }
    },
    {
      path: '/fedsfm',
      name: 'Реестр террористов и экстремистов',
      component: () => import('../views/fedsfm/HomeView.vue'),
      meta: {
        title: "Реестр террористов и экстремистов",
        reestr: "fedsfm"
      }
    },
    {
      path: '/fedsfm/stats',
      name: 'Реестр террористов и экстремистов (Статистика)',
      component: () => import('../views/fedsfm/StatsView.vue'),
      meta: {
        title: "Реестр террористов и экстремистов",
        reestr: "fedsfm"
      }
    },
    {
      path: '/double',
      name: 'Люди с двойным статусом',
      component: () => import('../views/double/HomeView.vue'),
      meta: {
        title: "Люди с двойным статусом",
        reestr: ""
      }
    }
  ]
})

export default router
