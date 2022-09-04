import { Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { IUserInfo, IWordCard } from "../../interfaces";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import { baseURL, deleteWordFromDictionary } from "../../api";
import { useState } from "react";

interface Props {
  card?: IWordCard;
  user?: IUserInfo;
}
const CardWord = ({ card, user }: Props) => {
	const [IsShow, setIsShow] = useState(true)
  const imgSrc = `${baseURL}${card?.image}`;
  const audioSrc = `${baseURL}${card?.audio}`;
  const audioMeanSrc = `${baseURL}${card?.audioMeaning}`;
  const audioExampleSrc = `${baseURL}${card?.audioExample}`;

  const start = (src: string) => {
    const audio = new Audio(src);
    audio.play();
  };

	const handleChange = () => {
		setIsShow(false)
	}

  return (
		IsShow
    ? <Card sx={{ maxWidth: 350 }}>
      <CardMedia component="img" alt="XX" height="180" image={imgSrc} />
      <CardContent>
        <Box sx={{ display: "flex", flexDirection: "row", columnGap: "6px" }}>
          <Typography gutterBottom variant="h5" component="div">
            {card?.word}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {card?.transcription}
          </Typography>
          <VolumeDownIcon
            sx={{ height: 20, width: 20 }}
            onClick={() => start(audioSrc)}
          />
        </Box>

        <Typography gutterBottom variant="h6" component="div">
          {card?.wordTranslate}
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "row", columnGap: "6px" }}>
          <Typography
            variant="body2"
            color="text.secondary"
            dangerouslySetInnerHTML={{ __html: card?.textMeaning || "" }}
          ></Typography>
          <VolumeDownIcon
            sx={{ height: 20, width: 20 }}
            onClick={() => start(audioMeanSrc)}
          />
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          dangerouslySetInnerHTML={{ __html: card?.textMeaningTranslate || "" }}
        ></Typography>

        <hr />
        <Box sx={{ display: "flex", flexDirection: "row", columnGap: "6px" }}>
          <Typography
            variant="body2"
            color="text.secondary"
            dangerouslySetInnerHTML={{ __html: card?.textExample || "" }}
          ></Typography>
          <VolumeDownIcon
            sx={{ height: 20, width: 20 }}
            onClick={() => start(audioExampleSrc)}
          />
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
        >{card?.textExampleTranslate}</Typography>
        <Button
          variant="contained"
          sx={{ marginTop: 2 }}
          onClick={() => {
            deleteWordFromDictionary(user?.userId, card?.id, user?.token)
						handleChange()
          }}
        >
          Delete from dictionary
        </Button>
      </CardContent>
    </Card>
		: null
  );
};

export default CardWord;
