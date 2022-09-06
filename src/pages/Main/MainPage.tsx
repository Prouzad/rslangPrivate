import "./MainPage.model.css";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import mainImage from "../../assets/img/mainImage.png";
import Prouzad from "../../assets/img/prouzad.png";
import aiscode from "../../assets/img/aiscode.png";
import TextBookImg from "../../assets/icon/textbook.png";
import DictionaryImg from "../../assets/icon/dictionary.png";
import GameImg from "../../assets/icon/game.jpg";
import StatisticsImg from "../../assets/icon/statistics.png";
import AvatarImg from "../../assets/icon/avatar.png";
import Footer from "../footer/index";
import { IProps } from "../../interfaces";

const advantagesArr = [
  {
    title: "Textbook",
    descripction:
      "The electronic textbook consists of six sections. Each section has 30 pages of 20 words. The translation of the word, the thematic image, as well as the pronunciation of both the word separately and as part of the phrase are presented.",
    img: TextBookImg,
  },
  {
    title: "Games",
    descripction:
      "For learning words and reinforcing memorization, the application has 4 games: Savannah, Sprint, Audio Chalenge and Imaginarium, which will help you to 'pump' your vocabulary in a playful way.",
    img: GameImg,
  },
  {
    title: "Statistics",
    descripction:
      "All the progress of training can be viewed in statistics, where data for the current day, as well as for the entire training period, are presented. The information is presented both in the form of a table and graphs, which is very convenient.",
    img: StatisticsImg,
  },
];

const teamInfo = [
  {
    name: "Abdulla Ergashev",
    descripction:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus voluptate, aliquid odio asperiores assumenda velit quisquam maxime illo? In porro tenetur maiores ducimus fugit obcaecati dolore ex, iusto neque et!",
    title: "Frontend developer",
    link: "/",
    image: Prouzad,
  },
  {
    name: "Aigerim Temirova",
    descripction:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus voluptate, aliquid odio asperiores assumenda velit quisquam maxime illo? In porro tenetur maiores ducimus fugit obcaecati dolore ex, iusto neque et!",
    title: "Frontend developer",
    link: "/",
    image: aiscode,
  },
  {
    name: "Maria Gavrilova",
    descripction:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus voluptate, aliquid odio asperiores assumenda velit quisquam maxime illo? In porro tenetur maiores ducimus fugit obcaecati dolore ex, iusto neque et!",
    title: "Frontend developer",
    link: "/",
    image: AvatarImg,
  },
];

function MainPage({ userData }: IProps) {
  return (
    <div>
      <h3 style={{ fontSize: "32px", fontWeight: 400, marginLeft: "145px" }}>
        Main
      </h3>
      <div className="mainContainer">
        <div className="mainBox">
          <div className="mainDescription">
            <h1>RS Lang</h1>
            <div className="mainText">
              Learning English has never been so easy
              Memorizing English words can be fun and challenging. Play games, listen to pronunciation, improve your knowledge. With our app, learning is a joy.
            </div>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button variant="outlined">Start</Button>
            </Link>
          </div>
          <div className="mainImg">
            <img src={mainImage} alt="Main" />
          </div>
        </div>
        <div className="titleAdvantages">
          <h2>Advantages</h2>
        </div>
        <div className="advantagesBox">
          {advantagesArr.map((item) => (
            <Link
              to={`/${item.title.toLowerCase()}`}
              className="advantagesLink"
            >
              <div className="advantages">
                <div className="advantageLogo">
                  <img src={item.img} alt="textbook" />
                </div>
                <div className="advantageTitle">
                  <h2>{item.title}</h2>
                </div>
                <div className="advantageDesc">{item.descripction}</div>
              </div>
            </Link>
          ))}
          {userData
            ? (
              <Link
                to="/dictionary"
                className="advantagesLink"
              >
                <div className="advantages">
                  <div className="advantageLogo">
                    <img src={DictionaryImg} alt="textbook" />
                  </div>
                  <div className="advantageTitle">
                    <h2>Dictionary</h2>
                  </div>
                  <div className="advantageDesc">The dictionary contains lists of studied words, words that do not need to be learned, as well as those that cause difficulties. The dictionary reflects statistics for each section and student progress.</div>
                </div>
              </Link>
            )
            
            : null}
        </div>
        <div className="teamBox">
          <h2>Our Team</h2>
          {teamInfo.map((item) => (
            <Link to={item.link} className="advantagesLink">
              <div className="CardBox">
                <div className="avatar">
                  <img src={item.image} alt="Avatar" />
                </div>
                <div className="about">
                  <div className="name">{item.name}</div>
                  <div className="titlePerson">{item.title}</div>
                  <div className="descPerson">{item.descripction}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MainPage;
