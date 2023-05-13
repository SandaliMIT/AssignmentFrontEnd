import logo from './logo.svg';
import './App.css';
import {Home} from './Home';
import Product from './components/Products';

function App() {
  return (
      <div>
        <Product/>
      </div>


    // <BrowserRouter>
    // <div className="App">
    //   <div className='App container'>
    //     <h3 className='d-flex justify-content-center m-3'>
    //       React JS Frontend
    //     </h3>

    //     <nav className='navbar navbar-expand-sm bg-light navbar-dark'>
    //       <ul className='navbar-nav'>
    //         <li className='nav-item m-1'>
    //           <NavLink className='btn btn-light btn-outline-primary' to='/home'>
    //             Home
    //           </NavLink>
    //           <NavLink className='btn btn-light btn-outline-primary' to='/product'>
    //             Products
    //           </NavLink>
    //         </li>
    //       </ul>
    //     </nav>

    //     <Routes>
    //       <Route path='/home' Component={Home}></Route>
    //       <Route path='/product' Component={Product}></Route>
    //     </Routes>

    //   </div>
    // </div>
    // </BrowserRouter>
  );
}

export default App;
