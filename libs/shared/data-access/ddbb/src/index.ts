import { db, storage } from '../../../../../firebase';
import { collection, doc, addDoc, updateDoc, DocumentData, query, where, getDocs, WhereFilterOp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';

export const setDocument = (collectionName: string, document: DocumentData) => {
  return document.id ? updateDoc(doc(db, collectionName, document.id), document) : addDoc(collection(db, collectionName), document);
};

export const uploadFile = (
  file: File | undefined,
  collectionName = 'challenges',
): Promise<string | null> => {
  if (!file) return Promise.resolve(null);

  const storageRef = ref(storage, `/files/${collectionName}/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      null,
      (err) => reject(err),
      () => getDownloadURL(uploadTask.snapshot.ref).then((url) => resolve(url))
    );
  });
};

export const deleteFile = (url: string) => {
  const storageRef = ref(storage, url);

  return deleteObject(storageRef);
}

export const queryDocuments = async <T>(collectionName: string, queryKey?: string, queryOperator: WhereFilterOp = '==', queryValue?: string | number | boolean): Promise<T[]> => {
  const queryConfig = queryKey && queryValue ? query(collection(db, collectionName), where(queryKey, queryOperator, queryValue)) : query(collection(db, collectionName));
  const querySnapshot = await getDocs(queryConfig);

  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as T[];
};
