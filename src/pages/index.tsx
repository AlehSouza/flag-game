import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Button, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { useFlagGame } from "@/contexts/FlagGameContext";
import { Modal } from "@/components";
import { useRouter } from "next/router";

const Index = () => {
    const { gameConfig, setGameConfig } = useFlagGame();
    const [isPlay, setIsPlay] = useState(false)
    const [bestScore, setBestScore] = useState<any>()
    const router = useRouter()

    const {
        isOpen,
        onOpen,
        onClose
    } = useDisclosure()

    const {
        isOpen: isOpenFaq,
        onOpen: onOpenFaq,
        onClose: onCloseFaq,
    } = useDisclosure()

    const setGamesDificulty = (diff: string) => {
        const draft = {
            ...gameConfig,
            difficulty: diff
        }
        setGameConfig(draft)
        router.push('/game')
    }

    const getBestScore = () => {
        if (typeof window !== 'undefined') {
            const score = localStorage.getItem('best-score-point');
            setBestScore(score)
        }
        return null;
    }

    useEffect(() => {
        getBestScore()
    }, [])

    const ModalRank = () => {
        return (
            <Modal onClose={() => { onClose() }} isOpen={isOpen} size='xl'>
                <Text textAlign={'center'}>
                    <Text
                        textAlign={'center'}
                        fontSize={'34px'}
                        fontWeight={'bold'}
                        color={'white'}
                        padding={4}
                    >
                        LeaderBoard
                    </Text>
                    <Text padding={4} pb={8}>Em desenvolvimento</Text>
                    <Button width={'100%'} onClick={() => { onClose() }}>Sair</Button>
                </Text>
            </Modal>
        )
    }

    const ModalFaq = () => {
        return (
            <Modal onClose={() => { onCloseFaq() }} isOpen={isOpenFaq} size='xl'>
                <Text textAlign={'center'}>
                    <Text
                        textAlign={'center'}
                        fontSize={'34px'}
                        fontWeight={'bold'}
                        color={'white'}
                        padding={4}
                    >
                        Frequent Asked Questions
                    </Text>
                    <Text padding={4} pb={8}>Em desenvolvimento</Text>
                    <Button width={'100%'} onClick={() => { onCloseFaq() }}>Sair</Button>
                </Text>
            </Modal>
        )
    }


    return (
        <Flex
            w={"100%"}
            h={"100vh"}
            background={'radial-gradient(ellipse at top, #662222, transparent),radial-gradient(ellipse at bottom, #150303, transparent);'}
            justifyContent={"center"}
            alignItems={"center"}
            flexDir={"column"}
        >
            <Head>
                <title>Flag Game</title>
            </Head>
            <ModalRank />
            <ModalFaq />
            <Flex mb={8} pos={'relative'} flexDir={'column'}>
                <Image src={'/my-flag-white.svg'} width={60} height={60} alt="flag" style={{ position: 'absolute', zIndex: '0', left: '55px', top: '-25px' }} />
                <Text
                    textAlign={'center'}
                    fontSize={'54px'}
                    fontWeight={'bold'}
                    zIndex={'1'}
                    color={'white'}
                >
                    Flags
                </Text>
            </Flex>
            <Flex pb={8}>
                {
                    bestScore &&
                    <Flex>
                        <label>
                            Parabéns! sua melhor pontuação foi de: <span style={{ color: 'green', fontWeight: 'bold' }}>{bestScore}</span>
                        </label>
                    </Flex>
                }
            </Flex>
            {
                !isPlay
                    ? <Flex direction="column" justifyContent={'center'} alignItems={'center'} gap={4} width={"90%"} maxW={"600px"}>
                        <Button width={'100%'} p={'20px'} variant="solid" onClick={() => { setIsPlay(!isPlay) }}>
                            Jogar
                        </Button>
                        <Button width={'100%'} p={'20px'} variant="solid" onClick={() => { onOpen() }}>
                            <label style={{ width: "100%", cursor: "pointer" }}>LeaderBoard</label>
                        </Button>
                        <Button width={'100%'} p={'20px'} variant="solid" onClick={() => { onOpenFaq() }}>
                            <label style={{ width: "100%", cursor: "pointer" }}>FAQ</label>
                        </Button>
                        <Flex width={'100%'} bgColor={'#000000'} p={'8px 24px'} borderRadius={'lg'} _hover={{ backgroundColor: '#1a1a1a' }}>
                            <a href="https://github.com/AlehSouza" target="_blank" rel="noopener noreferrer" style={{ width: '100%', textAlign: 'center', fontWeight: 'bold' }}>
                                Meu Github
                            </a>
                        </Flex>
                    </Flex>
                    : <Flex direction="column" gap={4} width={"90%"} maxW={"600px"}>
                        <Button colorScheme="green" variant="solid" onClick={() => { setGamesDificulty('easy') }}>
                            <label style={{ width: "100%", cursor: "pointer" }}>Fácil</label>
                        </Button>
                        <Button colorScheme="yellow" variant="solid" onClick={() => { setGamesDificulty('medium') }}>
                            <label style={{ width: "100%", cursor: "pointer" }}>Médio</label>
                        </Button>
                        <Button colorScheme="red" variant="solid" onClick={() => { setGamesDificulty('hard') }}>
                            <label style={{ width: "100%", cursor: "pointer" }}>Difícil</label>
                        </Button>
                        <Button variant="ghost" onClick={() => { setIsPlay(!isPlay) }}>
                            <label style={{ width: "100%", cursor: "pointer" }}>Voltar</label>
                        </Button>
                    </Flex>
            }
        </Flex>
    )
}

export default Index