import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Home = () => {
	return (
		<div>
			<h1>Пройдите тестирование на английском языке</h1>
			<h3>Каждый раз генерируются новые вопросы</h3>
			<Link to="/test">
				<button type="button" className="btn btn-primary btn-lg">
					Начать тест
				</button>
			</Link>
		</div>
	);
};

export default Home;
