"use client"
import { useEffect, useState, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import useClientAuth from '@/app/hooks/useClientAuth';
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

const authorizedRoutes = ['/', '/login'];



const CheckPath = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isFetch } = useClientAuth();

  const [userRole, setUserRole] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchUserRole = async () => {
      if (user) {
        try {
          const firestore = getFirestore();
          const usersCollectionRef = collection(firestore, "users");
          const q = query(usersCollectionRef, where("email", "==", user.email));
          const querySnapshot = await getDocs(q);

          querySnapshot.forEach((doc) => {
            setUserRole(doc.data().role);
          });
        } catch (error) {
          console.error("Erreur lors de la récupération du rôle de l'utilisateur :", error);
        }
      }
    };

    fetchUserRole();
  }, [user]);

  useEffect(() => {
    const checkRoute = () => {
      if (isFetch || userRole === null) return; // Attendre que les données d'authentification et le rôle de l'utilisateur soient prêts
      
      if (!user && !authorizedRoutes.includes(pathname)) {
        router.push('/');
        return;
      }
      
      if (userRole !== "ADMIN" && pathname.includes("/admin")) {
        router.push('/');
        return;
      }
  
      if (userRole !== "ADMIN" && userRole !== "EMPLOYEE" && pathname.includes("/employee") ) {
        router.push('/');
        return;
      }
  
      if ((userRole !== "VETERINARIAN" && userRole !== "ADMIN") && pathname.includes("/veterinarian")) {
        router.push('/')
        return;
      }
    };
  
    checkRoute();
  }, [pathname, router, user, isFetch, userRole]);

  return <>{children}</>;
};

export default CheckPath;