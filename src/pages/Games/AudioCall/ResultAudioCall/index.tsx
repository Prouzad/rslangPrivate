import { useEffect, useState } from 'react';
import { List, ListSubheader, Stack } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { IPageResultProps, IUserWord, IWordCard } from '../../../../interfaces';
import { baseURL } from '../../../../api';

const ResultAudioCall = (props: IPageResultProps) => {
  const [userWordsList, setUserWordsList] = useState<IUserWord[]>([]);
  const [difficulty, setDifficulty] = useState('1');
  const [dataWords, setDataWords] = useState<IWordCard[] | null>(null);

  useEffect(() => {
    const { userWordsList, difficulty, dataWords } = props;
    setUserWordsList(userWordsList);
    setDifficulty(difficulty);
    setDataWords(dataWords)
  }, [props])

  const audio = new Audio();
  const startAudio = async (event: React.MouseEvent<SVGSVGElement>) => {
    audio.pause()
    const curWord = dataWords?.filter((item) => String(item.id) === (event.currentTarget.dataset.id));
    if (curWord) {
      const res = await fetch(`${baseURL}${curWord[0].audio}`);
      audio.src = `${res.url}`;
      audio.play();
    }
  }

  let wordRightInfo: Array<IWordCard[]> = [];
  let wordWrongInfo: Array<IWordCard[]> = [];

  const currentDifficultyRightAnswers = userWordsList.filter((item) => item.difficulty === difficulty
    && (String(item.optional.game?.audioCall) === 'true'));
  const currentDifficultyWrongAnswers = userWordsList.filter((item) => item.difficulty === difficulty
    && (String(item.optional.game?.audioCall) === 'false'));
  currentDifficultyRightAnswers.map((item) => wordRightInfo.push((dataWords as IWordCard[])
    .filter((i) => String(i.id) === item.wordId)))
  currentDifficultyWrongAnswers.map((item) => wordWrongInfo.push((dataWords as IWordCard[])
    .filter((i) => String(i.id) === item.wordId)))

  return (
      <List
        sx={{
          width: '100%',
          maxWidth: 500,
          position: 'relative',
          overflow: 'auto',
          maxHeight: 500,
          padding: '20px',
          '& ul': { padding: 0 },
        }}
      >
        <h2>{currentDifficultyRightAnswers.length > 10
          ? 'Congratulations, great result!' : 'Not bad!'}</h2>
        <h5>right: {wordRightInfo.length}</h5>
        {wordRightInfo.flat().map((item, index) => {
          return (
            <div key={`${index}`}>
              <Stack direction="row" alignItems="center">
                <VolumeUpIcon data-id={item.id} onClick={startAudio} />
                {<ListSubheader>{`${item.word} - ${item.wordTranslate}`}</ListSubheader>}
              </Stack>
            </div>)
        })}
        <h5>wrong: {wordWrongInfo.length}</h5>
        {wordWrongInfo.flat().map((item, index) => {
          return (
            <div key={`${index}`}>
              <Stack direction="row" alignItems="center">
                <VolumeUpIcon data-id={item.id} onClick={startAudio} />
                {<ListSubheader>{`${item.word} - ${item.wordTranslate}`}</ListSubheader>}
              </Stack>
            </div>)
        })}
      </List>
  );
};

export default ResultAudioCall;