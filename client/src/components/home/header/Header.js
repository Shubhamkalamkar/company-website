import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';

export const Header = () => {
    const navigate = useNavigate()
    // const currentUser = useSelector((state) => state.userReducer);
    const jsonString = localStorage.getItem('user');

    // Convert it back to an object
    const user = JSON.parse(jsonString);
    console.log(user?.email)
    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand > <Link to={"/dashboard"}>Digital Guru</Link></Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                    
                        <Link to={"/dashboard"}>Dashboard</Link>
                    </Navbar.Text>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                    <Link to={"/createuser"}>users</Link>
                    </Navbar.Text>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                    <Link to={"/tasks"}>tasks</Link>
                    </Navbar.Text>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        {/* Signed in as: <a href="#">{user?.email}</a> */}
                        <Link to={"/profile"}>Signed in as:{user?.email}</Link>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}


// // import { useSelector } from "react-redux"

// export const Header = ()=>{
//     // const currentUser = useSelector((state) => state.userReducer);
//     const jsonString = localStorage.getItem('user');

//     // Convert it back to an object
//     const user = JSON.parse(jsonString);
//     console.log(user?.email)
//     return(
//         <>
//         <div className="header">
//             <span>{user?.email}   </span>
//             <span>  {user?.fullName}</span>
//         </div>
//         </>

//     )
// }