const errorContainer = document.getElementById('error-message');
const mealDetailContainer = document.getElementById('meal-detail');
// Loader Container:
const loaderContainer = document.getElementById('loader');

// Loader Function:
const loader = displayStyle => {
        loaderContainer.style.display = displayStyle;
}
loader('none');
// Search Food:
const searchFood = () => {
        loader('block');
        const searchField = document.getElementById('search-field');
        const searchValue = searchField.value;
        if (searchValue.length === 0) {
                const p = document.createElement('p');
                p.classList.add('text-center');
                p.classList.add('text-danger');
                p.classList.add('fw-bold');
                p.innerText = "Please write something!";
                errorContainer.appendChild(p);
        }
        else {
                const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`;
                // Fetch Data from API:
                fetch(url)
                        .then(res => res.json())
                        .then(data => displayMeals(data.meals));
        }
}

// Display Meal:
const displayMeals = meals => {
        const mealContainer = document.getElementById('meal-container');

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
                        div.classList.add('p-4');
                        div.innerHTML = `
                                <div onclick="loadMealDetail(${meal.idMeal})" class="card">
                                        <div class="p-5">
                                                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                                        </div>
                                        <div class="card-body">
                                                <h5 class="card-title">${meal.strMeal}</h5>
                                                <p class="card-text">${meal.strInstructions.slice(0, 150)}</p>
                                        </div>
                                </div>
                        `;
                        mealContainer.appendChild(div);
                })
        }
        loader('none');
}

// Display Meal Detail:
const loadMealDetail = meal => {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal}`)
                .then(res => res.json())
                .then(data => displayMealDetail(data.meals[0]))
}

const displayMealDetail = (meal) => {
        mealDetailContainer.textContent = '';
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