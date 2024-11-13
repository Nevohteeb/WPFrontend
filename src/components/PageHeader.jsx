import React from 'react'
import { useNavigate } from 'react-router-dom'

const PageHeader = ({ title, image_url }) => {
    const navigate = useNavigate();

    const handleBackClick = (event) => {
        event.preventDefault();
        navigate(-1);
    }

  return (
    <div className='header-section' style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url(${image_url})`}}>
      <p onClick={handleBackClick}><i className="fa-solid fa-arrow-left"></i> Back</p>
      <h1>{title}</h1>
    </div>
  )
}

export default PageHeader
