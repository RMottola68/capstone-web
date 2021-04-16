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
import { Button , List , Collapse, Row, Col } from 'antd';
const { Panel } = Collapse;



function Auth () {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [retypePassword, setRetypePassword] = useState('');

const onSignIn = async () => {

}

const onSignUp = async () => {

}

  return (
    <div>

      <h1 className={'text-center'}>Login Form</h1>

      <form onSubmit={onSignIn}>          
          
          <Row type={'flex'} align={'center'} className={'mt-5'}>
              <Col span={24}>
                  <input type="email" value={email} onChange={(ev) => setEmail(ev.currentTarget.value)} required className={'border w-100 rounded'} placeholder={'Email address'}/>
              </Col>
              <Col span={24} className={'mt-5'}>
                  <input type="password" value={password} onChange={(ev) => setPassword(ev.currentTarget.value)} required className={'border w-100 rounded'} placeholder={'Password'}/>
              </Col>
              <Col span={24} className={'mt-5'}>
                  <Button htmlType={'submit'} className={'btn btn-success'}>Submit</Button>
              </Col>
          </Row>
      </form>

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
              </Col>
          </Row>
      </form>

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