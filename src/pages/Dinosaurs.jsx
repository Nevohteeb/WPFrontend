import { useState, useEffect } from "react";
import axios from "axios";
import PageHeader from "../components/PageHeader";

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const Dinosaurs = () => {
  const [dinos, setDinos] = useState(null);
  const [loading, setLoading] = useState(true);

  const endpoint = `${baseUrl}/dinosaurs?_embed`;

  useEffect(() => {
    axios
      .get(`${endpoint}`)
      .then((response) => {
        setDinos(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const Dinos = ({ dinos }) => {
    const mappedDinos = dinos.map((dino, index) => {
      // Featured image check
      function getFeaturedImage(dino) {
        if (
          dino &&
          dino._embedded &&
          dino._embedded["wp:featuredmedia"] &&
          dino._embedded["wp:featuredmedia"][0].source_url
        ) {
          return dino._embedded["wp:featuredmedia"][0].source_url;
        } else {
          return "https://via.placeholder.com/150";
        }
      }

      return (
        <div key={dino.slug + "-" + index} className="post-container">
          <h4 className="title">{dino.title.rendered}</h4>
          <img src={getFeaturedImage(dino)} alt={dino.title.rendered} />
          <div dangerouslySetInnerHTML={{ __html: dino.content.rendered }} />
          <div>Key: {dino.slug + "-" + index}</div>
          <li key={Dinos.slug + "-" + index}>
            <a href={`#/dinosaur/${dino.id}`}>Read More...</a>
          </li>
        </div>
      );
    });

    // return of dinos component
    return <>{mappedDinos}</>;
  };

  return (
    <>
      <PageHeader title="dinosaurs" image_url="/header-bg-imgs/bg3.jpg"/>
      <div className="container">
        <h2>Dinosaurs:</h2>
        <div id="dinosCont">
          {loading ? <p>Loading...</p> : <Dinos dinos={dinos} />}
        </div>
      </div>
    </>
  );
};

export default Dinosaurs;
