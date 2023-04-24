import PlayGround from "./components/PlayGround";
import { useState } from "react";
import Home from "./components/Home";
import { io } from "socket.io-client";
 
export const socket = io("https://javascript-tik-tac-toa.azurewebsites.net/");
socket.on("connect", () => {
    console.log("socket.io successfully connected", socket.id);
});
function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [superColor, setSuperColor] = useState("bg-zinc-100");
    console.log(superColor);
    return (
        <div
            className={
                "w-screen h-screen " +
                superColor +
                "  flex justify-center items-center gap-3 flex-col"
            }
        >
            <h2 className="text-center text-seagreen text-3xl absolute top-3 capitalize">
                tic tac toe
            </h2>

            <div className="text-green-700 w-10/12 h-11/12">
                <div className="flex gap-3 justify-evenly p-4 flex-wrap items-center flex-col">
                    {!currentUser ? (
                        <Home setCurrentUser={setCurrentUser} />
                    ) : (
                        <PlayGround
                            currentUser={currentUser}
                            setSuperColor={setSuperColor}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
