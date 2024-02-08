import {db} from "./firebaseconfig"
import {React,useState,useEffect} from 'react'
import { collection,getDocs,updateDoc,doc,deleteDoc} from "firebase/firestore";
import {RiDeleteBin6Line}  from 'react-icons/ri';
import { Modal,Button } from 'react-bootstrap'
import Register from "./Register";
import { FiFilter } from "react-icons/fi";
import Nav from "./Nav";
function Table() {
    const [users,setUsers]=useState([]);
    let [state,setState]=useState()
    const usersCollectionRef=collection(db,"users")
    useEffect(()=>{
        const getUsers=async()=>{
            const data=await getDocs(usersCollectionRef)
            setUsers(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
             
        }
        getUsers()
    },[])
    const x=localStorage.getItem("email")
    const change=async(id,status)=>{
            const userDoc=doc(db,"users",id) 
            if(status==='active')
            await updateDoc(userDoc,{status:"inactive"})
            else
            await updateDoc(userDoc,{status:"active"})
        window.location.reload();
            
    }
    const deleteUser=async(id)=>{
        const userDoc=doc(db,"users",id) 
        await deleteDoc(userDoc)
        window.location.reload();
    }
    const sortFun=async(key)=>{
       let temp;
        if(key==1){
          temp=[...users].sort((a, b) => {
            return a.username.localeCompare(b.username);
          });
        }
        else
        {
            temp=[...users].sort((a, b) => {
                return a.added_date.localeCompare(b.added_date);
              });
            }
            setUsers(temp)
        }
        const [searchQuery, setSearchQuery] = useState('');
        const [dateQuery, setdateQuery] = useState('');
        // Function to handle changes in the search input
        const handleSearchInputChange = (event) => {
          setSearchQuery(event.target.value);
          const filteredUsers = users.filter((user) =>
          user.username.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setUsers(filteredUsers)
        };
        const handleDateInputChange = (event) => {
            setdateQuery(event.target.value);
            const filteredUsers = users.filter((user) =>
            user.added_date.toLowerCase().includes(dateQuery.toLowerCase())
          );
          setUsers(filteredUsers)
          };
       
      
  return (
    <div >
       { x!==null ?
       <div>
        <Nav/>
       <div className="p-5">
        <p className="text-center">Active Users</p>
        <div className="d-flex justify-content-center">
        <input
        type="text"
        value={searchQuery}
        onChange={handleSearchInputChange}
        className="form-control custom-placeholder"
        placeholder="Search by username"
      />
                    <input
        type="text"
        value={dateQuery}
        onChange={handleDateInputChange}
        className="form-control custom-placeholder"
        placeholder="Search by date"
      />
      </div>
        <table className="table table-striped text-center  shadow rounded">
            <thead >
                <tr>
                    <th className="p-3">SNo</th>
                    <th><button onClick={()=>{sortFun(1)}} className="btn btn-white fw-bold">Username
                    
                    <FiFilter /></button>
      
                    </th>
                    <th><button onClick={()=>{sortFun(2)}} className="btn btn-white fw-bold">Added Date<FiFilter /></button></th>
                    <th className="p-3">
                     Status
                    
                    </th>
                    <th className="p-3">Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                   users.map((user,ind)=>
                    <tr key={user.id} >
                        <td>{ind+1}</td>
                       <td>{user.username}</td>
                       <td>{user.added_date}</td>
                       <td>{user.status}</td>
                       <td>
                        <button className='btn btn-warning opacity-75  me-2' onClick={()=>{change(user.id,user.status)}}>Change</button>
                        <button className='btn btn-danger' onClick={()=>{deleteUser(user.id)}}><RiDeleteBin6Line size={"20px"} /></button>
                        </td>
                    </tr>  )
                    
                }
                

            </tbody>
           
      
     </table>
     </div>
     <button className="btn btn-success" style={{position:"absolute",right:270}} onClick={()=>{
            setState(true)
        }}>Add</button>
     <Modal show={state} >
     {/* <Modal.Header className="lead text-dark mx-auto">Employee Payslip</Modal.Header> */}
     {/* <Modal.Body > */}
      <Register add="true"/>
     
     <Modal.Footer>
        <Button onClick={()=>{setState(false)}}>Exit</Button>
     </Modal.Footer>
     </Modal>
    </div>
    :<p className="text-danger text-center">Unauthorized Access!! Please Login</p>
}
    </div>
  )
}

export default Table