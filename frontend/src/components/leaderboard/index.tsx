/* eslint-disable react/jsx-key */
import { Box, Heading, Stack, VStack } from "@chakra-ui/layout"
import { Radio, RadioGroup } from "@chakra-ui/react"
import React, { useState } from "react"
import { useQuery } from "urql"

import { Donation } from "../../interfaces/Donation"
import { DonationsQuery } from "../../querys"
import { LeaderboardItem } from "./LeaderBoardItem"

type DonationsQueryRes = {
  donations: Donation[]
}

export const Leaderboard = () => {
  const [field, setOrderByField] = useState("createdAt")

  const [{ data, fetching, error }] = useQuery<DonationsQueryRes>({
    query: DonationsQuery,
    variables: {
      orderBy: {
        field,
        direction: "desc",
      },
    },
  })

  if (error) return <p>Something went wrong...</p>
  if (fetching || !data) return <p>Loading...</p>

  return (
    <Box w='100%'>
      <VStack spacing={4}>
        <Heading as='h1' size='2xl'>
          LEADERBOARD
        </Heading>

        <RadioGroup onChange={setOrderByField} value={field}>
          <Stack direction='row'>
            <Radio value='createdAt'>Most Recent</Radio>
            <Radio value='count'>Most Pounds</Radio>
          </Stack>
        </RadioGroup>

        {data.donations.map((donation) => (
          <LeaderboardItem donation={donation} />
        ))}
      </VStack>
    </Box>
  )
}
