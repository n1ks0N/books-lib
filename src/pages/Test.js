import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { countQuestions } from '../utils/const.json';
import styled from 'styled-components';

const FormQ = styled.form`
	width: 800px;
	@media (max-width: 800px) {
		width: 100%;
	}
	min-height: 226px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;
const ButtonsWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

const Test = () => {
	const dispatch = useDispatch();
	const { qu } = useSelector((store) => store);
	const [loader, setLoader] = useState(true);
	const [btnDisabled, setBtnDisabled] = useState(true); // If no answer is selected, set the button to disabled
	useEffect(() => {
		// Get the first question
		dispatch({
			type: 'GET_QUESTION',
			count: 1,
			score: {
				easy: { count: 0, value: 0 },
				medium: { count: 0, value: 0 },
				hard: { count: 0, value: 0 }
			}
		});
	}, []);
	useEffect(() => {
		setLoader(qu.loading ? true : false);
	}, [qu.loading]);
	const handleSubmit = (e) => {
		e.preventDefault();
		const ansIndex = Array.from(e.target.elements).findIndex(
			// Searching checked input radio
			(item) => item.checked
		);
		const score = {
			...qu.score,
			[qu.query.difficulty]: {
				// If the answer is correct, increase a score
				value:
					qu.query.answers[ansIndex] === qu.query.correct_answer
						? qu.score[qu.query.difficulty].value + 1
						: qu.score[qu.query.difficulty].value,
				count: qu.score[qu.query.difficulty].count + 1 // Count all questions in each category to get stats
			}
		};
		if (qu.count < Number(countQuestions)) {
			dispatch({
				type: 'GET_QUESTION',
				count: qu.count + 1,
				score: score
			});
		} else {
			dispatch({
				type: 'SET_RESULT',
				count: qu.count + 1,
				score: score
			});
		}
		setBtnDisabled(true);
	};
	const reloadTest = () => {
		dispatch({
			type: 'GET_QUESTION',
			count: 1,
			score: {
				easy: { count: 0, value: 0 },
				medium: { count: 0, value: 0 },
				hard: { count: 0, value: 0 }
			}
		});
	};
	if (qu.count > Number(countQuestions)) return <Redirect to="/result" />; // countQuestions is equal six and constant at this moment
	return (
		<div>
			{loader ? (
				<div className="spinner-border text-info" role="status">
					<span className="visually-hidden">Загрузка...</span>
				</div>
			) : (
				<div>
					<h4>Вопрос {qu.count}/6</h4>
					{Object.keys(qu.query).length > 0 && (
						<FormQ onSubmit={handleSubmit}>
							<h2 dangerouslySetInnerHTML={{ __html: qu.query.question }} />
							<div>
								{qu.query.answers.map(
									(
										ans,
										i // Opentdb always has only one correct answer
									) => (
										<div className="form-check" key={i}>
											<input
												className="form-check-input"
												type="radio"
												name="flexRadioDefault"
												id={`flexRadioDefault${i}`}
												onChange={() => setBtnDisabled(false)}
											/>
											<label
												className="form-check-label"
												htmlFor={`flexRadioDefault${i}`}
												dangerouslySetInnerHTML={{ __html: ans }}
											/>
										</div>
									)
								)}
							</div>
							<ButtonsWrapper>
								<div
									data-bs-toggle="tooltip"
									title="Чтобы нажать кнопку ответ должен быть выбран"
								>
									<button
										type="submit"
										className="btn btn-success"
										disabled={btnDisabled}
									>
										Ответить
									</button>
								</div>
								<button
									type="button"
									className="btn btn-secondary"
									onClick={reloadTest}
								>
									Пройти другой тест
								</button>
							</ButtonsWrapper>
						</FormQ>
					)}
				</div>
			)}
		</div>
	);
};

export default Test;
