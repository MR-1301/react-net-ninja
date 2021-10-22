import {useState} from "react";
import {useHistory} from 'react-router-dom';

const Create = () => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [author, setAuthor] = useState('mario')
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        const newBlog = {title, body, author};

        fetch('http://localhost:8000/blogs', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newBlog)
        })
            .then(() => {
                console.log('new blog added!!');
                setIsPending(false);
                history.push('/');
            })
    }

    return (
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={(event) => handleSubmit(event)}>
                <label>Blog Title: </label>
                <input
                    type="text"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    required={true}
                />
                <label>Blog Body:</label>
                <textarea
                    required={true}
                    value={body}
                    onChange={(event) => setBody(event.target.value)}>
                    Add Body....
                </textarea>
                <label>Blog Author:</label>
                <select
                    value={author}
                    onChange={(event) => setAuthor(event.target.value)}>
                    <option value="mario">mario</option>
                    <option value="yoshi">yoshi</option>
                </select>
                {!isPending && <button>Add Blog</button>}
                {isPending && <button disabled={true}>Adding Blog...</button>}
            </form>
        </div>

    );
}

export default Create;