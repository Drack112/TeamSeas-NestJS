import React from "react"

import { Box, Heading, VStack } from "@chakra-ui/react"
import { LeaderBoardItem } from "./LeaderBoardItem"

export const Leaderboard = () => {
  return (
    <Box w='100%'>
      <Heading>LEADERBOARD</Heading>
      <VStack spacing={4}>
        <LeaderBoardItem
          donation={{
            displayName: "Mr Beast",
            count: 1000,
            createdAt: "oof",
            team: "test",
            message: "Lesgo",
          }}
        />
      </VStack>
    </Box>
  )
}
