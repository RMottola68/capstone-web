import React, {useEffect, useState} from 'react';


function App() {
  
const [categories, setCategories] = useState([]);
const [selectedCategory, setSelectedCategory] = useState([]);

const fetchCategories = async () => {
  const res = await fetch(`http://localhost:3000/api/v1/categories`);
  let data = await res.json();
  setCategories(data);
}

const fetchQuestions = async () => {

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
            
            <ul className={'list-unstyled'}>
              {categories.map((category, index) => {
                return <li key={index} className={category.id == selectedCategory ? 'border my-1 bg-success text-light cursor-pointer' : 'border my-1 cursor-pointer' } onClick={() => setSelectedCategory(category.id)}>{category.name}</li>
              })}
            </ul>

          </div>

        </div>

        <div className={"col-12 col-md-8 border p3"}>
          <div className={"Row"}>
            <div>answers?</div>
          </div>
        </div>
       </div>
     </div>
 
     
     
 
 
    </>
   );
}

export default App;
