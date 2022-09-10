import { useEffect, useRef, useState } from 'react';
import { useSound } from 'use-sound';
import { Button, CardActions, CardContent, IconButton } from '@mui/material';
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import StartAudioCall from './StartAudioCall';
import ResultAudioCall from './ResultAudioCall';
import { IUserWord, IWordCard, IProps } from '../../../interfaces';
import s from '../Games.module.css'
import { baseURL, changeWord, getUserWords, getWord, getWords, setWordToDictionary } from '../../../api';

function AudioCall({ userData }: IProps) {
  const [difficulty, setDifficulty] = useState('1');
  const [isSignIn, setIsSignIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [dataWords, setDataWords] = useState<IWordCard[] | null>(null);
  const [numberCurrentPage, setNumberCurrentPage] = useState<number>(0);
  const [numberCurrentWord, setNumberCurrentWord] = useState<number>(0);
  const [numbersPageList, setNumbersPageList] = useState<number[]>([]);
  const [numbersWordList, setNumbersWordList] = useState<number[]>([]);
  const [arrAnswers, setArrAnswers] = useState<number[]>([]);
  const [numberAnswer, setNumberAnswer] = useState<number | null>(null);
  const [userWordsList, setUserWordsList] = useState<IUserWord[]>([]);
  const [togglerDisplayButtons, setTogglerDisplayButtons] = useState<Boolean>(false);

  const correct = require('../../../assets/sounds/correct.mp3');
  const incorrect = require('../../../assets/sounds/incorrect.mp3');
  const [cor] = useSound(correct);
  const [inCor] = useSound(incorrect);
  const itemRefs = useRef<HTMLButtonElement[]>([]);
  const audio = new Audio();

  const getRandomNumberPage: (min: number, max: number) => number = (min, max) => {
    let numb: number;
    numb = Math.floor(min + Math.random() * (max - min));
    if (numbersPageList.includes(numb)) return getRandomNumberPage(min, max);
    else { setNumbersPageList((numbersPageList) => [...numbersPageList, numb]) }
    return numb;
  };

  const getRandomNumberWord: (min: number, max: number) => number = (min, max) => {
    let numb: number;
    numb = Math.floor(min + Math.random() * (max - min));
    if (numbersWordList.includes(numb)) return getRandomNumberWord(min, max);
    else { setNumbersWordList((numbersWordList) => [...numbersWordList, numb]) }
    return numb;
  };

  const shuffle = (array: number[]) => {
    return array.sort(() => Math.random() - 0.5);
  }

  const onStart = (difficulty: string, isStart: boolean) => {
    setDifficulty(difficulty);
    setIsStart(isStart);
  }

  useEffect(() => {
    if (isStart) {
      getData();
    }
  }, [isStart]);

  useEffect(() => {
    setNumberCurrentWord(getRandomNumberWord(0, 20));
    userData ? setIsSignIn(true) : setIsSignIn(false);
  }, [dataWords])

  useEffect(() => {
    if (numberAnswer || numberAnswer === 0) {
      numberCurrentWord === numberAnswer ? cor() : inCor();
    }
  }, [numberAnswer])

  useEffect(() => {
    setArrAnswers([]);
    setArrAnswers((arrAnswers) => ([...arrAnswers, numberCurrentWord]));
    for (let i = 0; i < 8; i++) {
      setArrAnswers((arrAnswers) => {
        const randomNum = Math.floor(Math.random() * 20);
        if (!arrAnswers.includes(randomNum) && arrAnswers.length < 5) {
          return [...arrAnswers, randomNum]
        } else return [...arrAnswers]
      });
    }
    setArrAnswers((arrAnswers) => (shuffle(arrAnswers)));
    playAudio();
  }, [numberCurrentWord]);

  useEffect(() => {
    if (isFinished && !isLoading) {
      userWordsLoading();
    }
  }, [isFinished, isLoading]);

  useEffect(() => {
    if (isLoading) {
      addUserWord();
    }
  }, [isLoading])


  const getData = () => {
    if (numbersPageList.length < 30) {
      setNumberCurrentPage(() => getRandomNumberPage(0, 30));
    }
    setIsLoading(true);

    getWords(numberCurrentPage, (Number(difficulty) - 1))
      .then((res) => {
        setDataWords(res.data);
        setIsLoading(false);
      });
  };

  const playAudio = async () => {
    audio.pause();
    if (dataWords) {
      const res = await fetch(`${baseURL}${dataWords[numberCurrentWord].audio}`);
      audio.src = `${res.url}`;
      audio.play();
    }
  }

  const addUserWord = () => {
    if (userData && dataWords) {
      getWord(userData?.userId, String(dataWords[numberCurrentWord].id), userData?.token)
        .then((res) => {
          changeWord(userData?.userId, String(dataWords[numberCurrentWord].id), {
            difficulty: difficulty,
            optional: {
              ...res.data.optional, largestSeriesCorAnswAC: 'label',
              game: {
								
                ...res.data.optional.game, audioCall: `${numberCurrentWord === numberAnswer}`,
              },
            }
          }, userData?.token)
        })
        .catch((error) => {
          if (Number(error.message.slice(-3)) === 404) {
            setWordToDictionary(userData?.userId, String(dataWords[numberCurrentWord].id), {
              difficulty: difficulty,
              optional: {
                game: {
                  audioCall: `${numberCurrentWord === numberAnswer}`
                },
                largestSeriesCorAnswAC: 'label',
              }
            }, userData?.token)
          };
        });
    };
    setIsLoading(false);
  };

  const setDataUserWord = () => {
    if (isSignIn) {
      setIsLoading(true);
      addUserWord();
    } else {
      if (dataWords && dataWords.length > 0) {
        setUserWordsList((userWordsList) => [...userWordsList, {
          id: '',
          difficulty: `${difficulty}`,
          wordId: `${dataWords[numberCurrentWord].id}`,
          optional: {
            game: {
              audioCall: `${numberCurrentWord === numberAnswer}`
            }
          }
        }])
      }
    }
  }

  const onNext = () => {
    setDataUserWord();
    if (numbersWordList.length < 20) {
      setNumberCurrentWord(getRandomNumberWord(0, 20));
      setNumberAnswer(null);
    } else {
      setIsFinished(true);
    };
  }

  const onDiscover = () => {
    setTogglerDisplayButtons(false);
  }

  const onHidden = (b: Boolean) => {
    setTogglerDisplayButtons(b);
  }

  const userWordsLoading = () => {
    if (userData) {
      getUserWords(userData?.userId, userData?.token)
        .then((res) => setUserWordsList(res.data))
        .catch((error) => console.log(error));
    };
  };

  const onSelect = (event: React.MouseEvent<HTMLButtonElement>) => {
    setNumberAnswer(Number(event.currentTarget.dataset.number));
  };

  const PageAudioCall = () => {
    if (dataWords) {
      return (
        <div className={s.cardWrapper}>
          <div className={`${s.card}   ${s.cardSprint}`}>
            <CardContent className={s.contentCardVolume}>
              <IconButton
                size="large"
                sx={{
                  width: 100,
                  height: 100,
                  color: '#31597A',
                }}
                onClick={playAudio}>
                <VolumeUpOutlinedIcon fontSize='large' sx={{ width: 60, height: 60 }} />
              </IconButton>
              <ul>
                {arrAnswers.map((item, i) => {
                  return <li key={i}>
                    <Button
                      data-number={item}
                      ref={(el) => {
                        return el ? itemRefs.current[item] = el : null
                      }}
                      variant="text"
                      onClick={(event) => { onSelect(event); onHidden(true) }}
                    >
                      {++i} {dataWords[item].wordTranslate}
                    </Button>
                  </li>
                })}
              </ul>
            </CardContent>
            <CardActions  sx={{
                  marginBottom: "20px",
                }}>
              <Button
                variant='contained'
                style={{ display: !togglerDisplayButtons ? 'flex' : 'none' }}
                onClick={() => { onDiscover(); onHidden(true); inCor() }}>I don't know</Button>
              <Button
                variant='contained'
                style={{ display: togglerDisplayButtons ? 'flex' : 'none' }}
                onClick={() => { onNext(); onHidden(false); }}
              >
                <ArrowRightAltIcon fontSize='medium' />
              </Button>
            </CardActions>
          </div >
        </div>
      )
    } else return null;
  }

  const start = !isStart ? <StartAudioCall onStart={onStart} /> : null;
  const pageGame = dataWords && !isFinished && !isLoading ? <PageAudioCall /> : null;
  const result = isFinished && !isLoading ?
    <ResultAudioCall
      userWordsList={userWordsList}
      difficulty={difficulty}
      dataWords={dataWords} /> : null;
  return (
    <>
      {start}
      {pageGame}
      {result}
    </>
  );
}

export default AudioCall
