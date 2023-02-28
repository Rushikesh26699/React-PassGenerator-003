import React, {useState} from 'react'
import './App.css';
import {toast,ToastContainer} from 'react-toastify'
import { numbers,upperCaseLetters,lowerCaseLetters,specialCharacters } from './characters';
import'react-toastify/dist/ReactToastify.css'
import { COPY_SUCCESS } from './message';

function App() {
  const[password,setPassword]=useState('')
  const[passwordLength,setPasswordLength] = useState(20)
  const[includeUppercase,setIncludeUppercase]=useState(false)
  const[includeLowercase,setIncludeLowercase]=useState(false)
  const[includeNumbers,setIncludeNumbers]=useState(false)
  const[includeSymbols,setIncludeSymbols]=useState(false)

  const handleGeneratePassword =(e)=>{

    if(!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols){
      notify('You Must Select Atleast 1 Option',true)
    }
    let characterList = ''

    if(includeLowercase){
      characterList=characterList + lowerCaseLetters
    }
    if(includeUppercase){
      characterList = characterList + upperCaseLetters
    }
    if(includeNumbers){
      characterList = characterList + numbers
    }
    if(includeSymbols){
      characterList = characterList + specialCharacters
    }

    setPassword(createPassword(characterList))
  }

  const createPassword = (characterList)=>{
     let password =''
     const characterListLength = characterList.length

     for(let i =0; i< passwordLength; i++){
      const characterIndex = Math.round(Math.random() * characterListLength)
      password = password + characterList.charAt(characterIndex)
     }
     return password
  }
  const copyToClipboard =()=>{
    const newTextArea = document.createElement('textarea')
    newTextArea.innerText = password
    document.body.appendChild(newTextArea)
    newTextArea.select()
    document.execCommand('copy')
    newTextArea.remove()
  }

  const notify =(message,hasError =false)=>{
    if(hasError){
      toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

    }
    else{
      toast(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });

    }
    
  }

  const handleCopyPassword =(e)=>{
    if(password==''){
      notify('Nothing To Copy',true)
    }
    else{
      copyToClipboard()
    notify(COPY_SUCCESS)
    }
  }


  return (
    <div className="App">
      <div className="container">
         <div className="generator">
            <h2 className="genrator_header"> Password Generator</h2>
            <div className="generator_password">
              <h3>{password}</h3>
              <button onClick={handleCopyPassword} className="copy_btn">
                <i className='far fa-clipboard'></i>
              </button>
            </div>

            <div className="form-group">
             <label htmlFor="password-strength">Password Length</label>
             <input type="number" defaultValue={passwordLength} onChange={(e)=>setPasswordLength(e.target.value)} id="password-strength" name="password-strength" max="20" min="10"></input>
            </div>

            <div className="form-group">
             <label htmlFor="uppercase-letters">Include Uppercase Letters</label>
             <input type="checkbox" checked={includeUppercase} onChange={(e)=>setIncludeUppercase(e.target.checked)} id="uppercase-letters" name="uppercase-letters"></input>
            </div>

            <div className="form-group">
             <label htmlFor="lowercase-letters">Include Lowercase Letters</label>
             <input type="checkbox" checked={includeLowercase} onChange={(e)=>setIncludeLowercase(e.target.checked)} id="lowercase-letters" name="lowercase-letters" ></input>
            </div>

            <div className="form-group">
             <label htmlFor="include-numbers">Include Numbers</label>
             <input type="checkbox" checked={includeNumbers} onChange={(e)=>setIncludeNumbers(e.target.checked)} id="include-numbers" name="include-numbers" ></input>
            </div>
          
            <div className="form-group">
             <label htmlFor="include-symbols">Include Symbols</label>
             <input type="checkbox" checked={includeSymbols} onChange={(e)=>setIncludeSymbols(e.target.checked)} id="include-symbols" name="include-symbols" ></input>
            </div>

            <button onClick={handleGeneratePassword} className="generator-btn">Generate Password</button>
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              /> 

          


         </div>
      </div>
    </div>
  );
}

export default App;
