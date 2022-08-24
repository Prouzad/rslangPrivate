import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import {
  Box,
  TextField,
  Typography,
  Button,
  Alert,
  AlertTitle,
  Link,
} from "@mui/material";
import { EventType } from "@testing-library/react";
import { useRef, useState, useEffect } from "react";
import { loginUser } from "../../../api/index";

const LogIn = () => {
  const errRef = useRef();
  //const userRef = useRef();

  const [mail, setMail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const response = await loginUser({
        email: mail,
        password: pwd,
      });
      setSuccessMsg(true);
    } catch (err) {
      setErrMsg(`Error`);
    }
  };

return (
<>
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

            <Typography
              variant="h2"
              sx={{
                fontSize: "25px",
                fontWeight: "400",
              }}
            >
              Войти
            </Typography>

            <TextField
              required
              name="email"
              id="email-input"
              label="Ваш email"
              type="text"
              margin="normal"
              autoComplete="off"
              onChange={(e) => setMail(e.target.value)}
            />

            <TextField
              required
              name="password"
              id="outlined-password-input"
              label="Пароль"
              type="password"
              autoComplete="off"
              margin="normal"
              onChange={(e) => setPwd(e.target.value)}
            />

            <Button
             
              variant="contained"
              sx={{ margin: "10px 0" }}
              type="submit"
            >
              LogIn
            </Button>

            <Typography>
              Нет аккаунта?
              <Link
                sx={{
                  margin: "0 5px",
                }}
                href="#"
                underline="hover"
              >
                Регистрация
              </Link>
            </Typography>
          </Box>
        </form>
</>
)

};

export default LogIn;
