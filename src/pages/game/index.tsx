import { useEffect, useState } from 'react';
import { Box, Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { useFlagGame } from '../../contexts/FlagGameContext';
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import { FlagA, FlagB, Modal } from '@/components';
import { useRouter } from 'next/router';
import { api } from '@/services';
import shuffle from '@/helpers/shuffle';
import Head from "next/head";

const Index = () => {
    // #TODO arrumar todos os ANY'S

    // Configurações do game
    const { gameConfig, setGameConfig } = useFlagGame();

    // Configurações do layout
    const [layoutAB, setLayoutAB] = useState(false)

    // Todos os paises disponíveis, País selecionado, Países opções
    const [countries, setCountries] = useState<any>([])
    const [selectedCountry, setSelectedCountry] = useState<any>()
    const [puzzleCountries, setPuzzleCountries] = useState<any>([])

    // Acertos e erros
    const [lifes, setLifes] = useState(gameConfig.maxLifes)
    const [points, setPoints] = useState(0)
    const [myFails, setMyFails] = useState(0)
    const [maxFails, setMaxFails] = useState(gameConfig.maxFails)

    // Ação de atualizar as vidas
    const lifeUpdate = () => {
        const draftLifes = lifes
        draftLifes[myFails] = false
        setLifes(draftLifes)
    }

    // Helper Router
    const router = useRouter()

    // Configurações do Modal de Derrota
    const {
        isOpen,
        onOpen,
        onClose
    } = useDisclosure()

    // Verificação inicial
    useEffect(() => {
        gameConfig.difficulty === '' ? router.push('/') : null
        getCountries()
    }, [])

    // Ação inicial ao receber dados da Api
    useEffect(() => {
        selectNewCountry()
    }, [countries])

    // Sorteia o tema para o jogo
    const sortTheme = () => {
        const sort = Math.floor(Math.random() * 10) + 1;
        if (sort % 2 === 0) {
            return true
        }
        return false
    }

    // Busca os países na Api
    const getCountries = async () => {
        // Tipar no finals
        try {
            const { data } = await api.get<{}[]>('/all')
            setCountries(shuffle(data))
        } catch (e) {
            console.error(e)
        }
    }

    // Seleciona 1 país aleatório e 3 opções aleatórias
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

    // Atualiza score do jogador
    const updateBestScore = (newScore: any) => {
        if (typeof window !== 'undefined') {
            const bestScore = localStorage.getItem('best-score-point');
            if (!bestScore || newScore > parseInt(bestScore)) {
                localStorage.setItem('best-score-point', newScore);
            }
        }
    }

    // Ação de tentativa de adivinhar a bandeira
    const guessFlag = (name: string) => {
        if (name === selectedCountry?.name?.common) {
            selectNewCountry()
            setPoints((points + 1))
            return
        }
        lifeUpdate()
        setMyFails((myFails + 1))
        selectNewCountry()
        updateBestScore(points)
    }

    // Ação de reiniciar o jogo
    const tryAgain = () => {
        const newLifes = lifes.map((life: any) => {
            const newItem = !life
            return newItem
        })
        setLifes(newLifes)
        selectNewCountry()
        setPoints(0)
        setMyFails(0)
        onClose()
    }

    // Verificação pra quando o usuário atingir maximo de erros, encerrar o jogo
    useEffect(() => {
        if (myFails === maxFails) {
            onOpen()
            return
        }
    }, [myFails])

    // Modal de encerramento do jogo
    const ModalLose = () => {
        const correctPosFlagIndex = puzzleCountries.findIndex((country: any) => {
            return country?.name?.common === selectedCountry?.name?.common;
        });

        return (
            <Modal onClose={() => { }} isOpen={isOpen} size='xl'>
                <Flex
                    alignItems={'center'}
                    flexDir={'column'}
                >
                    <Text fontSize={'32px'} fontWeight={'bold'} pb={8}>
                        Fim de jogo!
                    </Text>
                    <Text pb={8} textAlign={'center'}>
                        {
                            layoutAB
                                ? <span>A resposta correta era a <Text as="b" color={'yellowgreen'}>{selectedCountry?.translations?.por?.common}</Text></span>
                                : <span>A bandeira correta para <Text as="b" color={'yellowgreen'}>{selectedCountry?.translations?.por?.common}</Text>, era a opção de nº <span style={{ color: 'yellowgreen' }}>{correctPosFlagIndex + 1}</span></span>
                        }

                    </Text>
                    {
                        !layoutAB &&
                        <Box
                            width={'240px'}
                            height={'130px'}
                            backgroundImage={`${selectedCountry?.flags?.svg}`}
                            backgroundSize={'100% 100%'}
                            backgroundPosition={'center'}
                            mb={8}
                        />
                    }
                    <Text pb={8}>
                        Sua pontuação foi de <span style={{ color: 'yellowgreen' }}>{points}</span> pontos!
                    </Text>
                    <Button width={'100%'} mb={'16px'} onClick={() => { tryAgain() }}>Tentar novamente </Button>
                    <Button width={'100%'} mb={'16px'} onClick={() => { router.push('/') }}>Voltar ao menu </Button>
                </Flex>
            </Modal>
        )
    }

    // DOM do Jogo
    return (
        <Flex
            w={"100%"}
            h={{
                base: 'auto',
                lg: '100vh',
                md: 'auto',
                sm: 'auto'
            }}
            minH={{ base: '100vh' }}
            padding={'25px'}
            paddingBottom={'50px'}
            flexDir={"column"}
            background={'radial-gradient(ellipse at top, #662222, transparent),radial-gradient(ellipse at bottom, #150303, transparent);'}
            alignItems={"center"}
        >
            <Head>
                <title>Flags</title>
            </Head>
            <ModalLose />
            <Flex
                width={'100%'}
                padding={'20px'}
                justifyContent={'flex-end'}
                flexDir={'row-reverse'}
            >
                {
                    lifes.map((heart: any, key: number) => {
                        return (
                            <Flex key={key} p={2}>
                                {
                                    heart
                                        ? <FaHeart fontSize={'24px'} color="#ff3333" />
                                        : <FaHeartBroken fontSize={'24px'} color="grey" />
                                }
                            </Flex>
                        )
                    })
                }
            </Flex>
            <Flex
                borderRadius={'lg'}
                padding={'14px'}
                color={'black'}
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