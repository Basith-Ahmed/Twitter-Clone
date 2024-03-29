import { create } from "zustand";

interface RegisterModelProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useRegisterModel = create<RegisterModelProps>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}))

export default useRegisterModel;