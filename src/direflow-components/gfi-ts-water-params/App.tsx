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
import {
	makeStyles,
	createStyles,
	createMuiTheme,
	ThemeProvider,
} from "@material-ui/core/styles";

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
			marginBottom: theme.spacing(3),
		},
		inputForm: {
			marginTop: theme.spacing(3),
		},
		buttonContainer: {
			marginTop: theme.spacing(3),
		},
		nextButton: {
			backgroundColor: "#007c89",
			color: "white",
			marginRight: theme.spacing(1),
			"&:hover": {
				backgroundColor: "white",
				color: "#007c89",
				boxShadow: "2px 3px",
			},
		},
		backButton: {
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

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#007c89",
		},
		secondary: {
			main: "#df3016",
		},
	},
});

interface WaterParams {
	temp: number;
	pH: number;
	ammonia: number;
	nitrite: number;
	nitrate: number;
}

const waterParams: WaterParams = {
	temp: 0,
	pH: 0,
	ammonia: 0,
	nitrite: 0,
	nitrate: 0,
};

function getSteps(): [string, string][] {
	return [
		["Water Temperature", "Temperature"],
		["PH Level", "pH"],
		["Ammonia Level", "Ammonia"],
		["Nitrite Level", "Nitrite"],
		["Nitrate Level", "Nitrate"],
	];
}

function getStepContent(step: number) {
	switch (step) {
		case 0:
			return `Enter Your Water Temperature In The Input Box Below`;
		case 1:
			return `Enter Your pH Reading In The Input Box Below`;
		case 2:
			return `Enter Your Ammonia Reading In The Input Box Below`;
		case 3:
			return `Enter Your Nitrite Reading In The Input Box Below`;
		case 4:
			return `Enter Your Nitrate Reading In The Input Box Below`;
		default:
			return "Unknown Step!";
	}
}

const WaterParam: FC = () => {
	const classes = useStyles();
	const [activeStep, setActiveStep] = useState<number>(0);
	const [complete, setComplete] = useState<boolean>(false);
	const steps = getSteps();

	// Proceed to nexr step
	const nextStep = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	// Go back to the previous steo
	const prevStep = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	// Reset the stepper
	const resetStepper = () => {
		setActiveStep(0);
		setComplete(false);
	};

	// Finish entering the input
	const completed = () => {
		setComplete(true);
	};

	// Handle the input when customers enter them
	const handleChange = (event: any) => {};

	return (
		<div className={classes.root}>
			<ThemeProvider theme={theme}>
				<Avatar src={logo} variant="circle" className={classes.avatar} />
				{complete === false ? (
					<Stepper activeStep={activeStep} orientation="vertical">
						{steps.map((label, index) => (
							<Step key={label[0]}>
								<StepLabel>{label[0]}</StepLabel>
								<StepContent>
									<Typography>{getStepContent(index)}</Typography>
									<form
										noValidate
										autoComplete="off"
										className={classes.inputForm}
									>
										<TextField
											id="standard-basic"
											label={label[1]}
											style={{ color: "#007c89" }}
										/>
									</form>
								</StepContent>
							</Step>
						))}
					</Stepper>
				) : (
					<div>
						<Typography variant="h5">
							Below are your water parameter inputs: <br />
						</Typography>
					</div>
				)}

				{/* Buttons logics to manipulate the form */}
				<div className={classes.buttonContainer}>
					<div>
						{activeStep === steps.length - 1 ? (
							<Button
								variant="contained"
								size="small"
								onClick={completed}
								className={classes.nextButton}
							>
								Finish
							</Button>
						) : (
							<Button
								variant="contained"
								size="small"
								onClick={nextStep}
								className={classes.nextButton}
							>
								Next
							</Button>
						)}

						<Button
							variant="outlined"
							size="small"
							style={
								activeStep === 0
									? { display: "none" }
									: { borderColor: "#df3106", color: "#df3106" }
							}
							onClick={
								activeStep === steps.length - 1 ? resetStepper : prevStep
							}
							className={classes.backButton}
						>
							{activeStep === steps.length - 1 ? "Reset" : "Back"}
						</Button>
					</div>
				</div>
			</ThemeProvider>
		</div>
	);
};

export default WaterParam;
