/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient as createWsClient } from "graphql-ws"
import { createClient, subscriptionExchange, defaultExchanges } from "urql"

const wsClient = createWsClient({
  url: "ws://localhost:8000/graphql",
})

const client = createClient({
  url: "http://localhost:8000/graphql",
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

export { client }
