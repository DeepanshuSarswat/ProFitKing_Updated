
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import React, { useState } from "react";
import "./CreateAccount.css";
import TextField from "@mui/material/TextField";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useEffect } from "react";
import { useLayoutEffect } from "react";

import { makeStyles } from "@mui/styles";

import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import { BASE_URL } from "../../Contants/constant";

const useStyles = makeStyles({
  button: {
    marginRight: 8,
  },
});

function getSteps() {
  return ["Full Name", "E-Mail", "Mobile Number", "PAN Number", "User Name"];
}
const BasicForm = () => {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="FullName"
        render={({ field }) => (
          <TextField
            id="first-name"
            label="First Name"
            variant="outlined"
            placeholder="Enter Your First Name"
            fullWidth
            // size="medium"
            margin="normal"
            {...field}
            required
          />
        )}
      />
    </>
  );
};
const ContactForm = () => {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="emailAddress"
        render={({ field }) => (
          <TextField
            id="email"
            label="E-mail"
            variant="outlined"
            placeholder="Enter Your E-mail Address"
            fullWidth
            type="email"
            required
            margin="normal"
            {...field}
          />
        )}
      />
    </>
  );
};
const PersonalForm = () => {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="phoneNumber"
        render={({ field }) => (
          <TextField
            id="phone-number"
            label="Phone Number"
            type="number"
            variant="outlined"
            placeholder="Enter Your Phone Number"
            fullWidth
            margin="normal"
            {...field}
            required
            inputProps={{
    maxLength: 10
  }}
          />
        )}
      />
    </>
  );
};
const PaymentForm = () => {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="PANNumber"
        render={({ field }) => (
          <TextField
            id="PANNumber"
            label="PAN Number"
            variant="outlined"
            type={"text"}
            placeholder="Enter Your PAN Number"
            required
            fullWidth
            margin="normal"
            {...field}
            inputProps={{
    maxLength: 10
  }}
          />
        )}
      />
    </>
  );
};
const UserNameForm = () => {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="UserName"
        render={({ field }) => (
          <TextField
            id="UserName"
            label="UserName"
            variant="outlined"
            placeholder="Make Your User Name"
            required
            fullWidth
            margin="normal"
            {...field}
            inputProps={{
    minLength: 8
  }}
          />
        )}
      />
    </>
  );
};

function getStepContent(step) {
  switch (step) {
    case 0:
      return <BasicForm />;

    case 1:
      return <ContactForm />;
    case 2:
      return <PersonalForm />;
    case 3:
      return <PaymentForm />;
    case 4:
      return <UserNameForm />;
    default:
      return "unknown step";
  }
}

const CreateAccount = () => {
  const classes = useStyles();
  const methods = useForm({
    defaultValues: {
      firstName: "",
      emailAddress: "",
      phoneNumber: "",
      PANNumber: "",
      UserName: "",
    },
  });
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const steps = getSteps();

  const send_data = (data) =>{
    axios.post(BASE_URL + '/userregister', {
      'fname':data['FullName'].split(" ")[0],
      'lname':data['FullName'].split(" ")[1],
      'username':data['UserName'],
      'email':data['emailAddress'],
      'phoneno':data['phoneNumber'],
      'panno':data['PANNumber']
  })
  .then(res => {
      console.log(res['data']['message'])
      return true;
  })
  .catch(err =>{
      alert(err);
  });
  }

  const isStepOptional = (step) => {
    return step === 1 || step === 2;
  };

  const isStepSkipped = (step) => {
    return skippedSteps.includes(step);
  };

  const handleNext = (data) => {
    if (activeStep == steps.length - 1) {
      fetch("https://jsonplaceholder.typicode.com/comments")
        .then((data) => data.json())
        .then((res) => {
          send_data(data)
          setActiveStep(activeStep + 1);
        });
    } else {
      setActiveStep(activeStep + 1);
      setSkippedSteps(
        skippedSteps.filter((skipItem) => skipItem !== activeStep)
      );
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSkip = () => {
    if (!isStepSkipped(activeStep)) {
      setSkippedSteps([...skippedSteps, activeStep]);
    }
    setActiveStep(activeStep + 1);
  };

  async function check_if_user_login(){
    let response = await fetch(BASE_URL + '/check_userlogin')
    if (response.ok) {
      let json = await response.json();
      let message = json['message'];
      if (message == 'yes'){
        window.location.replace('/Home')
      }  
  }
  else {
      alert("HTTP-Error: " + response.status);
  }

  }

  useLayoutEffect(()=>{
    check_if_user_login();
  },[])
  // const onSubmit = (data) => {
  //   console.log(data);
  // };
  return (
    <div className="stepar-parents">
      <div className="stepar">
        <div className="Login-h-l Sign-h-l steparheader">
          <p>Profit King</p>
          <p>
            <CurrencyRupeeIcon className="pkicon" />
          </p>
        </div>
        <Stepper alternativeLabel activeStep={activeStep}>
          {steps.map((step, index) => {
            const labelProps = {};
            const stepProps = {};

            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step {...stepProps} key={index}>
                <StepLabel {...labelProps}>{step}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        {activeStep === steps.length ? (
          <Typography variant="h3" align="center">
            Please Verify Your Email
          </Typography>
        ) : (
          <>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(handleNext)}>
                {getStepContent(activeStep)}
                <div className="step-btn">
                  <Button
                    className={classes.button}
                    disabled={activeStep === 0}
                    onClick={handleBack}
                  >
                    back
                  </Button>

                  <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    // onClick={handleNext}
                    type="submit"
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </div>
              </form>
            </FormProvider>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateAccount;
