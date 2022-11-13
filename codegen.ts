import { CodegenConfig } from "@graphql-codegen/cli";
require("dotenv").config();

const config: CodegenConfig = {
  schema: `${process.env.API_URL}/graphql`,
  documents: ["src/**/*.{tsx,ts}"],
  ignoreNoDocuments: true,

  generates: {
    "./src/types/generated.types.ts": {
      plugins: [
        {
          add: {
            content: `
              // THIS FILE IS GENERATED, DO NOT EDIT

              /* eslint-disable */
            `,
          },
        },
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withHooks: true,
      },
    },
  },
};

export default config;
