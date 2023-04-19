import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as cors from "cors";
import * as express from "express";
import * as bodyParser from "body-parser";
import {validateAuthentication} from "./auth/validateAuthentication";
import {takeChallenge} from "./challenge/takeChallenge";

admin.initializeApp();
const server = express();

// MIDDLEWARE
// Automatically allow cross-origin requests
server.use(cors({
  origin: true, // TODO: limit to ["http://localhost:4200", "https://challenger-af1a0.web.app/"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));
server.use(validateAuthentication);

// ROUTES
server
    .route("/takeChallenge")
    .post(takeChallenge);

server.all("*", (req, res) => {
  res.status(404).json(`Can't find ${req.originalUrl}`);
});

// Expose Express API as a single Cloud Function:
export const api = functions.https.onRequest(server);
// Expose event based Cloud Functions
export * from "./user/saveUserToDDBBOnCreate";
