import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
} from '@chakra-ui/react'
import { ReactNode } from 'react'

type IModal = {
    onClose: () => void,
    isOpen: boolean
    children: ReactNode
    title?: string
    size?: string
}

function Index({
    onClose, 
    isOpen,
    title,
    children,
    size = 'md'
}: IModal) {

    return (
        <>
            <Modal
                onClose={onClose}
                isOpen={isOpen}
                size={size}
                isCentered
            >
                <ModalOverlay />
                <ModalContent background={'#323232'} margin={5}>
                    <ModalBody
                        py={'24px'}
                        background={'radial-gradient(ellipse at top, #662222, transparent),radial-gradient(ellipse at bottom, #150303, transparent);'}
                    >
                    {children}
                </ModalBody>
            </ModalContent>
        </Modal >
        </>
    )
}

export default Index