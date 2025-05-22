import PlayGround from "./components/PlayGround";
import { useState } from "react";
import Home from "./components/Home";
import { io } from "socket.io-client";
import MyContext from "./context/myContext";

export const socket = io("javascriptbackend-tic-tac-toe-production.up.railway.app");
socket.on("connect", () => {
    console.log("socket.io successfully connected", socket.id);
});
function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [superColor, setSuperColor] = useState("bg-zinc-100");
    const [theme, setTheme] = useState("classic");
    console.log(superColor);
    function toggleTheme() {
        setTheme((value) => (value === "classic" ? "super" : "classic"));
    }
    return (
        <div
            className={
                "w-screen h-screen " +
                superColor +
                "  flex justify-center items-center gap-3 flex-col"
            }
        >
            <div className="absolute top-3 flex gap-3 items-center">
                <h2 className="text-center text-seagreen text-3xl  capitalize">
                    tic tac toe
                </h2>
                {currentUser && (
                    <div>
                        <button
                            className="text-white bg-indigo-400 w-20 py-1 rounded-md"
                            onClick={toggleTheme}
                        >
                            {theme}
                        </button>
                    </div>
                )}
            </div>

            <div className="text-green-700 w-10/12 h-11/12">
                <div className="flex gap-3 justify-evenly p-4 flex-wrap items-center flex-col">
                    {!currentUser ? (
                        <Home setCurrentUser={setCurrentUser} />
                    ) : (
                        <MyContext.Provider value={{superColor}}>
                            <PlayGround
                                currentUser={currentUser}
                                setSuperColor={setSuperColor}
                                theme={theme}
                            />
                        </MyContext.Provider>
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
