import * as React from "react";
import {
  Avatar,
  Button,
  TextField,
  Box,
  Typography,
  Grid,
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { boolean, object, string } from "yup";
import { signIn } from "@/services/serverService";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate()

  interface loginForm {
    username: string;
    password: string;
  }

  const initialValues: loginForm = {
    username: "",
    password: "",
  };

  const formValidation = object({
    username: string().required("please enter email").email("Invaild email"),
    password: string()
      .required("please enter password")
      .min(6, "Password should be minimum 7 charaters"),
  });

  const handleSubmitForm = (
    valuse: loginForm,
    formikHelper: FormikHelpers<loginForm>
  ) => {
    formikHelper.resetForm();
    signIn(valuse)
      .then((response) =>{
        const {success} = response
        if(success) navigate('/dashboard',{replace: true})
      }) 
      .catch((err) => console.log(err));
  }

  return (
    <Box className="mt-8 mx-8 flex flex-col items-center">
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={formValidation}
        onSubmit={handleSubmitForm}
      >
        {({ errors, isValid, touched, dirty }) => (
          <Form>
            <Box sx={{ mt: 1 }}>
              <Field
                margin="normal"
                required
                fullWidth
                as={TextField}
                id="username"
                label="Email Address"
                name="username"
                autoComplete="email"
                autoFocus
                error={Boolean(errors.username) && Boolean(touched.username)}
                helperText={Boolean(touched.username) && errors.username}
              />
              <Field
                margin="normal"
                required
                fullWidth
                as={TextField}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={Boolean(errors.password) && Boolean(touched.password)}
                helperText={Boolean(touched.password) && errors.password}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!dirty || !isValid}
              >
                Sign In
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default SignIn;
