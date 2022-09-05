import { useEffect, useState } from "react";
import { useKey } from "react-keyboard-hooks";
import { useSound } from "use-sound";
import {
  Button, Card, CardActions, CardContent, Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { IUserWord, IWordCard, IProps } from "../../../interfaces";
import s from "../Games.module.css";
import {
  changeWord, getUserWords, getWord, getWords, setWordToDictionary,
} from "../../../api";
import Start from "./Start";
import Result from "./Result";

const Sprint = ({ userData }: IProps) => {
  const [difficulty, setDifficulty] = useState("1");
  const [isSignIn, setIsSignIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [dataWords, setDataWords] = useState<IWordCard[] | null>(null);
  const [numberCurrentPage, setNumberCurrentPage] = useState<number>(0);
  const [numberCurrentWord, setNumberCurrentWord] = useState<number>(0);
  const [seconds, setSeconds] = useState(61);
  const [numbersPageList, setNumbersPageList] = useState<number[]>([]);
  const [numbersWordList, setNumbersWordList] = useState<number[]>([]);
  const [arrAnswers, setArrAnswers] = useState<number[]>([10, 15]);
  const [numberAnswer, setNumberAnswer] = useState<number>(0);
  const [userWordsList, setUserWordsList] = useState<IUserWord[]>([]);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [largestSeriesCorAnsw, setLargestSeriesCorAnsw] = useState<number>(0);

  const correct = require("../../../assets/sounds/correct.mp3");
  const incorrect = require("../../../assets/sounds/incorrect.mp3");
  const [cor] = useSound(correct);
  const [inCor] = useSound(incorrect);

  const getRandomNumberPage: (min: number, max: number) => number = (min, max) => {
    let numb: number;
    numb = Math.floor(min + Math.random() * (max - min));
    if (numbersPageList.includes(numb)) return getRandomNumberPage(min, max);
    setNumbersPageList((numbersPageList) => [...numbersPageList, numb]);
    return numb;
  };

  const getRandomNumberWord: (min: number, max: number) => number = (min, max) => {
    let numb: number;
    numb = Math.floor(min + Math.random() * (max - min));

    if (numbersWordList.includes(numb)) return getRandomNumberWord(min, max);
    setNumbersWordList((numbersWordList) => [...numbersWordList, numb]);
    return numb;
  };

  const onStart = (difficulty: string, isStart: boolean) => {
    setDifficulty(difficulty);
    setIsStart(isStart);
  };

  useEffect(() => {
    if (isStart) {
      setNumberCurrentWord(getRandomNumberWord(0, 20));
      getData();
      userData ? setIsSignIn(true) : setIsSignIn(false);
    }
  }, [isStart]);

  useEffect(() => {
    setArrAnswers([Math.floor(Math.random() * 20), numberCurrentWord]);
  }, [numberCurrentWord]);

  useEffect(() => {
    setNumberAnswer(arrAnswers[Math.floor(Math.random() * 2)]);
  }, [arrAnswers]);

  useEffect(() => {
    if (isFinished && timerId) {
      userWordsLoading();
      clearTimeout(timerId);
    }
  }, [isFinished]);

  const countdown = () => {
    const timeoutId = setTimeout(() => {
      countdown();
    }, 1000);
    setTimerId(timeoutId);
    setSeconds((seconds) => {
      if (seconds > 0) {
        return (seconds - 1);
      }
      setIsFinished(true);
      setIsLoading(true);
      return 0;
    });
  };

  const getData = () => {
    if (numbersWordList.length < 30) {
      setNumberCurrentPage(() => getRandomNumberPage(0, 30));
    }
    setIsLoading(true);

    getWords(numberCurrentPage, (Number(difficulty) - 1))
      .then((res) => {
        setDataWords(res.data);
        setIsLoading(false);
        countdown();
      });
  };

  const onSelect = (event: React.MouseEvent<HTMLButtonElement>) => {
    const answer = (numberCurrentWord === numberAnswer && event.currentTarget.dataset.name === "right")
      || (numberCurrentWord !== numberAnswer && event.currentTarget.dataset.name === "wrong");
    afterSelect(answer);
  };

  const onSelectByKey = (str: string) => {
    const answer = (numberCurrentWord === numberAnswer && str === "right")
      || (numberCurrentWord !== numberAnswer && str === "wrong");
    afterSelect(answer);
  };

  const afterSelect = (answer: boolean) => {
    answer ? cor() : inCor();
    answer ? setLargestSeriesCorAnsw((largestSeriesCorAnsw) => largestSeriesCorAnsw + 1) : setLargestSeriesCorAnsw(0);
    if (isSignIn) {
      setIsLoading(true);
      addUserWord(String(answer));
    } else if (dataWords && dataWords.length > 0) {
      setUserWordsList((userWordsList) => [...userWordsList, {
        id: "",
        difficulty: `${difficulty}`,
        wordId: `${dataWords[numberCurrentWord].id}`,
        optional: {
          game: {
            sprint: `${answer}`,
          },
        },
      }]);
    }

    if (numbersWordList.length < 20) {
      setNumberCurrentWord(getRandomNumberWord(0, 20));
    } else {
      setIsFinished(true);
      setIsLoading(true);
      if (timerId) {
        clearTimeout(timerId);
      }
    }
  };

  useKey("ArrowLeft", () => onSelectByKey("right"));
  useKey("ArrowRight", () => onSelectByKey("wrong"));

  const addUserWord = (answer: string) => {
    if (userData && dataWords) {
      getWord(userData?.userId, String(dataWords[numberCurrentWord].id), userData?.token)
        .then((res) => {
          changeWord(userData?.userId, String(dataWords[numberCurrentWord].id), {
            difficulty,
            optional: {
              ...res.data.optional,
              largestSeriesCorAnswS: `${largestSeriesCorAnsw}`,
              game: {
                ...res.data.optional.game, sprint: answer,
              },
            },
          }, userData?.token);
        })
        .catch((error) => {
          if (Number(error.message.slice(-3)) === 404) {
            setWordToDictionary(userData?.userId, String(dataWords[numberCurrentWord].id), {
              difficulty,
              optional: {
                game: {
                  sprint: answer,
                },
                largestSeriesCorAnswS: `${largestSeriesCorAnsw}`,
              },
            }, userData?.token);
          }
        });
    }
    setIsLoading(false);
  };

  const userWordsLoading = () => {
    if (userData) {
      getUserWords(userData?.userId, userData?.token)
        .then((res) => setUserWordsList(res.data))
        .catch((error) => console.log(error));
    }
  };

  const PageSprint = () => {
    if (dataWords) {
      return (
        <Card className={s.cardWrapper}>
          <div className={`${s.card} ' '  ${s.cardSprint}`}>
            <div className={s.timer}>{seconds}</div>
            <CardContent>
              <Typography sx={{ mb: 1.5, fontWeight: "900", fontSize: 50 }}>
                {dataWords[numberCurrentWord].word}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {dataWords[numberAnswer].wordTranslate}
              </Typography>
            </CardContent>
            <CardActions>
              <Button data-name="right" onClick={onSelect}>
                <ArrowBackIcon />
                Right
              </Button>
              <Button data-name="wrong" onClick={onSelect}>
                Wrong
                <ArrowForwardIcon />
              </Button>
            </CardActions>
          </div>
        </Card>
      );
    } return null;
  };

  const start = !isStart ? <Start onStart={onStart} /> : null;
  const pageGame = !(isLoading || !dataWords) ? <PageSprint /> : null;
  const result = isFinished ? <Result userWordsList={userWordsList} difficulty={difficulty} dataWords={dataWords} /> : null;

  return (
    <>
      {start}
      {pageGame}
      {result}
    </>
  );
};

export default Sprint;
