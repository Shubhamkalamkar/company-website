import { useSelector } from "react-redux"

export const Header = ()=>{
    const currentUser = useSelector((state) => state.userReducer);
    console.log(currentUser.user?.email)
    return(
        <>
        <div className="header">
            <span>{currentUser.user?.email}   </span>
            <span>  {currentUser.user?.fullName}</span>
        </div>
        </>

    )
}