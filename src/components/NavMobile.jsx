import { useState, useContext } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import AuthContext from "../api/AuthContext";
import { auth } from "../api/firebase";
import { Link } from "react-router-dom";
import { useClickAway } from "@uidotdev/usehooks"
import { MdClose } from "react-icons/md";

export default function NavMobile() {
    const {user, setUser} = useContext(AuthContext)
    const [isOpen, setIsOpen] = useState(false)
    const ref = useClickAway(() => {
        setIsOpen(false);
      });

    function logOut() {
        auth.signOut()
        setUser(null)
        console.log('logged out')
    }



    return (
        <div className={isOpen ? "nav-mobile" : ""} ref={ref}>
            {!isOpen && <button className="hamburger" style={{border: "none", outline: "none", backgroundColor: "transparent", color: "#161616", fontSize: "24px"}} onClick={() => setIsOpen(!isOpen)}>
                <GiHamburgerMenu />
            </button>}

            {isOpen && (
                <div className="nav-mobile-links">
                    <h2 className="home-title"><Link to="/">#VANLIFE</Link></h2>
                    {user && 
                        <Link className="nav-mobile-link" to="/host">Host</Link>
                    }
                    
                        <Link className="nav-mobile-link" to="/about">About</Link>           
                        <Link className="nav-mobile-link" to="/vans">Vans</Link>
                    {!user && 
                        <Link className="nav-mobile-link" to="/login">Log In</Link>
                    }
                    {!user && 
                        <Link className="nav-mobile-link" to="/Register">Sign Up</Link>
                    }
                    {user && <button className="nav-mobile-signout" onClick={logOut}>Sign Out</button>}
                </div>
            )}
            {isOpen && <button className="close-nav" onClick={() => setIsOpen(!isOpen)}><MdClose /></button>}
        </div>
    )
}