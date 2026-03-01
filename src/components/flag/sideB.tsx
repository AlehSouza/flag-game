import { Flex, Text } from "@chakra-ui/react"

type IProps = {
    selectedCountry: any,
    puzzleCountries: any,
    guessFlag: (name: string) => void,
}

const Index = ({ selectedCountry, puzzleCountries, guessFlag }: IProps) => {
    return (
        <Flex
            justifyContent={'center'}
            alignItems={'center'}
            flexDir={'column'}
            flex={1}
            overflow={'hidden'}
            maxH={'calc(100vh - 120px)'}
        >
            <Text
                pb={{ base: 2, lg: 3 }}
                fontSize={{ base: '18px', lg: '22px', xl: '26px' }}
                textAlign={'center'}
                letterSpacing={'1.5px'}
                fontWeight={'bold'}
                width={'auto'}
            >
                Qual é a bandeira deste país?
            </Text>
            <Flex
                justifyContent={'center'}
                alignItems={'center'}
                backgroundSize={'100% 100%'}
                backgroundPosition={'center'}
                borderRadius={'lg'}
                mb={{ base: 2, lg: 3 }}
            >
                <Text
                    fontSize={{ base: '20px', lg: '24px', xl: '28px' }}
                    fontWeight={'bold'}
                    color={'greenyellow'}
                    textAlign={'center'}
                >
                    {selectedCountry?.translations?.por?.common}
                </Text>
            </Flex>
            <Flex
                width={{ base: '95%', md: '90%', lg: '85%', xl: '80%' }}
                maxW={'1000px'}
                flexDirection={'row'}
                flexWrap={'wrap'}
                justifyContent={'center'}
                alignItems={'center'}
                gap={{ base: '8px', lg: '12px' }}
            >
                {
                    puzzleCountries.length > 0 &&
                    puzzleCountries.map((puzzleCountry: any, index: any) => {
                        return (
                            <button
                                key={index}
                                onClick={() => { guessFlag(puzzleCountry.translations.por.common) }}
                                style={{
                                    cursor: 'pointer',
                                    border: '2px solid transparent',
                                    borderRadius: '8px',
                                    transition: 'all 0.2s',
                                    padding: 0
                                }}
                            >
                                <Flex
                                    w={{ base: '40vw', sm: '35vw', md: '30vw', lg: '20vw', xl: '18vw' }}
                                    h={{ base: '15vh', sm: '18vh', md: '20vh', lg: '22vh', xl: '25vh' }}
                                    maxW={'250px'}
                                    maxH={'160px'}
                                    justifyContent={'center'}
                                    alignItems={'center'}
                                    backgroundImage={`${puzzleCountry?.flags?.svg}`}
                                    backgroundPosition={'center'}
                                    backgroundSize={'contain'}
                                    backgroundRepeat={'no-repeat'}
                                    borderRadius={'lg'}
                                    _hover={{ transform: 'scale(1.05)' }}
                                />
                            </button>
                        )
                    })
                }
            </Flex>
        </Flex>
    )
}

export default Index