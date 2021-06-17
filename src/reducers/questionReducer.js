const initialState = {
	count: 0, // All questions counter
	score: {
		easy: {
			count: 0, // Counter
			value: 0 // Score
		},
		medium: {
			count: 0,
			value: 0
		},
		hard: {
			count: 0,
			value: 0
		}
	},
	query: {},
	loading: false, // For loader
	error: {
		status: false,
		code: 0
	}
};

const questionReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'GET_QUESTION':
			return {
				...state,
				loading: true
			};
		case 'GET_QUESTION_SUCCEEDED':
			// Сombine the correct answer with the incorrect
			const answers = action.query.incorrect_answers.slice();
			const random = Math.floor(Math.random() * (answers.length + 1));
			answers.splice(random, 0, action.query.correct_answer);
			return {
				...state,
				count: action.count,
				query: {
					...action.query,
					answers: answers
				},
				loading: false,
				score: {
					...action.score
				}
			};
		case 'GET_QUESTION_FAILED':
			return {
				...state,
				loading: false,
				error: {
					status: true,
					code: action.code
				}
			};

		case 'SET_RESULT':
			return {
				...state,
				count: action.count,
				score: action.score
			};
		default:
			return state;
	}
};

export const GetQuestionActionCreator = () => ({ type: 'GET_QUESTION' });
export const GetQuestionSucceededActionCreator = (count, query, score) => ({
	type: 'GET_QUESTION_SUCCEEDED',
	count: count,
	query: query,
	score: score
});
export const GetQuestionFailedActionCreator = (code) => ({
	type: 'GET_QUESTION_FAILED',
	code: code
});

export const SetResultActionCreator = (count, score) => ({
	type: 'SET_RESULT',
	count: count,
	score: score
});

export default questionReducer;
