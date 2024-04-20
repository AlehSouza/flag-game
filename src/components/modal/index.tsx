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
    isOpen: boolean
    children: ReactNode
    title?: string
    size?: string
}

function Index({ isOpen, title, children, size = 'md' }: IModal) {

    return (
        <>
            <Modal
                onClose={() => { }}
                isOpen={isOpen}
                size={size}
                isCentered
            >
                <ModalOverlay />
                <ModalContent background={'#323232'}>
                    {/* <ModalHeader style={{ letterSpacing: '1px' }}>{title && title}</ModalHeader> */}
                    <ModalBody
                        paddingTop={'24px'}
                        background={'radial-gradient(ellipse at top, #662222, transparent),radial-gradient(ellipse at bottom, #150303, transparent);'}
                    >
                        {children}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default Index