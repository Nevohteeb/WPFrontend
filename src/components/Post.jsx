import {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PageHeader from './PageHeader';
// REACT HELMET
import { Helmet } from 'react-helmet';

// Bring in the baseurl for the api
const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const Post = () => {
  const { id } = useParams(); // get id parameter from url
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [seoData, setSeoData] = useState(null); // YOAST DATA

  const endpoint = `${baseUrl}/posts/${id}?_embed`;

  useEffect(() => {
    axios.get(`${endpoint}`)
    .then((response) => {
      console.log(response.data);
      setPost(response.data);
      setSeoData(reponse.data.yoast_head_json); // Set Yoast Data
      setLoading(false);
    })
    .catch((error) => console.log(error))
  }, [id]);

  // Featured image check
  function getFeaturedImage(post) {
    if (post && post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0].source_url) {
      return post._embedded['wp:featuredmedia'][0].source_url;
    } else {
      return 'https://via.placeholder.com/150';
    }
  }

  if (loading) {
    return <>Loading...</>
  }

  return (
    <>
      <Helmet>
        {/* Basic SEO */}
        <title>{post.title.rendered}</title>
        {seoData?.description && <meta name="description" content={seoData.description}/>}
      </Helmet>

      <PageHeader title="post" image_url='/header-bg-imgs/bg5.jpg'/>
      <div className='container'>
      <h2>Single Post:</h2>
      <div className='post-container'>
        <h4 className='title'>{post.title.rendered}</h4>
        <img src={getFeaturedImage(post)} alt={post.title.rendered + ' profile picture'}/>
        <div dangerouslySetInnerHTML={{__html: post.content.rendered}}/>
      </div>
    </div>
    </>
  )
}

export default Post
