import {React,useState,useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {auth} from "./firebaseconfig"
import {onAuthStateChanged,signOut} from 'firebase/auth'
function Nav() {
    const [user,setUser]=useState({})
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
      });
      return () => unsubscribe(); // Cleanup function to unsubscribe from the listener
  }, []);
    const navigate=useNavigate()
    const logout=async()=>{
        await signOut(auth)
        navigate("/")
    }
  return (
    <nav className="navbar navbar-expand-md navbar-light  ">
      
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ms-auto ">
    <li className="nav-item active">
        <Link className="nav-link mx-3 text-info   navbarlinks"  to="/homepage">Home</Link>
      </li>
      
 
     
      
      
      <li className="nav-item active">
        <Link className="nav-link mx-3  text-info navbarlinks"  to="/table">Active Users</Link>
      </li>
      
    <li className='nav-item text-'>
    {user?.email&&
    <button className='btn btn-dark mx-4' onClick={logout}>Log out</button>
    }
      </li> 
    </ul>
    
  </div>
</nav>
  )
}

export default Nav