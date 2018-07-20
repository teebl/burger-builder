import React, { Component } from "react";
import { Route } from "react-router-dom";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import axios from "../../axios-orders.js";
class Checkout extends Component {
	state = {
		ingredients: null,
		price: 0
	};

	componentWillMount() {
		const query = new URLSearchParams(this.props.location.search);
		const ingredients = {};
		let price = 0;
		for (let param of query.entries()) {
			if (param[0] === "price") {
				price = param[1];
			} else {
				ingredients[param[0]] = +param[1];
			}
		}
		this.setState({ ingredients: ingredients, price: price });
	}

	checkoutCancelledHandler = () => {
		this.props.history.goBack();
	};

	checkoutContinuedHandler = () => {
		this.props.history.replace("/checkout/contact-data");
		this.setState({ loading: true });
		console.log(this.state.loading);
		const order = {
			ingredients: this.state.ingredients,
			//Price would be calculated SERVER SIDE on a real app
			price: this.state.totalPrice,
			customer: {
				name: "Trevor Seibel",
				address: {
					street: "123 fake street",
					postalCode: "K1Y 1A3",
					country: "Canada"
				},
				email: "test@fake.ca"
			},
			deliveryMethod: "fastest"
		};
		axios
			.post("/orders.json", order)
			.then(response =>
				this.setState({ loading: true, purchasing: false })
			)
			.catch(error =>
				this.setState({ loading: false, purchasing: false })
			);
	};

	render() {
		return (
			<div>
				<CheckoutSummary
					ingredients={this.state.ingredients}
					checkoutCancelled={this.checkoutCancelledHandler}
					checkoutContinued={this.checkoutContinuedHandler}
				/>
				<Route
					path={this.props.match.path + "/contact-data"}
					render={props => (
						<ContactData
							ingredients={this.state.ingredients}
							price={this.state.totalPrice}
							{...props}
						/>
					)}
				/>
			</div>
		);
	}
}

export default Checkout;
