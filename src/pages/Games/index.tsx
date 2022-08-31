import { Button, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import s from './Games.module.css'

function Games() {
  let navigate = useNavigate();
  return (
    <div className={s.contentGames}>
      <Card sx={{ width: 270, maxHeight: 400 }}>
        <CardContent>
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
      <Card sx={{ width: 270, maxHeight: 400 }}>
        <CardContent>
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
  )
}

export default Games
