import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Switch, Route } from 'react-router-dom';
import Result from '../pages/Result';
import Test from '../pages/Test';
import Home from '../pages/Home';
import styled from 'styled-components';
import githubIcon from '../utils/img/github-icon.png';

const Icon = styled.img`
	position: absolute;
	top: 5px;
	right: 5px;
	width: 50px;
`;
const PageWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
`;

const App = () => {
	return (
		<div className="app">
			<a href="https://github.com/n1ks0N" target="_blank">
				<Icon src={githubIcon} />
			</a>
			<PageWrapper>
				<Switch>
					<Route path="/test" component={Test} />
					<Route path="/result" component={Result} />
					<Route path="*" component={Home} />
				</Switch>
			</PageWrapper>
		</div>
	);
};

export default hot(App);
