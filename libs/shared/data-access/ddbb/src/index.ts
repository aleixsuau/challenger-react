import { db, storage } from '../../../../../firebase';
import { collection, addDoc, DocumentData } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

export const addDocument = (collectionName: string, doc: DocumentData) => {
  return addDoc(collection(db, collectionName), doc);
};

export const uploadFile = (
  file: File | undefined,
  collection = 'challenges'
): Promise<string | null> => {
  if (!file) return Promise.resolve(null);

  const storageRef = ref(storage, `/files/${collection}/${file.name}`);
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
