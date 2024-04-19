import { useEffect, useState } from 'react';
import { useFlagGame } from '../../contexts/FlagGameContext';
import { useRouter } from 'next/router';
import { Box, Button, Flex } from '@chakra-ui/react';
import Head from "next/head";
import { api } from '@/services';
import Image from 'next/image';

const Index = () => {
    const [countries, setCountries] = useState([])
    const [selectedCountry, setSelectedCountry] = useState()
    const [puzzleCountries, setPuzzleCountries] = useState([])
    const { gameConfig, setGameConfig } = useFlagGame();
    const router = useRouter()

    useEffect(() => {
        gameConfig.difficulty === '' ? router.push('/') : null
        getCountries()
    }, [])

    const shuffle = (array: any) => {
        let currentIndex = array.length,
            randomIndex;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex],
                array[currentIndex],
            ];
        }
        return array;
    }

    // pega os paises
    const getCountries = async () => {
        // Tipar no final
        try {
            const { data } = await api.get<{}[]>('/all')
            setCountries(shuffle(data))
        } catch (e) {
            console.error(e)
        }
    }

    // seleciona 4 paises aleatorios e 1 selecionado
    const selectNewCountry = async () => {
        setCountries(shuffle(countries))
        try {
            const draft = []
            for (let i = 0; i < 4; i++) {
                draft.push(countries[i])
            }
            console.log(draft[0])
            console.log(draft)


            setSelectedCountry(draft[0])
            setPuzzleCountries(shuffle(draft))
        } catch (e) {
            console.error(e)
        }
    }

    const guessFlag = (name: string) => {
        if (name === selectedCountry?.name?.common) {
            selectNewCountry()
            return
        }
        console.log('se fudeu')
    }


    useEffect(() => {
        selectNewCountry()
    }, [countries])


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
            <p>Current difficulty: {gameConfig.difficulty}</p>
            <p>Max attempts: {gameConfig.maxAttempts}</p>
            <p>Time limit: {gameConfig.timeLimit} seconds</p>
            <Flex>
                <Box>
                    <Image src={selectedCountry?.flags?.svg} width={300} height={150} alt='Flag' />
                </Box>
                <Box>
                    {
                        puzzleCountries.length > 0 &&
                        puzzleCountries.map((puzzleCountry: any, index: any) => {
                            console.log('teste')
                            return (
                                <Box key={index}>
                                    <Button onClick={() => { guessFlag(puzzleCountry.name.common) }}>
                                        {puzzleCountry?.name?.common}
                                    </Button>
                                </Box>
                            )
                        })
                    }
                </Box>
            </Flex>
        </Flex>
    );
}

export default Index