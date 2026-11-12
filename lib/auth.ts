import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("hireloopdb");

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    // autoSignIn: false,
  },

  user: {
    additionalFields: {
      role: {
        type: ["seeker", "recruiter", "admin"],
        required: true,
        defaultValue: "seeker",
        // true = the sign-up form is allowed to send a role.
        input: true,
      },
    },
  },

  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          // Any of the three roles can be picked at sign-up; anything else falls back to "seeker".
          // NOTE: this lets anyone register as "admin". Before going live, remove "admin"
          // from this list and assign admins manually in MongoDB instead.
          const allowed = ["seeker", "recruiter", "admin"];
          const role = allowed.includes(user.role as string) ? user.role : "seeker";
          return { data: { ...user, role } };
        },
      },
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  database: mongodbAdapter(db, {
    client,
  }),
});