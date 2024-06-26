import React, { useState } from "react";
import useApi from "../../hooks/use_api";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@mantine/core";

const Create = () => {
  const queryClient = useQueryClient();
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [viewImage, setViewImage] = useState(null);
  const api = useApi();

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setViewImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const sendPost = async () => {
    const formData = new FormData();
    formData.append("body", content);
    if (image) formData.append("image", image);

    try {
      const response = await api.post("/posts", formData);

      // This assumes your API returns a response with a status indicating success or failure.
      // Since the API class automatically parses JSON, you should have a JavaScript object here.
      if (!response.error) {
        queryClient.invalidateQueries("posts");
        alert("Post created successfully!");
      } else {
        // If the API response includes an 'error' field, use it for the error message
        throw new Error(response.error);
      }
    } catch (error) {
      console.error("Failed to create post:", error);
      // This will display a more specific error message if available, or a generic one otherwise.
      alert("Failed to create post: " + error.message);
    }
  };

  return (
    <div className="create-post-container flex flex-col gap-5 pt-5">
      <h1>Create a New Post</h1>
      {viewImage && (
        <img
          src={viewImage}
          className="max-w-xs aspect-square object-cover m-auto"
        />
      )}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        className="p-3 rounded-lg"
      />
      <input
        type="file"
        onChange={handleImageChange}
        accept="image/png, image/jpeg"
      />
      <Button onClick={sendPost}>Post</Button>
    </div>
  );
};

export default Create;
