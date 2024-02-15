const Recipes = {
    "recipes": [{
        "id": 2,
        "name": "Vegetarian Stir-Fry",
        "ingredients": [
            "Tofu, cubed",
            "Broccoli florets",
            "Carrots, sliced",
            "Bell peppers, sliced",
            "Soy sauce",
            "Ginger, minced",
            "Garlic, minced",
            "Sesame oil",
            "Cooked rice for serving"
        ],
        "instructions": [
            "In a wok, heat sesame oil over medium-high heat.",
            "Add minced ginger and garlic, sauté until fragrant.",
            "Add cubed tofu and stir-fry until golden brown.",
            "Add broccoli, carrots, and bell peppers. Cook until vegetables are tender-crisp.",
            "Pour soy sauce over the stir-fry and toss to combine.",
            "Serve over cooked rice."
        ],
        "prepTimeMinutes": 15,
        "cookTimeMinutes": 20,
        "servings": 3,
        "difficulty": "Medium",
        "cuisine": "Asian",
        "caloriesPerServing": 250,
        "tags": [
            "Vegetarian",
            "Stir-fry",
            "Asian"
        ],
        "userId": 58,
        "image": "https://cdn.dummyjson.com/recipe-images/2.webp",
        "rating": 4.7,
        "reviewCount": 36,
        "mealType": [
            "Lunch"
        ]
    }]
}

export type RecipesType = typeof Recipes;