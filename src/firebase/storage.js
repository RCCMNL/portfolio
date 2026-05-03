import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './config';

/**
 * Carica un'immagine su Firebase Storage e ritorna l'URL pubblico.
 * @param {File} file - Il file immagine da caricare
 * @param {string} path - Il percorso nello storage (es. "projects/dino-ia")
 * @param {function} onProgress - Callback per il progresso (0-100)
 * @returns {Promise<{url: string, storagePath: string}>}
 */
export const uploadImage = (file, path, onProgress) => {
  return new Promise((resolve, reject) => {
    const storagePath = `${path}/${Date.now()}_${file.name}`;
    const storageRef = ref(storage, storagePath);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        if (onProgress) onProgress(progress);
      },
      (error) => reject(error),
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        resolve({ url, storagePath });
      }
    );
  });
};

/**
 * Elimina un'immagine da Firebase Storage dato il suo percorso.
 * @param {string} storagePath - Percorso del file nello storage
 */
export const deleteImage = async (storagePath) => {
  if (!storagePath) return;
  try {
    const storageRef = ref(storage, storagePath);
    await deleteObject(storageRef);
  } catch (error) {
    // Ignora errori di file non trovato (già eliminato)
    if (error.code !== 'storage/object-not-found') {
      console.error('Errore eliminazione immagine:', error);
    }
  }
};
