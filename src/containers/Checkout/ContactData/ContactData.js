import React, { Component } from "react";
import axios from "../../../axios-orders";
import { connect } from "react-redux";

import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.css";
import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";

class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Your Name"
				},
				value: "",
				validation: {
					touched: false,
					required: true,
					valid: false
				}
			},
			street: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Street"
				},
				value: "",
				validation: {
					touched: false,
					required: true,
					valid: false
				}
			},
			postalCode: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Your Postal Code"
				},
				value: "",
				validation: {
					touched: false,
					required: true,
					valid: false,
					minLength: 6,
					maxLength: 6
				}
			},
			country: {
				elementType: "input",
				elementConfig: {
					type: "text",
					placeholder: "Country"
				},
				value: "",
				validation: {
					touched: false,
					required: true,
					valid: false
				}
			},
			email: {
				elementType: "input",
				elementConfig: {
					type: "email",
					placeholder: "Email"
				},
				value: "",
				validation: {
					touched: false,
					required: true,
					valid: false
				}
			},
			deliveryMethod: {
				elementType: "select",
				elementConfig: {
					options: [
						{ value: "fastest", displayValue: "Fastest" },
						{ value: "cheapest", displayValue: "Cheapest" }
					]
				},
				validation: {
					touched: true,
					required: false,
					valid: false
				},
				value: "fastest"
			}
		},
		formIsValid: false,
		loading: false
	};

	orderHandler = event => {
		event.preventDefault();
		const formData = {};
		for (let formElementIdentifier in this.state.orderForm) {
			formData[formElementIdentifier] = this.state.orderForm[
				formElementIdentifier
			].value;
		}
		const order = {
			ingredients: this.props.ings,
			price: this.props.price,
			orderData: formData
		};

		this.props.onOrderBurger(order);
	};

	checkValidity(value, rules) {
		let isValid = true;
		if (rules.required) {
			isValid = value.trim() !== "" && isValid;
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}

		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}
		console.log(isValid + " is valid");
		return isValid;
	}

	inputChangedHandler = (event, inputIdentifier) => {
		const updatedOrderForm = {
			//...this.state.orderForm would not be a deep clone on its own
			...this.state.orderForm
		};
		const updatedFormElement = {
			...updatedOrderForm[inputIdentifier]
		};
		updatedFormElement.value = event.target.value;
		updatedFormElement.validation.valid = this.checkValidity(
			updatedFormElement.value,
			updatedFormElement.validation
		);
		updatedFormElement.touched = true;
		updatedOrderForm[inputIdentifier] = updatedFormElement;

		let formIsValid = true;
		for (let inputIdentifier in updatedOrderForm) {
			formIsValid =
				updatedOrderForm[inputIdentifier].validation.valid &&
				formIsValid;
		}

		this.setState({
			orderForm: updatedOrderForm,
			formIsValid: formIsValid
		});
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
			<form onSubmit={this.orderHandler}>
				{formElementsArray.map(formElement => (
					<Input
						key={formElement.id}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
						invalid={!formElement.config.validation.valid}
						shouldValidate={formElement.config.validation.required}
						touched={formElement.config.validation.touched}
						changed={event =>
							this.inputChangedHandler(event, formElement.id)
						}
					/>
				))}
				<Button btnType="Success" disabled={!this.state.formIsValid}>
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

const mapStateToProps = state => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		loading: state.order.loading
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onOrderBurger: orderData => {
			console.log("onOrderBurger dispatching", orderData);
			return dispatch(actions.purchaseBurger(orderData));
		}
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(
	withErrorHandler(ContactData, axios)
);