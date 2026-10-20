import { create } from 'zustand';

type SidebarState = 'expanded' | 'collapsed';

type UiState = {
  readonly sidebar: SidebarState;
  readonly setSidebar: (state: SidebarState) => void;
  readonly toggleSidebar: () => void;
};

export const useUiStore = create<UiState>((set) => ({
  sidebar: 'expanded',
  setSidebar: (sidebar) => set({ sidebar }),
  toggleSidebar: () =>
    set((state) => ({ sidebar: state.sidebar === 'expanded' ? 'collapsed' : 'expanded' })),
}));
