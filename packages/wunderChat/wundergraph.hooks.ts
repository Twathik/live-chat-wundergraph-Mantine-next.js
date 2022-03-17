import { configureWunderGraphHooksWithClient } from "./generated/wundergraph.hooks.configuration";

const wunderGraphHooks = configureWunderGraphHooksWithClient((client) => ({
  queries: {},
  mutations: {},
  authentication: {
    mutatingPostAuthentication: async (user) => {
      try {
        const requestUser = await client.queries.GetUser({
          email: user.email!,
        });
        const localUser = requestUser.data?.usersDb_findUniqueUser;
        const update = await client.mutations.UserUpsert({
          userId: user.user_id!,
          create: {
            email: user.email!,
            name: user.name!,
            firstName: user.first_name!,
            lastName: user.last_name!,
            userId: user.user_id!,
          },
          update: {},
        });

        return {
          status: "ok",
          user: {
            ...user,
            name: localUser
              ? `${localUser?.firstName} ${localUser?.lastName}`
              : user.name!,
            first_name: localUser?.firstName ?? user.first_name!,
            last_name: localUser?.lastName ?? user.last_name!,
            custom_claims: {
              avatarId: update.data?.usersDb_upsertOneUser?.avatarId ?? "",
            },
          },
        };
      } catch (error) {
        return {
          status: "ok",
          user: {
            ...user,
          },
        };
      }
    },
  },
}));

export default wunderGraphHooks;
