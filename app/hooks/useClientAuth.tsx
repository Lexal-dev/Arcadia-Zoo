import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, User } from "firebase/auth";
import {auth} from "@/db/firebaseConfig"
import { useRouter } from "next/navigation";

const useClientAuth = () => {
    const [user, setUser] = useState<User | null>(null)
    const [isFetch, setIsFetch] = useState(true)

    const router = useRouter()

    const signUp = async(email: string, password: string) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            setUser(userCredential.user)
            router.push("/dashboard")    
        } catch (error:any) {
            console.log('erreur à la connexion')
        }
    }

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
