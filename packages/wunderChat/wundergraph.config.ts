import {
  Application,
  authProviders,
  configurePublishWunderGraphAPI,
  configureWunderGraphApplication,
  cors,
  introspect,
  templates,
} from "@wundergraph/sdk";
import wunderGraphHooks from "./wundergraph.hooks";
import operations from "./wundergraph.operations";
import "dotenv/config";

/*
uncomment this section to create an API from multiple federated GraphQL upstreams

const federatedApi = introspect.federation({
    upstreams: [
        {
            url: "http://localhost:4001/graphql"
        },
        {
            url: "http://localhost:4002/graphql"
        },
        {
            url: "http://localhost:4003/graphql"
        },
        {
            url: "http://localhost:4004/graphql",
            // You can use headers to securely communicate with GraphQL upstreams
            headers: builder => builder
                // add a static Header to all upstream Requests
                .addStaticHeader("AuthToken","staticToken")
                // forward the client Request header Authorization to the upstream request using the same Header name
                .addClientRequestHeader("Authorization","Authorization")
        },
    ]
});
*/

/*
uncomment this section to create an API from an OpenAPI Specification

const openAPI = introspect.openApi({
    source: {
        kind: "file",
        filePath: "my_api_oas.json"
    },
    headers: builder => builder
        // add a static Header to all upstream Requests
        .addStaticHeader("AuthToken","staticToken")
        // forward the client Request header Authorization to the upstream request using the same Header name
        .addClientRequestHeader("Authorization","Authorization")
});
*/

/*
uncomment this section to create an API from a GraphQL upstream

const graphQLAPI = introspect.graphql({
    url: "http://localhost:4000",
    headers: builder => builder
        // add a static Header to all upstream Requests
        .addStaticHeader("AuthToken","staticToken")
        // forward the client Request header Authorization to the upstream request using the same Header name
        .addClientRequestHeader("Authorization","Authorization")
});*/

const usersDb = introspect.postgresql({
  apiNamespace: "usersDb",
  databaseURL: "postgresql://admin:admin@localhost:5432/livechat?schema=public",
});

const myApplication = new Application({
  name: "app",
  apis: [
    usersDb,
    /*federatedApi,
        openAPI,
        graphQLAPI*/
  ],
});

// configureWunderGraph emits the configuration
configureWunderGraphApplication({
  application: myApplication,
  hooks: wunderGraphHooks.config,
  operations,
  security: {
    allowedHosts: ["api.live.chat.local"],
  },
  authentication: {
    cookieBased: {
      providers: [
        authProviders.openIdConnect({
          id: "keycloak", // you have to choose this ID
          clientId: "live-chat", // client ID from Auth0
          clientSecret: process.env.client_secret || "", // client secret from Auth0
          issuer: "http://keycloak.local/auth/realms/LiveChat",
        }),
        authProviders.demo(),
      ],
      authorizedRedirectUriRegexes: [
        "http://live.chat.local/*",
        "http://localhost:3000/*",
      ],
    },
  },
  // S3 Server
  // 1. Run `./minio/setup.sh` to create a S3 server.
  // 2. Comment out the section below and save!

  // Enable file upload functionality in your generated client
  // Minio credentials: minio / minio123
  s3UploadProvider: [
    {
      name: "minio",
      endpoint: "storage.live.chat.local",
      accessKeyID: "test",
      secretAccessKey: "12345678",
      bucketLocation: "eu-central-1",
      bucketName: "uploads",
      useSSL: false,
    },
  ],
  codeGenerators: [
    {
      templates: [
        // use all the typescript react templates to generate a client
        ...templates.typescript.all,
        templates.typescript.operations,
        templates.typescript.linkBuilder,
        ...templates.typescript.react,
      ],
      // create-react-app expects all code to be inside /src
      // path: "../frontend/src/generated",
    },
    {
      templates: [
        // use all the typescript react templates to generate a client
        ...templates.typescript.all,
        templates.typescript.operations,
        templates.typescript.linkBuilder,
        ...templates.typescript.react,
      ],
      // create-react-app expects all code to be inside /src
      path: "../frontend/wunderClient",
    },
  ],
  cors: {
    ...cors.allowAll,

    allowedOrigins:
      process.env.NODE_ENV === "production"
        ? [
            // change this before deploying to production to the actual domain where you're deploying your app
            "http://localhost:3000",
          ]
        : ["http://localhost:3000", "http://live.chat.local"],
  },
  dotGraphQLConfig: {
    hasDotWunderGraphDirectory: false,
  },
});
