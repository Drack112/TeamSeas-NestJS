/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient as createWsClient } from "graphql-ws"
import { createClient, subscriptionExchange, defaultExchanges } from "urql"

const wsClient = createWsClient({
  url: "ws://localhost:4000/graphql",
})

const graphqlClient = createClient({
  url: "http://localhost:4000/graphql",
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: (operation) => ({
        subscribe: (sink: any) => ({
          unsubscribe: wsClient.subscribe(operation, sink),
        }),
      }),
    }),
  ],
})

export { graphqlClient }
