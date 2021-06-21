import React, { useEffect, useState } from 'react';

const ShowJobs = () => {
    const [jobs, setJobs] = useState([])
    const [allCategory, setCategory] = useState([])
    const [filterByCategory, setFilterByCategory] = useState([])

    const loadCategory = () => {
        fetch('https://jobs-in-bd.herokuapp.com/category')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setCategory(data)
            })
    }

    const loadData = () => {
        fetch('https://jobs-in-bd.herokuapp.com/allJobs')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setJobs(data)
            })
    }

    useEffect(() => {

        loadCategory()
        loadData()

    }, [])

    const handleChange = (e) => {
        console.log(filterByCategory);
        if (e.target.value !== 'null') {
            const filterData = jobs.filter(job => job.category === e.target.value)
            console.log(filterData);
            setFilterByCategory(filterData)
        }
    }

    const handleApply = () => {
        alert('Applied successfully')
    }

    return (
        <div className="w-100 d-flex justify-content-center">
            <div className="w-50">
                <div>
                    <div class="input-group">
                        <select class="form-select text-center" onChange={(e) => handleChange(e)} name="category" id="categoryList" aria-label="Example select with button addon">
                            <option value='null' selected> ----filter with category-----</option>
                            {
                                allCategory.map((category) => <option value={`${category.category}`}>{`${category.category}`}</option>)
                            }
                        </select>
                    </div>
                </div>
                <h3>this is show jobs page </h3>
                {
                    filterByCategory.length < 1 ?
                        jobs.map(job =>
                            <li className='m-3' key={job._id}> jobs title: {job.jobTitle} -----  category: {job.category} <button className="btn btn-success" onClick={() => handleApply()}>Apply</button></li>
                        )
                        :
                        filterByCategory.map(job =>
                            <li className='m-3' key={job._id}> jobs title: {job.jobTitle} -----  category: {job.category} <button className="btn btn-success" onClick={() => handleApply()}>Apply</button> </li>
                        )
                }
            </div>
        </div>
    );
};

export default ShowJobs;