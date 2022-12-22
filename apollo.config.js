require("dotenv").config();

module.exports = {
  client: {
    service: {
      name: "social-api",
      url: `${process.env.API_URL}/graphql`,
    },
    excludes: ["**/gen.ts"],
  },
};
