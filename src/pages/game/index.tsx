import { useEffect, useState } from 'react';
import { useFlagGame } from '../../contexts/FlagGameContext';
import { useRouter } from 'next/router';
import { Box, Button, Flex, Text, layout, useDisclosure } from '@chakra-ui/react';
import Head from "next/head";
import { api } from '@/services';
import shuffle from '@/helpers/shuffle';
import Image from 'next/image';
import { FlagA, FlagB, Modal } from '@/components';

const Index = () => {

    // #TODO arrumar todos os ANY'S
    const [countries, setCountries] = useState<any>([])
    const [selectedCountry, setSelectedCountry] = useState<any>()
    const [puzzleCountries, setPuzzleCountries] = useState<any>([])
    const [layoutAB, setLayoutAB] = useState(false)
    const [points, setPoints] = useState(0)
    const { gameConfig, setGameConfig } = useFlagGame();
    const router = useRouter()

    const {
        isOpen,
        onOpen,
    } = useDisclosure()



    useEffect(() => {
        gameConfig.difficulty === '' ? router.push('/') : null
        getCountries()
    }, [])

    const sortTheme = () => {
        const sort = Math.floor(Math.random() * 10) + 1;
        if (sort % 2 === 0) {
            return true
        }
        return false
    }

    const getCountries = async () => {
        // Tipar no finals
        try {
            const { data } = await api.get<{}[]>('/all')
            setCountries(shuffle(data))
        } catch (e) {
            console.error(e)
        }
    }

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

        onOpen()
        // alert(`Fim de jogo, sua pontuação ${points}, a resposta correta era ${selectedCountry.name.common}, ou a opção ${index}`)
        // router.push('/')
    }

    useEffect(() => {
        selectNewCountry()
    }, [countries])

    const ModalLose = () => {
        const correctPosFlagIndex = puzzleCountries.findIndex((country: any) => {
            return country?.name?.common === selectedCountry?.name?.common;
        });

        return (
            <Modal isOpen={isOpen} size='xl'>
                <Flex
                    alignItems={'center'}
                    flexDir={'column'}
                >
                    <Text fontSize={'32px'} fontWeight={'bold'} pb={8}>
                        Fim de jogo!
                    </Text>
                    <Text pb={8}>
                        {
                            layoutAB
                                ? <span>A resposta correta era a <Text as="b" color={'yellowgreen'}>{selectedCountry?.name?.common}</Text></span>
                                : <span>A bandeira correta para <Text as="b" color={'yellowgreen'}>{selectedCountry?.name?.common}</Text>, era a opção de nº <span style={{ color: 'yellowgreen' }}>{correctPosFlagIndex + 1}</span></span>
                        }

                    </Text>
                    {
                        !layoutAB &&
                        <Box
                            width={'200px'}
                            height={'100px'}
                            backgroundImage={`${selectedCountry?.flags?.svg}`}
                            backgroundSize={'100% 100%'}
                            backgroundPosition={'center'}
                            mb={8}
                        />
                    }
                    <Text pb={8}>
                        Sua pontuação foi de <span style={{ color: 'yellowgreen' }}>{points}</span> pontos!
                    </Text>
                    <Button width={'100%'} mb={'16px'} onClick={() => { router.push('/') }}>Voltar ao menu </Button>
                </Flex>
            </Modal>
        )
    }

    return (
        <Flex
            w={"100%"}
            h={{
                base: 'auto',
                lg: '100vh',
                md: 'autp',
                sm: 'auto'
            }}
            minH={{ base: '100vh' }}
            padding={'20px'}
            paddingTop={'100px'}
            paddingBottom={'50px'}
            flexDir={"column"}
            background={'radial-gradient(ellipse at top, #662222, transparent),radial-gradient(ellipse at bottom, #150303, transparent);'}
            alignItems={"center"}
        >
            <ModalLose />
            <Head>
                <title>Flag Game</title>
            </Head>
            <Flex
                borderRadius={'lg'}
                color={'black'}
                padding={'14px'}
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
                    color={'white'}
                >
                    Acertos <span style={{ color: 'green', paddingLeft: '10px' }}>{points}</span>
                </Text>
            </Flex>
            {
                layoutAB
                    ? <FlagA selectedCountry={selectedCountry} puzzleCountries={puzzleCountries} guessFlag={guessFlag} />
                    : <FlagB selectedCountry={selectedCountry} puzzleCountries={puzzleCountries} guessFlag={guessFlag} />
            }

        </Flex>
    );
}

export default Index