import { CreateUser } from "../users/CreateUser"
import { Header } from "../header/Header"
import { useSelector } from "react-redux";

export const Dashboard = () => {
    const currentUser = useSelector((state) => state.userReducer);
    console.log(currentUser.user)
    return (
        <>
            {currentUser.user.role === 'admin' &&
                <div className="container">
                    <Header />
                    <h1>Admin</h1>
                    <CreateUser />
                </div>
            }

            {currentUser.user.role === 'user' &&
                <div>
                    <h1>User</h1>
                </div>
            }

        </>
    )
}