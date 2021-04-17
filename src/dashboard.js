import './App.css';
import React, {useEffect, useState} from 'react';

//ant design components
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
  const [loggedIn, setLoggedIn] = useState();
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();

  // heroku hosting url
  let apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000' || 'us-cdbr-east-03.cleardb.com';

  //sets the selectedQuestion state upon selecting a question panel
  const onCollapseChange = async (selectedQuestion) => {
  setSelectedQuestion(selectedQuestion);
  fetchAnswersForQuestion(selectedQuestion);
  setNewAnswer('');
  
  };

  const fetchCategories = async () => {
    //console.log(process.env.REACT_APP_API_URL);
    let res = await fetch(`${apiUrl}/api/v1/categories?token=${localStorage.getItem('token')}`);
    let data = await res.json();
    setCategories(data);
  }

  const fetchQuestionsForCategory = async (id) => {
    console.log('fetch questions for category id', id);
    console.log('fetch id for userId', userId);
    let res = await fetch(`${apiUrl}/api/v1/categories/${id}/questions?token=${token}&userId=${userId}`);
    let data = await res.json();
    console.log(data);
    setQuestions(data);

  }

  const fetchAnswersForQuestion = async (id) => {
    console.log('fetch answers for question id', id);
    let res = await fetch(`${apiUrl}/api/v1/categories/${selectedCategory}/questions/${id}/answers?token=${token}`);
    let data = await res.json();
    console.log(data);
    setAnswers(data);
  }

  const createNewQuestion = async () => {
    console.log('created new question for categoryId ', selectedCategory)


    let res = await fetch(`${apiUrl}/api/v1/categories/${selectedCategory}/questions?token=${token}`, {method: 'POST',
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify({questionTxt: newQuestion, userId: userId})
    });
    setNewQuestion('');
    fetchQuestionsForCategory(selectedCategory);
  }

  const createNewAnswer = async () => {
    console.log('This creates a new answer for questionId', selectedQuestion)
    let res = await fetch(`${apiUrl}/api/v1/categories/${selectedCategory}/questions/${selectedQuestion}/answers?token=${token}`, {method: 'POST',
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
    await fetch(`${apiUrl}/api/v1/categories/${selectedCategory}/questions/${selectedQuestion}?token=${token}`, {method: 'DELETE'})
    fetchQuestionsForCategory(selectedCategory);
    window.location.reload();
  }


  const fetchUserId = async() => {
    let userRes = await fetch(`${apiUrl}/api/v1/users/me?token=${localStorage.getItem('token')}`)
    let u = await userRes.json();
    console.log(u);
    setUserId(u.userId);
  }

  //used for loading the proper content only IF a user is logged in
  const isLoggedIn = () => {
    if(localStorage.getItem('token')){
      setLoggedIn(true);
      setToken(localStorage.getItem('token'));
      fetchUserId();
      return true;      
    } else {
      setLoggedIn(false);
      return false;      
    }
  }

  const logout = async () => {
    localStorage.removeItem('token')
    window.location.href = '/';
  }

  //sends the user back to the login page if they arent logged in
  useEffect(() => {
    if(isLoggedIn()){
      fetchCategories()
    } else {
      window.location.href = '/';
    }
    //fetchCategories();

  }, [])

  useEffect(() => {
  
  }, [selectedCategory])

  
  return (
    <>
 
      {loggedIn && <nav className={'navbar navbar-success bg-success border-bottom '}>
        
          <h1 className={'text-light pt-2'}>Quiz App</h1>
          <button type={'button'} className={'btn btn-outline-light btn-lg'} onClick={logout}>Log Out</button>
        
      </nav>}
     
      {loggedIn && <div className={'container'}>
        <div className={'row'}>
        
          <div className={"col-12 col-md-4 p-4 inline-flex"}>
            <div>

              <List className={'bg-light rounded'}
                size="small"
                header={<div className={'font-weight-bold text-center'}>Category List</div>}
                bordered
                dataSource={categories}
                renderItem={category => <List.Item type={'button'} className={category.id == selectedCategory ? 'bg-success text-light border border-dark col justify-content-center' : 'border border-dark col justify-content-center' }>
                  <h4 className={'p-3 m-0 '}
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

        <div className={"col-12 col-md-8 border py-3 my-4  bg-light"}>
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
              {/* displays the panels for each question once a category is selected */}
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
      </div>}

      {!loggedIn && <h1 className={'text-center text-danger'}>YOU'RE NOT SUPPOSED TO BE HERE!</h1>}
    
     
     
 
 
    </>
   );
  }

export default Dashboard;