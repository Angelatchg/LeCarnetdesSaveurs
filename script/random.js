// random-restaurant.js
document.addEventListener('DOMContentLoaded', function() {
    let restaurantsData = []; // Variable pour stocker les données des restaurants chargées depuis le JSON
    
    function fetchRestaurants() {
        fetch('../data/restaurants.json')
            .then(response => response.json())
            .then(data => {
                restaurantsData = data;
            })
            .catch(error => console.error('Une erreur s\'est produite lors du chargement des données des restaurants :', error));
    }

    function getRandomRestaurant(restaurants) {
        const randomIndex = Math.floor(Math.random() * restaurants.length);
        return restaurants[randomIndex];
    }

    function displayRandomRestaurant() {
        const price_name = ['Low-Cost', 'Abordable', 'Coûteux', 'Luxueux'];
        if (restaurantsData.length === 0) {
            return;
        }

        const location_name = new Map();

        location_name.set('paris-intra', "Paris intra-murros");
        location_name.set('couronne', 'Petite couronne');
        location_name.set('banlieue', 'Banlieue parisienne');
        location_name.set('province', 'Provinces diverses');

    
        const restaurant = getRandomRestaurant(restaurantsData);
    
        const restaurantContainer = document.querySelector('.restaurant-board');
        restaurantContainer.innerHTML = `
            <h2>Recherche aléatoire</h2>
            <a id="random-card" class="restaurant-card" href="${restaurant.lien}">
                <img class="restaurant-image" src="${restaurant.bannerImage}" alt="${restaurant.name}">
                <div class="restaurant-details">
                    <h2 class="restaurant-name">${restaurant.name}</h2>
                    <p class="restaurant-location">${location_name.get(restaurant.location)} - Spécialités ${restaurant.flavor}</p>
                    <p class="restaurant-description">❝ ${restaurant.longDescription} ❞</p>
                    <p class="restaurant-price">Budget : ${price_name[restaurant.priceCategory -1]}</p>
                    <p class="disclaimer">Visuel non contractuel</p>
                </div>
            </a>
        `;
    }

    fetchRestaurants();
    window.onload = displayRandomRestaurant;
});



