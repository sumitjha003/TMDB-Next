import type { CodegenConfig } from "@graphql-codegen/cli";
import * as dotenv from "dotenv";
dotenv.config();

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.BACKEND_GRAPHQL_URL ?? "",
  documents: "app/**/*.{tsx,ts}",
  generates: {
    "app/gql/": {
      preset: "client",
      config: {
        useTypeImports: true,
      },
    },
  },
};

export default config;