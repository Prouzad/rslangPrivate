import { useEffect, useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import s from '../../Games.module.css'
import { PageSettingsProps } from '../../../../interfaces';

const StartAudioCall = (props: PageSettingsProps) => {
  const [isStart, setIsStart] = useState(false);
  const [difficulty, setDifficulty] = useState('1');

  const handleChange = (event: SelectChangeEvent) => {
    setDifficulty(event.target.value as string);
  };

  useEffect(() => {
    onStart();
  }, [])

  const onStart = () => {
    const { onStart } = props;
    setIsStart(true);
    onStart(difficulty, isStart);
  };

  return (
    <div className={s.cardWrapper}>
      <div className={`${s.card} ' '  ${s.cardSprint}`}>
        <h2>AudioCall</h2>
        <Box sx={{ width: 200 }}>
          <FormControl fullWidth variant='standard'>
            <InputLabel>Select the Level</InputLabel>
            <Select 
              value={difficulty}
              onChange={handleChange}>
              <MenuItem value='1'>1</MenuItem>
              <MenuItem value='2'>2</MenuItem>
              <MenuItem value='3'>3</MenuItem>
              <MenuItem value='4'>4</MenuItem>
              <MenuItem value='5'>5</MenuItem>
              <MenuItem value='6'>6</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Button variant='contained' sx={{ margin: 2 }} onClick={onStart}>
          START
        </Button>
      </div>
    </div>
  );
};

export default StartAudioCall;