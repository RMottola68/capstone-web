import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import React, {useEffect, useState} from 'react';

import Dashboard from "./dashboard";

//ant design stuff
import { Button , Row, Col, notification, Collapse } from 'antd';
const { Panel } = Collapse;



function Auth () {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');

  let apiUrl =  'http://localhost:3000' || 'us-cdbr-east-03.cleardb.com' || process.env.REACT_APP_API_URL;

  const onSignIn = async (event) => {
    event.preventDefault();  
    let res = await fetch(`${apiUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    console.log(res);
    let data = await res.json();
    console.log(data)
    if(data.token){
      localStorage.setItem('token', data.token);
      window.location.href = '/dashboard'
    }
  }

  const onSignUp = async (event) => {
    event.preventDefault();  
    let res = await fetch(`${apiUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    console.log(res);
    let data = await res.json();
    console.log(data)
    if(data.success){
      // create an alert for signup and redirect to dashboard
      notification['success']({
        message: 'Thanks for Signing Up!',
        description:
          'You can now login using your email and password!',
      });
    }
    setEmail('');
    setPassword('');
    setRetypePassword('');
  }


  return (
    <div className={'bg-dark'}>

      <div className={'navbar bg-success border-bottom justify-content-center'}>
       <h1 className={'text-light'}>Quiz App</h1>
      </div>

      <Collapse accordion defaultActiveKey={'login'}>
        <Panel header={'Login Here!'} className={'text-center bg-success font-weight-bold'} showArrow={false} key={'login'}>
          <form onSubmit={onSignIn} className={'d-flex justify-content-center bg-dark py-5'}> 
            <fieldset className={'bg-light rounded px-5'}>         
              
              <Row type={'flex'} align={'center'} className={'my-5'} >
                <legend className={'text-center text-success mb-5'}>Login</legend>
                <Col span={24} >
                    <input type="email" value={email} onChange={(ev) => setEmail(ev.currentTarget.value)} required className={'border border-success w-100 rounded'} placeholder={'Email address'}/>
                </Col>
                <Col span={24} className={'mt-5'}>
                    <input type="password" value={password} onChange={(ev) => setPassword(ev.currentTarget.value)} required className={'border border-success w-100 rounded'} placeholder={'Password'}/>
                </Col>
                <Col span={24} className={'d-flex mt-5 justify-content-center'}>
                    <button  type={'submit'} className={'btn btn-success'}>Submit</button>
                </Col>
              </Row>
            </fieldset>
          </form>
        </Panel>
          
        <Panel header={'Sign Up Here!'} className={'text-center bg-success font-weight-bold'} showArrow={false} key={'signup'}>  
          <form onSubmit={onSignUp} className={'d-flex justify-content-center bg-dark py-5'}>
            <fieldset className={'bg-light rounded px-3'}>         
              <Row type={'flex'} align={'center'} className={'my-5'} >
                <legend className={'text-center text-success mb-5'}>Sign Up</legend>
                <Col span={24} flex={''}>
                    <input type="email" value={email} onChange={(ev) => setEmail(ev.currentTarget.value)} required className={'border border-success w-100 rounded'} placeholder={'Email address'}/>
                </Col>
                <Col span={24} flex={''} className={'mt-5'}>
                    <input type="password" value={password} onChange={(ev) => setPassword(ev.currentTarget.value)} required className={'border border-success w-100 rounded'} placeholder={'Password'}/>
                </Col>
                <Col span={24} flex={''} className={'mt-5'}>
                      <input type="password" value={retypePassword} onChange={(ev) => setRetypePassword(ev.currentTarget.value)} required className={'border border-success w-100 rounded'} placeholder={'Retype Password'}/>
                      {(password != retypePassword) && <small className={'text-danger font-weight-bold'}>Passwords don't match</small>}
                </Col>
                <Col span={24} className={'d-flex mt-5 justify-content-center'}>
                    <button  type={'submit'} className={'btn btn-success'}>Submit</button>
                </Col>
              </Row>
            </fieldset>
          </form>
        </Panel>
      </Collapse>
        
      {/* <fieldset>
        <form onSubmit={onSignUp}>
            <Row type={'flex'} align={'center'} className={'mt-5'}>
                <Col span={24}>
                    <input type="email" value={email} onChange={(ev) => setEmail(ev.currentTarget.value)} required className={'border w-100 rounded'} placeholder={'Email address'}/>
                </Col>
                <Col span={24} className={'mt-5'}>
                    <input type="password" value={password} onChange={(ev) => setPassword(ev.currentTarget.value)} required className={'border w-100 rounded'} placeholder={'Password'}/>
                </Col>
                <Col span={24} className={'mt-5'}>
                    <input type="password" value={retypePassword} onChange={(ev) => setRetypePassword(ev.currentTarget.value)} required className={'border w-100 rounded'} placeholder={'Retype Password'}/>
                    {(password != retypePassword) && <small className={'text-danger font-weight-bold'}>Passwords don't match</small>}
                </Col>
                <Col span={24} className={'mt-5'}>
                    <Button  htmlType={'submit'} disabled={password != retypePassword} className={'btn btn-success'}>Submit</Button>
                    {/*<Button loading={loading} disabled={password != retypePassword} type="primary" htmlType={'submit'} className={'border-0 w-full rounded font-bold'}>Submit</Button>*/}
                {/* </Col>
            </Row>
        </form>
      </fieldset> */}

    </div>
    
  )
}

function App() {
   
  return (
    <Router>
      <div>
        

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/">
            <Auth></Auth>
          </Route>
        </Switch>
      </div>
    </Router>
   );
}

export default App;