document.addEventListener("DOMContentLoaded", function () {

    const divDucdisplay = document.getElementById("duck-nav");
    const divPatoName = document.getElementById("duck-display-name");
    const divPatoImg = document.getElementById("duck-display-image");
    const btnPatoLikes = document.getElementById("duck-display-likes");
    const boxPatoID = document.getElementById("borrar pato");
    const formNewPato = document.getElementById("new-duck-form");
    

    fetch("http://localhost:3000/ducks")
    .then(rspd => rspd.json())
    .then(data => {
        data.forEach(pato => {
            showAll(pato);
        });
        showAtFront(data[0]); 
    });

    function showAll(a) {
        const navDuckimg = document.createElement('img');
        navDuckimg.src = a.img_url;
        divDucdisplay.append(navDuckimg);

        navDuckimg.addEventListener("click",function() {
            showAtFront(a);
        });
    }

    function showAtFront(a){
        divPatoName.textContent = a.name;
        divPatoImg.src = a.img_url;
        btnPatoLikes.textContent = `${a.likes} likes!`;
        boxPatoID.textContent = `Delete duck:#${a.id}`;

    }

    function postnewpato (a) {
        const navDuckimg = document.createElement('img');
        navDuckimg.src = a.img_url;
        divDucdisplay.append(navDuckimg);
      
    }


    btnPatoLikes.addEventListener("click", function() {
        
        let textoConLikes = btnPatoLikes.textContent;
        let currentlikes = parseInt(textoConLikes.slice(0, -7)) ;
        currentlikes = currentlikes + 1;
        btnPatoLikes.textContent = `${currentlikes} likes!`;

        const updateLikesPatos = {
            likes: currentlikes
        }

        let textoConID = boxPatoID.textContent
        let currenID = parseInt(textoConID.substring(13));
        

        fetch(`http://localhost:3000/ducks/${currenID}`, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateLikesPatos)
        })
            .then(response => {
                location.reload()
        })
    });

    formNewPato.addEventListener('submit', event => {
        event.preventDefault();

        const newDuckName = document.getElementById("duck-name-input").value;
        const newDuckImg = document.getElementById("duck-image-input").value;

        const nuevopato = {
            id : "",
            name : newDuckName,
            img_url : newDuckImg,
            likes: 0
        }

        postnewpato(nuevopato);

       

        fetch(`http://localhost:3000/ducks/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevopato)
        })
        .then(response => response.json())
        .then(newdataadded => {
            location.reload()
        })
    });

    boxPatoID.addEventListener("click", function() {
        let textoConID = boxPatoID.textContent
        let currenID = parseInt(textoConID.substring(13));
       
        fetch(`http://localhost:3000/ducks/${currenID}`, {
            method: 'DELETE',
        })
        .then(resp => {
            location.reload()
        })
    });
}); 