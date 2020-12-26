import React,{useState} from 'react'
import { Link , useHistory } from 'react-router-dom'
import M from 'materialize-css'

export const Signin = () => {
  const history = useHistory()
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const postdata = () => {
    console.log(email,password)
    fetch("/signin",{
      method:"Post",
      headers: {
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email,
        password
      })
    }).then(res => res.json())
    .then(data => {
      if(data.error) {
        M.toast({html:data.error,classes:"#c62828 red darken-3"})
      }
      else{
        localStorage.setItem("jwt",data.token)
        localStorage.setItem("user",JSON.stringify(data.user))
        M.toast({html:"signedin" , classes:"#c62828 green darken-3"})
        history.push('/')
      }
    }).catch(err => {
      console.log(err)
    })
  
  }

 
    return (
        <div>
        <div className="center">
        {/* <div className="col s12 m6"> */}
          <div className="card blue-grey darken-1 " style={{maxWidth:'500px'}} >
            <div className="card-content white-text">
              <span className="card-title">Signin</span>
            </div>
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
             onClick={()=>postdata()}
            />
            <div className="card-action">
              <Link to="/signup">Don't have account</Link>
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
