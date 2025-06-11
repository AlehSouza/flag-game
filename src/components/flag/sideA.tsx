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
        >
            <Text
                pb={{
                    base: 4,
                    lg: 16
                }}
                fontSize={{
                    base: '26px',
                }}
                textAlign={'center'}
                width={'auto'}
                fontWeight={'bold'}
                letterSpacing={'1.5px'}
            >
                Que país é esse?
            </Text>
            <Flex
                width={{
                    base: '100%',
                    lg: '350px',
                    md: '100%',
                    sm: '100%',
                }}
                minH={{
                    base: '230px',
                    lg: '220px',
                    md: '330px',
                    sm: '290px'
                }}
                justifyContent={'center'}
                alignItems={'center'}
                backgroundImage={`${selectedCountry?.flags?.svg}`}
                backgroundSize={'100% 100%'}
                backgroundPosition={'center'}
                mb={16}
            />
            <Flex
                width={{
                    base: 'auto',
                    lg: '800px',
                    md: '700px',
                }}
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
                            <Box key={index} width={{
                                base: '100%',
                                lg: '46%',
                                md: '100%',
                                sm: '100%',
                            }}>
                                <Button p={'40px'} w={'100%'} onClick={() => { guessFlag(puzzleCountry.name.nativeName.por.common) }}>
                                    {puzzleCountry?.name.nativeName.por.common}
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