console.log("Hello Meal DB");

const searchFood = () => {
        const searchField = document.getElementById('search-field');
        const searchValue = searchField.value;
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`;

        fetch(url)
                .then(res => res.json())
                .then(data => console.log(data.meals));
}