import React, { useEffect, useState } from "react";

export default function Menu({ addToCart, toggleFavorite, favorites = [] }) {
  const [meals, setMeals] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMeals("");
  }, []);

  function fetchMeals(searchTerm) {
    setLoading(true);
    fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
        searchTerm
      )}`
    )
      .then((r) => r.json())
      .then((data) => {
        setMeals(data.meals || []);
      })
      .catch((err) => {
        console.error("Meals fetch error:", err);
        setMeals([]);
      })
      .finally(() => setLoading(false));
  }

  function handleSearch(e) {
    e.preventDefault();
    fetchMeals(query.trim());
  }

  function isFavorite(meal) {
    return favorites.some((f) => f.id === meal.idMeal);
  }

  return (
    <section className="page menu-page">
      <h2 className="page-title">Menu</h2>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          className="search-input"
          placeholder="Search dishes, e.g. Chicken..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn" type="submit">
          Search
        </button>
        <button
          className="btn btn-ghost"
          type="button"
          onClick={() => {
            setQuery("");
            fetchMeals("");
          }}
        >
          Reset
        </button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : meals.length === 0 ? (
        <p>No meals found.</p>
      ) : (
        <div className="menu-grid">
          {meals.map((m) => {
            const meal = {
              id: m.idMeal,
              name: m.strMeal,
              category: m.strCategory,
              area: m.strArea,
              image: m.strMealThumb,
              instructions: m.strInstructions,
            };
            return (
              <article key={meal.id} className="meal-card">
                <img src={meal.image} alt={meal.name} />
                <div className="meal-body">
                  <h3>{meal.name}</h3>
                  <p className="muted">
                    {meal.category} • {meal.area}
                  </p>
                  <p className="desc">
                    {meal.instructions?.slice(0, 120)}
                    {meal.instructions?.length > 120 ? "..." : ""}
                  </p>
                  <div className="card-actions">
                    <button
                      className="btn"
                      onClick={() =>
                        toggleFavorite({ id: meal.id, name: meal.name, image: meal.image })
                      }
                    >
                      {isFavorite(meal) ? "💖 Favorite" : "🤍 Favorite"}
                    </button>
                    <button
                      className="btn"
                      onClick={() =>
                        addToCart({ id: meal.id, name: meal.name, image: meal.image })
                      }
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
