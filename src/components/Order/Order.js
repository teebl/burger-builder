import React from "react";

import classes from "./Order.css";

const order = props => {
	const ingredients = [];

	for (let ingredientName in props.order.ingredients) {
		ingredients.push({
			name: ingredientName,
			amount: props.order.ingredients[ingredientName]
		});
	}

	const ingredientOutput = ingredients.map(ing => {
		return (
			<li style={{ textTransform: "capitalize" }} key={ing.name}>
				{ing.name}: {ing.amount}
			</li>
		);
	});
	return (
		<div className={classes.Order}>
			<p>
				Ingredients: <ul>{ingredientOutput}</ul>
			</p>
			<p>
				Price:{" "}
				<strong>{Number.parseFloat(props.order.price).toFixed(2)}</strong>
			</p>
		</div>
	);
};

export default order;
