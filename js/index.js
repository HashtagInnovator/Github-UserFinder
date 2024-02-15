var data;

async function fetchGitHubUserData(userId) {
  // Create a request for the user's data on GitHub
  if (!userId) {
    alert("Please Enter a Valid UserName");
  } else {
    var api = `https://api.github.com/users/${userId}`;
    try {
      const response = await fetch(api);
      if (!response.ok) {
        console.log(`Response Error: ${response.statusText}`);
        alert("User Not Found");
      }

      const jsonData = await response.json();
      data = jsonData;
      console.log(jsonData);
      return jsonData;
    } catch (error) {
      console.error(error.message);
    }
  }
}

function getUserName() {
  document.addEventListener("DOMContentLoaded", function () {
    let search = document.getElementById("search");

    search.addEventListener("keydown", async function (event) {
      if (event.key === "Enter" || event.code === "Enter") {
        let userName = search.value;
        await fetchGitHubUserData(userName);
        await displayDataFromDom(data);
      }
    });
  });
}

function displayDataFromDom(jsondata) {
  let avatar_url = jsondata.avatar_url;
  let bio = jsondata.bio;
  let name = jsondata.name;
  let followers = jsondata.followers;
  let following = jsondata.following;
  let twitter_username = jsondata.twitter_username;
  let location = jsondata.location;
  let repos = jsondata.public_repos;
  // Display the Data in HTML page
  let author = document.getElementById("author");
  author.innerHTML = name;

  let bioDom = document.getElementById("bio");
  bioDom.innerHTML = bio;

  let followersDom = document.getElementById("followers");
  followersDom.innerHTML = followers;

  let followingDom = document.getElementById("following");
  followingDom.innerHTML = following;

  let reposDom = document.getElementById("repos");
  reposDom.innerHTML = repos;

  let imgDom = document.getElementById("avatar");
  imgDom.src = avatar_url;

  let locationDom = document.getElementById("location");
  locationDom.innerHTML = location;

  let twitterName = document.getElementById("twitter");
  twitterName.innerHTML = twitter_username;
}

getUserName();
