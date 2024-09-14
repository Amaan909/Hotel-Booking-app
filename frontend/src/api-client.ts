import { RegisterFormData } from "./pages/register";
import { SignInFormData } from "./pages/signin";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL|| '';

export const register = async (formData: RegisterFormData) => {

  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials:"include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });


  if (!response.ok) {
    console.error("API response:", response);
    throw new Error((await response.json()).message);
  }
};

export const signIn= async(formData:SignInFormData)=>{
  const response=await fetch(`${API_BASE_URL}/api/auth/login`,{
    method:"POST",
    credentials:"include",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(formData)
  })
  const body=await response.json()
  if(!response.ok){
    throw new Error(body.message)
  }
  return body;
}


export const validateToken = async () => {

  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Token invalid");
  }
  const data= await response.json();
  console.log("Response data:", data); // Debugging line
  return data;
};

export const signout=async()=>{
  const response=await fetch(`${API_BASE_URL}/api/auth/logout`,{
    credentials:"include",
    method:"POST"
  })
  if(!response.ok){
    throw new Error("Error during sign out") 
  }
}