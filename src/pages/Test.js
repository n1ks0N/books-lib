import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from "react-router";

const Test = () => {
  const dispatch = useDispatch()
  const { qu } = useSelector(store => store)
  const [loader, setLoader] = useState(true)
  useEffect(() => { // Get first question
    dispatch({
      type: 'GET_QUESTION',
      count: 1,
      score: {
        easy: 0,
        medium: 0,
        hard: 0
      },
    })
  }, [])
  useEffect(() => {
    setLoader(qu.loading ? true : false)
  }, [qu.loading])
  const handleSubmit = (e) => {
    e.preventDefault()
    const inputs = e.target.elements
    const ansIndex = Array.from(inputs).findIndex(item => item.checked)
    if (qu.count < 6) {
      dispatch({
        type: 'GET_QUESTION',
        count: ++qu.count,
        score: {
          ...qu.score,
          [qu.query.difficulty]: qu.query.answers[ansIndex] === qu.query.correct_answer ? ++qu.score[qu.query.difficulty] : qu.score[qu.query.difficulty]
        }
      })
    } else {
      return <Redirect to="/result" />
    }
  }
  return (
    <div>
      {loader ?
        <div className="spinner-border text-info" role="status">
          <span className="visually-hidden">Загрузка...</span>
        </div>
        :
        <div>
          <h1>Вопрос {qu.count}/6</h1>
          {Object.keys(qu.query).length > 0 &&
            <form onSubmit={handleSubmit}>
              <p dangerouslySetInnerHTML={{ __html: qu.query.question }} />
              {qu.query.answers.map((ans, i) => // Opentdb always has only one correct answer 
                <div className="form-check" key={i}>
                  <input className="form-check-input" type="radio" name="flexRadioDefault" id={`flexRadioDefault${i}`} />
                  <label className="form-check-label" htmlFor={`flexRadioDefault${i}`}>
                    {ans}
                  </label>
                </div>
              )
              }
              <button type="submit" className="btn btn-success">Ответить</button>
            </form>
          }
        <button type="button" className="btn btn-secondary">Попробовать ещё раз</button>
        </div>
      }
    </div>
  );
}

export default Test;