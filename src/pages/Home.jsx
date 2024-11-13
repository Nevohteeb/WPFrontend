import {useEffect, useState} from 'react'
import HomeHeader from '../components/HomeHeader'
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
// SEO
import Seo from '../components/Seo';

// Bring in endpoint from the env file
const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const Home = () => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  const endpoint = `${baseUrl}/posts?_embed`

  useEffect(() => {
    axios.get(`${endpoint}`)
    .then((res) => {
      console.log(res);
      setPosts(res.data);
      setLoading(false);
    })
    .catch((error) => console.log(error))
  }, []);

  const Posts = ({posts}) => {
    const mappedPosts = posts.map((post, index) => {
      return (
        <div key={post.slug + "-" + index} className='post-container'>
          <h4 className='title'>{post.title.rendered}</h4>
          <div dangerouslySetInnerHTML={{__html: post.excerpt.rendered}}/>
          <li>
            <a href={`#/post/${post.id}`}>Read More..</a>
            <p>{formatDistanceToNow(post.date, {addSuffix: true})}</p>
          </li>
        </div>
      );
    }); // end of map

    return (
      <>
        {/* All of our posts */}
        {mappedPosts}
      </>
    )
  }

  return (
    <>
      <Seo
        title="Home - My First Wp"
        description="Browse my amazing Wordpress Post for my custom site"
        url={window.location.href}
      />
      <HomeHeader/>
      <div id="homeCont">
        {loading ? <p>Loading...</p> : <Posts posts={posts}/>}
      </div>
    </>
  )
}

export default Home
