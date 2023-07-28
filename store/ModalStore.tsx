import { create } from "zustand"


interface IModalStore {
    isOpen: boolean
    openModal: () => void
    closeModal: () => void
}

export const useModalStore = create<IModalStore>((set, get) => (
    {
        isOpen: false,
        openModal: () => set({ isOpen: true }),
        closeModal: () => set({ isOpen: false })
    }
))