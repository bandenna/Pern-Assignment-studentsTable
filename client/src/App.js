import './App.css';
import Header from './components/header';
import StudentInfo from './components/studentInputs';
import Studenttable from './components/studentsTable';
import Footer from './components/footer';
function App() {
  return (
    <div>
      <Header/>
      <StudentInfo/>
      <Studenttable/>
      <Footer/>
    </div>
     );
}

export default App;
