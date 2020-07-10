import React, { useState, useEffect } from "react";

async function requestGithubUser(githubLogin, set) {
  try {
    const response = await fetch(
      `https://api.github.com/users/${githubLogin}`
    );
    const userData = await response.json();
    console.log(userData);
    set(userData);
  } catch (error) {
    console.error(error);
  }
}

function GitHubUser({ login }) {
  const [data, setData] = useState();

  useEffect(() => {
    if (!login) return;
    // fetch(`https://api.github.com/users/${login}`)
    //   .then(response => response.json())
    //   .then(setData)
    //   .catch(console.error);
    requestGithubUser(login, setData);
  }, [login]);

  if (data)
    return <pre>{JSON.stringify(data, null, 2)}</pre>;

  return null;
}

export default function App() {
  return <GitHubUser login="moonhighway" />;
}