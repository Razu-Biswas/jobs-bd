import React, { useEffect, useState } from 'react';

const JobHandling = () => {
    const [pendingJobs, setPendingJobs] = useState([])
    const [rejectedJobs, setRejectedJobs] = useState([])

    const loadData = () => {
        fetch('https://jobs-in-bd.herokuapp.com/allJobs')
            .then(response => response.json())
            .then(data => {
                const pending = data.filter(perData => perData.status === 'pending');
                setPendingJobs(pending);
                const rejected = data.filter(perData => perData.status === 'rejected')
                setRejectedJobs(rejected);
            })
    }

    useEffect(() => {
        loadData()
    }, [])

    const handleClicks = (id, action) => {



        if (action === 'approved') {
            console.log(id, action);
            update(id, action);
        } else if (action === 'rejected') {
            console.log(id, action);
            update(id, action);
        }

    }

    const update = (id, action) => {
        fetch(`https://jobs-in-bd.herokuapp.com/update/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: action })
        }).then(response => response.json())
            .then(data => {
                console.log(data);
                if (data) {
                    loadData()
                }
            })
    }

    return (
        <div className="w-100 d-flex justify-content-center">
            <div className="w-50">
                <h3>this is show jobs page </h3>
                {
                    pendingJobs.map(job =>

                        <li className="m-3" key={job._id}> jobs title: {job.jobTitle} <button onClick={() => handleClicks(job._id, 'approved')} className="btn btn-success">Approve</button> <button onClick={() => handleClicks(job._id, 'rejected')} className="btn btn-danger">Reject</button> </li>

                    )
                }
            </div>
        </div>
    );
};

export default JobHandling;