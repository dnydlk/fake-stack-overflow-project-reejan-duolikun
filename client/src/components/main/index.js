import "./index.css";
import React, { useEffect, useState } from "react";
import SideBarNav from "./sideBarNav";
import QuestionPage from "./questionPage";
import AnswerPage from "./answerPage";
import { useNavigate } from "react-router-dom";
import NewQuestion from "./newQuestion";
import NewAnswer from "./newAnswer";
import * as userService from "../../services/userService";
import ProfilePage from "./profilePage";
import TagPage from "./tagPage";

const Main = ({ search = "", title, setQuestionPage, currentPage = "home" }) => {
	const [page, setPage] = useState(currentPage);
	const [questionOrder, setQuestionOrder] = useState("newest");
	const [qid, setQid] = useState("");
	const navigate = useNavigate();
	const [currentUser, setCurrentUser] = useState();

	let selected = "";
	let content = null;

	const handleQuestions = () => {
		setQuestionPage();
		setPage("home");
		navigate("/");
	};

	const handleTags = () => {
		setPage("tag");
		navigate("/");
	};

	const handleProfile = () => {
		if (currentUser) {
			setPage("profile");
			navigate("/");
		} else {
			navigate("/login");
		}
	};

	const handleAnswer = (qid) => {
		setQid(qid);
		setPage("answer");
		navigate("/");
	};

	const clickTag = (tagName) => {
		setQuestionPage("[" + tagName + "]", tagName);
		setPage("home");
		navigate("/");
	};

	const handleNewQuestion = (isTokenValid) => {
		if (isTokenValid) {
			setPage("newQuestion");
			navigate("/");
		} else {
			navigate("/login");
		}
	};

	const handleNewAnswer = (isTokenValid) => {
		if (isTokenValid) {
			setPage("newAnswer");
		} else {
			navigate("/login");
		}
	};

	const getQuestionPage = (order = "newest", search = "") => {
		return (
			<QuestionPage
				title_text={title}
				order={order}
				search={search}
				setQuestionOrder={setQuestionOrder}
				clickTag={clickTag}
				handleAnswer={handleAnswer}
				handleNewQuestion={handleNewQuestion}
			/>
		);
	};

	switch (page) {
		case "home": {
			selected = "q";
			content = getQuestionPage(questionOrder.toLowerCase(), search);
			break;
		}
		case "tag": {
			selected = "t";
			content = <TagPage clickTag={clickTag} handleNewQuestion={handleNewQuestion} currentUser={currentUser} />;
			break;
		}
		case "profile": {
			selected = "p";
			content = (
				<ProfilePage
					currentUser={currentUser}
					setCurrentUser={setCurrentUser}
					clickTag={clickTag}
					handleAnswer={handleAnswer}
				/>
			);
			break;
		}
		case "answer": {
			selected = "";
			content = (
				<AnswerPage
					qid={qid}
					handleNewQuestion={handleNewQuestion}
					handleNewAnswer={handleNewAnswer}
					currentUser={currentUser}
					setPage={setPage}
				/>
			);
			break;
		}
		case "newQuestion": {
			selected = "";
			content = <NewQuestion handleQuestions={handleQuestions} currentUser={currentUser} />;
			break;
		}
		case "newAnswer": {
			selected = "";
			content = <NewAnswer qid={qid} handleAnswer={handleAnswer} currentUser={currentUser} />;
			break;
		}
		default:
			selected = "q";
			content = getQuestionPage();
			break;
	}

	useEffect(() => {
		const fetchCurrentUser = async () => {
			try {
				console.log("🚀 ~ fetching CurrentUser");
				const user = await userService.getCurrentUser();
				setCurrentUser(user);
				console.log("🚀 ~ fetchCurrentUser ~ currentUser:", user);
			} catch (error) {
				console.error("Failed to get user info", error);
			}
		};

		fetchCurrentUser();
	}, []);

	return (
		<div id="main-content" className="fso-main ">
			{/*//- Sidebar Navigation  */}
			<SideBarNav
				selected={selected}
				handleQuestions={handleQuestions}
				handleTags={handleTags}
				handleProfile={handleProfile}
			/>
			{/*//- Right Main Content  */}
			<div id="right_main" className="fso-right-main">
				{content}
			</div>
		</div>
	);
};

export default Main;
