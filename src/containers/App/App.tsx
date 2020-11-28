import React, { Suspense } from 'react';
import './App.scss';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
const Home = React.lazy(() => import('containers/Home/Home'));

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <div className='main-content'>
          <Suspense fallback={<div></div>}>
            <Switch>
              <Route path='/' component={Home} />
            </Switch>
          </Suspense>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
