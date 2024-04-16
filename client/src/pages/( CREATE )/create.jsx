import React, { useState } from 'react';
import useApi from '../../hooks/use_api';

const Create = () => {
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const api = useApi(); 

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const sendPost = async () => {
        const formData = new FormData();
        formData.append('body', content);
        if (image) formData.append('image', image);
    
        try {
            const response = await api.post('/posts', formData);
    
            // Check if the response status is OK (200)
            if (response.ok) {
                console.log(response);
                alert("Post created successfully!");
            } else {
                // If response status is not OK, handle the error
                const errorMessage = await response.text(); // Get the plain text error message
                throw new Error(errorMessage); // Throw an error with the message
            }
        } catch (error) {
            console.error("Failed to create post:", error);
            alert("Failed to create post: " + error.message); // Display the error message to the user
        }
    };
    

    return (
        <div className="create-post-container">
            <h1>Create a New Post</h1>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's on your mind?"
            />
            <input type="file" onChange={handleImageChange} />
            <button onClick={sendPost}>Post</button>
        </div>
    );
};

export default Create;
