import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import {
  Box,
  TextField,
  Typography,
  Button,
  Alert,
  AlertTitle,
} from "@mui/material";
import { useRef, useState, useEffect } from "react";
import {createUser} from "../../../api/index";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^[0-9a-zA-Z!@#$%^&*]{8,}$/;
const MAIL_REGEX =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/;

const SignUp = () => {
  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);

  const [mail, setMail] = useState("");
  const [validMail, setMailPwd] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);


  const errRef = useRef();
  const userRef = useRef();

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
  }, [pwd]);

  useEffect(() => {
    const result = MAIL_REGEX.test(mail);
    setMailPwd(result);
  }, [mail]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, mail]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(user, pwd, mail);
    const userVal = USER_REGEX.test(user);
    const pwdVal = PWD_REGEX.test(pwd);
    const mailVal = MAIL_REGEX.test(mail);
    if (!userVal || !pwdVal || !mailVal) {
      setErrMsg("Invalid Entry");
      return;
    }

    try {
      const response = await createUser({ name: user, email: mail, password: pwd})
      console.log(response.data);
      setSuccessMsg(true);
    } catch (err: any) {
      if (!err?.response) {
        setErrMsg(`No server Response`);
      } else if (err.response?.status === 417) {
        console.log(err.response?.status);
        setErrMsg(`User with this e-mail exists`);
      } else {
        console.log(err.response?.status);
        setErrMsg(`Registration failed`);
      }
    }
  };

  return (
    <>
      {successMsg ? (
        <Box
          display="flex"
          flexDirection={"column"}
          maxWidth="400"
          minHeight={"300px"}
          alignItems="center"
          justifyContent={"center"}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: "25px",
              fontWeight: "400",
            }}
          >
            Registration completed!
          </Typography>
        </Box>
      ) : (
        <form onSubmit={handleSubmit}>
          <Box
            display="flex"
            flexDirection={"column"}
            maxWidth="400"
            alignItems="center"
          >
            {errMsg && (
              <Box ref={errRef}>
                <Alert severity="error">
                  <AlertTitle>Error</AlertTitle>
                  <strong>{errMsg}</strong>
                </Alert>
              </Box>
            )}

            <TextField
              required
              name="name"
              id="username"
              label="Your name"
              type="text"
              autoComplete="off"
              margin="normal"
              helperText="Min 4 characters"
              InputProps={{
                ref: userRef,
                endAdornment: validName ? (
                  <DoneIcon sx={{ color: "#1976d2" }} />
                ) : (
                  user && <CloseIcon sx={{ color: "red" }} />
                ),
              }}
              onChange={(e) => setUser(e.target.value)}
            />

            <TextField
              required
              name="email"
              id="email-input"
              label="Your email"
              type="text"
              margin="normal"
              InputProps={{
                endAdornment: validMail ? (
                  <DoneIcon sx={{ color: "#1976d2" }} />
                ) : (
                  mail && <CloseIcon sx={{ color: "red" }} />
                ),
              }}
              onChange={(e) => setMail(e.target.value)}
            />

            <TextField
              required
              name="password"
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="off"
              margin="normal"
              helperText="Min 8 characters"
              InputProps={{
                endAdornment: validPwd ? (
                  <DoneIcon sx={{ color: "#1976d2" }} />
                ) : (
                  pwd && <CloseIcon sx={{ color: "red" }} />
                ),
              }}
              onChange={(e) => setPwd(e.target.value)}
            />

            <Button
              disabled={!validName || !validPwd || !validMail ? true : false}
              variant="contained"
              sx={{ margin: "10px 0" }}
              type="submit"
            >
              SignUp
            </Button>

          </Box>
        </form>
      )}
      
    </>
  );
};

export default SignUp;
