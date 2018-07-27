import React, { Component } from "react";
import { connect } from "react-redux";

import Auxillary from "../../hoc/Auxillary/Auxillary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/Spinner/Spinner";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";
import * as actionTypes from "../../store/actions";

class BurgerBuilder extends Component {
	state = {
		purchasing: false,
		loading: false,
		error: false
	};

	componentDidMount() {
		// axios
		// 	.get("https://burger-builder-f056a.firebaseio.com/ingredients.json")
		// 	.then(response => {
		// 		this.setState({ ingredients: response.data });
		// 	})
		// 	.catch(error => {
		// 		this.setState({ error: true });
		// 	});
	}

	updatePurchaseState(ingredients) {
		const sum = Object.keys(ingredients)
			.map(igKey => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		return sum > 0;
	}

	// addIngredientHandler = type => {
	// 	const oldCount = this.props.ings[type];
	// 	const updatedCounted = oldCount + 1;
	// 	const updatedIngredients = {
	// 		...this.props.ings
	// 	};
	// 	updatedIngredients[type] = updatedCounted;
	// 	const priceAddition = INGREDIENT_PRICES[type];
	// 	const oldPrice = this.state.totalPrice;
	// 	const newPrice = oldPrice + priceAddition;
	// 	this.setState({
	// 		totalPrice: newPrice,
	// 		ingredients: updatedIngredients
	// 	});
	// 	this.updatePurchaseState(updatedIngredients);
	// };

	// removeIngredientHandler = type => {
	// 	const oldCount = this.props.ings[type];
	// 	if (oldCount <= 0) {
	// 		return;
	// 	}
	// 	const updatedCounted = oldCount - 1;
	// 	const updatedIngredients = {
	// 		...this.props.ings
	// 	};
	// 	updatedIngredients[type] = updatedCounted;
	// 	const priceSubtraction = INGREDIENT_PRICES[type];
	// 	const oldPrice = this.state.totalPrice;
	// 	const newPrice = oldPrice - priceSubtraction;
	// 	this.setState({
	// 		totalPrice: newPrice,
	// 		ingredients: updatedIngredients
	// 	});
	// 	this.updatePurchaseState(updatedIngredients);
	// };

	purchaseHandler = () => {
		this.setState({ purchasing: true });
	};

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	};

	purchaseContinueHandler = () => {
		this.props.history.push("/checkout");
	};

	render() {
		const disabledInfo = {
			...this.props.ings
		};
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
		let orderSummary = null;

		if (this.state.loading) {
			orderSummary = <Spinner />;
		}

		let burger = this.state.error ? (
			<p>Ingredients can't be loaded!</p>
		) : (
			<Spinner />
		);

		if (this.props.ings) {
			burger = (
				<Auxillary>
					<Burger ingredients={this.props.ings} />
					<BuildControls
						price={this.props.price}
						ingredientAdded={this.props.onIngredientAdded}
						ingredientRemoved={this.props.onIngredientRemoved}
						disabled={disabledInfo}
						purchaseable={this.updatePurchaseState(this.props.ings)}
						ordered={this.purchaseHandler}
					/>
				</Auxillary>
			);

			orderSummary = (
				<OrderSummary
					purchaseCanceled={this.purchaseCancelHandler}
					purchaseContinued={this.purchaseContinueHandler}
					ingredients={this.props.ings}
					price={this.props.price}
				/>
			);
		}

		return (
			<Auxillary>
				{burger}
				<Modal
					show={this.state.purchasing}
					modalClosed={this.purchaseCancelHandler}
				>
					{orderSummary}
				</Modal>
			</Auxillary>
		);
	}
}
const mapStateToProps = state => {
	return {
		ings: state.ingredients,
		price: state.totalPrice
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onIngredientAdded: ingName =>
			dispatch({
				type: actionTypes.ADD_INGREDIENT,
				ingredientName: ingName
			}),
		onIngredientRemoved: ingName =>
			dispatch({
				type: actionTypes.RMV_INGREDIENT,
				ingredientName: ingName
			})
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(
	withErrorHandler(BurgerBuilder, axios)
);
