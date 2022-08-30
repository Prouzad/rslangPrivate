import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import s from "./Dictionary.module.css";
import { IProps, IUserWord, IWordCard } from "../../interfaces";
import CardWord from "./word";
import { getUserWords, TextbookWords } from "../../api";


const Dictionary = ({ userData }: IProps) => {
  const [group, setGroup] = useState(0);
  const [page, setPage] = useState(1);
  const [words, setWords] = useState<IUserWord[]>([]);
  const [allWords, setAllWords] = useState<IWordCard[]>([]);

  const handleChangeSection = (event: SelectChangeEvent) => {
    setGroup(+event.target.value);
  };


  useEffect(() => {
    async function fetchAllWords() {
      const wordsArr = await TextbookWords.getWords(page - 1, group);
      setAllWords(wordsArr);
    }
    async function fetchUserWords() {
      const wordsArr = await getUserWords(userData?.userId, userData?.token, page - 1, group);
      setWords(wordsArr.data);
    }
    if (userData?.token) {
      fetchUserWords()
      fetchAllWords()
    }
  }, [page, group, userData]);

  const intersection = allWords.filter(o1 => words.some(o2 => o1.id === o2.wordId));

  return (
    <div className={s.contentBook}>
      <h2>Dictionary</h2>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          columnGap: "8px",
        }}
      >
        <FormControl
          sx={{
            width: "250px",
          }}
        >
          <InputLabel id="select-label">Select SECTION</InputLabel>
          <Select
            labelId="select-label"
            id="select"
            value={group.toString()}
            label="Select SECTION"
            onChange={handleChangeSection}
          >
            <MenuItem value={0}>Section 1</MenuItem>
            <MenuItem value={1}>Section 2</MenuItem>
            <MenuItem value={2}>Section 3</MenuItem>
            <MenuItem value={3}>Section 4</MenuItem>
            <MenuItem value={4}>Section 5</MenuItem>
            <MenuItem value={5}>Section 6</MenuItem>
            <MenuItem value={6}>Section 7</MenuItem>
          </Select>
        </FormControl>

        <Pagination
          count={30}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
        }}
      >
        <Box className={s.bookPage}>
          {intersection.map((word) => {
            return <CardWord key={word.id} card={word} user={userData} />;
          })}
        </Box>
      </Box>
    </div>
  );
};

export default Dictionary;
