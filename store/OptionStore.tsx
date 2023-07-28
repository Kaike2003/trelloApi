import { create } from "zustand"


interface IOptionStore {
    isOpen: boolean
    openOption: () => void
    closeOption: () => void
}

export const useModalStore = create<IOptionStore>((set, get) => (
    {
        isOpen: false,
        openOption: () => set({ isOpen: true }),
        closeOption: () => set({ isOpen: false })
    }
))