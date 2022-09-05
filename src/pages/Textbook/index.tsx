import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import s from "./Textbook.module.css";
import { IProps, IUserWord, IWordCard } from "../../interfaces";
import CardWord from "./card";
import Footer from "../footer";
import { getUserWords, getWords } from "../../api";

const Textbook = ({ userData }: IProps) => {
  const [group, setGroup] = useState(0);
  const [page, setPage] = useState(1);
  const [words, setWords] = useState<IWordCard[]>([]);
	const [userWords, setuserWords] = useState<IUserWord[]>([]);

	

	const handleChangeSection = (event: SelectChangeEvent) => {
    setGroup(+event.target.value);
  };

  useEffect(() => {
    async function fetchWords() {
      const wordsArr = await getWords(page - 1, group);
      setWords(wordsArr.data);
    }
		async function fetchUserWords() {
      const userWordsArr = await getUserWords(userData?.userId, userData?.token);
      setuserWords(userWordsArr.data);
    }
    if (userData?.token) {
      fetchUserWords()
    }
		fetchWords()

  }, [page, group, userData]);

	const difficultArr = userWords.filter(item => item.difficulty === 'Hard')
	const learnedArr = userWords.filter(item => item.difficulty === 'Learned')

  return (
    <>
    <div className={s.contentBook}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "80%",
          marginTop: "25px",
          fontSize: "32px"
        }}
      >
        <h2>Text Book</h2>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "80%",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "end",
            justifyContent: "space-around",
            width: "100%",
            marginBottom: "25px",
            flexWrap: "wrap",
          }}
        >
        <Box
          sx={{
            width: "60%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Button
            variant="contained"
            className={s.sprintBtn}
          >
            Sprint
          </Button>
          <Button
            variant="contained"
            className={s.audioCallBtn}
          >
            Audio Call
          </Button>
        </Box>
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

        </Box>
        <Pagination
          count={30}
          page={page}
          onChange={(_e, value) => setPage(value)}
          color="primary"
          size="large"
          sx={{
            margin: "auto",
            marginTop: "25px",
            marginBottom: "45px",
            fontSize: "45px"
          }} />
        <Box className={s.bookPage}>
          {words.map((word) => {
            return <CardWord key={word.id} card={word} user={userData} group={group.toString()} diff={difficultArr.some(item => item.wordId === word.id)} learned={learnedArr.some(item => item.wordId === word.id)} />;
          })}
        </Box>
      </Box>
    </div>
    <Footer />
    </>
  );
};

export default Textbook;
