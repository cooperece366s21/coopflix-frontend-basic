const loginResponse = document.getElementById("login-response");

function handleSubmit(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  const authObj = Object.fromEntries(data.entries());
  fetch("http://localhost:4567/login", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(authObj)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      } else {
        return response.json();
      }
    })
    .then(json => {
      // todo: fix cors
      // window.localStorage.setItem('coopflixuser', response.headers.coopflixuser);
      window.localStorage.setItem("coopflixuser", json.id);
      window.location.replace("index.html");
    })
    .catch(err => {
      loginResponse.innerHTML = err.message;
    });
}

const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);
