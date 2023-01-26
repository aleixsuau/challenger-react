import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const saveUserToDDBB = functions.auth.user().onCreate(async (user) => {
  const {
    displayName,
    email,
    emailVerified,
    phoneNumber,
    photoURL,
    providerData,
    uid,
  } = user;
  functions.logger.info("User created >>>", displayName, email,
      emailVerified, phoneNumber, photoURL, providerData, uid);

  return admin.firestore().collection("users").add({
    displayName,
    email,
    emailVerified,
    phoneNumber,
    photoURL,
    providerData,
    uid,
  });
});
