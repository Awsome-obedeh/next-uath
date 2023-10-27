// we dont have to import bootstrap because our we have improted it in our (_app.js)which is global 
import { useState } from "react"
export default function RegisterForm(){
    // a state to hold my form inputs
    const [email,setEmail]=useState('');
    const [name,setName]=useState('');
    const [password, setPassword]=useState('');

    // 'state to handle my error messages'
    const [error,setError]=useState(false);

    // create a function to handle form submit
    async function sumbitHandler(e){
        // prevent the default form submission, so ast to prevent us from loosing our state values
        e.preventDefault()
        if(!name||!password||!email){
            setError('All input fields are needed')
            return
        }
        let body={
            name:name,
            password:password,
            email:email
        }
        body =JSON.stringify(body)

        // post our form data to an endpoint
        const user= axios.post('api/regsiter/',body);

    }

    return(
        <form action="" className="card card-body m-auto d-block w-50 mt-5" onSubmit={sumbitHandler}>
            <div className="form-input">
                <label htmlFor="" className="form-label">Email</label>
                <input type="text" className="form-control" 
                    name='email'
                    value={email}
                    // getting the form value and updating our state Email
                    onChange={(e)=>setEmail(e.target.value)}
                />
            </div>

            <div className="form-input">
                <label htmlFor="" className="form-label">Name</label>
                <input type="text" className="form-control" 
                    name="name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                />
            </div>

            <div className="form-input">
                <label htmlFor="" className="form-label">Password</label>
                <input type="text" className="form-control" 
                    name="password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    
                />
              
                    
            </div>
            {/* conditional rendering to show our error message*/}

            {
                // assignment make the error message dismissible
                // 2. put an eye in your password field
                error && <div class="alert alert-danger  alert-dismissible fade show" role="alert">
                <p>{error} </p>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
            }
      
            <button className="btn btn-success mt-4 mx-auto d-block ">Submit </button>

        </form>
    )
}