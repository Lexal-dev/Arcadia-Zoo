"use client"
import { useState, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import useClientAuth from "@/app/hooks/useClientAuth";
import * as yup from "yup"

interface FormData{
  email:string;
  password:string;
}
const schema = yup.object().shape({
  email: yup.string().email('Format non valide').required("Email Requis"),
  password: yup.string().required("Password Requis"),
})
export default function Login() {

  

  const [isSignUpActive, setIsSignInUpActive] = useState(false)
  const [formData, setFormData] = useState<FormData>({email: "", password:""})
  const [error, setError] = useState<Partial<FormData>>({})

  const{user, isFetch, signUp, signIn, redirectAuthentificate} = useClientAuth()
  const router = useRouter();

  useEffect(() => {
    if (!isFetch && user) {
      router.push("/dashboard");
    }
  }, [isFetch, user, router]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSignUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    schema.validate(formData).then(() => {
      signUp(formData.email, formData.password);
    })
    .catch((validationErrors: yup.ValidationError) => {
      const formattedError: Partial<FormData> = {}
      validationErrors.inner.forEach(error => {
        formattedError[error.path as keyof FormData] = error.message
      })
      setError(formattedError)
    })
  }
  
  const handleSignIn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    schema.validate(formData).then(() => {
      signIn(formData.email, formData.password);
    })
    .catch((validationErrors: yup.ValidationError) => {
      const formattedError: Partial<FormData> = {}
      validationErrors.inner.forEach(error => {
        formattedError[error.path as keyof FormData] = error.message
      })
      setError(formattedError)
    })
  }

  if(isFetch){
    return <h2>En cours de connexion</h2>
  }
  
  
  
  return (
      <section className="flex flex-col h-[800px] items-center justify-center gap-2">
        <form className="max-w-[800px] flex flex-col gap-2 bg-slate-400 p-[50px] rounded-md shadow-md">
          {isSignUpActive ? (
            <h1 className="text-center text-white text-4xl mb-3 font-bold">Inscription</h1>
          ):(
            <h1 className="text-center text-white text-4xl mb-3 font-bold">Connexion</h1>
          )}
          <label htmlFor="email" className="text-lg text-white">Email:</label>
          <input onChange={handleInputChange} value={formData.email} type="email" name="email" id="email" className="h-10 border border-slate-900 rounded-lg p-4" />
          {error.email && <p className="text-red-500">{error.email}</p>}
          <label htmlFor="password" className="text-lg text-white">Password:</label>
          <input onChange={handleInputChange} value={formData.password} type="password" name="password" id="password" className="h-10 border border-slate-900 rounded-lg p-4 mb-5" />
          {error.password && <p className="text-red-500">{error.password}</p>}
          {isSignUpActive ? (
            <div className="flex flex-col justify-center gap-3">           
              <button onClick={(e) => handleSignUp(e)} className="bg-blue-300 px-3 py-2 text-center rounded-lg  text-gray-500 cursor-pointer">Inscription</button>
            </div>

          ):(
          <div className="flex flex-col justify-center gap-3">
            <button onClick={(e) => handleSignIn(e)} className="bg-green-300 px-3 py-2 text-center rounded-lg text-gray-500 cursor-pointer">Connexion</button>
          </div>
          )}
          
        </form>
      </section>
    );
  }