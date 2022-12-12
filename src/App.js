import React from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import { NavbarComponent } from './components'
import PrintPdf from './components/PrintPdf';
import { Home, Sukses } from './pages'

function App() {
  return (
    <BrowserRouter>
      <NavbarComponent /> 
      <main>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/sukses" component={Sukses} exact />
          <Route path="/print" component={PrintPdf} exact />
        </Switch>
      </main>
    </BrowserRouter>
  )
}

export default App