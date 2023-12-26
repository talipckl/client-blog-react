import React, { useEffect, useState } from "react";
import "./blog.css";
import { Link } from "react-router-dom";

export const Card = () => {
  let token = localStorage.getItem('token')
  const [blogData, setBlogData] = useState([]);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL+'/blog/posts');
        const data = await response.json();
        setBlogData(data.data);
      } catch (error) {
        console.error('Error fetching blog data', error);
      }
    };

    fetchData(); 
  }, []);

  const deleteHandle = async (postId) => {
    try {
      console.log(postId);
      await fetch(`${process.env.REACT_APP_API_URL}/blog/posts/${postId}/delete`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          'Authorization': 'Bearer ' + token
        },
      });
      setBlogData((prevData) => prevData.filter((item) => item.id !== postId));
    } catch (error) {
      console.error('Error deleting blog post', error);
    }
  };

  return (
    <>
      <section className='blog'>
        <div className='container grid3'>
          {blogData.map((item) => (
            <div className='box boxItems' key={item.id}>
              <Link to={`/details/${item.id}`} className='link'></Link>
              <div className='img'>
                <img src={item.img} alt='' />
              </div>
              <h3>{item.title}</h3>
              <div className='details'>
                <p>{item.description}</p>
                <h1>{item.relase_date}</h1>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => deleteHandle(item.id)}
                >
                  Sil
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
