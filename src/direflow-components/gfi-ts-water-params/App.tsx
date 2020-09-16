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

import { useForm, Controller } from "react-hook-form";

import logo from "../../img/logo.png";

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

type FormValues = {
	slider: string;
};

function getSteps(): string[] {
	return [
		"Water Temperature (F)",
		"PH Level",
		"Ammonia Level (ppm)",
		"Nitrite Level (ppm)",
		"Nitrate Level (ppm)",
	];
}

const WaterParam: FC = () => {
	const classes = useStyles();
	const [activeStep, setActiveStep] = useState<number>(0);
	const [complete, setComplete] = useState<boolean>(false);
	const { handleSubmit, control } = useForm<FormValues>();
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
	const handleChange = (event: object) => {
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
									<form onSubmit={handleSubmit(handleChange)}>
										<Controller
											name="slider"
											control={control}
											defaultValue={marks[index][0]["value"]}
											render={(props) => (
												<Slider
													{...props}
													onChange={(_, value) => {
														props.onChange(value);
													}}
													color="secondary"
													step={null}
													marks={marks[index]}
													min={marks[index][0]["value"]}
													max={marks[index][6]["value"]}
													valueLabelDisplay="on"
													className={classes.slider}
												/>
											)}
										/>
										<div className="button-container"></div>
										<Button
											size="small"
											variant="contained"
											color="primary"
											// className={}
											onClick={
												activeStep === steps.length - 1 ? completed : nextStep
											}
										>
											{activeStep === steps.length - 1 ? "Finish" : "Next"}
										</Button>
										<Button
											size="small"
											variant="outlined"
											color="secondary"
											onClick={
												activeStep === steps.length - 1
													? resetStepper
													: prevStep
											}
											style={
												activeStep === 0
													? { display: "none" }
													: { marginLeft: "5px" }
											}
										>
											{activeStep === steps.length - 1 ? "Reset" : "Back"}
										</Button>
										<Button
											size="small"
											variant="contained"
											color="primary"
											// className={}
											onClick={
												activeStep === steps.length - 1 ? completed : nextStep
											}
										>
											{activeStep === steps.length - 1 ? "Finish" : "Next"}
										</Button>
										<Button
											size="small"
											variant="outlined"
											color="secondary"
											onClick={
												activeStep === steps.length - 1
													? resetStepper
													: prevStep
											}
											style={
												activeStep === 0
													? { display: "none" }
													: { marginLeft: "5px" }
											}
										>
											{activeStep === steps.length - 1 ? "Reset" : "Back"}
										</Button>
									</form>
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
			</ThemeProvider>
		</div>
	);
};

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
		slider: {
			marginTop: theme.spacing(5),
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

export default WaterParam;
