import {
  Box,
  TextField,
  Typography,
  Button,
  Alert,
  AlertTitle,
} from "@mui/material";
import { useContext, useRef, useState, useEffect } from "react";
import {loginUser, setLocalStorage} from "../../../api/index";
import {ContextLogin} from '../../../App'

const LogIn = () => {
  const errRef = useRef();
  const [mail, setMail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);
  const [userData, setUserData] = useContext(ContextLogin);

  useEffect(() => {
    setErrMsg('')
  }, [mail, pwd])

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email: mail, password: pwd})
      setLocalStorage(JSON.stringify(response.data))
      setSuccessMsg(true);
      setUserData(response.data)
    } catch (err: any) {
      if (!err?.response) {
        setErrMsg(`No server Response`);
      } else if (err.response?.status === 404) {
        console.log(err.response?.status);
        setErrMsg(`Couldn't find a user with email: ${mail}`);
      } else if (err.response?.status === 403) {
        console.log(err.response?.status);
        setErrMsg(`Wrong password`);
      }
      else {
        console.log(err.response?.status);
        setErrMsg(`Registration failed`);
      }
    }
  };

  return (
    <>
      {" "}
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
              textAlign:"center",
              fontSize: "25px",
              fontWeight: "400",
            }}
          >
            Welcome!
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
              name="email"
              id="email-input"
              label="Your email"
              type="text"
              margin="normal"
              autoComplete="off"
              onChange={(e) => setMail(e.target.value)}
              value={mail}
            />

            <TextField
              required
              name="password"
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="off"
              margin="normal"
              onChange={(e) => setPwd(e.target.value)}
            />

            <Button variant="contained" sx={{ margin: "10px 0" }} type="submit">
              LogIn
            </Button>
          </Box>
        </form>
      )}
    </>
  );

};

export default LogIn;
