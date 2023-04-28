// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import type { Player, Data } from '../interfaces';
const fs = require("fs");


const csv = fs.readFileSync("src/pages/api/poker_stats_data.csv");
const array = csv.toString().split("\r")


const convertData = (arr: Array<string>) => {
    let results: Array<Player> = [];
    let headers = arr[0].split(",");
    let body = arr.slice(1, -1);
    let dataArr = body.map(el => el.replace("\n", "").split(","))

    dataArr.forEach((el)=>{
        let playerObj = {
            name: el[1],
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
        let currentPlayer: string = el.name;
        
        for(let i = results.indexOf(el) + 1; i < results.length; i++){
            if(currentPlayer === results[i].name){
                el.games.push(results[i].games[0])
                results.splice(i, 1)
                
            } 
        }
    })
    return results
}

let data = convertData(array);


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({body: data})
}
