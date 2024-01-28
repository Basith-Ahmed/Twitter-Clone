import { create } from "zustand";

interface LoginModelProps {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useLoginModel = create<LoginModelProps>((set) => ({
    isOpen: false, //initial state is set to false
    onOpen: () => set({isOpen: true}), //when opened it is set to true
    onClose: () => set({isOpen: false}), //when closed it is set to close again
}))

export default useLoginModel;