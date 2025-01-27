document.addEventListener('DOMContentLoaded', function() {
    const dropdownLinks = document.querySelectorAll('#dropdown-menu a');
    const restaurantsContainer = document.getElementById('vignettes-container');
    let restaurantsData = []; 


    function loadRestaurantsData() {
        fetch('../data/restaurants.json')
            .then(response => response.json())
            .then(data => {
                restaurantsData = data;
            })
            .catch(error => console.error('Une erreur s\'est produite lors du chargement des données des restaurants :', error));
    }

    function filterRestaurantsByCategory(category) {
        let filteredRestaurants = [];


        const price_category = ['low-cost', 'abordable', 'couteux', 'luxueux'];
        const flavor_category = ['occidentale', 'asiat', 'orientale', 'tiers-monde'];
        const location_category = ['paris-intra', 'couronne', 'banlieue', 'province'];

        if (price_category.includes(category)) {

            const price_map = new Map();

            price_map.set('low-cost', 1);
            price_map.set('abordable', 2);
            price_map.set('couteux', 3);
            price_map.set('luxueux', 4);

            filteredRestaurants = restaurantsData.filter(restaurant => restaurant.priceCategory === price_map.get(category));
        } else if (flavor_category.includes(category)) {
    
            filteredRestaurants = restaurantsData.filter(restaurant => restaurant.generalFlavor === category);
        } else if (location_category.includes(category)){
            filteredRestaurants = restaurantsData.filter(restaurant => restaurant.location === category);
        }

        generateRestaurantPage(filteredRestaurants);
    }

    function generateRestaurantPage(restaurants) {
        const price_name = ['Low-Cost', 'Abordable', 'Coûteux', 'Luxueux'];
        const location_name = new Map();

        location_name.set('paris-intra', "Paris intra-murros");
        location_name.set('couronne', 'Petite couronne');
        location_name.set('banlieue', 'Banlieue parisienne');
        location_name.set('province', 'Provinces diverses');


        const restaurantCardsHTML = restaurants.map(restaurant => `
            <a class="restaurant-card" href="${restaurant.lien}">
                <img class="restaurant-image" src="${restaurant.bannerImage}" alt="${restaurant.name}">
                <div class="restaurant-details">
                    <h2 class="restaurant-name">${restaurant.name}</h2>
                    <p class="restaurant-location">${location_name.get(restaurant.location)} - Spécialités ${restaurant.flavor}</p>
                    <p class="restaurant-price">Budget : ${price_name[restaurant.priceCategory - 1]}</p>
                    <p class="restaurant-description">❝ ${restaurant.longDescription} ❞</p>
                    <p class="disclaimer">Visuel non contractuel</p>
                </div>
            </a>
        `).join('');

        console.log('here'); // achour : debug
        const newPageContent = `
            <!DOCTYPE html>
            <html lang="fr">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Liste des Restaurants</title>
                <link rel="stylesheet" href="../css/styles.css">
            </head>
            <body>
                <header>
                    <div class="logo">
                        <img src="../data/logo-png.png" alt="Le Carnet des Saveurs Logo">
                    </div>
                    <div class="header-content">
                        <h1 id="titre-principal">Le Carnet des Saveurs</h1>
                        <nav>
                            <ul>
                                <li><a href="index.html">Accueil</a></li>
                                <li><a href="top10.html">Top 10</a></li>
                                <li><a href="aleatoire.html">Aléatoire</a></li>
                                <li><a href="apropos.html">À propos</a></li>
                            </ul>
                        </nav>
                    </div>
                </header>
                <nav id="dropdown-menu" class="hidden">
                    <div id="close-icon">&times;</div>
                    <table>
                        <thead>
                            <tr>
                                <th>Filtrer par prix</th>
                                <th>Filtrer par saveurs</th>
                                <th>Filtrer par localisation</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><a id="cat-low-cost" href="#low-cost">Catégorie low-cost</a></td>
                                <td><a id="cat-asiat" href="#asiatique">Catégorie Asiatique</a></td>
                                <td><a id="cat-paris-intra" href="#paris">Catégorie Paris intra-muros</a></td>
                            </tr>
                            <tr>
                                <td><a id="cat-abordable" href="#abordable">Catégorie abordable</a></td>
                                <td><a id="cat-occidentale" href="#occidentale">Catégorie occidentale</a></td>
                                <td><a id="cat-couronne" href="#couronne">Catégorie petite couronne</a></td>
                            </tr>
                            <tr>
                                <td><a id="cat-couteux" href="#couteux">Catégorie coûteux</a></td>
                                <td><a id="cat-orientale" href="#orientale">Catégorie orientale</a></td>
                                <td><a id="cat-banlieue" href="#banlieue">Catégorie banlieue</a></td>
                            </tr>
                            <tr>
                                <td><a id="cat-luxueux" href="#luxueux">Catégorie luxueux</a></td>
                                <td><a id="cat-tiers-monde" href="#tiers-monde">Catégorie tiers-monde</a></td>
                                <td><a id="cat-province" href="#province">Catégorie province</a></td>
                            </tr>
                        </tbody>
                    </table>
                </nav>
                <main class="restaurant-board">
                    ${restaurantCardsHTML}
                </main>
                <footer>
                    <nav>
                        <a href="apropos.html">À propos</a>
                    </nav>
                    <h3>Copyright. A&A - 2024</h3>
                </footer>
                <script src="../script/caroussel.js"></script>
                <script src="../script/menu.js"></script>
                <script src="../script/categories.js"></script>
            </body>
            </html>
        `;

        document.open();
        document.write(newPageContent);
        document.close();
    }

    dropdownLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            //event.preventDefault(); // Angela : permet de cancel le lien
            const category = this.id.substring(4); 
            filterRestaurantsByCategory(category);
        });
    });

    // Charger les données des restaurants au chargement de la page
    loadRestaurantsData();
});
