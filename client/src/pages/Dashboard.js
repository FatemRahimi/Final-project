import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import StarList from "./StarList";
import { useNavigate } from "react-router-dom";
import NavbarButton from "./Component/NavbarButton";

const  Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ name:"", role:"" });
    useEffect(() => {
        fetch("/api/users")
        .then((res) => res.json())
        .then((data) => setUser(data));
    }, []);

    function logout() {
        // console.log(id);
        fetch("/api/logout", { method: "POST" })
            .then((res) => res)
            .then((data) => {
                console.log(data);
                return navigate("/");
            })
            .catch((error) => console.error(error));
    }

    return (
        <div>
           <Navbar>
                <NavbarButton name="Log out" clicked={logout} />
            </Navbar>
            <h1 className="greeting">Hello {user.name}!</h1>

            <StarList user={user} />
        </div>
    );
};

export default Dashboard;
