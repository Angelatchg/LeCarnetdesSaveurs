document.addEventListener('DOMContentLoaded', function() {
    const vignettesContainer = document.getElementById('vignettes-container');

    // Charger les vignettes à partir du fichier JSON
    fetch('../data/vignettes.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(vignette => {

                const vignetteElement = document.createElement('div');
                vignetteElement.classList.add('vignette');

                const imgElement = document.createElement('img');
                imgElement.src = vignette.banniere;
                vignetteElement.appendChild(imgElement);

                const titleElement = document.createElement('h2');
                titleElement.textContent = vignette.titre;
                vignetteElement.appendChild(titleElement);

                const descriptionElement = document.createElement('p');
                descriptionElement.textContent = vignette.description;
                vignetteElement.appendChild(descriptionElement);

                vignettesContainer.appendChild(vignetteElement);
            });
        })
        .catch(error => {
            console.error('Une erreur s\'est produite lors du chargement des vignettes :', error);
        });
});