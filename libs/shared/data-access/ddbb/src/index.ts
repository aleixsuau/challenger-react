import { db } from '../../../../../firebase';
import { collection, addDoc, DocumentData } from "firebase/firestore";

export const addDocument = (collectionName: string, doc: DocumentData) => {
  return addDoc(collection(db, collectionName), doc);
}