import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./publish.css";

const Publish = ({ userToken, setDisplayModalLogin, setDisplayPublish }) => {
  const history = useHistory();

  if (!userToken) {
    setDisplayPublish(false);
    setDisplayModalLogin(true);

    history.push("/");
  }
  const [pbTitle, setPbTitle] = useState("");
  const [pbDescription, setPbDescription] = useState("");
  const [pbBrand, setPbBrand] = useState("");
  const [pbSize, setPbSize] = useState("");
  const [pbColor, setPbColor] = useState("");
  const [pbCondition, setPbCondition] = useState("");
  const [pbCity, setPbCity] = useState("");
  const [pbPrice, setPbPrice] = useState("");
  const [pbPicture, setPbPicture] = useState();

  const handlerPublishButton = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", pbTitle);
    formData.append("price", pbPrice);
    formData.append("city", pbCity);
    formData.append("brand", pbBrand);
    formData.append("condition", pbCondition);
    formData.append("description", pbDescription);
    formData.append("color", pbColor);
    formData.append("size", pbSize);
    formData.append("picture", pbPicture);
    console.log("submit");
    try {
      const response = await axios.post(
        "https://vinted-api-v1.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            Authorization: "Bearer " + userToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      history.push(`offer/${response.data.id}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <main className="main-publish">
      <form onSubmit={handlerPublishButton} className="publish container">
        <h1>Vends ton article</h1>
        <section className="publish-photo">
          <div className="photo-container">
            <input
              type="file"
              onChange={(event) => setPbPicture(event.target.files[0])}
            />
          </div>
        </section>
        <section className="publish-description">
          <div className="publish-description-title">
            <div className="publish-description-title-col-1">Titre</div>
            <div className="publish-description-title-col-2">
              <input
                value={pbTitle}
                onChange={(event) => setPbTitle(event.target.value)}
                type="text"
                placeholder="ex: Chemise Sézane verte"
              />
            </div>
          </div>
          <div className="publish-description-dec">
            <div className="publish-description-dec-col-1">
              Décrit ton article
            </div>
            <div className="publish-description-dec-col-2">
              <textarea
                value={pbDescription}
                onChange={(event) => setPbDescription(event.target.value)}
                placeholder="ex: porté quelque fois, taille correctement"
                cols="90"
                rows="6"
              ></textarea>
            </div>
          </div>
        </section>
        <section className="publish-details">
          <div>
            <div>Marque</div>
            <div>
              <input
                value={pbBrand}
                onChange={(event) => setPbBrand(event.target.value)}
                type="text"
                placeholder="ex: Zara"
              />
            </div>
          </div>
          <div>
            <div>Taille</div>
            <div>
              <input
                value={pbSize}
                onChange={(event) => setPbSize(event.target.value)}
                type="text"
                placeholder="ex: L / 40 / 12"
              />
            </div>
          </div>
          <div>
            <div>Couleur</div>
            <div>
              <input
                value={pbColor}
                onChange={(event) => setPbColor(event.target.value)}
                type="text"
                placeholder="ex: Fusia"
              />
            </div>
          </div>
          <div>
            <div>Etat</div>
            <div>
              <input
                value={pbCondition}
                onChange={(event) => setPbCondition(event.target.value)}
                type="text"
                placeholder="ex: Neuf avec étiquette"
              />
            </div>
          </div>
          <div>
            <div>Lieu</div>
            <div>
              <input
                value={pbCity}
                onChange={(event) => setPbCity(event.target.value)}
                type="text"
                placeholder="ex: Paris"
              />
            </div>
          </div>
        </section>
        <section className="publish-price">
          <div>
            <div>Prix</div>
            <div>
              <div>
                <input
                  value={pbPrice}
                  onChange={(event) => setPbPrice(Number(event.target.value))}
                  type="text"
                  placeholder="0.00€"
                />
              </div>
              <div className="publish-price-col-2-bottom">
                {" "}
                <input type="checkbox" />{" "}
                <label>Je suis intéressé(e) par les échanges</label>
              </div>
            </div>
          </div>
        </section>
        <div className="publish-add-btn">
          <button type="submit">Ajouter</button>
        </div>
      </form>
    </main>
  );
};

export default Publish;
