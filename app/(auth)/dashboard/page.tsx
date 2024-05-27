"use client"

import { signOut } from "firebase/auth";
import { useEffect } from "react";
import {auth} from"@/db/firebaseConfig";
import useClientAuth from "@/app/hooks/useClientAuth";

export default function Dashboard() {
  const { user, isFetch, redirectAuthentificate } = useClientAuth();

  const handleSignOut = () => {
    signOut(auth);
  }

  useEffect(() => {
    if (!isFetch && !user) {
      redirectAuthentificate();
    }
  }, [isFetch, user, redirectAuthentificate]);

  if (isFetch || !user) {
    return <p>Chargement en cours...</p>;
  }

  
  return (
    <main className="flex justify-center items-center h-full w-full mt-6">
      <div className="flex flex-col border border-slate-800 p-2 gap-2">
        <p>Bienvenue !</p>
        <p>Email : {user.email}</p>
        <button className="text-start hover:text-red-500" onClick={handleSignOut}>Se déconnecter</button>        
      </div>
    </main>
  );
}
