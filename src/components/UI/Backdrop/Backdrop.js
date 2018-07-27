import React from "react";

import classes from "./Backdrop.css";

const backdrop = props => {
	return !props.show ? null : (
		<div className={classes.Backdrop} onClick={props.clicked} />
	);
};

export default backdrop;
