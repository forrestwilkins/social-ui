export const USER_SUMMARY = `
  fragment UserSummary on User {
    id
    name
    email
    bio
    createdAt
    updatedAt
  }
`;

export const USER_MUTATION_SUMMARY = `
  fragment UserMutationSummary on User {
    id
    name
    email
    bio
  }
`;
