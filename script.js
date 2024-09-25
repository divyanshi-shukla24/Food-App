const apiUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s';

fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const meals = data.meals;
    displayLatestMeals(meals);
  })
  .catch(error => {
    console.error('Error:', error);
  });

function displayLatestMeals(meals) {
  const latestMealsContainer = document.querySelector('.latest-meals');
  latestMealsContainer.innerHTML = '';

  meals.forEach(meal => {
    const mealDiv = document.createElement('div');
    mealDiv.classList.add('meal-item');

    const mealImg = document.createElement('img');
    mealImg.src = meal.strMealThumb;
    mealImg.alt = meal.strMeal;
    mealImg.classList.add('meal-img');

    const mealName = document.createElement('h4');
    mealName.textContent = meal.strMeal;
    mealName.classList.add('meal-name');

    mealDiv.appendChild(mealImg);
    mealDiv.appendChild(mealName);
    latestMealsContainer.appendChild(mealDiv);
  });
}

function searchMeal() {
  const query = document.getElementById('search').value.trim();
  if (query) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
      .then(response => response.json())
      .then(data => displayMeals(data.meals))
      .catch(error => console.error('Error:', error));
  } else {
    alert('Please enter a meal name to search.');
  }
}

function displayMeals(meals) {
  const mealList = document.getElementById('meal-list');
  mealList.innerHTML = '';

  if (!meals || meals.length === 0) {
    mealList.innerHTML = `<p>No meals found. Please try a different search.</p>`;
    return;
  }

  meals.forEach(meal => {
    const mealItem = document.createElement('div');
    mealItem.classList.add('meal-item');
    mealItem.innerHTML = `
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <h2>${meal.strMeal}</h2>
      <p>${meal.strInstructions.substring(0, 80)}...</p>
    `;
    mealList.appendChild(mealItem);
  });

  // Center the meal list
  mealList.style.display = 'flex';
  mealList.style.justifyContent = 'center'; // Center the items
  mealList.style.flexDirection = 'row'; // Align items in a row
}

// Event listener for the search button
document.getElementById('searchButton').addEventListener('click', searchMeal);



