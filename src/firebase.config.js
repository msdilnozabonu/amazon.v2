import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyDQMp5QOGKO4odH3uHTBB76ZgkwNJ6mXNo",
  authDomain: "fir-7203c.firebaseapp.com",
  projectId: "fir-7203c",
  storageBucket: "fir-7203c.firebasestorage.app",
  messagingSenderId: "772945818677",
  appId: "1:772945818677:web:55180ff379f5df3d166d7c",
  measurementId: "G-4VWBWXE6JT"
};

export const app = initializeApp(firebaseConfig);
export default  firebaseConfig