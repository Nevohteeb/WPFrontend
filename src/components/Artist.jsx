import {useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import PageHeader from './PageHeader';

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const Genres = ({artist}) => {
  const [taxonomies, setTaxonomies] = useState([]);

  useEffect(() => {
    if(!artist) {
      return;
    }

    const taxonomyEndpoint = artist._links["wp:term"][0].href;

    axios.get(`${taxonomyEndpoint}`)
      .then((res) => {
        setTaxonomies(res.data);
      })
      .catch((err) => console.log(err))
  }, [artist]);

  const renderedTaxonomies = taxonomies.map((taxonomy, index) => {
    return (
      <Link to={`/genre/${taxonomy.id}`} key={index}>
        <span className='taxonomy-term-pill'>
          {taxonomy.name}
        </span>
      </Link>
    )
  });

  return (
    <div>
      {renderedTaxonomies}
    </div>
  );

};

const Artist = () => {
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const {id} = useParams();

  const endpoint = `${baseUrl}/artists/${id}?_embed`;

  useEffect(() => {
    axios.get(`${endpoint}`)
      .then((res) => {
        setArtist(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err))
  }, []);

  // Featured image check
  function getFeaturedImage(artist) {
    if (artist && artist._embedded && artist._embedded['wp:featuredmedia'] && artist._embedded['wp:featuredmedia'][0].source_url) {
        return artist._embedded['wp:featuredmedia'][0].source_url;
    } else {
        return 'https://via.placeholder.com/150';
    }
}

  if (loading) {
    return <>Loading...</>
  }

  return (
    <>
      <PageHeader title={artist.title.rendered} image_url={getFeaturedImage(artist)}/>
      <div key={artist.slug} className='post-container'>
        <h4>{artist.title.rendered}</h4>
        <Genres artist={artist}/>
        <img src={getFeaturedImage(artist)} alt={artist.title.rendered + ' image'}/>
        <div dangerouslySetInnerHTML={{__html: artist.content.rendered}}/>
      </div>
    </>
  )
}

export default Artist
