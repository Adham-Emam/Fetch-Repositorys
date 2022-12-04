let githubUsernameInput = document.querySelector(".username-input input");
let getGithubReboButton = document.querySelector(".username-input button");
let githubReposOutput = document.querySelector(".repositories");

if (githubReposOutput.innerHTML == "") {
  githubReposOutput.textContent = "No Data to Show";
}

getGithubReboButton.addEventListener("click", () => {
  fetch(`https://api.github.com/users/${githubUsernameInput.value}/repos`)
    .then((result) => {
      let myRepos = result.json();
      return myRepos;
    })
    .then((Repos) => {
      githubReposOutput.replaceChildren();
      if (Repos.length !== 0) {
        for (i = 0; i < Repos.length; i++) {
          let repository = document.createElement("div");
          repository.className = "repo";

          let repositoryName = document.createElement("p");
          repositoryName.textContent = Repos[i].name;

          let starsNum = document.createElement("span");
          starsNum.textContent = `Stars ${Repos[i].stargazers_count}`;

          let visitRepo = document.createElement("a");
          visitRepo.textContent = "Visit Repo";
          visitRepo.setAttribute("href", Repos[i].html_url);
          visitRepo.setAttribute("target", "_blank");

          repository.append(repositoryName);
          repository.append(starsNum);
          repository.append(visitRepo);
          githubReposOutput.append(repository);
        }
      } else if (Repos.length === 0) {
        githubReposOutput.append(document.createTextNode("No Data Found"));
      }
    });
  githubUsernameInput.value = "";
});
