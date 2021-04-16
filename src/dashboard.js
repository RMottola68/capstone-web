import './App.css';
import React, {useEffect, useState} from 'react';

//ant design stuff
import { Button , List , Collapse } from 'antd';
const { Panel } = Collapse;


function Dashboard() {
  
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState();
  const [newAnswer, setNewAnswer] = useState('');
  const [answers, setAnswers] = useState([]);

  let apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000';

  const onCollapseChange = async (selectedQuestion) => {
  setSelectedQuestion(selectedQuestion);
  fetchAnswersForQuestion(selectedQuestion);
  setNewAnswer('');
  
  };

  const fetchCategories = async () => {
    //console.log(process.env.REACT_APP_API_URL);
    let res = await fetch(`${apiUrl}/api/v1/categories`);
    let data = await res.json();
    setCategories(data);
  }

  const fetchQuestionsForCategory = async (id) => {
    console.log('fetch questions for category id', id);
    let res = await fetch(`${apiUrl}/api/v1/categories/${id}/questions`);
    let data = await res.json();
    console.log(data);
    setQuestions(data);

  }

  const fetchAnswersForQuestion = async (id) => {
    console.log('fetch answers for question id', id);
    let res = await fetch(`${apiUrl}/api/v1/categories/${selectedCategory}/questions/${id}/answers`);
    let data = await res.json();
    console.log(data);
    setAnswers(data);
  }

  const createNewQuestion = async () => {
    console.log('created new question for categoryId ', selectedCategory)
    let res = await fetch(`${apiUrl}/api/v1/categories/${selectedCategory}/questions`, {method: 'POST',
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify({questionTxt: newQuestion})
    });
    setNewQuestion('');
    fetchQuestionsForCategory(selectedCategory);
  }

  const createNewAnswer = async () => {
    console.log('This creates a new answer for questionId', selectedQuestion)
    let res = await fetch(`${apiUrl}/api/v1/categories/${selectedCategory}/questions/${selectedQuestion}/answers`, {method: 'POST',
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify({answerTxt: newAnswer})
    });
    setNewAnswer('');
    //fetchAnswersForQuestion(selectedQuestion);
    fetchQuestionsForCategory(selectedCategory);
  }

  const deleteQuestion = async (e) => {
    e.stopPropagation();
    onCollapseChange(selectedQuestion);
    console.log('delete question with id', selectedQuestion)
    await fetch(`${apiUrl}/api/v1/categories/${selectedCategory}/questions/${selectedQuestion}`, {method: 'DELETE'})
    //fetchQuestionsForCategory(selectedCategory);
    window.location.reload();
    }


  // const testFunction = async(ev) => {
  //     window.deleteQuestion(ev)
  // }


  useEffect(() => {

    fetchCategories();

  }, [])

  useEffect(() => {
  
  }, [selectedCategory])


  
  return (
    <>
 
     <div className={'navbar bg-success border-bottom justify-content-center'}>
       <h1 className={'text-light'}>Quiz App</h1>
     </div>
     
     <div className={'container-fluid'}>
       <div className={'row inline-flex '}>
        
        <div className={"col-12 col-md-4 p-4 inline-flex"}>
          <div className={"row"}>

            <List
              size="small"
              header={<div className={'font-weight-bold text-center'}>Category List</div>}
              bordered
              dataSource={categories}
              renderItem={category => <List.Item type={'button'} className={category.id == selectedCategory ? 'bg-success text-light border' : '' }>
                <h4 className={'p-3 m-0'}
                  onClick={() => {setSelectedCategory(category.id)
                  fetchQuestionsForCategory(category.id)
                  setNewQuestion('');
                }}>
                  {category.name}
                </h4>
              </List.Item>}
            />
            
            {/* <ul className={'list-unstyled'}>
              {categories.map((category, index) => {
                return <li key={index} 
                  className={category.id == selectedCategory ? 'border my-1 bg-success text-light cursor-pointer' : 'border my-1 cursor-pointer' } 
                  onClick={() => {setSelectedCategory(category.id)
                  fetchQuestionsForCategory(category.id)
                  }}>
                  {category.name}
                
                </li>
              })}
            </ul> */}

        </div>

      </div>

        <div className={"col-12 col-md-8 border p3"}>
          <div className={"Row"}>
            
              {/* <button className={'btn btn-outline-success'} onClick={createNewQuestion}>New Question</button> */}
              {/* <ul>
                {questions && questions.map((question) => {
                  return <li key={question.id}>
                    {question.questionTxt} {question.Answers.length > 0 && <span>- <span>{question.Answers.length}</span></span>}

                  </li>
                })}
              </ul> */}

            {selectedCategory && 
              <div className={'d-flex justify-content-center py-2'}>
                      <input type="text" value={newQuestion} onChange={(ev) => {
                        setNewQuestion(ev.currentTarget.value);
                      }} placeholder={'New Question Here'} className={'p-1 mx-2 w-75'}></input>
                      <button type={'primary'} onClick={createNewQuestion} className={'taskButton btn btn-success'}>Add Question</button>            
              </div>
            }

              {selectedCategory && <Collapse onChange={onCollapseChange} accordion>
                {questions.map((question) => {
                  return <Panel header={question.questionTxt}
                  key={question.id} 
                  extra={selectedQuestion == question.id && <button type={'danger'} onClick={deleteQuestion} type={'button'} className={'btn btn-danger'}>
                  <i className={'fas fa-trash'}></i>
                  </button>
                  }>
                
                  <List
                    size="small"
                    // header={<div className={'font-bold'}>Answers List</div>}
                    footer={<div>
                        <input value={newAnswer} onChange={(ev) => {
                            setNewAnswer(ev.currentTarget.value);
                        }} type="text" className={'border p-1 mr-5 w-2/3'}/>
                        <button type={'button'} onClick={createNewAnswer} className={'btn btn-success'}>Add Answer</button>
                    </div>}
                    bordered
                    dataSource={question.Answers}
                    renderItem={answer => <List.Item>
                        <div>
                            {answer.answerTxt}
                        </div>

                    </List.Item>}
                  />
                </Panel>})}
              </Collapse>}

            {!selectedCategory && <h1 className={'text-center'}>Select a Category!</h1>}

            {/* {questions && <p>{JSON.stringify(questions)}</p>} */}
          </div>
        </div>
       </div>
     </div>
 
     
     
 
 
    </>
   );
  }

export default Dashboard;