// Search Food:
const searchFood = () => {
        const searchField = document.getElementById('search-field');
        const searchValue = searchField.value;
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`;

        // Fetch Data from API:
        fetch(url)
                .then(res => res.json())
                .then(data => displayMeals(data.meals));
}

// Display Meal:
const displayMeals = meals => {
        const mealContainer = document.getElementById('meal-container');
        const errorContainer = document.getElementById('error-message')

        // Clear Value:
        mealContainer.textContent = '';
        errorContainer.textContent = '';
        console.log(meals)
        if (meals === null) {
                const p = document.createElement('p');
                p.classList.add('text-center');
                p.classList.add('text-danger');
                p.classList.add('fw-bold');
                p.innerText = "Sorry! There is no result found";
                errorContainer.appendChild(p);
        }
        else {
                meals.forEach(meal => {
                        const div = document.createElement('div');
                        div.classList.add('col');
                        div.innerHTML = `
                                <div onclick="loadMealDetail(${meal.idMeal})" class="card">
                                        <div class="p-5">
                                                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                                        </div>
                                        <div class="card-body">
                                                <h5 class="card-title">Card title</h5>
                                                <p class="card-text">This is a longer card with supporting text
                                                        below as a natural lead-in to additional content. This
                                                        content is a little bit longer.</p>
                                        </div>
                                </div>
                        `;
                        mealContainer.appendChild(div);
                })
        }
}

// Display Meal Detail:
const loadMealDetail = meal => {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal}`)
                .then(res => res.json())
                .then(data => displayMealDetail(data.meals[0]))
}

const displayMealDetail = (meal) => {
        console.log(meal)
        const mealDetailContainer = document.getElementById('meal-detail');
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
                <img src="${meal.strMealThumb}" class="card-img-top p-4" alt="...">
                <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
                        <div class="d-grid gap-2">
                                <a target="_blank" href="${meal.strYoutube}" class="btn btn-success">See More</a>
                        </div>
                </div>
        `;
        mealDetailContainer.appendChild(div);
}