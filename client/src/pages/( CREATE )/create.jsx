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
        formData.append('content', content);
        if (image) formData.append('image', image);

        try {
            
            const response = await api.post('/posts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response);
            alert("Post created successfully!");
            
        } catch (error) {
            console.error("Failed to create post:", error);
            alert("Failed to create post.");
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
