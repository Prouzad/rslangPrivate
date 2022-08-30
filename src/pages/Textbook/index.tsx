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
import s from "./Textbook.module.css";
import { IProps, IWordCard } from "../../interfaces";
import CardWord from "./card";
import { TextbookWords } from "../../api";

const Textbook = ({ userData }: IProps) => {
  const [group, setGroup] = useState(0);
  const [page, setPage] = useState(1);
  const [words, setWords] = useState<IWordCard[]>([]);

  const handleChangeSection = (event: SelectChangeEvent) => {
    setGroup(+event.target.value);
  };

  useEffect(() => {
    async function fetchWords() {
      const wordsArr = await TextbookWords.getWords(page - 1, group);
      setWords(wordsArr);
    }
    fetchWords();
  }, [page, group]);


  return (
    <div className={s.contentBook}>
      <h2>Text Book</h2>

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
          {words.map((word) => {
            return <CardWord key={word.id} card={word} user={userData} group={group.toString()} />;
          })}
        </Box>
      </Box>
    </div>
  );
};

export default Textbook;
