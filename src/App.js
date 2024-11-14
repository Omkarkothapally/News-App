import './App.css';
import React, { useState} from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {BrowserRouter as Router,Switch,Route,} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

const App =()=>{

  const [progress, setProgress] = useState(0)

  return (
    <div>
      <Router>
      <NavBar/>
      <LoadingBar
        color='red'
        height={2}
        progress={progress}
      />
        <Switch>
        <Route exact path="/" ><News setProgress={setProgress}   key="General" pageSize={6} country="us" category="General"/></Route>
        <Route exact path="/Business"><News setProgress={setProgress}   key="Business" pageSize={6} country="us" category="Business"/></Route>
        <Route exact path="/Entertainment"><News setProgress={setProgress}   key="Entertainment" pageSize={6} country="us" category="Entertainment"/></Route>
        <Route exact path="/General"><News setProgress={setProgress}   key="General" pageSize={6} country="us" category="General"/></Route>
        <Route exact path="/Health"><News setProgress={setProgress}   key="Health" pageSize={6} country="us" category="Health"/></Route>
        <Route exact path="/Science"><News setProgress={setProgress}   key="Science" pageSize={6} country="us" category="Science"/></Route>
        <Route exact path="/Sports"><News setProgress={setProgress}   key="Sports" pageSize={6} country="us" category="Sports"/></Route>
        <Route exact path="/Technology"><News setProgress={setProgress}   key="Technology" pageSize={6} country="us" category="Technology"/></Route>
        </Switch>
      </Router>
    </div>
  )
}
 
export default App;
