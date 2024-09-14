import React, { useContext, useState } from "react"
import Toast from "../components/Toast"
import { useQuery } from "react-query"
import * as apiClient from "../api-client"
type ToastMessage={
    message:string,
    type:"SUCCESS"|"ERROR"
}
type AppContext={
    showToast:(toastMessage:ToastMessage)=>void
    isLoggedIn:boolean
}
const AppContext=React.createContext<AppContext|undefined>(undefined)
export const AppContextProvider=({children}:{children:React.ReactNode})=>{
    const [toast,setToast]=useState<ToastMessage|undefined>(undefined)

    const {isError,isLoading,isSuccess}=useQuery("validateToken",apiClient.validateToken,{
        retry:false,
        refetchOnWindowFocus: false, // Disables refetching when the window regains focus
        staleTime: 5 * 60 * 1000, // Optional: Adjust stale time as needed
        onSuccess: (data) => {
            console.log("Token validation succeeded with userId:", data.userId);
        },
        onError: (error:Error) => {
            console.error("Token validation failed:", error.message);
        },
        
    })
    console.log("Query state:", { isError, isLoading, isSuccess });
    return(
        <AppContext.Provider value={{
            showToast:(toastMessage)=>{
                setToast(toastMessage)
            },
            isLoggedIn:!isError
        }}>
            {toast&&(<Toast //rendering toast component
            message={toast.message} 
            type={toast.type}
            onClose={()=>setToast(undefined)}/>)}
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext=()=>{
    const context=useContext(AppContext)
    return context as AppContext
}