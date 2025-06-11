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
        >
            <Text
                pb={{
                    base: 16,
                    lg: 16
                }}
                fontSize={{
                    base: '26px',
                }}
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
                mb={10}
            >
                <Text
                    fontSize={{
                        base: '26px',
                    }}
                    fontWeight={'bold'}
                    color={'greenyellow'}
                    textAlign={'center'}
                >
                    {selectedCountry?.name.nativeName.por.common}
                </Text>
            </Flex>
            <Flex
                width={{
                    base: 'auto',
                    lg: '600px',
                    md: '600px',
                }}
                flexDirection={{
                    base: 'column',
                    lg: 'row',
                    md: 'row',
                }}
                flexWrap={'wrap'}
                justifyContent={'center'}
                alignItems={'center'}
                gap={'20px'}
            >
                {
                    puzzleCountries.length > 0 &&
                    puzzleCountries.map((puzzleCountry: any, index: any) => {
                        return (
                            <button key={index} onClick={() => { guessFlag(puzzleCountry.name.nativeName.por.common) }}>
                                <Flex
                                    minW={'280px'}
                                    minH={'150px'}
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
    )
}

export default Index