import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Box from "./Box";

import { socket } from "../App.jsx";

export default function PlayGround({ currentUser,setSuperColor }) {
    const [nextPlayer, setNextPlayer] = useState(null);
    const [statusText, setStatusText] = useState("");
    const [status, setStatus] = useState(Array(9).fill(null));

    socket.on("playerJoin", (player) => {
        console.log("player recevied", player);
        setNextPlayer(player);
        setStatusText(currentUser.name + " it's your turn");
    });

    useEffect(() => {
        socket.on("stateChange", (state) => {
            console.log("state changed", state);
            setStatus(state);
        });

        socket.on("winner",(params)=>{
            if((params.flag && currentUser.code) || (!params.flag && !currentUser.code)){
                setStatusText(params.winMessage)
                setSuperColor("bg-green-400")
            }else{
                setStatusText(params.runMessage)
                setSuperColor(params.runColor)
            }
        })

        socket.on("drawMatch",(params)=>{
            setStatusText(params.message)
        })

        socket.on("message",(text)=>setStatusText(text))

        console.log(currentUser.player);
        setNextPlayer(currentUser.player);
        if (currentUser.code)
            setStatusText(
                `game code ${currentUser.code} share to your friends`
            );
    }, []);

    function getTheAction(data) {
        socket.emit("play", { ...currentUser, data });
    }

    return (
        <>
            <div className="text-xl w-50">
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

            <div className="w-52 h-52 grid grid-cols-3 grid-rows-3 gap-1">
                <Box index={status[0]} value={0} action={getTheAction} />
                <Box index={status[1]} value={1} action={getTheAction} />
                <Box index={status[2]} value={2} action={getTheAction} />

                <Box index={status[3]} value={3} action={getTheAction} />
                <Box index={status[4]} value={4} action={getTheAction} />
                <Box index={status[5]} value={5} action={getTheAction} />

                <Box index={status[6]} value={6} action={getTheAction} />
                <Box index={status[7]} value={7} action={getTheAction} />
                <Box index={status[8]} value={8} action={getTheAction} />
            </div>
            <h2 className="text-center mt-5 text-xl">{statusText}</h2>
        </>
    );
}
