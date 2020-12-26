import React,{useState} from 'react'
import { Link , useHistory } from 'react-router-dom'
import M from 'materialize-css'

export const Signup = () => {
  const history = useHistory()
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const PostData = () => {
    console.log(name,email,password)
    fetch("/signup",{
      method:"Post",
      headers: {
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
          name,
        email,
        password
      })
    }).then(res => res.json())
    .then(data => {
      if(data.error) {
        M.toast({html:data.error,classes:"#c62828 red darken-3"})
      }
      else{
        
        M.toast({html:"Saved Successfully" , classes:"#c62828 green darken-3"})
        history.push('/signin')
      }
    })
    .catch(err => {
      console.log(err)
    })
  
  }

 
    return (
        <div>
        <div className="center">
        {/* <div className="col s12 m6"> */}
          <div className="card blue-grey darken-1 " style={{maxWidth:'500px'}} >
            <div className="card-content white-text">
              <span className="card-title">Signup</span>
            </div>
            <input 
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e)=> setName (e.target.value)}
            />
            <input 
                type="text"
                placeholder="E-mail"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
            />
            <input 
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
            />
            <button
              className=""
              onClick={()=>PostData()}
            >Submit</button>
            <div className="card-action">
              <Link to="/signin">Don't have account</Link>
              <Link to="/forgot">Forgot Password</Link>
            </div>
          </div>
        {/* </div> */}
      </div>
    {/* <div className="center mycard">
        <div className="card center auth " style={{maxWidth:"500px"}}>
        <h1>hello</h1>
    </div>
    </div> */}
    </div>
    
    )
}
