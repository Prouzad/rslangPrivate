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
import Footer from "../footer";

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
						justifyContent: "flex-end",
						width: "100%",
						marginBottom: "25px",
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

				</Box>
				<Box className={s.bookPage}>
					{words.map((word) => {
						return <CardWord key={word.id} card={word} user={userData} group={group.toString()} />;
					})}
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
			</Box>
		</div>
		<Footer />
		</>
  );
};

export default Textbook;
