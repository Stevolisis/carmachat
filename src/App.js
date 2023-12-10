import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Index from './pages';
import LogIn from './pages/login';
import Register from './pages/register';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LogIn />} />
          {/* <Route path='/login' element={<LogIn />} /> */}
          <Route path='/register' element={<Register />} />
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
