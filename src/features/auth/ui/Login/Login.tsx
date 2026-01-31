import {
  selectIsLoggedIn,
  selectThemeMode,
  setIsLoggedInAC,
} from "@/app/app-slice";
import { getTheme } from "@/common/theme";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useAppSelector } from "@/common/hooks/useAppSelector.ts";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import styles from "./Login.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginInputs, loginSchema } from "@/features/auth/lib/schemas";
// import { loginTC, selectIsLoggedIn } from "@/features/auth/model/auth-slice.ts";
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts";
import { Navigate } from "react-router";
import { Path } from "@/common/common/routing";
import { useLoginMutation } from "@/features/auth/api/authApi.ts";
import { ResultCode } from "@/common/enums/enums.ts";
import { AUTH_TOKEN } from "@/common/constants";

export const Login = () => {
  const themeMode = useAppSelector(selectThemeMode);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();

  const theme = getTheme(themeMode);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  // type LoginInputs = {
  //   email: string;
  //   password: string;
  //   rememberMe: boolean;
  // };

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    login(data)
      .unwrap()
      .then((res) => {
        if (res.resultCode === ResultCode.Success) {
          dispatch(setIsLoggedInAC({ isLoggedIn: true }));
          localStorage.setItem(AUTH_TOKEN, res.data.token);
          reset();
        }
      });
  };

  if (isLoggedIn) {
    return <Navigate to={Path.Main} />;
  }

  return (
    <Grid container justifyContent={"center"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <FormLabel>
            <p>
              To login get registered
              <a
                style={{ color: theme.palette.primary.main, marginLeft: "5px" }}
                href="https://social-network.samuraijs.com"
                target="_blank"
                rel="noreferrer"
              >
                here
              </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>
              <b>Email:</b> free@samuraijs.com
            </p>
            <p>
              <b>Password:</b> free
            </p>
          </FormLabel>
          <FormGroup>
            <TextField
              label="Email"
              margin="normal"
              error={!!errors.email}
              {...register(
                "email",
                //   , {
                // required: "Email is required",
                // pattern: {
                //   value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                //   message: "Incorrect email address",
                // },}
              )}
            />
            <TextField
              type="password"
              label="Password"
              margin="normal"
              {...register("password")}
            />
            <FormControlLabel
              label="Remember me"
              control={
                <Controller
                  name={"rememberMe"}
                  control={control}
                  render={({ field: { value, ...rest } }) => (
                    <Checkbox {...rest} checked={value} />
                  )}
                />
              }
              {...register("rememberMe")}
            />
            {errors.email && (
              <span className={styles.errorMessage}>
                {errors.email.message}
              </span>
            )}
            <Button type="submit" variant="contained" color="primary">
              Login
            </Button>
          </FormGroup>
        </FormControl>
      </form>
    </Grid>
  );
};
