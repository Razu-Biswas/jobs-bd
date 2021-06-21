import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../firebase.config';
import { infoContext } from '../../../App';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

const Login = () => {

    const [info, setInfo] = useContext(infoContext)

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {

        firebase.auth().signInWithEmailAndPassword(data.email, data.password)
            .then((userCredential) => {
                const { email } = userCredential.user;
                handleLogin(email);
            })
            .catch((error) => {
                var errorMessage = error.message;
                console.log(errorMessage);
                alert(errorMessage);
            });
    };

    const handleLogin = (email) => {
        console.log(email);
        fetch(`https://jobs-in-bd.herokuapp.com/userInfo?email=${email}`)
            .then(response => response.json())
            .then(data => {
                const newInfo = { ...info }
                newInfo.userInfo = data
                setInfo(newInfo)

            })
    }

    console.log(info);

    return (
        <div className='w-100 d-flex justify-content-center' >
            <div className='w-50 text-center'>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <input className="form-control" type="text" placeholder="Enter your Email" {...register("email", { required: true })} />
                    {errors.email && <span>This field is required</span>}

                    <br />

                    <input className="form-control" type="text" placeholder="Enter your Password" {...register("password", { required: true })} />
                    {errors.password && <span>This field is required</span>}

                    <br />

                    <input className='btn btn-dark' type="submit" />
                </form>
            </div>
        </div>
    );
};

export default Login;