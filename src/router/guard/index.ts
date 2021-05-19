import router from '@/router'

import { createPageGuard } from './pageGuard'

export function setupRouterGuard() {
  createPageGuard(router)
}
