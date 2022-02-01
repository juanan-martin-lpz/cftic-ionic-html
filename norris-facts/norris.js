function getJoke() {

    let url = "https://api.chucknorris.io/jokes/random";

    fetch(url)
        .then(res => res.text())
        .then(result => addJoke(result))
        .catch(err => console.log(err));

}

function addJoke(result) {

    let json = JSON.parse(result);
    let div = document.getElementById("contenido");

    let img = document.createElement("img");
    let h3 = document.createElement("h3");

    h3.innerHTML = json.value;
    img.setAttribute("src", json.icon_url);

    div.appendChild(img);
    div.appendChild(h3);

}