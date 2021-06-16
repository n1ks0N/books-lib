const initialState = {
  count: 0,
  score: {
    easy: 0,
    medium: 0,
    hard: 0
  },
  query: {},
  loading: false,
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
      }
    case 'GET_QUESTION_SUCCEEDED':
      // Сombine the correct answer with the incorrect
      const answers = action.query.incorrect_answers.slice()
      const random = Math.floor(Math.random() * (answers.length + 1))
      answers.splice(random, 0, action.query.correct_answer)
      return {
        ...state,
        count: action.count,
        query: {
          ...action.query,
          answers: answers
        },
        loading: false,
        score: {
          ...state.score,
          [action.difficulty]: action.score
        }
      }
    case 'GET_QUESTION_FAILED':
      return {
        ...state,
        loading: false,
        error: {
          status: true,
          code: action.code
        }
      }
		default:
			return state;
	}
};

export const GetQuestionActionCreator = () => ({ type: 'GET_QUESTION' })
export const GetQuestionSucceededActionCreator = (count, query, difficulty, score) => ({ type: 'GET_QUESTION_SUCCEEDED', count: count, query: query, difficulty: difficulty, score: score })
export const GetQuestionFailedActionCreator = (code) => ({ type: 'GET_QUESTION_FAILED', code: code })

export default questionReducer;
