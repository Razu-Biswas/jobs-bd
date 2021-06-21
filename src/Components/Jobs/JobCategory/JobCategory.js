import React from 'react';
import { useForm } from "react-hook-form";

const JobCategory = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => handleAdd(data);

    const handleAdd = (data) => {
        fetch('https://jobs-in-bd.herokuapp.com/addCategory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then(data => console.log(data))
    }

    return (
        <div className="w-100 d-flex justify-content-center">
            <div className="w-50 text-center">
                <h3>this is add category page </h3>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <input className='form-control' placeholder='Add a category' {...register("category", { required: true })} />
                    {errors.category && <span>This field is required</span>}

                    <br />

                    <input className='btn btn-dark' type="submit" />
                </form>
            </div>
        </div>
    );
};

export default JobCategory;