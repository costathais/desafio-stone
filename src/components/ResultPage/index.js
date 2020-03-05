import React, { useState, useEffect } from "../../../node_modules/react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./styles.css";

axios.defaults.baseURL = "http://api.github.com";

const ResultPage = () => {
  const [userData, setUserData] = useState(null);
  const [userRepos, setUserRepos] = useState([]);
  const { userId } = useParams();

  const getUser = () => {
    axios
      .get(`/users/${userId}`)
      .then(({ data }) => {
        setUserData(data);
      })
      .catch(() => setUserData(null));
  };

  const getRepos = () => {
    axios
      .get(`/users/${userId}/repos`)
      .then(({ data }) => {
        setUserRepos(data);
      })
      .catch(() => setUserRepos([]));
  };

  useEffect(() => {
    getUser();
    getRepos();
  }, []);

  console.log("user", userData, "repo", userRepos);

  return (
    <div className="App">
      <div className="result-container">
        <Link class="back-button" to="/desafio-stone">
          Voltar para a busca
        </Link>
        {!userData || !userData.name ? (
          <h3 className="not-found">
            Usuário não encontrado. Volte para a busca e tente novamente.{" "}
          </h3>
        ) : (
          <div className="user-data">
            {/* <h3>Dados do usuário:</h3> */}
            <img
              className="user-img"
              src={userData.avatar_url}
              alt={userData.name}
            />
            {userData.name ? (
              <div className="user-name">Nome: {userData.name}</div>
            ) : null}
            {userData.email ? (
              <div className="user-email">Email: {userData.email}</div>
            ) : null}
            {userData.following ? (
              <div className="user-following">
                Seguindo: {userData.following}
              </div>
            ) : null}
            {userData.followers ? (
              <div className="user-followers">
                Seguidores: {userData.followers}
              </div>
            ) : null}
            {userData.bio ? (
              <div className="user-bio">Bio: {userData.bio}</div>
            ) : null}
          </div>
        )}
        {/* <h3>Repositórios:</h3>                   */}
        <div className="repo-container">
          {userData && userData.name
            ? userRepos.map((repo, key) => (
                <div className="repo-info" key={`repo-${key}`}>
                  <div className="repo-link">
                    Repositório: <a href={repo.html_url}>{repo.name}</a>
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
