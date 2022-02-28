console.log("Hello Meal DB");

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
        meals.forEach(meal => {
                console.log(meal)
                const div = document.createElement('div');
                div.classList.add('col');
                div.innerHTML = `
                        <div class="card">
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
                const mealContainer = document.getElementById('meal-conatiner');
                mealContainer.appendChild(div);
        })
}