import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { countQuestions } from '../utils/const.json';
import styled from 'styled-components';
import './pages.css';

const ProgressWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	height: 250px;
`;
const Progress = styled.div`
	transform: rotate(-90deg);
	margin-bottom: 10px;
`;
const ButtonsWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

const Result = () => {
	const { qu } = useSelector((store) => store);
	const score = useMemo(() => {
		let valueRes = 0, // Score
			countRes = 0, // Counter
			correactAnswers = 0;
		const objValues = Object.values(qu.score);
		for (let i = 0; i < objValues.length; i++) {
			valueRes += objValues[i].value * (i + 1); // Multiply on coeff
			countRes += objValues[i].count * (i + 1);
			correactAnswers += objValues[i].value;
		}
		return [valueRes, countRes, correactAnswers];
	});
	if (qu.count <= Number(countQuestions)) return <Redirect to="/test" />; // If test isn't complete, redirect on Test page
	return (
		<div>
			<h1>
				Результат {((score[0] / score[1]) * 100).toFixed(1)}%{' '}
				<span className="badge bg-primary" title="Баллы">
					{score[0]}/{score[1]}
				</span>
			</h1>
			<h4>Градация по уровням сложности</h4>
			<ProgressWrapper>
				{Object.entries(qu.score).map(([key, value]) => (
					<div key={key}>
						<Progress>
							<div className="progress result__progress">
								<div
									className="progress-bar"
									role="progressbar"
									style={{ width: `${(value.value / value.count) * 100}%` }}
									aria-valuenow={value.value}
									aria-valuemin={0}
									aria-valuemax={value.count}
								/>
							</div>
							<p>{key}</p>
						</Progress>
						<p>
							{value.value} / {value.count}
						</p>
					</div>
				))}
			</ProgressWrapper>
			<p>
				Правильных ответов: {score[2]}/{qu.count - 1}
			</p>
			<ButtonsWrapper>
				<Link to="/test">
					<button type="button" className="btn btn-success">
						Пройти другой тест
					</button>
				</Link>
				<Link to="/">
					<button type="button" className="btn btn-secondary">
						Вернуться на главную
					</button>
				</Link>
			</ButtonsWrapper>
		</div>
	);
};

export default Result;
