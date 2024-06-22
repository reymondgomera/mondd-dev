import { createStoreWithSelectors } from '@/lib'
import { createWithEqualityFn } from 'zustand/traditional'

type NavigationStore = {
  hash: string
  hasBackground: boolean
  setHash: (hash: string) => void
  setHasBackground: (status: boolean) => void
}

const navigationStore = createWithEqualityFn<NavigationStore>((set) => ({
  hash: '',
  hasBackground: false,
  setHash: (hash: string) => set({ hash }),
  setHasBackground: (status: boolean) => set({ hasBackground: status })
}))

export const useNavigationStore = createStoreWithSelectors(navigationStore)
