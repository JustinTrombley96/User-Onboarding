import React from 'react'
import { withFormik, Form, Field} from "formik"
import * as Yup from 'yup'
import axios from "axios"


function UserForm({ values, errors, touched }) {

return (
        <Form>
            <div>
            {touched.name && errors.name && <h3>{errors.name}</h3>} 

                Name:
                <Field type="text" 
                        name="name" 
                        placeholder="Name"
                         />
            </div>
            <div>
            {touched.email && errors.email && <h3>{errors.email}</h3>} 
                
                Email:
                <Field type="email" 
                        name="email" 
                        placeholder="Email"

                         />
            </div>
            <div>
            {touched.password && errors.password && <h3>{errors.password}</h3>} 

                Password:
                <Field type="password" 
                        name="password" 
                        placeholder="Password"

                         />
            </div>
            <div>
                <label>
            {touched.terms && errors.terms && <h3>{errors.terms}</h3>} 

                Terms and Conditions:
                <Field type="checkbox" 
                        name="terms" 
                        checked={values.terms}
                         />
                </label>
            </div>
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
        //If you set terms to false instead of an empty string, 
        //then terms isn't required.
        }
    },

    //Validation Schema
    validationSchema: Yup.object().shape({
        name: Yup.string()
            .required("A name is required")
            .max(30, "This name is way too long."),
        email: Yup.string()
            .email("This is not an email")
            .required("Email is required"),
        password: Yup.string()
            .min(6, "Your password must have a minimum of six characters.")
            .required("Password is required"),
        terms: Yup.string()
            .required("You sign up on my terms, not yours.")
        
    }),

    handleSubmit(values, {resetForm, setErrors, setSubmitting }) {
        console.log(values)
            if (values.email === "alreadytaken@atb.dev") {
                setErrors({ email: "That email is already taken"})
            } else {
                axios
                    .post("https://reqres.in/api/users", values)
                    .then(res => {
                        console.log("Success", res) //Data created successfully and logged to console
                        resetForm();
                        setSubmitting(false)
                    })
                    .catch(err => {
                        console.log(err) //There was an aerror creating the data and logs to console
                        setSubmitting(false)
                    })
            }
        }
    })(UserForm) 
export default FormikUserForm