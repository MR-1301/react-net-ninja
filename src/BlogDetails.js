import {useParams, useHistory} from 'react-router-dom'
import useFetch from "./useFetch";
import {useState} from "react";

const BlogDetails = () => {
    const {id} = useParams();
    const {data: blog, error, isPending} = useFetch('http://localhost:8000/blogs/' + id)
    const history = useHistory();


    const deleteBlog = () => {
        fetch('http://localhost:8000/blogs/' + id, {
            method: 'DELETE'
        }).then(() => {
            console.log("deleted")
            history.push('/')
        })
    };

    return (

        <div className="blog-details">
            {isPending && <div>Loading....</div>}
            {error && <div>{error} < /div>}
            {blog && (
                <article>
                    <h2>{blog.title}</h2>
                    <p>Written by - {blog.author}</p>
                    <div>{blog.body}</div>
                </article>
            )}
            {!isPending && !error && <button onClick={deleteBlog}>Delete</button>}
        </div>
    );
};

export default BlogDetails;