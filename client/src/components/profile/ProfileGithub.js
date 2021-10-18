import React, { useState, useEffect } from "react";

const ProfileGithub = ({ githubusername }) => {
  const [githubValues, setgithubValues] = useState({
    clientId: "ec33327e89a3ba2e01a9",
    clientSecret: "bca84dac0132a4a635e99ee1a89eebaf94d9c1b6",
    count: 5,
    sort: "created:asc",
    repos: {},
  });

  useEffect(() => {
    const { clientId, clientSecret, count, sort } = githubValues;
    fetch(
      process.env.REACT_APP_GITHUB_ENDPOINT +
        `${githubusername}/repos?per_page=${count}&&sort=${sort}&&client_id=${clientId}&&client_secret=${clientSecret}`
    )
      .then((res) => res.json())
      .then((data) => {
        setgithubValues({ ...githubValues, repos: data });
      });

    return () => {
      setgithubValues({});
    };
  }, []);

  const { repos } = githubValues;
  const repoItems = Object.keys(repos).map((repoKey) => (
    <div key={repos[repoKey].id} className="card card-body mb-2">
      <div className="row">
        <div className="col-md-6">
          <h4>
            <a href={repos[repoKey].html_url} className="text-info">
              {repos[repoKey].name}
            </a>
          </h4>
          <p>{repos[repoKey].description}</p>
        </div>
        <div className="col-md-6">
          <span className="badge badge-info mr-1">
            Stars: {repos[repoKey].stargazers_count}
          </span>
          <span className="badge badge-secondary mr-1">
            Watchers: {repos[repoKey].watchers_count}
          </span>
          <span className="badge badge-success">
            Forks: {repos[repoKey].forks_count}
          </span>
        </div>
      </div>
    </div>
  ));

  return (
    <div>
      <hr />
      <h3 className="mb-4">Latest Github Repos</h3>
      {repoItems}
    </div>
  );
};

export default ProfileGithub;
