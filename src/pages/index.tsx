import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Button, Flex, ListItem, OrderedList, Text, useDisclosure } from "@chakra-ui/react";
import { useFlagGame } from "@/contexts/FlagGameContext";
import { Modal } from "@/components";
import { useRouter } from "next/router";

// import images
import StartGif from "./../../public/gifs/start.gif"
import DifficultGif from "./../../public/gifs/difficulty.gif"
import GameplayGif from "./../../public/gifs/gameplay.gif"
import RestartGif from "./../../public/gifs/restart.gif"
import ExitGif from "./../../public/gifs/exit.gif"


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
        isOpen: isOpenHtp,
        onOpen: onOpenHtp,
        onClose: onCloseHtp,
    } = useDisclosure()

    const setGamesDificulty = (diff: string, maxFails: any, lifes: any) => {
        const draft = {
            ...gameConfig,
            difficulty: diff,
            maxFails: maxFails,
            maxLifes: lifes,
        }
        setGameConfig(draft)
        router.push("/game")
    }

    const getBestScore = () => {
        if (typeof window !== "undefined") {
            const score = localStorage.getItem("best-score-point");
            setBestScore(score)
        }
        return null;
    }

    useEffect(() => {
        getBestScore()
    }, [])

    const ModalRank = () => {
        return (
            <Modal onClose={() => { onClose() }} isOpen={isOpen} size="xl">
                <Text textAlign={"center"}>
                    <Text
                        textAlign={"center"}
                        fontSize={"34px"}
                        fontWeight={"bold"}
                        color={"white"}
                        padding={4}
                    >
                        LeaderBoard
                    </Text>
                    <Text padding={4} pb={8}>Em desenvolvimento</Text>
                    <Button width={"100%"} onClick={() => { onClose() }}>Sair</Button>
                </Text>
            </Modal>
        )
    }

    const ModalHowToPLay = () => {
        return (
            <Modal onClose={() => { onCloseHtp() }} isOpen={isOpenHtp} size="xl">
                <Flex
                    maxHeight={"600px"}
                    overflow={"auto"}
                    alignItems={"center"}
                    flexDir={"column"}
                    width={"100%"}
                    pr={4}
                    pb={4}
                >
                    <Text
                        width={"100%"}
                        textAlign={"center"}
                        fontSize={"34px"}
                        fontWeight={"bold"}
                        color={"white"}
                        padding={4}
                    >
                        Como jogar?
                    </Text>
                    <Text
                        backgroundColor={"black"}
                        textAlign={"center"}
                        fontWeight={"bold"}
                        borderRadius={"lg"}
                        fontSize={"24px"}
                        width={"100%"}
                        mb={4}
                        p={4}
                    >
                        1º Passo clique sobre o botão "Jogar"
                    </Text>
                    <Flex width={"100%"} justifyContent={"center"}>
                        <Image src={StartGif} alt="Como jogar" />
                    </Flex>
                    <Text
                        backgroundColor={"black"}
                        textAlign={"center"}
                        fontWeight={"bold"}
                        borderRadius={"lg"}
                        fontSize={"24px"}
                        width={"100%"}
                        my={4}
                        mb={2}
                        p={4}
                    >
                        2º Selecione uma dificuldade
                    </Text>
                    <Text
                        width={"100%"}
                        fontSize={"16px"}
                        backgroundColor={"black"}
                        textAlign={"center"}
                        fontWeight={"bold"}
                        borderRadius={"lg"}
                        my={0}
                        p={4}
                    >
                        Como são classificadas as dificuldades?
                    </Text>
                    <Flex
                        width={"100%"}
                        bgColor={"purple"}
                        fontSize={"14px"}
                        p={4}
                        backgroundColor={"black"}
                        textAlign={"center"}
                        fontWeight={"bold"}
                        borderRadius={"lg"}
                        my={2}
                        mb={4}
                        justifyContent={"center"}
                    >
                        <OrderedList>
                            <ListItem>
                                Nível <span style={{ fontWeight: "bold", color: "green" }}>Fácil</span> você tem 5 chances
                            </ListItem>
                            <ListItem>
                                Nível <span style={{ fontWeight: "bold", color: "orange" }}>Médio</span> você tem 3 chances
                            </ListItem>
                            <ListItem>
                                Nível <span style={{ fontWeight: "bold", color: "red" }}>Difícil</span> você tem 1 chance
                            </ListItem>
                        </OrderedList>
                    </Flex>
                    <Flex width={"100%"} justifyContent={"center"} >
                        <Image src={DifficultGif} alt="Como jogar" />
                    </Flex>
                    <Text
                        backgroundColor={"black"}
                        textAlign={"center"}
                        fontWeight={"bold"}
                        borderRadius={"lg"}
                        fontSize={"24px"}
                        width={"100%"}
                        my={4}
                        mb={2}
                        p={4}
                    >
                        3º Jogando
                    </Text>
                    <Text
                        width={"100%"}
                        fontSize={"16px"}
                        backgroundColor={"black"}
                        textAlign={"center"}
                        fontWeight={"bold"}
                        borderRadius={"lg"}
                        my={0}
                        p={4}
                    >
                        As opções na tela estarão disponíveis em 2 formatos aleatórios
                    </Text>
                    <Flex
                        width={"100%"}
                        bgColor={"purple"}
                        fontSize={"14px"}
                        p={4}
                        backgroundColor={"black"}
                        textAlign={"center"}
                        fontWeight={"bold"}
                        borderRadius={"lg"}
                        my={2}
                        mb={4}
                        justifyContent={"center"}
                    >
                        <OrderedList gap={4}>
                            <ListItem>Primeiro formato: é composto por uma bandeira central e 4 opções de resposta, selecionando o nome correto do país pertencente a bandeira.</ListItem>
                            <br />
                            <ListItem>Segundo formato: é o oposto do primeiro, é um nome centralizado com 4 opções de resposta sendo elas bandeiras, na qual você irá escolher a bandeira pertencente ao nome apresentado na tela</ListItem>
                        </OrderedList>
                    </Flex>
                    <Flex width={"100%"} justifyContent={"center"}>
                        <Image src={GameplayGif} alt="Como jogar" />
                    </Flex>

                    <Text
                        backgroundColor={"black"}
                        textAlign={"center"}
                        fontWeight={"bold"}
                        borderRadius={"lg"}
                        fontSize={"24px"}
                        width={"100%"}
                        my={4}
                        mb={2}
                        p={4}
                    >
                        Extra 1: Você pode reiniciar o jogo
                    </Text>
                    <Text
                        width={"100%"}
                        fontSize={"16px"}
                        backgroundColor={"black"}
                        textAlign={"center"}
                        fontWeight={"bold"}
                        borderRadius={"lg"}
                        my={0}
                        mb={2}
                        p={4}
                    >
                        Pressione sobre o botão de recomeçar no canto superior direito
                    </Text>
                    <Flex width={"100%"} justifyContent={"center"}>
                        <Image src={RestartGif} alt="Como jogar" />
                    </Flex>
                    <Text
                        backgroundColor={"black"}
                        textAlign={"center"}
                        fontWeight={"bold"}
                        borderRadius={"lg"}
                        fontSize={"24px"}
                        width={"100%"}
                        my={4}
                        mb={2}
                        p={4}
                    >
                        Extra 2: Botão de sair
                    </Text>
                    <Text
                        width={"100%"}
                        fontSize={"16px"}
                        backgroundColor={"black"}
                        textAlign={"center"}
                        fontWeight={"bold"}
                        borderRadius={"lg"}
                        my={0}
                        mb={2}
                        p={4}
                    >
                        Na versão Desktop você tem a opção de acessar o menu inicial rapidamente pressionando a tecla ESC
                    </Text>
                    <Flex width={"100%"} justifyContent={"center"}>
                        <Image src={ExitGif} alt="Como jogar" />
                    </Flex>
                    <Text
                        backgroundColor={"black"}
                        textAlign={"center"}
                        fontWeight={"bold"}
                        borderRadius={"lg"}
                        fontSize={"24px"}
                        width={"100%"}
                        my={4}
                        mb={2}
                        p={4}
                    >
                        Agora você sabe como jogar! 😎
                    </Text>
                </Flex>
            </Modal>
        )
    }

    return (
        <Flex
            w={"100%"}
            h={"100vh"}
            background={"radial-gradient(ellipse at top, #662222, transparent),radial-gradient(ellipse at bottom, #150303, transparent);"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDir={"column"}
        >
            <Head>
                <title>Flags</title>
            </Head>
            <ModalRank />
            <ModalHowToPLay />
            <Flex mb={8} pos={"relative"} flexDir={"column"}>
                <Image src={"/my-flag-white.svg"} width={60} height={60} alt="flag" style={{ position: "absolute", zIndex: "0", left: "55px", top: "-25px" }} />
                <Text
                    textAlign={"center"}
                    fontSize={"54px"}
                    fontWeight={"bold"}
                    zIndex={"1"}
                    color={"white"}
                >
                    Flags
                </Text>
            </Flex>
            <Flex pb={8}>
                {
                    bestScore &&
                    <Flex>
                        <label>
                            Parabéns! sua melhor pontuação foi de: <span style={{ color: "green", fontWeight: "bold" }}>{bestScore}</span>
                        </label>
                    </Flex>
                }
            </Flex>
            {
                !isPlay
                    ?
                    <Flex direction="column" justifyContent={"center"} alignItems={"center"} gap={4} width={"90%"} maxW={"600px"}>
                        <Button width={"100%"} p={"20px"} variant="solid" onClick={() => { setIsPlay(!isPlay) }}>
                            Jogar
                        </Button>
                        <Button width={"100%"} p={"20px"} variant="solid" onClick={() => { onOpenHtp() }}>
                            <label style={{ width: "100%", cursor: "pointer" }}>Como jogar</label>
                        </Button>
                        <Button width={"100%"} p={"20px"} variant="solid" onClick={() => { onOpen() }}>
                            <label style={{ width: "100%", cursor: "pointer" }}>LeaderBoard</label>
                        </Button>
                        <Flex width={"100%"} bgColor={"#000000"} p={"8px 24px"} borderRadius={"lg"} _hover={{ backgroundColor: "#1a1a1a" }}>
                            <a href="https://github.com/AlehSouza" target="_blank" rel="noopener noreferrer" style={{ width: "100%", textAlign: "center", fontWeight: "bold" }}>
                                Meu Github
                            </a>
                        </Flex>
                    </Flex>
                    :
                    <Flex direction="column" gap={4} width={"90%"} maxW={"600px"}>
                        <Button
                            colorScheme="green"
                            variant="solid"
                            onClick={() => {
                                setGamesDificulty(
                                    "Fácil",
                                    5,
                                    [true, true, true, true, true]
                                )
                            }}>
                            <label style={{ width: "100%", cursor: "pointer" }}>Fácil</label>
                        </Button>
                        <Button
                            colorScheme="yellow"
                            variant="solid"
                            onClick={() => {
                                setGamesDificulty(
                                    "Médio",
                                    3,
                                    [true, true, true]
                                )
                            }}>
                            <label style={{ width: "100%", cursor: "pointer" }}>Médio</label>
                        </Button>
                        <Button
                            colorScheme="red"
                            variant="solid"
                            onClick={() => {
                                setGamesDificulty(
                                    "Difícil",
                                    1,
                                    [true]
                                )
                            }}>
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