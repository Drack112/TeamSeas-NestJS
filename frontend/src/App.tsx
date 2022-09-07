import "./components/donation/fonts"

import * as React from "react"
import { ChakraProvider, Box, Text, VStack, Grid, Heading, extendTheme } from "@chakra-ui/react"
import { useQuery, useSubscription } from "urql"

import { TotalDonationsQuery, TotalUpdatedQuery } from "./querys"
import { Logo } from "./Logo"
import { Counter } from "./components/donation/Counter"
import { Leaderboard } from "./components/leaderboard"

const theme = extendTheme({
  fonts: {
    heading: "Montserrat",
    body: "Montserrat",
  },
})

const handleSubscription = (previous: any, newTotal: any) => {
  return newTotal?.totalUpdated.total
}

export const App = () => {
  const [res] = useSubscription({ query: TotalUpdatedQuery }, handleSubscription)
  const [{ data, fetching, error }] = useQuery({
    query: TotalDonationsQuery,
  })

  if (fetching) return <p>Loading</p>
  if (error) return <p>Oh no... {error.message}</p>

  return (
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
              <Counter from={0} to={res.data || data.totalDonations} />
            </Heading>
            <Leaderboard />
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  )
}
