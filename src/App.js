import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
      console.log(response);
    });
  }, []);


  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Challenge BootCamp GoStack',
      url: 'https://github.com/lmourabraga/node-portfolio',
      techs: ['Frontend, Mobile, Backend']
    });
    
    const repository = response.data;
    
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    
    const result = repositories.filter(repository => repository.id !== id);

    setRepositories(result);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository =>
            <li key={repository.id}>
              {repository.title}

              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>)
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
