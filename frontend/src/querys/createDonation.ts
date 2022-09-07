export const CreateDonation = `
  mutation Mutation($createDonationInput: CreateDonationInput!) {
    createDonation(createDonationInput: $createDonationInput) {
      count
      createdAt
      id
    }
  }
`
