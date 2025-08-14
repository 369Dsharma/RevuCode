import { useEffect, useState } from 'react';
import './App.css'
import Navbar from './components/Navbar'
import Editor , { useMonaco } from '@monaco-editor/react';
import Select from 'react-select';
import { GoogleGenAI } from "@google/genai";
import Markdown from 'react-markdown';
import HashLoader from "react-spinners/HashLoader"
import toast, { Toaster } from 'react-hot-toast'
function App() {

   const monaco = useMonaco();
  const [theme, setTheme] = useState("vs-dark");

  const themeOptions = [
    { value: "vs-dark", label: "VS Dark" },
    { value: "light", label: "VS Light" },
    { value: "hc-black", label: "High Contrast" },
    { value: "dracula", label: "Dracula" },
    { value: "monokai", label: "Monokai" },
    { value: "github-dark", label: "GitHub Dark" },
    { value: "github-light", label: "GitHub Light" },
    { value: "solarized-dark", label: "Solarized Dark" },
    { value: "solarized-light", label: "Solarized Light" },
    { value: "night-owl", label: "Night Owl" },
    { value: "nord", label: "Nord" },
    { value: "one-dark", label: "One Dark" }
  ];

useEffect(() => {
    if (monaco) {
      // Dracula
      monaco.editor.defineTheme("dracula", {
        base: "vs-dark",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": "#282a36",
          "editor.foreground": "#f8f8f2",
          "editorCursor.foreground": "#f8f8f0",
          "editorLineNumber.foreground": "#6272a4",
          "editorLineNumber.activeForeground": "#f8f8f2"
        }
      });

      // Monokai
      monaco.editor.defineTheme("monokai", {
        base: "vs-dark",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": "#272822",
          "editor.foreground": "#f8f8f2",
          "editorCursor.foreground": "#f8f8f0",
          "editorLineNumber.foreground": "#75715e",
          "editorLineNumber.activeForeground": "#f8f8f2"
        }
      });

      // GitHub Dark
      monaco.editor.defineTheme("github-dark", {
        base: "vs-dark",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": "#0d1117",
          "editor.foreground": "#c9d1d9",
          "editorCursor.foreground": "#ffffff",
          "editorLineNumber.foreground": "#8b949e",
          "editorLineNumber.activeForeground": "#ffffff"
        }
      });

      // GitHub Light
      monaco.editor.defineTheme("github-light", {
        base: "vs",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": "#ffffff",
          "editor.foreground": "#24292f",
          "editorCursor.foreground": "#000000",
          "editorLineNumber.foreground": "#6e7781",
          "editorLineNumber.activeForeground": "#000000"
        }
      });

      // Solarized Dark
      monaco.editor.defineTheme("solarized-dark", {
        base: "vs-dark",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": "#002b36",
          "editor.foreground": "#839496",
          "editorCursor.foreground": "#93a1a1",
          "editorLineNumber.foreground": "#586e75",
          "editorLineNumber.activeForeground": "#93a1a1"
        }
      });

      // Solarized Light
      monaco.editor.defineTheme("solarized-light", {
        base: "vs",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": "#fdf6e3",
          "editor.foreground": "#657b83",
          "editorCursor.foreground": "#586e75",
          "editorLineNumber.foreground": "#93a1a1",
          "editorLineNumber.activeForeground": "#586e75"
        }
      });

      // Night Owl
      monaco.editor.defineTheme("night-owl", {
        base: "vs-dark",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": "#011627",
          "editor.foreground": "#d6deeb",
          "editorCursor.foreground": "#ffffff",
          "editorLineNumber.foreground": "#5f7e97",
          "editorLineNumber.activeForeground": "#ffffff"
        }
      });

      // Nord
      monaco.editor.defineTheme("nord", {
        base: "vs-dark",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": "#2e3440",
          "editor.foreground": "#d8dee9",
          "editorCursor.foreground": "#eceff4",
          "editorLineNumber.foreground": "#4c566a",
          "editorLineNumber.activeForeground": "#eceff4"
        }
      });

      // One Dark
      monaco.editor.defineTheme("one-dark", {
        base: "vs-dark",
        inherit: true,
        rules: [],
        colors: {
          "editor.background": "#282c34",
          "editor.foreground": "#abb2bf",
          "editorCursor.foreground": "#ffffff",
          "editorLineNumber.foreground": "#5c6370",
          "editorLineNumber.activeForeground": "#ffffff"
        }
      });
    }
  }, [monaco]);


  const options = [
  { value: "javascript", label: "JavaScript" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "c", label: "C" },
  { value: "cpp", label: "C++" },      
  { value: "java", label: "Java" },
  { value: "python", label: "Python" },
  { value: "csharp", label: "C#" },
  {value : "typescript" , label : "TypeScript"}  ,  
];

  const [selectedOption , setSelectedOption] = useState(options[0]);
  const [code , setCode] = useState("");
  const[loading , setLoading] = useState(false);
  const [response , setResponse] = useState("");
  // Api key

  const ai = new GoogleGenAI({apiKey : import.meta.env.VITE_GEMINI_API_KEY});

  async function reviewCode() {
    setResponse("");
    setLoading(true);
    toast.success("Your code is being reviewed 🚀", {
      style: {
      borderRadius: '8px',
      background: '#d1fae5', 
      color: '#065f46',      
      fontWeight: 500,
      fontSize: '15px',
    },
    });
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `You are an expert-level software developer, skilled in writing efficient, clean, and advanced code.
I’m sharing a piece of code written in ${selectedOption.value}.
Your job is to deeply review this code and provide the following:

1️⃣ A quality rating: Better, Good, Normal, or Bad.
2️⃣ Detailed suggestions for improvement, including best practices and advanced alternatives.
3️⃣ A clear explanation of what the code does, step by step.
4️⃣ A list of any potential bugs or logical errors, if found.
5️⃣ Identification of syntax errors or runtime errors, if present.
6️⃣ Solutions and recommendations on how to fix each identified issue.

Analyze it like a senior developer reviewing a pull request.

Code: ${code} `,
  });
  setResponse(response.text);
  toast.success("Your code is Successfully reviewed✅", {
     style: {
      borderRadius: '8px',
      background: '#d1fae5', 
      color: '#065f46',      
      fontWeight: 500,
      fontSize: '15px',
    },
  });
  setLoading(false);
}

  const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: '#1f2937', 
    borderColor: state.isFocused ? '#3b82f6' : '#374151', 
    color: '#fff',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#3b82f6',
    },
    width: "100%",
    
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#1f2937', 
    color: '#fff',
    zIndex: 9999,
    width: "100%",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused
      ? '#374151' 
      : '#1f2937',
    color: '#fff',
    cursor: 'pointer',
    '&:active': {
      backgroundColor: '#3b82f6',
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#fff',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#9ca3af', 
    width: "100%",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: '#9ca3af',
    '&:hover': {
      color: '#fff',
    },
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    backgroundColor: '#4b5563', 
  }),
};
 return(
  <div>
    <Navbar />
     <Toaster position="top-right" reverseOrder={false} />
    <div className="main flex justify-between" style={{height:"calc(100vh-90px)"}} >
      <div className="left h-[85%] w-[50%]">
        <div className="tabs w-full !px-5 !mb-3 !mt-5 flex items-center gap-[10px]">
            <Select 
            value={selectedOption}
            onChange={(e) => {setSelectedOption(e)}}
            options={options}
            styles={customStyles}
          />

          <Select
            value={themeOptions.find(opt => opt.value === theme)}
            onChange={(opt) => setTheme(opt.value)}
            options={themeOptions}
            styles={customStyles}
          />

          <button onClick={()=>{
            if(code === "")
            {
              toast.error("Enter some code first ⚠️" , {
                    style: {
                    borderRadius: '10px',
                    background: '#fee2e2',
                    color: '#991b1b',
                    fontWeight: 500,
                    fontSize: '15px',
              },
              });
            }
            else{
              reviewCode();
            }
          }} className="btnNormal min-w-[120px] transition-all hover:bg-cyan-400" style={{backgroundColor : ""}}>Review</button>

        </div>
        <Editor theme={theme} height="77.3vh" language={selectedOption.value} value={code} onChange={(e)=>{setCode(e)}} />
      </div>

      <div className="right overflow-scroll !p-[10px] bg-zinc-900 w-[50%] h-[87.5vh]">

        <div className="topTab border-b-[1px] !border-b-gray-600 flex items-center justify-between h-[60px]">
              <p className='font-[700] !text-blue-50 text-[17px]'>Response</p>
        </div>
        
        {loading && <HashLoader size={50} color="#00FFFF" />}
        <Markdown >{response}</Markdown>
        

      </div>
    </div>
  </div> 
 )
}

export default App
