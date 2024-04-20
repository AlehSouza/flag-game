import { Flex, Text } from "@chakra-ui/react"

type IProps = {
    selectedCountry: any,
    puzzleCountries: any,
    guessFlag: (name: string) => void,
}

const Index = ({ selectedCountry, puzzleCountries, guessFlag }: IProps) =>{
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
                    base: '2.25rem',
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
                mb={20}
            >
                <Text
                    fontSize={'3.25rem'}
                    fontWeight={'bold'}
                    color={'greenyellow'}
                    textAlign={'center'}
                >
                    {selectedCountry?.name?.common}
                </Text>
            </Flex>
            <Flex
                width={{
                    base: 'auto',
                    lg: '1000px',
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
    )
}

export default Index