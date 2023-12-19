import React, { useState, useEffect } from "react";
import "./create.css";
import { useHistory } from "react-router-dom";
import axios from "axios";

export const Create = () => {
  let token = localStorage.getItem('token')
  
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const history = useHistory();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://192.168.1.61/api/blog/category");
        console.log(response);
      
          const data = await response.json();
          setCategories(data.data); 
       
      
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories(); 
  }, []); 

  if(!token){
    history.push("/login");
  }

  const handleCreatePost = async () => {
    try {
      const response = await fetch("http://192.168.1.61/api/blog/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({
          title: title,
          description: description,
          category_id: selectedCategory.id,
        }),
      });

      if (response.ok) {
        console.log("Post created successfully!");
      
        history.push("/");
      
      } else {
        console.error("Failed to create post:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <>
      <section className='newPost'>
        <div className='container boxItems'>
          <form>
            <div className="box boxItems">
              {
              categories.length > 0 ? ( 
                <select className=".inputfile input" value={selectedCategory} onChange={(e) => setSelectedCategory(JSON.parse(e.target.value))}>
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category.id} value={JSON.stringify(category)}>
                    {category.name}
                  </option>
                ))}
              </select>
              
              ) : (
                <p>Loading categories...</p>
              )}
            </div>
            <input type='text' placeholder='image URL' value={image} onChange={(e) => setImage(e.target.value)} />
            <input type='text' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea name='' id='' cols='30' rows='10' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            <button className='button' type='button' onClick={handleCreatePost}>
              Create Post
            </button>
          </form>
        </div>
      </section>
    </>
  );
};
