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

const Carts = {
    "carts": [{
        "id": 8,
        "products": [{ "id": 45, "title": "Malai Maxi Dress", "price": 50, "quantity": 1, "total": 50, "discountPercentage": 5.07, "discountedPrice": 47, "thumbnail": "https://cdn.dummyjson.com/product-images/45/thumbnail.jpg" }],
        "total": 1129,
        "discountedTotal": 952,
        "userId": 1,
        "totalProducts": 5,
        "totalQuantity": 9
    }],
    "total": 1, "skip": 0, "limit": 1
}

export type RecipesType = typeof Recipes;
export type CartsType = typeof Carts;