import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
	Tab,
	Tabs,
} from "@mui/material";
import { useEffect, useState } from "react";
import s from "./Dictionary.module.css";
import { IProps, IUserWord, IWordCard } from "../../interfaces";
import CardWord from "./word";
import { getUserWords, getWords } from "../../api";

const Dictionary = ({ userData }: IProps) => {
  const [group, setGroup] = useState(0);
  const [diff, setDiff] = useState('Hard');
  const [page, setPage] = useState(1);
  const [words, setWords] = useState<IUserWord[]>([]);
  const [allWords, setAllWords] = useState<IWordCard[]>([]);

  const handleChangeSection = (event: SelectChangeEvent) => {
    setGroup(+event.target.value);
  };

	const handleChange = (event: React.SyntheticEvent, newValue: string)=>{
		setDiff(newValue)
	}

	useEffect(() => {
    async function fetchAllWords() {
      const wordsArr = await getWords(page - 1, group);
      setAllWords(wordsArr.data);
    }
    async function fetchUserWords() {
      const wordsArr = await getUserWords(userData?.userId, userData?.token);
      setWords(wordsArr.data);
    }
    if (userData?.token) {
      fetchUserWords()
      fetchAllWords()
    }
  }, [page, group, userData]);

  const intersection = allWords.filter(o1 => words.filter(itme => itme.difficulty === `${diff}` ).some(o2 => o1.id === o2.wordId));

  return (
    <div className={s.contentBook}>
      <Tabs
				value={diff}
				onChange={handleChange}
				textColor="secondary"
				indicatorColor="secondary"
				aria-label="secondary tabs example"
				sx={{margin: '25px'}}
			>
				<Tab value="Hard" label="Hard" />
				<Tab value="Learned" label="Learned" />
			</Tabs>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
					justifyContent: 'flex-end',
          width: "80%",
          columnGap: "8px",
        }}
      >
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: 'space-around',
						width: "70%",
						columnGap: "8px",
					}}
				>
					<Pagination
						count={30}
						page={page}
						onChange={(e, value) => setPage(value)}
						color="primary"
					/>
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
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "80%",
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
