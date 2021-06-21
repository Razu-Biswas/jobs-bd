import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";

const AddJobs = () => {

    const [allCategory, setCategory] = useState([])

    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        fetch('https://jobs-in-bd.herokuapp.com/category')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setCategory(data)
            })
    }, [])


    const onSubmit = data => {

        if (data.category !== 'null') {
            const jobData = { ...data }
            jobData.status = 'pending'

            fetch('https://jobs-in-bd.herokuapp.com/addJob', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jobData),
            }).then(response => response.json())
                .then((data) => {
                    console.log(data);
                })
        } else {
            alert('select a category');
        }
    };

    return (
        <div className='w-100 d-flex justify-content-center text-center'>
            <div className='w-50'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input className='form-control' placeholder='Enter Job Title' {...register("jobTitle", { required: true })} />
                    {errors.jobTitle && <span>This field is required</span>}

                    <br />

                    <select className='form-control' {...register("category")}>
                        <option value="null"> --- Select a category --- </option>
                        {
                            allCategory.map((category) => <option value={`${category.category}`}>{`${category.category}`}</option>)
                        }
                        {/* <option value="female">female</option>
                        <option value="male">male</option>
                        <option value="other">other</option> */}
                    </select>

                    <br />

                    <textarea className='form-control' placeholder='Enter Job Description' {...register("jobDescription", { required: true })} />
                    {errors.jobDescription && <span>This field is required</span>}

                    <br />

                    <input className='btn btn-dark' type="submit" value="Add JOb" />
                </form>
            </div>
        </div>
    );
};

export default AddJobs;