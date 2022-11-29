import react,{useEffect} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { lazy, Suspense } from "react";
import FooterPage from './components/Layout/Footer/FooterPage';
const Homepage = lazy(() => import("./components/Homepage/Homepage"));
const Todo = lazy(() => import("./components/Todo/Todo"));


function App() {

  useEffect(() => {
    
  console.log("app page is mounted")
    
  }, [])
  
 
  return (
    <>  
    <div style={{"background": "rgb(216, 217, 207)"}}>
    
      <Router>
      <Suspense
            fallback={
              <img
                src="https://naver.github.io/egjs-view360/examples/img/loading_icon.gif"
                width="100%"
                alt="..."
              ></img>
            }
          > 
        <Routes>
        <Route exact path='/' element={<Homepage />} />
        <Route path='/todo' element={<Todo />}/>
       <Route
                path="*"
                element={
                  <img
                    width="100%"
                    height="40%"
                    src="./images/pagenf.png"
                    alt="not found"
                  />
                }
              /> 
        </Routes>
       </Suspense> 
      </Router>
    
    </div>
    <FooterPage />
    </>
  );
}


export default App;
