import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { collection, getFirestore, getDocs } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { addDoc, doc, updateDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB_OxFAbOowfYUU9v730OONfdj0ch1MuSE",
  authDomain: "remcostoeten-docs.firebaseapp.com",
  projectId: "remcostoeten-docs",
  storageBucket: "remcostoeten-docs.appspot.com",
  messagingSenderId: "457325786920",
  appId: "1:457325786920:web:782eb6f05bb419f900c21d"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
const googleAuthProvider = new GoogleAuthProvider();
  
type Task = {
  id: string;
  title: string;
  done: boolean;
};

export interface CustomDocumentData {
  id: string;
  title: string;
  content: string;
}

export async function getDocuments(): Promise<CustomDocumentData[]> {
  const documentsCollection = collection(firestore, 'documents');
  const snapshot = await getDocs(documentsCollection);

  const documents = snapshot.docs.map((doc) => ({
    id: doc.id,
    title: doc.data().title,
    content: doc.data().content,
  }));

  return documents;
}
  
export async function getNotes(userId) {
	const notesCollection = collection(firestore, `users/${userId}/notes`);
	const snapshot = await getDocs(notesCollection);
  
	const notes = snapshot.docs.map((doc) => ({
	  id: doc.id,
	  ...doc.data(),
	}));
  
	return notes;
  }

export async function handleAddNote(userId: string, note: any) {
	try {
	  const docRef = await addDoc(collection(firestore, `users/${userId}/notes`), note);
	  console.log('Note added with ID:', docRef.id);
	} catch (error) {
	  console.error('Error adding note:', error);
	}
  };
  
const handleAddDocument = async (newDocument: Task) => {
  try {
    const docRef = await addDoc(collection(firestore, 'tasks'), newDocument);
    console.log('Document added with ID:', docRef.id);
  } catch (error) {
    console.error('Error adding document:', error);
  }
};

const handleToggleDocument = async (docId: string, task: Task) => {
  try {
    const docRef = doc(firestore, 'tasks', docId);
    await updateDoc(docRef, task);
  } catch (error) {
    console.error('Error updating document:', error);
  }
};

export { auth, firestore, storage, googleAuthProvider, handleAddDocument, handleToggleDocument };
