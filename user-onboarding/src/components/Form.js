import React from 'react'
import { withFormik, Form, Field} from "formik"


function UserForm() {
    // const [user, setUser] = useState({ name: "", email: "", password: "", terms : ""})

// const handleChange = event => {
//     setUser({ ...user, [event.target.name]: event.target.value})
// }

// const handleSubmit = event => {
//     event.preventDefault()
//     console.log(user.name)
//     console.log(user.email)
//     console.log(user.password)
// }

return (
        <Form>
                Name:
                <Field type="text" 
                        name="name" 
                        placeholder="Name"
                         />
                Email:
                <Field type="text" 
                        name="email" 
                        placeholder="Email"

                         />
                Password:
                <Field type="password" 
                        name="password" 
                        placeholder="Password"

                         />
                Terms and Conditions:
                <Field type="checkbox" 
                        name="terms" 
                         />
            <button>Submit!</button>
        </Form>
    )
}

const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, terms}) {
        return {
        name: name || "",
        email: email || "",
        password: password || "",
        terms: terms || "",
        }
    },

    handleSubmit(values) {
        console.log(values)
        //This is where you do form submissions codes, HTTP requests, etc.
    }
})(UserForm) 
export default FormikUserForm