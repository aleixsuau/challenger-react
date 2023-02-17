import { db, storage } from '../../../../../firebase';
import { collection, addDoc, DocumentData, query, where, getDocs, WhereFilterOp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';

export const addDocument = (collectionName: string, doc: DocumentData) => {
  return addDoc(collection(db, collectionName), doc);
};

export const uploadFile = (
  file: File | undefined,
  collectionName = 'challenges'
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

export const deleteFile = (url: string) {
  const fileRef = storage.refFromURL(url);

  return deleteObject(fileRef);
}

export const queryDocuments = async <T>(collectionName: string, queryKey?: string, queryOperator: WhereFilterOp = '==', queryValue?: string | number | boolean): Promise<T[]> => {
  const queryConfig = queryKey && queryValue ? query(collection(db, collectionName), where(queryKey, queryOperator, queryValue)) : query(collection(db, collectionName));
  const querySnapshot = await getDocs(queryConfig);

  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as T[];
};
