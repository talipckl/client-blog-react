import React, { useEffect, useState } from "react";
import "./blog.css";
import { Link } from "react-router-dom";

export const Card = () => {
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.1.61/api/blog/posts');
        const data = await response.json();
        setBlogData(data.data);
      } catch (error) {
        console.error('Error fetching blog data', error);
      }
    };

    fetchData(); 
  }, []);

  return (
    <>
      <section className='blog'>
        <div className='container grid3'>
          {
          blogData.map((item) => (
            <div className='box boxItems' key={item.id}>
               <Link to={`/details/${item.id}`} className='link'></Link>
              <div className='img'>
                <img src={item.img} alt='' />
              </div>
              <h3>{item.title}</h3>
              <div className='details'>
               
                <p>{item.description}</p>
                  <h1>{item.relase_date}</h1>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
