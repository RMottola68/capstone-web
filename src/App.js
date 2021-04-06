import React, {useEffect, useState} from 'react';


function App() {
  
const [categories, setCategories] = useState([]);
const [selectedCategory, setSelectedCategory] = useState([]);
const [questions, setQuestions] = useState();

const fetchCategories = async () => {
  const res = await fetch(`http://localhost:3000/api/v1/categories`);
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
          
          <div className={"row"}>Currently Selected Category is: {selectedCategory}
            
            <ul className={'list-unstyled'}>
              {categories.map((category, index) => {
                return <li key={index} 
                  className={category.id == selectedCategory ? 'border my-1 bg-success text-light cursor-pointer' : 'border my-1 cursor-pointer' } 
                  onClick={() => {setSelectedCategory(category.id)
                  fetchQuestionsForCategory(category.id)
                  }}>
                  {category.name}
                
                </li>
              })}
            </ul>

          </div>

        </div>

        <div className={"col-12 col-md-8 border p3"}>
          <div className={"Row"}>
            <div>answers?</div>
              <button className={'btn btn-outline-success'} onClick={createNewQuestion}>New Question</button>
              <ul>
                {questions && questions.map((question) => {
                  return <li key={question.id}>
                    {question.questionTxt} {question.Answers.length > 0 && <span>- <span>{question.Answers.length}</span></span>}

                  </li>
                })}
              </ul>
            {/* {questions && <p>{JSON.stringify(questions)}</p>} */}
          </div>
        </div>
       </div>
     </div>
 
     
     
 
 
    </>
   );
}

export default App;
