export const DonationsQuery = `
    query Query($orderBy: OrderByParams) {
        donations(orderBy: $orderBy) {
            count
            id
            displayName
            email
            createdAt
            message
            team
        }
    }
`
