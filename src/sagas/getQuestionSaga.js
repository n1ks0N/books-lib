import { call, put, takeLatest } from 'redux-saga/effects';
import { questions } from '../utils/const.json';

function* fetchGetQuestion(action) {
	try {
		const query = yield call(() => {
			return fetch(
				`${questions.api_url}amount=1`
			).then((response) => response.json());
		});
		yield put({ type: 'GET_QUESTION_SUCCEEDED', query: query.results[0], count: action.count, score: action.score, difficulty: query.results[0].difficulty });
	} catch (e) {
		yield put({ type: 'GET_QUESTION_FAILED', error: e });
	}
}

function* getQuestionSaga() {
	yield takeLatest('GET_QUESTION', fetchGetQuestion);
}

export default getQuestionSaga;
