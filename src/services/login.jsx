const url = `${process.env.REACT_APP_API_URL}/login}`
export async function LoginController(props) {
    const {email, password} = props;
    const login = {
        email : email,
        password : password
    }

    const bodyRequest = {
        method : 'POST',
        headers : { 'Content-Type' : 'applications/json' },
        body : JSON.stringify(login)
    }

    const response = await fetch(url, bodyRequest)
    const data = await response.json();
    console.log(data)
}