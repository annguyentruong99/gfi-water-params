import React, { FC, useState } from "react";

import {
	Typography,
	Button,
	TextField,
	Stepper,
	Step,
	StepLabel,
	StepContent,
	Avatar,
} from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import logo from "../../img/logo.png";

const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			width: "100%",
		},
		avatar: {
			height: theme.spacing(10),
			width: theme.spacing(10),
			marginLeft: "auto",
			marginRight: "auto",
		},
		buttonContainer: {
			marginTop: theme.spacing(3),
		},
		nextButton: {
			backgroundColor: "#007c89",
			color: "white",
			"&:hover": {
				backgroundColor: "white",
				color: "#007c89",
				boxShadow: "2px 3px",
			},
		},
		backButton: {
			marginRight: theme.spacing(1),
			"&:hover": {
				boxShadow: "2px 3px",
			},
		},
		resetButton: {
			justifyItems: "center",
			backgroundColor: "#df3016",
			color: "white",
		},
	})
);

function getSteps() {
	return ["PH Level", "Ammonia Level", "Nitrite Level", "Nitrate Level"];
}

function getStepContent(step: number) {
	switch (step) {
		case 0:
			return `Enter Your pH Reading In The Input Box Below`;
		case 1:
			return `Enter Your Ammonia Reading In The Input Box Below`;
		case 2:
			return `Enter Your Nitrite Reading In The Input Box Below`;
		case 3:
			return `Enter Your Nitrate Reading In The Input Box Below`;
		default:
			return "Unknown Step!";
	}
}

const WaterParam: FC = () => {
	const classes = useStyles();
	const [activeStep, setActiveStep] = useState(0);
	const steps = getSteps();

	const nextStep = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const prevStep = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const resetStepper = () => {
		setActiveStep(0);
	};

	return (
		<div className={classes.root}>
			<Avatar src={logo} variant="circle" className={classes.avatar} />
			<Stepper activeStep={activeStep} orientation="vertical">
				{steps.map((label, index) => (
					<Step key={label}>
						<StepLabel>{label}</StepLabel>
						<StepContent>
							<Typography>{getStepContent(index)}</Typography>
							<form noValidate autoComplete="off">
								<TextField id="standard-basic" />
							</form>
							<div className={classes.buttonContainer}>
								<div>
									<Button
										variant="outlined"
										size="small"
										style={
											activeStep === 0
												? { display: "none" }
												: { borderColor: "#df3106", color: "#df3106" }
										}
										onClick={prevStep}
										className={classes.backButton}
									>
										Back
									</Button>
									<Button
										variant="contained"
										size="small"
										onClick={nextStep}
										className={classes.nextButton}
									>
										{activeStep === steps.length - 1 ? "Finish" : "Next"}
									</Button>
								</div>
							</div>
						</StepContent>
					</Step>
				))}
			</Stepper>
		</div>
	);
};

export default WaterParam;
