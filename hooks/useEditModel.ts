import { create } from "zustand";

interface EditModelProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useEditModel = create<EditModelProps>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}), 
}))

export default useEditModel;