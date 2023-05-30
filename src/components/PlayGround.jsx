import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Box from "./Box";

import { socket } from "../App.jsx";

export default function PlayGround({ currentUser, setSuperColor,theme }) {
    const [nextPlayer, setNextPlayer] = useState(null);
    const [statusText, setStatusText] = useState("");
    const [status, setStatus] = useState(Array(9).fill(null));

    useEffect(() => {
        socket.on("playerJoin", (player) => {
            console.log("player recevied", player);
            setNextPlayer(player);
        });
        socket.on("stateChange", (state) => {
            console.log("state changed", state);
            setStatus(state);
        });

        socket.on("winner", (params) => {
            console.log(params)
            if (params.winner === currentUser.name) {
                setStatusText(params.winMessage);
                setSuperColor("bg-green-400");
            } else {
                setStatusText(params.runMessage);
                setSuperColor("bg-red-400");
            }
        });

        socket.on("matchDraw", (params) => {
            console.log("draw",params)
            setStatusText(params.message);
            setSuperColor("bg-sky-400");
        });

        socket.on("message", (text) => setStatusText(text));
        socket.on("gameReset",()=>{
            setSuperColor("bg-zinc-100")
            setStatus(Array(9).fill(null))
        })

        console.log(currentUser.player);
        setNextPlayer(currentUser.player);
        if (currentUser.code)
            setStatusText(
                `Room code ${currentUser.code} share to your friends`
            );
    }, []);

    function getTheAction(data) {
        socket.emit("play", data);
    }

    return (
        <>
            <div className="text-xl w-50 mystyle">
                <div></div>
                <span className="flex justify-between gap-3">
                    <h2>{currentUser.name}</h2>
                    <h2>{currentUser.code ? "X" : "O"}</h2>
                </span>
                <span className="flex justify-between gap-3">
                    {nextPlayer ? (
                        <>
                            <h2>{nextPlayer}</h2>
                            <h2>{!currentUser.code ? "X" : "O"}</h2>
                        </>
                    ) : (
                        "wating for player to join"
                    )}
                </span>
            </div>

            <div className={`${theme==="super" && "bg-sky-400"} w-52 h-52 grid grid-cols-3 grid-rows-3 gap-1 mystyle`}>
                <Box index={status[0]} value={0} action={getTheAction} theme={theme} />
                <Box index={status[1]} value={1} action={getTheAction} theme={theme} />
                <Box index={status[2]} value={2} action={getTheAction} theme={theme} />

                <Box index={status[3]} value={3} action={getTheAction} theme={theme} />
                <Box index={status[4]} value={4} action={getTheAction} theme={theme} />
                <Box index={status[5]} value={5} action={getTheAction} theme={theme} />

                <Box index={status[6]} value={6} action={getTheAction} theme={theme} />
                <Box index={status[7]} value={7} action={getTheAction} theme={theme} />
                <Box index={status[8]} value={8} action={getTheAction} theme={theme} />
            </div>
            <h2 className="text-center mt-5 text-xl mystyle">{statusText}</h2>
            <button className="bg-red-500 py-0.5 w-20 rounded-md text-white text-xl" onClick={()=>socket.emit("resetTheGame")}>
                Reset
            </button>
        </>
    );
}
