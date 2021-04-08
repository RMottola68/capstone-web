import './App.css';
import React, {useEffect, useState} from 'react';

//ant design stuff
import { Button , List , Collapse } from 'antd';
const { Panel } = Collapse;


function App() {
  
const [categories, setCategories] = useState([]);
const [selectedCategory, setSelectedCategory] = useState([]);
const [questions, setQuestions] = useState();
const [newQuestion, setNewQuestion] = useState('');

let apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000';

const fetchCategories = async () => {
  console.log(process.env.REACT_APP_API_URL);
  let res = await fetch(`${apiUrl}/api/v1/categories`);
  let data = await res.json();
  setCategories(data);
}

const fetchQuestions = async () => {

}

const fetchQuestionsForCategory = async (id) => {
  console.log('fetch questions for category id');
  let res = await fetch(`http://localhost:3000/api/v1/categories/${id}/questions`);
  let data = await res.json();
  console.log(data);
  setQuestions(data);

}

const createNewQuestion = async () => {
  console.log('createdd new question for categoryId ', selectedCategory)
  let res = await fetch(`${apiUrl}/api/v1/categories/${selectedCategory}/questions`, {method: 'POST',
  headers:{'Content-Type': 'application/json'},
  body: JSON.stringify({questionTxt: newQuestion})
  });
  setNewQuestion('');
}

  useEffect(() => {

    fetchCategories();

  }, [])

  useEffect(() => {

    fetchQuestions();

  }, [selectedCategory])
  
  return (
    <>
 
     <div className={'navbar bg-success border-bottom justify-content-center'}>
       <h1 className={'text-light'}>Quiz App</h1>
     </div>
     
     <div className={'container-fluid '}>
       <div className={'row inline-flex'}>
        
        <div className={"col-12 col-md-4 p-3 inline-flex"}>
          <div className={"row"}>

            <List
              size="large"
              header={<div className={'font-weight-bold'}>Category List</div>}
              bordered
              dataSource={categories}
              renderItem={category => <List.Item>
                <div className={category.id == selectedCategory ? 'my-1 px-1 bg-success text-light cursor-pointer' : 'my-1 cursor-pointer' } 
                  onClick={() => {setSelectedCategory(category.id)
                  fetchQuestionsForCategory(category.id)
                }}>
                  {category.name}
                </div>
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
            <div>answers?</div>
              {/* <button className={'btn btn-outline-success'} onClick={createNewQuestion}>New Question</button> */}
              {/* <ul>
                {questions && questions.map((question) => {
                  return <li key={question.id}>
                    {question.questionTxt} {question.Answers.length > 0 && <span>- <span>{question.Answers.length}</span></span>}

                  </li>
                })}
              </ul> */}

          <div className='py-3 m-5'>
            <div className={'d-flex justify-content-center'}>
                    <input type="text" value={newQuestion} onChange={(ev) => {
                      setNewQuestion(ev.currentTarget.value);
                    }}placeholder={'New Question Here'} className={'p-1 mx-2 w-100'}></input>
                    <button type={'primary'} onClick={createNewQuestion} className={'taskButton btn btn-success mr-2'}>Add</button>            
            </div>
          </div>
              
              <Collapse accordion>
                {questions && questions.map((question, index) =>{
                  return <Panel header={question.questionTxt} key={index}>
                    <List
                      size="large"
                      //header={<div className={'font-weight-bold'}>Answer List</div>}
                      footer = {<div>
                        <button type={'button'}className={'btn btn-outline-success'}>Add Answer</button>
                      </div>}
                      bordered
                      dataSource={question.Answers}
                      renderItem={answer => <List.Item>
                        <div>
                          {answer.answerTxt}
                        </div>
                      </List.Item>}
                    />
                    </Panel>
                
                })}
                
              </Collapse>
            {/* {questions && <p>{JSON.stringify(questions)}</p>} */}
          </div>
        </div>
       </div>
     </div>
 
     
     
 
 
    </>
   );
}

export default App;
