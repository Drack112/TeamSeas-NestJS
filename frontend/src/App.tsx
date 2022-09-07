import * as React from "react"
import { ChakraProvider, Box, Text, VStack, Grid, theme, Heading } from "@chakra-ui/react"

import { Logo } from "./Logo"

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign='center' fontSize='xl'>
      <Grid minH='100vh' p={3}>
        <VStack spacing={8}>
          <Logo h='32' pointerEvents='none' />
          <Heading>JOIN IN THE MOVEMENT!</Heading>
          <Text>The team is growing everyday and scoring wins</Text>
        </VStack>
      </Grid>
    </Box>
  </ChakraProvider>
)
