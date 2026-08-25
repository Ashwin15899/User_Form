import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import UserForm from './components/UserForm/UserForm';
import Users from './components/Users/Users';

function App() {
    return (
    <>
        <nav className='top-nav'>
            <Navigation/>
        </nav>

        <div>
            <Routes>
                <Route path='/' element={<UserForm/>}/>
                <Route path='/users' element={<Users/>}/>
            </Routes>
        </div>
    </>
    )
}

export default App;
