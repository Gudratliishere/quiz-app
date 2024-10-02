import React, { useReducer, useRef, useState } from 'react'
import './Quiz.css'
import { data } from '../../assets/data';

const Quiz = () => {

    let [index, setIndex] = useState(0);
    let [question, setQuestion] = useState(data[index])
    let [lock, setLock] = useState(false)
    let [score, setScore] = useState(0)
    let [result, setResult] = useState(false)

    let options = [useRef(null), useRef(null), useRef(null), useRef(null)]

    const checkAns = (element, ans) => {
        if (!lock) {
            if (question.ans === ans) {
                element.target.classList.add('correct');
                setScore(prev => prev + 1)
            } else {
                element.target.classList.add('wrong')
                options[question.ans - 1].current.classList.add('correct')
            }
            setLock(true)
        }
    }

    const handleNext = () => {
        if (lock) {
            if (index === data.length - 1) {
                setResult(true)
                return 0;
            }
            setIndex(++index)
            setQuestion(data[index])
            setLock(false)
            options.map((option) => {
                option.current.classList.remove('wrong')
                option.current.classList.remove('correct')
            })
        }
    }

    const reset = () => {
        setIndex(0)
        setQuestion(data[0])
        setScore(0)
        setLock(0)
        setResult(false)
    }

    return (
        <div className='container'>
            <h1>Quiz App</h1>
            <hr />
            {
                result ?
                    <>
                        <h2>You scored {score} out of {data.length} points</h2>
                        <button onClick={reset} className='reset'>Reset</button>
                    </> :
                    <>
                        <h2>{index + 1}. {question.question}</h2>
                        <ul>
                            <li ref={options[0]} onClick={(e) => { checkAns(e, 1) }}>{question.option1}</li>
                            <li ref={options[1]} onClick={(e) => { checkAns(e, 2) }}>{question.option2}</li>
                            <li ref={options[2]} onClick={(e) => { checkAns(e, 3) }}>{question.option3}</li>
                            <li ref={options[3]} onClick={(e) => { checkAns(e, 4) }}>{question.option4}</li>
                        </ul>
                        <button onClick={() => handleNext()} className='next'>Next</button>
                        <div className="index">{index + 1} of {data.length} questions</div>
                    </>
            }

        </div>
    )
}

export default Quiz
