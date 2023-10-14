import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState();
  const [charAllowed, setCharAllowed] = useState();
  const [password, setPassword] = useState("");
  const [isStrongPassword, setIsStrongPassword] = useState();
  const passwordRef = useRef(null);
  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQURSTVWYZabcdefghijklmnopqurstvwyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!?$@#&_/({}*~%:-";
    if (length > 8 && numberAllowed && charAllowed) {
      setIsStrongPassword(true);
    } else setIsStrongPassword(false);

    for (let index = 0; index < length; index++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, isStrongPassword]);

  const copyPasswordToClipBoard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current.select();
  };
  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charAllowed, isStrongPassword]);

  return (
    <div className="">
      <div className="bg-gray-800 w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-yellow-400 text-center">
        <h1 className="text-white text-center my-4">Password Generator</h1>
        {isStrongPassword ? (
          <span className=" text-green-300 py-1 my-2">strong password</span>
        ) : (
          <span>wake password!</span>
        )}
        <div className="flex bg-orange-300  w-full shadow rounded-lg  overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className={
              isStrongPassword
                ? `bg-green-200 outline-none w-full py-1 px-3 text-orange-700`
                : `bg-red-200 outline-none w-full py-1 px-3  text-orange-700`
            }
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="outline-none bg-gray-700 text-yellow-400 px-3 py-0.5 shrink-0"
            onClick={copyPasswordToClipBoard}
          >
            copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          <input
            className="cursor-pointer mx-2"
            type="range"
            min={6}
            max={100}
            value={length}
            name=""
            id="password"
            onChange={(e) => setLength(e.target.value)}
          />
          <label className="" htmlFor="password">
            {"password length :" + length}
          </label>
        </div>
        <div className="flex text-sm gap-x-2 my-4">
          {/* for allow character  */}
          <div className="bg-green-200 text-black px-2 rounded-lg">
            <label
              className="select-none cursor-pointer"
              htmlFor="characterInput"
            >
              {" "}
              Allow Symbols ?
            </label>
            <input
              className="bg-orange-700 w-6 py-6"
              type="checkbox"
              id="characterInput"
              defaultChecked={charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
          </div>
          {/* for allow numbers  */}

          <div className="bg-red-200 text-black px-2 rounded-lg">
            <label className="select-none cursor-pointer" htmlFor="numberInput">
              Allow Numbers ?
            </label>
            <input
              className="bg-orange-700 w-16 py-6"
              type="checkbox"
              id="numberInput"
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
