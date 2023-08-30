document.addEventListener("DOMContentLoaded", function () {

    const navPatos = document.getElementById("duck-nav");
    const divPatosName = document.getElementById("duck-display-name");
    const divPatosFoto = document.getElementById("duck-display-image");
    const divBTNPatosLikes = document.getElementById("duck-display-likes");
    const formNuevoPato = document.getElementById("new-duck-form");
    const formNuevoPatoNombre = document.getElementById("duck-name-input");
    const formNuevoPatoImg = document.getElementById("duck-image-input");

    let actualLikes = 0

    function mostrarPatos(a) {
        
        divPatosName.textContent = a.name;
        divPatosFoto.src=a.img_url;
        divBTNPatosLikes.textContent = `${a.likes} likes!`;
        actualLikes = a.likes
    }


    fetch("http://localhost:3000/ducks")
    .then(response => response.json())
    .then(data => {

        data.forEach(pato => {
            const patosNavFotos = document.createElement("img");
            patosNavFotos.src = pato.img_url;
            navPatos.appendChild(patosNavFotos);
            
            patosNavFotos.addEventListener("click", () => {
            mostrarPatos (pato);
            });   
        }); 

        mostrarPatos (data[0]);

        divBTNPatosLikes.addEventListener("click", () => {
            console.log(actualLikes)
            actualLikes = actualLikes + 1
            console.log(actualLikes)
            divBTNPatosLikes.textContent = `${actualLikes} likes!`;
        });

        formNuevoPato.addEventListener("submit", (event) => {
            event.preventDefault()

            const newDuck = {
                id: data.length + 1, 
                name: formNuevoPatoNombre.value,
                img_url: formNuevoPatoImg.value,
                likes: 0
            };
            data.push(newDuck);
        })
    });
}); 