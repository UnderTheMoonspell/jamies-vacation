import React, { Suspense } from 'react';
import './App.scss';
import NavBar from 'components/NavBar/NavBar';
import { Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
// import { ModalsContextProvider } from 'store/modals/modals.context';
const Home = React.lazy(() => import('containers/Home/Home'));

function App() {
  return (
  // <ModalsContextProvider>
    <BrowserRouter>
      <div className='App'>
        {/* <NavBar /> */}
        <div className='main-content'>
          <Suspense fallback={<div></div>}>
            <Switch>
              <Route path='/' component={Home} />
            </Switch>
          </Suspense>
        </div>
      </div>
    </BrowserRouter>
  // </ModalsContextProvider>
  );
}

export default App;
