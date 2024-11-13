import { useState, useEffect } from 'react';
import axios from 'axios';
import PageHeader from '../components/PageHeader';

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const Artists = () => {
    const [loading, setLoading] = useState(true);
    const [artists, setArtists] = useState(null);

    const endpoint = `${baseUrl}/artists`;

    useEffect(() => {
        axios.get(`${endpoint}`)
            .then((res) => {
                setArtists(res.data);
                setLoading(false);
            })
            .catch((err) => console.log(err));
    }, [])

    const Artists = ({artists}) => {
        const mappedArtists = artists.map((artist, index) => {
            return (
                <div key={artist.slug + "-" + index} className='artists-container'>
                    <h4 className='title'>{artist.title.rendered}</h4>
                    <div dangerouslySetInnerHTML={{__html: artist.content.rendered}}/>
                    <a href={`#/artists/${artist.id}`}>Read More...</a>
                </div>
            )
        });

        return (
            <>
                {mappedArtists}
            </>
        )
    }



    return (
        <>
            <PageHeader title="artists" image_url="/header-bg-imgs/bg2.jpg" />
            <div id="homeCont">
                {loading ? <p>Loading....</p> : <Artists artists={artists}/>}
            </div>
        </>
    )
}

export default Artists