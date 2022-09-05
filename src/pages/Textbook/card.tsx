import { Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { IUserInfo, IWordCard } from "../../interfaces";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import { baseURL, ChangeUserWords, setWordToDictionary } from "../../api";
import s from "./Textbook.module.css";
import { useEffect, useState } from "react";
interface Props {
  card: IWordCard;
  user?: IUserInfo;
  group?: string;
	diff?: any;
	learned?: any;

}

const CardWord = ({ card, user, diff, learned}: Props) => {
	const [IsDiff, setIsDiff] = useState(false)
	const [IsLearned, setIsLearned] = useState(false)
  const imgSrc = `${baseURL}${card.image}`;
  const audioSrc = `${baseURL}${card.audio}`;
  const audioMeanSrc = `${baseURL}${card.audioMeaning}`;
  const audioExampleSrc = `${baseURL}${card.audioExample}`;
  const start = (src: string) => {
    const audio = new Audio(src);
    audio.play();
  };

	useEffect(() => {
		setIsDiff(diff)
		setIsLearned(learned)
	}, [diff, learned])

	const handleChange = () => {
		setIsDiff(true)
		console.log(IsDiff)
	}
	const handleLearnedChange = () => {
		setIsLearned(true)
		console.log(IsDiff)
	}

	return (
    !IsLearned
		? <Card  className={s.cardBox} sx={{
			background: `${IsDiff ? "rgba(232, 144, 144, 0.4)" : "#fdfeff"}`
		}}>
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
            dangerouslySetInnerHTML={{ __html: card.textMeaning || "" }}
          ></Typography>
          <VolumeDownIcon
            sx={{ height: 20, width: 20, cursor: 'pointer' }}
            onClick={() => start(audioMeanSrc)}
          />
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          dangerouslySetInnerHTML={{ __html: card.textMeaningTranslate || "" }}
        ></Typography>

        <hr />
        <Box sx={{ display: "flex", flexDirection: "row", columnGap: "6px" }}>
          <Typography
            variant="body2"
            color="text.secondary"
            dangerouslySetInnerHTML={{ __html: card.textExample || "" }}
          ></Typography>
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
			<Box
				sx={{
					width: '100%',
					display: 'flex',
					justifyContent: 'space-evenly',
				}}
			>
			{user && !IsDiff ?
          <Button
            variant="contained"
						sx={{ marginTop: 2, background: "orange" }}
						className={s.cardBtn}
            onClick={() => {setWordToDictionary(user.userId, card.id,
              {
                "difficulty": `Hard`,
                "optional": {}
              },
              user.token
            )
						handleChange()
						}}
          >
						Difficult 
          </Button>
          : null
        }
			{user ?
				<Button
					variant="contained"
					sx={{ marginTop: 2, background: "orange" }}
					className={s.cardBtn}
					onClick={() => {
						!IsDiff ? setWordToDictionary(user.userId, card.id,
              {
                "difficulty": `Learned`,
                "optional": {}
              },
              user.token
            ) 
						: ChangeUserWords(user.userId, card.id,
              {
                "difficulty": `Learned`,
                "optional": {}
              },
              user.token
            )
						handleLearnedChange()
					}}
				>
					Learned
				</Button>
				: null
			}
			</Box>
		
    </Card>

		: null
  );
};

export default CardWord;
