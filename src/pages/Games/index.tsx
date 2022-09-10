import {
  Box, Button, Card, CardContent, Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import s from "./Games.module.css";
import sprintGame from "../../assets/icon/sprintGame.svg";
import audioGame from "../../assets/icon/audioGame.svg";

function Games() {
  const navigate = useNavigate();
  return (
    <div className={s.cardWrapper}>
      <div className={s.contentGames}>
        <Card sx={{ maxWidth: 350 }} className={s.card}>
          <CardContent className={s.cardContent}>
            <Box sx={{ maxWidth: 90 }}>
              {" "}
              <img src={sprintGame} alt="sprint" />
            </Box>
            <Typography gutterBottom variant="h5" component="div">
              Sprint
            </Typography>
            <Typography>
              Check how much points you can get in one minute, making educated guesses about what is right and what is wrong.
            </Typography>
            <Button
              variant="outlined"
              size="medium"
              onClick={() => navigate("/sprint")}
            >
              START Sprint
            </Button>
          </CardContent>
        </Card>
        <Card className={s.card} sx={{ maxWidth: 350 }}>
          <CardContent className={s.cardContent}>
            <Box sx={{ maxWidth: 90 }}>
              {" "}
              <img src={audioGame} alt="audio" />
            </Box>
            <Typography gutterBottom variant="h5" component="div">
              AudioCall
            </Typography>
            <Typography>
              Check your listening skills, trying to pick the right meaning after hearing a word. Be careful, as you just have one guess.
            </Typography>
            <Button
              variant="outlined"
              size="medium"
              onClick={() => navigate("/audio-call")}
            >
              START AudioCall
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Games;
