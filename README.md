# Live chat exemple with Wundergraph, Next.js, Mantine

This project aims to try two excellents new projects, wundergraph (the api`s npm) and mantine (react ui lib). This is a simple refactoring of [nextjs real time chat](https://github.com/wundergraph/nextjs-typescript-postgresql-graphql-realtime-chat) by wundergraph team with a cleaner ui. 

This project is just to play around with some Wundergraph functionalities, you can use any open id compilent auth server out of the box with few lines of code, same thing for s3 compilent storage. without forgetting the main goal of wundergraph which is introspecting and publishing any api fingers in the noise.

Mantine is also an excellent ui library for react developers, it includes more than [120 customizable components and hooks](https://ui.mantine.dev/) to cover you in any situation


Project dependencies

- [wundergraph](https://wundergraph.com/)
- [mantine](https://mantine.dev/getting-started/)
- [next.js 12](https://nextjs.org/)
- [prisma](https://www.prisma.io/)
- [keycloak](https://www.keycloak.org/)
- [treafik](https://traefik.io/)
- [postgres](https://www.postgresql.org/)
- [minio](https://min.io/)

Make sure you have curl and [jq](https://stedolan.github.io/jq/) installed before continue.

1- Run the script setup.sh to auto config the minio instances and to fire up the docker-compose instance

```
cd Docker
sh setup.sh
```

Wait for the keyclok server to be ready, you should see at the bottom of the logs

```
WFLYSRV0051: Admin console listening on http://127.0.0.1:9990
```

Then run the second script to configure keycloak

```
sh keycloak.sh
```

2- install packages: this example uses yarn workspaces, to install all dependencies on a raw run yarn at the root of the project

```
yarn
```

3- Migrate the database: we use prisma under the hood

```
yarn migrate
```

4- start the servers: concurrently and wsrun will start all the servers at once

```
yarn dev
```

5- Add this entries to your "/etc/hosts" file

```
127.0.0.1 keycloak.local
127.0.0.1 live.chat.local
127.0.0.1 api.live.chat.local
127.0.0.1 storage.live.chat.local
```

6- The server should be reachable from

```
http://live.chat.local
```

Two users have been created from stage 2

```
- user1 password user1
- user2 password user2
```

Open two navigators, or an incognito with a regular session in your favorite navigator to try out the live functionality

I highly recommande to support this two projects which I think have a great potentiel to be in your future stack
Enjoy
