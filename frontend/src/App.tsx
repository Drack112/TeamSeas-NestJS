import "./components/donation/fonts"

import * as React from "react"
import { ChakraProvider, Box, Text, VStack, Grid, Heading, extendTheme } from "@chakra-ui/react"

import { Logo } from "./Logo"
import { Counter } from "./components/donation/Counter"

const theme = extendTheme({
  fonts: {
    heading: "Montserrat",
    body: "Montserrat",
  },
})

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign='center' fontSize='xl'>
      <Grid minH='100vh' p={3}>
        <VStack spacing={8}>
          <Logo h='32' pointerEvents='none' />
          <Heading>JOIN IN THE MOVEMENT!</Heading>;
          <Text>
            The team is growing everyday and scoring wins for the planet.
            <br /> Remove trash with us and track our progress!
          </Text>
          <Heading as='h2' size='4xl'>
            <Counter from={0} to={42545} />
          </Heading>
        </VStack>
      </Grid>
    </Box>
  </ChakraProvider>
)
