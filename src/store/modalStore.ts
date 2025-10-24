import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { User } from '../../types/user';

type ModalType = 'create' | 'edit' | 'delete' | null;

interface ModalState {
    isOpen: boolean;
    type: ModalType;
    data: User | null;

    // Actions
    openModal: (type: ModalType, data?: User | null) => void;
    closeModal: () => void;
    resetModal: () => void;
}

export const useModalStore = create<ModalState>()(
    devtools(
        (set) => ({
            isOpen: false,
            type: null,
            data: null,

            openModal: (type, data = null) =>
                set({ isOpen: true, type, data }),

            closeModal: () =>
                set({ isOpen: false }),

            resetModal: () =>
                set({ isOpen: false, type: null, data: null })
        }),
        {
            name: 'modal-store',
        }
    )
);

// Selector hooks
export const useModalState = () =>
    useModalStore((state) => ({
        isOpen: state.isOpen,
        type: state.type,
        data: state.data
    }));

export const useModalActions = () =>
    useModalStore((state) => ({
        openModal: state.openModal,
        closeModal: state.closeModal,
        resetModal: state.resetModal
    }));