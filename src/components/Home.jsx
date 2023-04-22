import React from "react";
import { useState } from "react";

import { socket } from "../App.jsx";

function Home({ setCurrentUser }) {
    const [name, setName] = useState("");
    const [text, setText] = useState("");
    const [isJoin, setIsJoin] = useState(false);

    function gameJoinFunction() {
        if (isJoin) {
            socket.emit("joinTheGame",name,text,(res) => {
                if(res.status==="success"){
                    console.log(res)
                    setCurrentUser({player: res.player,name,room:text})
                }else if(res.status === "playing"){
                    alert("game already started")
                }else{
                    alert("invalid code")
                }
            })
        }
        setIsJoin(true);
    }


    function createGame() {
        socket.emit("createNewGame",name,(res) => {
            if(res.status==="success"){
                setCurrentUser({
                    name,
                    code:res.gameId
                })
            }
            console.log(res)
        })
        console.log("socket")
    }
    return (
        <div className="container mystyle p-1 sm:w-96 flex flex-col gap-2">
            <input
                type="text"
                className="text-xl rounded-md p-1 outline-none w-full"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            {isJoin && (
                <input
                    type="text"
                    className="text-xl rounded-md p-1 outline-none w-full"
                    placeholder="code"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            )}

            <div className="flex gap-3 justify-center">
                <button
                    className="bg-green-600 text-white p-1 text-lg rounded-md w-20"
                    onClick={gameJoinFunction}
                >
                    Join
                </button>
                <button
                    className="bg-orange-400 text-white p-1 text-lg rounded-md w-20"
                    onClick={createGame}
                >
                    Create
                </button>
            </div>
        </div>
    );
}

export default Home;
