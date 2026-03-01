import { Box, Button, Flex, Text } from "@chakra-ui/react"

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
                width={'auto'}
                fontWeight={'bold'}
                letterSpacing={'1.5px'}
            >
                Que país é esse?
            </Text>
            <Flex
                width={{ base: '80%', sm: '70%', md: '50%', lg: '30%', xl: '25%' }}
                height={{ base: '20vh', lg: '25vh', xl: '28vh' }}
                maxW={'400px'}
                justifyContent={'center'}
                alignItems={'center'}
                backgroundImage={`${selectedCountry?.flags?.svg}`}
                backgroundSize={'contain'}
                backgroundRepeat={'no-repeat'}
                backgroundPosition={'center'}
                mb={{ base: 3, lg: 4 }}
            />
            <Flex
                width={{ base: '95%', md: '90%', lg: '80%', xl: '70%' }}
                maxW={'900px'}
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
                            <Box key={index} width={{ base: '48%', lg: '48%' }}>
                                <Button
                                    p={{ base: '20px', lg: '25px', xl: '30px' }}
                                    fontSize={{ base: '12px', lg: '14px', xl: '16px' }}
                                    w={'100%'}
                                    h={{ base: '50px', lg: '60px', xl: '70px' }}
                                    whiteSpace={'normal'}
                                    wordBreak={'break-word'}
                                    onClick={() => { guessFlag(puzzleCountry.translations.por.common) }}
                                >
                                    {puzzleCountry?.translations?.por?.common}
                                </Button>
                            </Box>
                        )
                    })
                }
            </Flex>
        </Flex>
    )
}

export default Index 