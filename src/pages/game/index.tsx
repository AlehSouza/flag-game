import { FlagA, FlagB, Modal } from '@/components';
import shuffle from '@/helpers/shuffle';
import { api } from '@/services';
import { Box, Button, Flex, Text, useDisclosure, useToast } from '@chakra-ui/react';
import Head from "next/head";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaHeart, FaHeartBroken, FaUndoAlt } from "react-icons/fa";
import { useFlagGame } from '../../contexts/FlagGameContext';

const Index = () => {
    // #TODO arrumar todos os ANY'S

    // Configurações do game
    const { gameConfig } = useFlagGame();

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

    // Helpers
    const router = useRouter()
    const toast = useToast()

    // Configurações do Modal de Derrota e Restart e Exit
    const {
        isOpen,
        onOpen,
        onClose
    } = useDisclosure()

    const {
        isOpen: isOpenExit,
        onOpen: onOpenExit,
        onClose: onCloseExit,
    } = useDisclosure()

    const {
        isOpen: isOpenRestart,
        onOpen: onOpenRestart,
        onClose: onCloseRestart,
    } = useDisclosure()

    // Verificação inicial
    useEffect(() => {
        gameConfig.difficulty === '' ? router.push('/') : null
        getCountries()
        const handleKeyPress = (event: any) => {
            if (event.key === 'Escape') {
                onOpenExit()
            }
        };
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
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
            const { data } = await api.get<{}[]>('')
            setCountries(shuffle(data))
        } catch (e) {
            toast({
                title: 'Erro de conexão',
                description: "Parece que a sua conexão esta instável, tente novamente",
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
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
        updateBestScore(points)
    }

    // Verificação pra quando o usuário atingir maximo de erros, encerrar o jogo
    useEffect(() => {
        if (myFails === maxFails) {
            onOpen()
            return
        }
        if (myFails != 0) {
            toast({
                duration: 3500,
                position: window.innerWidth > 1200 ? 'bottom-right' : 'top',
                render: () => (
                    <ToastContainer />
                ),
            })
        }
        selectNewCountry()
    }, [myFails])

    // Ação de reiniciar o jogo
    const tryAgain = () => {
        const newLifes = lifes.map((life: any) => {
            const newItem = true
            return newItem
        })
        setLifes(newLifes)
        selectNewCountry()
        setPoints(0)
        setMyFails(0)
        onClose()
    }

    // Toast de erro
    const ToastContainer = () => {
        const correctPosFlagIndex = puzzleCountries.findIndex((country: any) => {
            return country?.name?.common === selectedCountry?.name?.common;
        });
        return (
            <Flex
                background={'radial-gradient(ellipse at top, #662222, transparent),radial-gradient(ellipse at bottom, #150303, transparent);'}
                borderRadius={'lg'}
                boxShadow={'xl'}
                justifyContent={'center'}
                alignContent={'center'}
                maxWidth={'300px'}
                m={4}
            >
                {
                    layoutAB
                        ?
                        <Flex
                            justifyContent={'center'}
                            alignItems={'center'}
                            flexDir={'column'}
                            textAlign={'center'}
                            p={4}
                        >

                            <Box
                                width={'240px'}
                                height={'130px'}
                                backgroundImage={`${selectedCountry?.flags?.svg}`}
                                backgroundSize={'100% 100%'}
                                backgroundPosition={'center'}
                                my={4}
                            />
                            <Box>
                                <span>A resposta correta era a opção: <Text as="b" color={'yellowgreen'}>{selectedCountry?.name.common}</Text></span>
                            </Box>
                        </Flex>
                        :
                        <Flex
                            justifyContent={'center'}
                            alignItems={'center'}
                            flexDir={'column'}
                            textAlign={'center'}
                            p={4}
                        >
                            <Box>
                                <span>
                                    A bandeira correta para <br />
                                    <Text as="b" color={'yellowgreen'}>{selectedCountry?.name.common}</Text> <br />
                                    era a opção de nº <span style={{ color: 'yellowgreen' }}>{correctPosFlagIndex + 1}</span>
                                </span>
                            </Box>
                            <Box
                                width={'240px'}
                                height={'130px'}
                                backgroundImage={`${selectedCountry?.flags?.svg}`}
                                backgroundSize={'100% 100%'}
                                backgroundPosition={'center'}
                                my={4}
                            />
                        </Flex>
                }
            </Flex >
        )
    }

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
                    <Text fontSize={'32px'} fontWeight={'bold'} pb={4}>
                        Fim de jogo!
                    </Text>
                    <Text pb={4} textAlign={'center'}>
                        {
                            layoutAB
                                ? <span>A resposta correta era a <Text as="b" color={'yellowgreen'}>{selectedCountry?.name.common}</Text></span>
                                : <span>A bandeira correta para <Text as="b" color={'yellowgreen'}>{selectedCountry?.name.common}</Text>, era a opção de nº <span style={{ color: 'yellowgreen' }}>{correctPosFlagIndex + 1}</span></span>
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
                    <Button width={'100%'} onClick={() => { router.push('/') }}>Voltar ao menu </Button>
                </Flex>
            </Modal>
        )
    }

    // Modal Reiniciar o Jogo
    const ModalRestart = () => {
        return (
            <Modal onClose={() => { }} isOpen={isOpenRestart} size='xl'>
                <Flex
                    alignItems={'center'}
                    flexDir={'column'}
                >
                    <Text fontSize={'32px'} fontWeight={'bold'} pb={8} textAlign={'center'}>
                        Tem certeza que você deseja reiniciar?
                    </Text>
                    <Text pb={8} textAlign={'center'}>
                        Você já marcou <span style={{ fontWeight: 'bold', color: 'yellowgreen' }}>{points}</span> pontos e tem  <span style={{ fontWeight: 'bold', color: '#ff3333' }}>{maxFails - myFails}</span> vidas restantes
                    </Text>
                    <Flex width={'100%'} gap={6}>
                        <Button width={'100%'} onClick={() => {
                            tryAgain()
                            onCloseRestart()
                        }}>Reiniciar </Button>
                        <Button width={'100%'} onClick={() => { onCloseRestart() }}>Voltar </Button>
                    </Flex>
                </Flex>
            </Modal>
        )
    }

    // Modal Sair para o Menu inicial
    const ModalExit = () => {
        return (
            <Modal onClose={() => { }} isOpen={isOpenExit} size='xl'>
                <Flex
                    alignItems={'center'}
                    flexDir={'column'}
                >
                    <Text fontSize={'32px'} fontWeight={'bold'} textAlign={'center'}>
                        Deseja sair para o menu princípal?
                    </Text>
                    <Text py={8} textAlign={'center'}>
                        Você marcou <span style={{ fontWeight: 'bold', color: 'yellowgreen' }}>{points}</span> pontos e tem  <span style={{ fontWeight: 'bold', color: '#ff3333' }}>{maxFails - myFails}</span> vidas restantes
                    </Text>
                    <Flex width={'100%'} gap={6}>
                        <Button width={'100%'} onClick={() => {
                            router.push('/')
                        }}>Confirmar </Button>
                        <Button width={'100%'} onClick={() => { onCloseExit() }}>Cancelar </Button>
                    </Flex>
                </Flex>
            </Modal>
        )
    }

    // DOM
    return (
        <Flex
            w={"100%"}
            minH={{
                base: 'auto',
                lg: '100vh',
                md: 'auto',
                sm: 'auto'
            }}
            padding={'25px'}
            paddingBottom={'50px'}
            flexDir={"column"}
            background={'radial-gradient(ellipse at top, #662222, transparent),radial-gradient(ellipse at bottom, #150303, transparent);'}
            alignItems={"center"}
        >
            <Head>
                <title>Flags</title>
            </Head>
            <ModalExit />
            <ModalLose />
            <ModalRestart />
            <Flex
                width={'100%'}
                padding={'20px'}
                justifyContent={'space-between'}
                flexDir={'row-reverse'}
            >
                <Flex
                    overflow={'hidden'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    width={'50px'}
                    height={'50px'}
                    style={{
                        borderRadius: '100px'
                    }}
                >
                    <Button height={'100%'} onClick={() => { onOpenRestart() }}>
                        <FaUndoAlt fontSize={'40px'} color="white" />
                    </Button>
                </Flex>
                <Flex flexDir={'row-reverse'}>
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