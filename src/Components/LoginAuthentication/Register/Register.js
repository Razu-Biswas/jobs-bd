import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { useForm } from "react-hook-form";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../firebase.config';
import PaymentCard from '../../Payment/PaymentCard'
import { loadStripe } from '@stripe/stripe-js';
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

const Register = () => {
    const stripePromise = loadStripe(process.env.REACT_APP_Stripe_Api_Key);
    const [showPackages, setShowPackage] = useState(false)
    const [role, setRole] = useState(null)
    const [bundle, setBundle] = useState(null)

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        const newUserInfo = { ...data }
        newUserInfo.role = role
        newUserInfo.bundle = bundle

        if (role !== null) {

            if (role === 'employee' && bundle !== null) {
                handleRegister(newUserInfo)

            } else if (role === 'jobsSeeker') {
                handleRegister(newUserInfo)

            } else {
                alert('Please select a package')
            }

        } else {
            alert('please select your role')
        }
    };

    const handleChange = (e) => {
        if (e.target.value === 'employee') {

            setShowPackage(true)
            setRole('employee')

        } else if (e.target.value === 'jobsSeeker') {

            setShowPackage(false)
            setRole('jobsSeeker')
            setBundle('null')
        }
    }

    const handlePackageChange = (e) => {
        if (e.target.value !== 'null') {
            setBundle(e.target.value)
        }
    }


    const handleRegister = (userInfo) => {

        firebase.auth().createUserWithEmailAndPassword(userInfo.email, userInfo.password)
            .then((userCredential) => {

                userName(userInfo.name)
                registerUser(userInfo)
            })
            .catch((error) => {
                var errorMessage = error.message;
                alert(errorMessage);
            });

        const userName = (name) => {
            const user = firebase.auth().currentUser;
            user.updateProfile({
                displayName: name,
            })
                .then(result => alert('Account created successfully'))
        }
    }

    const registerUser = (userInfo) => {

        console.log(userInfo);

        const { name, email, role, bundle } = userInfo;

        const newUserInfo = {
            name: name,
            email: email,
            role: role,
            bundle: bundle,
        }

        fetch('https://jobs-in-bd.herokuapp.com/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUserInfo)
        }).then(response => response.json())
            .then(data => {
                console.log(data);
            })
    }

    return (
        <div className="w-100 d-flex justify-content-center ">
            <div className="w-50 text-center">
                <form onSubmit={handleSubmit(onSubmit)}>

                    <input className="form-control" type="text" placeholder="Enter Your Name" {...register("name", { required: true })} />
                    {errors.name && <span>This field is required</span>}

                    <br />

                    <input className="form-control" type="text" placeholder="Enter Your Email" {...register("email", { required: true })} />
                    {errors.email && <span>This field is required</span>}

                    <br />

                    <input className="form-control" type="text" placeholder="Enter a Password" {...register("password", { required: true })} />
                    {errors.password && <span>This field is required</span>}

                    <br />

                    <select className="form-control" onChange={handleChange} name='role' >
                        <option value="null"> ---Select your role---</option>
                        <option value="employee">Employee</option>
                        <option value="jobsSeeker">JobsSeeker</option>
                    </select>

                    <br />

                    {
                        showPackages &&
                        <>
                        <select className="form-control mb-3" onChange={handlePackageChange} name='bundle' >
                            <option value="null"> ---Select your package--- </option>
                            <option value="basic">basic</option>
                            <option value="standard">standard</option>
                            <option value="premium">premium</option>
                        </select>
                        <Elements stripe={stripePromise}>
                            <PaymentCard />
                        </Elements>
                        </>
                    }


                    

                    {/* <PaymentCard></PaymentCard> */}



                    <input className='btn btn-dark' type="submit" />
                </form>
            </div>
        </div>
    );
};

export default Register;