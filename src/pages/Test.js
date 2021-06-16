import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'

const Test = () => {
  const dispatch = useDispatch()
  const { qu } = useSelector(store => store)
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
  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <div>
      <h1>Вопрос {qu.count}/6</h1>
      {Object.keys(qu.query).length > 0 &&
        <form onSubmit={handleSubmit}>
          <p dangerouslySetInnerHTML={{ __html: qu.query.question }} />
          {qu.query.type === 'boolean' ? // Determining the type of boolean or multiple question
            qu.query.answers.map((ans, i) =>
              <div className="form-check" key={i}>
                <input className="form-check-input" type="radio" name="flexRadioDefault" id={`flexRadioDefault${i}`} />
                <label className="form-check-label" htmlFor={`flexRadioDefault${i}`}>
                  {ans}
                </label>
              </div>
            )
            :
            qu.query.answers.map((ans, i) =>
            <div className="form-check" key={i}>
              <input className="form-check-input" type="checkbox" value={ans} id={`flexCheckDefault${i}`} />
              <label className="form-check-label" htmlFor={`flexCheckDefault${i}`}>
                {ans}
              </label>
            </div>
            )
          }
          <button type="submit" className="btn btn-success">Ответить</button>
        </form>
      }
    </div>
  );
}

export default Test;