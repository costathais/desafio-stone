import React, { useState, useEffect } from "../../../node_modules/react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./styles.css";

axios.defaults.baseURL = "https://developer.github.com/v3/";

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
        <Link class="back-button" to="/">
          Voltar para a busca
        </Link>
        {!userData || !userData.name ? (
          <div>Usuário não encontrado. </div>
        ) : (
          <div className="user-data">
            <img
              className="user-img"
              src={userData.avatar_url}
              alt={userData.name}
            />
            {/* <div className="user-name">Nome: {userData.name}</div>
            <div className="user-email">Email: {userData.email}</div>
            <div className="user-following">Seguindo: {userData.following}</div>
            <div className="user-followers">Seguidores: {userData.followers}</div> */}
            {userData.name ? ( <div className="user-name">Nome: {userData.name}</div>) : null}
            {userData.email ? ( <div className="user-email">Email: {userData.email}</div>) : null}
            {userData.following ? ( <div className="user-following">Seguindo: {userData.following}</div>) : null}
            {userData.followers ? ( <div className="user-followers">Seguidores: {userData.followers}</div>) : null}
            {userData.bio ? ( <div className="user-bio">Bio: {userData.bio}</div>) : null}
          </div>
        )}

        {userData && userData.name
          ? userRepos.map((repo, key) => (
              <div className="repo-container">
                <h3>Repositories</h3>
                <div className="repo-info" key={`repo-${key}`}>
                  <div>Repo: {repo.name}</div>
                  <div>
                    <a href={repo.html_url}>Acesse</a>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default ResultPage;
