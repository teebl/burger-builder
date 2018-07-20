import React, { Component } from "react";
import axios from "../../../axios-orders";

import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.css";
import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Your Name"
				},
				value: ""
			},
			street: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Street"
				},
				value: ""
			},
			postalCode: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Your Postal Code"
				},
				value: ""
			},
			country: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Country"
				},
				value: ""
			},
			email: {
				elementType: "input",
				elementConfig: {
					type: "email",
					placeholder: "Email"
				},
				value: ""
			},
			deliveryMethod: {
				elementType: "select",
				elementConfig: {
					options: [
						{ value: "fastest", displayValue: "Fastest" },
						{ value: "cheapest", displayValue: "Cheapest" }
					]
				}
			}
		}
	};

	orderHandler = event => {
		event.prevenDefault();
		this.props.ingredients;
	};

	inputChangedHandler = (event, inputIdentifier) => {
		const updatedOrderForm = {
			//...this.state.orderForm would not be a deep clone on its own
			...this.state.orderForm
		};
		const updatedFormElement = {
			...updatedOrderForm[inputIdentifier]
		};
		updatedFormElement.value = event.target.value;
		updatedOrderForm[inputIdentifier] = updatedFormElement;
		this.setState({ orderForm: updatedOrderForm });
	};

	render() {
		const formElementsArray = [];
		for (let key in this.state.orderForm) {
			formElementsArray.push({
				id: key,
				config: this.state.orderForm[key]
			});
		}

		let form = (
			<form action="">
				{formElementsArray.map(formElement => (
					<Input
						key={formElement.id}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
						changed={event =>
							this.inputChangedHandler(event, formElement.id)
						}
					/>
				))}
				<Button btnType="Success" clicked={this.orderHandler}>
					ORDER
				</Button>
			</form>
		);

		if (this.state.loading) {
			form = <Spinner />;
		}

		return (
			<div className={classes.ContactData}>
				<h4>Enter your Contact Data</h4>
				{form}
			</div>
		);
	}
}

export default ContactData;
