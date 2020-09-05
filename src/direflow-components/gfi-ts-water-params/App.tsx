import React, { FC, useState } from "react";

import {
	Typography,
	Button,
	Stepper,
	Step,
	StepLabel,
	StepContent,
	Avatar,
	Slider,
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

const marks = [
	[
		{ value: 0 },
		{ value: 20 },
		{ value: 37 },
		{ value: 40 },
		{ value: 50 },
		{ value: 70 },
		{ value: 100 },
	],
	[
		{ value: 6 },
		{ value: 6.4 },
		{ value: 6.8 },
		{ value: 6.6 },
		{ value: 7 },
		{ value: 7.2 },
		{ value: 7.6 },
	],
	[
		{ value: 0 },
		{ value: 0.25 },
		{ value: 0.5 },
		{ value: 1 },
		{ value: 2 },
		{ value: 4 },
		{ value: 8 },
	],
	[
		{ value: 0 },
		{ value: 0.25 },
		{ value: 0.5 },
		{ value: 1 },
		{ value: 2 },
		{ value: 4 },
		{ value: 5 },
	],
	[
		{ value: 0 },
		{ value: 5 },
		{ value: 10 },
		{ value: 20 },
		{ value: 40 },
		{ value: 80 },
		{ value: 160 },
	],
];

interface Water {
	temp: number;
	pH: number;
	ammonia: number;
	nitrite: number;
	nitrate: number;
}

function getSteps(): string[] {
	return [
		"Water Temperature",
		"PH Level",
		"Ammonia Level",
		"Nitrite Level",
		"Nitrate Level",
	];
}

const WaterParam: FC = () => {
	const classes = useStyles();
	const [activeStep, setActiveStep] = useState<number>(0);
	const [complete, setComplete] = useState<boolean>(false);
	const [params, setParams] = useState({
		temp: 0,
		pH: 0,
		ammonia: 0,
		nitrite: 0,
		nitrate: 0,
	});
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
	const handleChange = (event: object): void => {
		console.log(event);
	};

	return (
		<div className={classes.root}>
			<ThemeProvider theme={theme}>
				<Avatar src={logo} variant="circle" className={classes.avatar} />
				{complete === false ? (
					<Stepper activeStep={activeStep} orientation="vertical">
						{steps.map((label, index) => (
							<Step key={label}>
								<StepLabel>{label}</StepLabel>
								<StepContent style={{ width: 300 }}>
									<Slider
										color="secondary"
										step={null}
										marks={marks[index]}
										min={marks[index][0]["value"]}
										max={marks[index][6]["value"]}
										ThumbComponent="div"
										valueLabelDisplay="on"
									/>
								</StepContent>
							</Step>
						))}
					</Stepper>
				) : (
					<div>
						<Typography variant="h5">
							Below are your water parameter inputs: <br />
							Hello :D
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
