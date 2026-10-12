import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const mongoUri = process.env.mongoDBUrl;

if (!mongoUri) {
throw new Error("mongoDBUrl is missing from .env");
}

const client = new MongoClient(mongoUri);
const db = client.db("assignment-7");

export const auth = betterAuth({
secret: process.env.BETTER_AUTH_SECRET,

baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",

advanced: {
useSecureCookies: false,
},

emailAndPassword: {
enabled: true,
},

socialProviders: {
google: {
clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID || "",
clientSecret: process.env.BETTER_AUTH_GOOGLE_CLIENT_SECRET || "",
},


github: {
  clientId: process.env.BETTER_AUTH_GITHUB_ID || "",
  clientSecret: process.env.BETTER_AUTH_GITHUB_SECRET || "",
},


},

database: mongodbAdapter(db),
});
