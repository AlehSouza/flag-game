import { Box, Flex } from "@chakra-ui/react"
import flags from "@/helpers/flags"

const Index = () => {
    return (
        <>
            <Box width={'100%'} position={'absolute'} top={'0'}>
                {/* That's not a error, juts a react cry because marquee it's supremacy. */}
                <marquee>
                    <Flex>
                        {
                            flags.map((flag, index) => {
                                return (
                                    <Flex p={'4'} key={index}>
                                        {flag}
                                    </Flex>
                                )
                            })
                        }
                    </Flex>
                </marquee>
            </Box>
            <Box width={'100%'} position={'absolute'} bottom={'0'}>
                {/* That's not a error, juts a react cry because marquee it's supremacy. */}
                <marquee direction={'right'}>
                    <Flex>
                        {
                            flags.map((flag, index) => {
                                return (
                                    <Flex p={'4'} key={index}>
                                        {flag}
                                    </Flex>
                                )
                            })
                        }
                    </Flex>
                </marquee>
            </Box>
        </>
    )
}

export default Index