import React, { FC, useState } from "react";
import WaterStepper from "./Stepper";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			width: "100%",
		},
	})
);

const WaterParam: FC = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<WaterStepper />
		</div>
	);
};

export default WaterParam;
