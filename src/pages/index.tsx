import React, { useState } from "react";
import Image from "next/image";
import { useFlagGame } from "@/contexts/FlagGameContext";
import { Box, Button, Flex, Stack } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";

const Index = () => {
    const { gameConfig, setGameConfig } = useFlagGame();
    const [isPlay, setIsPlay] = useState(false)
    const router = useRouter()

    const setGamesDificulty = (diff: string) => {
        const draft = {
            ...gameConfig,
            difficulty: diff
        }
        setGameConfig(draft)
        router.push('/game')
    }

    return (
        <Flex
            w={"100%"}
            h={"100vh"}
            bgColor={"#904fff"}
            flexDir={"column"}
            justifyContent={"center"}
            alignItems={"center"}
        >
            <Head>
                <title>Flag Game</title>
            </Head>
            <Box mb={4}>
                <Image src={"https://i.pinimg.com/564x/ce/66/9d/ce669d55c1a115f496af851180cd78f1.jpg"} width={50} height={50} alt="logo" />
            </Box>
            {
                !isPlay
                    ? <Stack direction="column" spacing={4} width={"90%"} maxW={"600px"}>
                        <Button colorScheme="purple" variant="solid" onClick={() => setIsPlay(!isPlay)}>
                            <label style={{ width: "100%", cursor: "pointer" }}>Jogar</label>
                        </Button>
                        <Button colorScheme="purple" variant="solid">
                            <label style={{ width: "100%", cursor: "pointer" }}>Sobre</label>
                        </Button>
                        <Button colorScheme="purple" variant="solid">
                            <label style={{ width: "100%", cursor: "pointer" }}>LeaderBoard</label>
                        </Button>
                        <Button bgColor={'#000000'} _hover={{ backgroundColor: '#1a1a1a' }} variant="solid">
                            <label style={{ width: "100%", cursor: "pointer" }}>
                                Meu Github
                            </label>
                        </Button>
                    </Stack>
                    : <Stack direction="column" spacing={4} width={"90%"} maxW={"600px"}>
                        <Button colorScheme="green" variant="solid" onClick={() => { setGamesDificulty('easy') }}>
                            <label style={{ width: "100%", cursor: "pointer" }}>Fácil</label>
                        </Button>
                        <Button colorScheme="yellow" variant="solid" onClick={() => { setGamesDificulty('medium') }}>
                            <label style={{ width: "100%", cursor: "pointer" }}>Médio</label>
                        </Button>
                        <Button colorScheme="red" variant="solid" onClick={() => { setGamesDificulty('hard') }}>
                            <label style={{ width: "100%", cursor: "pointer" }}>Difícil</label>
                        </Button>
                        <Button bgColor={'#000000'} _hover={{ backgroundColor: '#1a1a1a' }} variant="solid" onClick={() => { setGamesDificulty('impossible') }}>
                            <label style={{ width: "100%", cursor: "pointer" }}>
                                Impossível
                            </label>
                        </Button>
                    </Stack>
            }
        </Flex>
    )
}

export default Index