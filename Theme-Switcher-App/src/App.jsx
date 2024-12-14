import { useEffect, useState } from 'react'

import './App.css'
import { ThemeProvider } from './contexts/Theme'

function App() {
  const [ themeMode, setThemeMode] = useState("light")

  const lightTheme = () =>{
    setThemeMode('light');
  }

  const darkTheme = () => {
    setThemeMode('dark');
  }

  // Change the theme in JS.

  useEffect(
    ( ) => {
      const htmlElem = document.querySelector('html')
      htmlElem.classList.remove('light', 'dark')
      htmlElem.classList.add(themeMode);
    }
    , [ themeMode ]
  )

  return (
    <>
      <ThemeProvider value={{ themeMode, lightTheme, darkTheme }}>
        <div className="flex flex-wrap min-h-screen items-center">

            <div className="w-full">
                  <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
                      <Card />    
                  </div>

                  <div className="w-full max-w-sm mx-auto">
                      <ThemeBtn / >
                  </div>
            </div>
        </div>
      </ThemeProvider>

    </>
  )
}

export default App
