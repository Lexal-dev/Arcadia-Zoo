import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, User } from "firebase/auth";
import {db, auth} from "@/db/firebaseConfig"
import { useRouter } from "next/navigation";
import { getFirestore, collection, addDoc, query, getDocs } from "firebase/firestore";


const useClientAuth = () => {
    const [user, setUser] = useState<User | null>(null)
    const [isFetch, setIsFetch] = useState(true)

    const router = useRouter()


    
    const signUp = async (email: string, password: string, role: string) => {
      try {
        const currentUser = auth.currentUser;
        const currentEmail = currentUser?.email;
        const currentPassword = prompt("Veuillez entrer votre mot de passe pour vérifier votre identité:");
    
        if (currentEmail && currentPassword) {
          // Obtenir une référence à la base de données Firestore
          const firestore = getFirestore();
    
          // Vérifier si la collection "users" existe déjà
          const usersCollectionRef = collection(firestore, "users");
          const usersCollectionSnapshot = await getDocs(usersCollectionRef);
    
          if (usersCollectionSnapshot.empty) {
            // Si la collection "users" n'existe pas, la créer
            await addDoc(usersCollectionRef, {
              email: email,
              role: role // Utilisation du rôle sélectionné
            });
          }
    
          // Créer un nouvel utilisateur dans Firebase Auth
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const newUser = userCredential.user;
    
          // Ajouter les informations de l'utilisateur à la collection Firestore "users"
          await addDoc(usersCollectionRef, {
            email: newUser.email,
            role: role // Utilisation du rôle sélectionné
          });
    
          // Reconnexion à l'utilisateur courant
          await signInWithEmailAndPassword(auth, currentEmail, currentPassword);
          router.push("/dashboard");
        } else {
          console.log("Impossible de récupérer l'email de l'utilisateur actuel ou le mot de passe n'a pas été saisi.");
        }
      } catch (error) {
        console.error('Erreur lors de la connexion :', error);
      }
  };

    const signIn = async(email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            setUser(userCredential.user)
            router.push("/dashboard")    
        } catch (error:any) {
            console.log('erreur à la connexion')
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
            if(user){
                setUser(user)
                setIsFetch(false)
            } else {
                setUser(user)
                setIsFetch(false)
            }
        }) 
        return() => unsubscribe()
    }, [])

    const redirectAuthentificate = () => {
        if(user){
            router.push("/dashboard")
        }
        router.push("/")
    }

    return {user, isFetch, signUp, signIn, redirectAuthentificate}
}

export default useClientAuth;
