const express = require("express");
const fs = require("fs");
const app = express();
const port = 8080;


const csv = fs.readFileSync("poker_stats_data.csv");
const array = csv.toString().split("\r")

const convertData = (arr) => {
    let results = [];
    let headers = arr[0].split(",");
    let body = arr.slice(1, -1);
    let dataArr = body.map(el => el.replace("\n", "").split(","))

   let obj = dataArr.forEach((el)=>{
        let playerObj = {
            player: el[1],
            games: [
                {
                    date: el[0],
                    cashNet: el[2],
                    tournamentNet: el[3],
                    tournamentPlace: el[4],
                    tournamentPer: el[5],
                    otherNet: el[6],
                    otherGame: el[7],
                    net: el[8],
                    sixNines: el[9],
                    quads: el[10]
                }
            ]
        }
        results.push(playerObj);
    })
    results.forEach((el) => {
        let currentPlayer = el.player;
        for(let i = results.indexOf(el) + 1; i < results.length; i++){
            if(currentPlayer === results[i].player){
                el.games.push(results[i].games[0])
                results.splice(i, 1)
            } 
        }
    })
    return results
}




// final = [
//     {
//         player: "Riggs",
//         games: [
//             {
//                 date: "1/8/2022",
//                 cashNet:
//             }
//         ] 
//     }
// ]
let data = convertData(array)
app.get("/", (req, res) =>{
    res.send(data)
});

app.listen( port, ()=>{
    console.log(`server started at Port: ${port}`);
});