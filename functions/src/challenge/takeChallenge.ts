import {Request, Response} from "express";
import * as admin from "firebase-admin";

export const takeChallenge = async (req: Request, res: Response) => {
  try {
    const {userId, challengeId} = req.body;
    const challengeDoc = await admin.firestore()
        .collection("challenges")
        .doc(challengeId)
        .get();

    if (!challengeDoc.exists) {
      throw new Error("The challenge does not exist.");
    }

    const challengeData = challengeDoc.data();
    const isPlayer = challengeData?.players &&
      challengeData?.players?.includes(userId);

    if (isPlayer) {
      throw new Error("The user is already a player in the challenge.");
    }

    const updatedPlayers = [...(challengeData?.players || []), userId];

    await admin.firestore()
        .collection("challenges")
        .doc(challengeId)
        .update({players: updatedPlayers});

    res
        .status(200)
        .send({message: "Player added to challenge successfully."});
  } catch (error: any) {
    res
        .status(400)
        .send({error: error?.message});
  }
};
