import React,{useState} from 'react'
import M from 'materialize-css'
import {useHistory} from 'react-router-dom'
export const Forgot = () => {
    const history = useHistory()
    const [pwd1,setPwd1] = useState()
    const [pwd2,setPwd2] = useState()
    const changepassword = () => {
        if(pwd1===pwd2){
            fetch('/change',{         

                method:"post",
                headers:{"Content-Type":"application/json",
                        "Authorization":"Bearer "+localStorage.getItem("jwt")
                    },
                    body:JSON.stringify({
                        pwd1
                    })
            }).then(res=>res.json())
            .then(result => {
                M.toast({html:result.success,classes:"#c62828 green darken-3"})
                localStorage.clear()
                history.push('/signin')
            })
        }
        else {
            M.toast({html:"password not confirmed",classes:"#c62828 red darken-3"})
        }
      
    }
    return (
        <div className="Card">
            <h1>Change password</h1>
            <input 
                type="password"
                value={pwd1}
                placeholder="New Password"
                onChange={(e)=>setPwd1(e.target.value)}
            />
            <input 
                type="password"
                value={pwd2}
                placeholder="Confirm Password"
                onChange={(e)=>setPwd2(e.target.value)}
            />
            <button onClick={()=>changepassword()}>
                change password
            </button>
        </div>
    )
}
