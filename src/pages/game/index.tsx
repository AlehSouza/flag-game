import { useEffect, useState } from 'react';
import { useFlagGame } from '../../contexts/FlagGameContext';
import { useRouter } from 'next/router';
import { Box, Button, Flex, Text, layout } from '@chakra-ui/react';
import Head from "next/head";
import { api } from '@/services';
import Image from 'next/image';

const Index = () => {
    const [countries, setCountries] = useState<any>([])
    const [selectedCountry, setSelectedCountry] = useState<any>()
    const [puzzleCountries, setPuzzleCountries] = useState<any>([])
    const [layoutAB, setLayoutAB] = useState(false)
    const [points, setPoints] = useState(0)
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

    const sortTheme = () => {
        const sort = Math.floor(Math.random() * 10) + 1;
        if (sort % 2 === 0) {
            return true
        }
        return false
    }

    useEffect(() => {
        if (layoutAB) {
            console.log('sou verdadeiro mudei de layout =)')
        }
    }, [layoutAB])

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
            setSelectedCountry(draft[0])
            setPuzzleCountries(shuffle(draft))
            setLayoutAB(sortTheme())
        } catch (e) {
            console.error(e)
        }
    }

    const guessFlag = (name: string) => {
        if (name === selectedCountry?.name?.common) {
            selectNewCountry()
            setPoints((points + 1))
            return
        }
        alert(`Infelizmente você foi de caixa viu, forte abraço, sua pontuação foi de ${points}`)
        router.push('/')
    }

    useEffect(() => {
        selectNewCountry()
    }, [countries])

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
            <Flex
                backgroundColor={'white'}
                borderRadius={'lg'}
                color={'black'}
                padding={'20px'}
                position={'fixed'}
                top={'20px'}
                width={'100%'}
                maxWidth={'200px'}
            >
                <Text
                    textAlign={'center'}
                    fontWeight={'bold'}
                    width={'100%'}
                    fontSize={'1.25rem'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    display={'flex'}
                >
                    Pontuação: <span style={{ color: 'red', paddingLeft: '10px' }}>{points}</span>
                </Text>
            </Flex>
            {
                layoutAB ?
                    <Flex
                        justifyContent={'center'}
                        alignItems={'center'}
                        flexDir={'column'}
                    >
                        <Text
                            pb={16}
                            fontSize={'3.25rem'}
                        >
                            Que país é esse?
                        </Text>
                        {/* FLAG */}
                        <Flex
                            minW={'550px'}
                            minH={'300px'}
                            justifyContent={'center'}
                            alignItems={'center'}
                            backgroundImage={`${selectedCountry?.flags?.svg}`}
                            backgroundSize={'100% 100%'}
                            backgroundPosition={'center'}
                            mb={16}
                        />
                        {/* FLAG */}
                        <Flex
                            width={'800px'}
                            flexDirection={'row'}
                            flexWrap={'wrap'}
                            justifyContent={'center'}
                            alignItems={'center'}
                            gap={'20px'}
                        >
                            {
                                puzzleCountries.length > 0 &&
                                puzzleCountries.map((puzzleCountry: any, index: any) => {
                                    return (
                                        <Box key={index} width={'46%'}>
                                            <Button p={'40px'} w={'100%'} onClick={() => { guessFlag(puzzleCountry.name.common) }}>
                                                {puzzleCountry?.name?.common}
                                            </Button>
                                        </Box>
                                    )
                                })
                            }
                        </Flex>
                    </Flex>
                    : <Flex
                        justifyContent={'center'}
                        alignItems={'center'}
                        flexDir={'column'}
                    >
                        <Text
                            pb={20}
                            fontSize={'3.25rem'}
                        >
                            Qual é a bandeira do país...?
                        </Text>
                        {/* FLAG */}
                        <Flex
                            justifyContent={'center'}
                            alignItems={'center'}
                            backgroundSize={'100% 100%'}
                            backgroundPosition={'center'}
                            borderRadius={'lg'}
                            mb={20}
                        >
                            <Text
                                fontSize={'3.25rem'}
                                fontWeight={'bold'}
                                color={'greenyellow'}
                            >
                                {selectedCountry?.name?.common}
                            </Text>
                        </Flex>
                        {/* FLAG */}
                        <Flex
                            width={'1000px'}
                            flexDirection={'row'}
                            flexWrap={'wrap'}
                            justifyContent={'center'}
                            alignItems={'center'}
                            gap={'20px'}
                        >
                            {
                                puzzleCountries.length > 0 &&
                                puzzleCountries.map((puzzleCountry: any, index: any) => {
                                    return (
                                        // <Box key={index} width={'46%'}>
                                        //     <Button p={'40px'} w={'100%'} onClick={() => { guessFlag(puzzleCountry.name.common) }}>
                                        //         {puzzleCountry?.name?.common}
                                        //     </Button>
                                        // </Box>
                                        <button key={index} onClick={() => { guessFlag(puzzleCountry.name.common) }}>
                                            <Flex
                                                minW={'200px'}
                                                minH={'100px'}
                                                justifyContent={'center'}
                                                alignItems={'center'}
                                                backgroundImage={`${puzzleCountry?.flags?.svg}`}
                                                backgroundPosition={'center'}
                                                backgroundSize={'cover'}
                                                borderRadius={'lg'}
                                            />
                                        </button>
                                    )
                                })
                            }
                        </Flex>
                    </Flex>
            }
        </Flex>
    );
}

export default Index