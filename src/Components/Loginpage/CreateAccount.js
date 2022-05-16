// import React from "react";

// function CreateAccount() {
//   return <div>CreateAccount</div>;
// }

// export default CreateAccount;
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
<<<<<<< HEAD
import axios from "axios";
=======

>>>>>>> 10cf40edf422501282ec78361204714d5fe7b71c
import React, { useState } from "react";
import "./CreateAccount.css";
import TextField from "@mui/material/TextField";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { makeStyles } from "@mui/styles";

import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";

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
            placeholder="Enter Your PAN Number"
            required
            fullWidth
            margin="normal"
            {...field}
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

<<<<<<< HEAD
function getCookie(name) {
  if (!document.cookie) {
      return null;
  }
  
  const xsrfCookies = document.cookie.split(';')
      .map(c => c.trim())
      .filter(c => c.startsWith(name + '='));
  
  if (xsrfCookies.length === 0) {
      return null;
  }
  return decodeURIComponent(xsrfCookies[0].split('=')[1]);
  }


async function post_data(url,data){
  axios.post('http://127.0.0.1:8000/userregister', {
    'fname': data['FullName'].split(" ")[0],
    'lname': data['FullName'].split(" ")[1],
    'username':data['UserName'],
    'email': data['emailAddress'],
    'phoneno': data['phoneNumber'],
    'panno': data['PANNumber'],
    
})
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        alert(err);
    });
}

=======
>>>>>>> 10cf40edf422501282ec78361204714d5fe7b71c
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

  const isStepOptional = (step) => {
    return step === 1 || step === 2;
  };

  const isStepSkipped = (step) => {
    return skippedSteps.includes(step);
  };

  const handleNext = (data) => {
<<<<<<< HEAD
=======
    console.log(data);
>>>>>>> 10cf40edf422501282ec78361204714d5fe7b71c
    if (activeStep == steps.length - 1) {
      fetch("https://jsonplaceholder.typicode.com/comments")
        .then((data) => data.json())
        .then((res) => {
<<<<<<< HEAD
          post_data("http://127.0.0.1:8000/userregister",data)
=======
          console.log(res);
>>>>>>> 10cf40edf422501282ec78361204714d5fe7b71c
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
            Thank You
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
