import {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PageHeader from './PageHeader';
import Seo from './Seo';

// Bring in the baseurl for the api
const baseUrl = import.meta.env.VITE_WP_API_BASEURL;


const Dinosaur = () => {
  const { id } = useParams(); // get id parameter from url
  const [dino, setDino] = useState(null);
  const [loading, setLoading] = useState(true);

  const endpoint = `${baseUrl}/dinosaurs/${id}?_embed`;

  useEffect(() => {
    axios.get(`${endpoint}`)
    .then((response) => {
      console.log(response.data);
      setDino(response.data);
      setLoading(false);
    })
    .catch((error) => console.log(error))
  }, [id]);

  // Featured image check
  function getFeaturedImage(dino) {
    if (dino && dino._embedded && dino._embedded['wp:featuredmedia'] && dino._embedded['wp:featuredmedia'][0].source_url) {
      return dino._embedded['wp:featuredmedia'][0].source_url;
    } else {
      return 'https://via.placeholder.com/150';
    }
  }

  if (loading) {
    return <>Loading...</>
  }

  return (
    <>
      <Seo
        title={dino.yoast_head_json?.title || `${dino.title.rendered} - My First Wp` }
        description={dino.yoast_head_json?.description}
        image={dino.yoast_head_json?.og_image?.[0]?.url}
        url={window.location.href}
      />
      <PageHeader title='single dino' image_url='/header-bg-imgs/bg4.jpg'/>
      <div className='container'>
      <div className='post-container'>
        <h4 className='title'>{dino.title.rendered}</h4>
        <img src={getFeaturedImage(dino)} alt={dino.title.rendered + ' profile picture'}/>
        <p>{dino.acf.dietary_choices[0]}</p>
        <div dangerouslySetInnerHTML={{__html: dino.content.rendered}}/>
      </div>
    </div>
    </>
  )
}

export default Dinosaur
