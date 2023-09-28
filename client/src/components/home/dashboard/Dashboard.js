import { Header } from "../header/Header";

export const Dashboard = () => {

    const jsonString = localStorage.getItem('user');

    const user = JSON.parse(jsonString);
    console.log(user)

    return (
        <>
        <Header/>
            {user?.role === 'admin' &&
                <div className="container">
                    <h1>Admin</h1>
                </div>
            }

            {user?.role === 'user' &&
                <div>
                    <h1>User</h1>
                </div>
            }

        </>
    )
}