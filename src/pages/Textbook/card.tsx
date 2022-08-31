import { Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { IUserInfo, IWordCard } from "../../interfaces";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import { baseURL, setWordToDictionary } from "../../api";
import s from "./Textbook.module.css";
interface Props {
  card: IWordCard;
  user?: IUserInfo;
  group?: string;
}

const CardWord = ({ card, user, group }: Props) => {
  const imgSrc = `${baseURL}${card.image}`;
  const audioSrc = `${baseURL}${card.audio}`;
  const audioMeanSrc = `${baseURL}${card.audioMeaning}`;
  const audioExampleSrc = `${baseURL}${card.audioExample}`;

  const start = (src: string) => {
    const audio = new Audio(src);
    audio.play();
  };
  console.log('User', user);
  console.log('CARD', card);


  return (
    <Card raised={true} className={s.cardBox} >
      <CardContent>
      <CardMedia component="img" alt="XX" height="180" image={imgSrc} sx={{marginBottom: 5,}} />
        <Box sx={{ display: "flex", flexDirection: "row", columnGap: "6px" }}>
          <Typography gutterBottom variant="h5" component="div">
            {card.word}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {card.transcription}
          </Typography>
          <VolumeDownIcon
            sx={{ height: 20, width: 20, cursor: 'pointer' }}
            onClick={() => start(audioSrc)}
          />
        </Box>

        <Typography gutterBottom variant="h6" component="div">
          {card.wordTranslate}
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "row", columnGap: "6px" }}>
          <Typography
            variant="body2"
            color="text.secondary"
          >{card.textMeaning}</Typography>
          <VolumeDownIcon
            sx={{ height: 20, width: 20, cursor: 'pointer' }}
            onClick={() => start(audioMeanSrc)}
          />
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
        >{card.textMeaningTranslate}</Typography>

        <hr />
        <Box sx={{ display: "flex", flexDirection: "row", columnGap: "6px" }}>
          <Typography
            variant="body2"
            color="text.secondary"
          >{card.textExample}</Typography>
          <VolumeDownIcon
            sx={{ height: 20, width: 20, cursor: 'pointer' }}
            onClick={() => start(audioExampleSrc)}
          />
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
        >{card.textExampleTranslate}</Typography>
       
      </CardContent>
			{user ?
          <Button
            variant="contained"
            sx={{ marginTop: 2 }}
            onClick={() => setWordToDictionary(user.userId, card.id,
              {
                "difficulty": `${group}`,
                "optional": {}
              },
              user.token
            )}
          >
            Add to learn
          </Button>
          : null
        }
    </Card>
  );
};

export default CardWord;
