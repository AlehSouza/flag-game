import React, { useState } from "react";
import Image from "next/image";
import { useFlagGame } from "@/contexts/FlagGameContext";
import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
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
            bgColor={"#363239"}
            flexDir={"column"}
            justifyContent={"center"}
            alignItems={"center"}
        >
            <Head>
                <title>Flag Game</title>
            </Head>
            <Box mb={8}>
                <Text
                    textAlign={'center'}
                    fontSize={'54px'}
                >
                    Flags
                </Text>
                <Image src={"https://i.makeagif.com/media/5-13-2016/u0hGWG.gif"} width={200} height={200} alt="logo" />
            </Box>
            {
                !isPlay
                    ? <Stack direction="column" spacing={4} width={"90%"} maxW={"600px"}>
                        <Button variant="solid" onClick={() => setIsPlay(!isPlay)}>
                            <label style={{ width: "100%", cursor: "pointer" }}>Jogar</label>
                        </Button>
                        <Button variant="solid">
                            <label style={{ width: "100%", cursor: "pointer" }}>Sobre</label>
                        </Button>
                        <Button variant="solid">
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