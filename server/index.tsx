const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const axios = require('axios').default
const fetch = require("node-fetch");
const schedule = require('node-schedule')
require('dotenv').config();

app.use(cors());
app.use(express.json());

const apiKey = process.env.API_KEY

// Golf API calls //

//Get Entry List//

const players = {
  method: 'GET',
  url: 'https://golf-leaderboard-data.p.rapidapi.com/entry-list/279',
  headers: {
    'x-rapidapi-key': apiKey,
    'x-rapidapi-host': 'golf-leaderboard-data.p.rapidapi.com'
  }
};

// const createEntryList = async e => {
//   try {
//     const response = await fetch("http://localhost:5000/golfers", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(e)
//     });
//   } catch (error) {
//     console.log(error)
//   }
// }

// axios.request(players).then(function (response) {
//   console.log(response.data.results.entry_list)
//   response.data.results.entry_list.forEach(golfer => {
//     const golferData = {
//       firstname: golfer.first_name,
//       lastname: golfer.last_name,
//       player_id: golfer.player_id
//     }
//     createEntryList(golferData)
//   });
// }).catch(function (error) {
// 	console.error(error);
// });

//Get Top Ten//

// const options = {
//   method: 'GET',
//   url: 'https://golf-leaderboard-data.p.rapidapi.com/world-rankings',
//   headers: {
//     'x-rapidapi-key': apiKey,
//     'x-rapidapi-host': 'golf-leaderboard-data.p.rapidapi.com'
//   }
// };

// const createTopTen = async e => {
//   try {
//     const response = await fetch("http://localhost:5000/topten", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(e)
//     });
//   } catch (error) {
//     console.log(error)
//   }
// }

// axios.request(options).then(function (response) {
//   const topten = []
//   for (let i = 0; i < 10; i++){
//     topten.push(response.data.results.rankings[i])
//   }
//   topten.forEach(golfer => {
//     const golferData = {
//       player_id: golfer.player_id,
//       fullname: golfer.player_name
//     }
//     console.log(golferData)
//     createTopTen(golferData)
//   });
// }).catch(function (error) {
// 	console.error(error);
// });

//Get Leaderboard//

const leaderboard = {
  method: 'GET',
  url: 'https://golf-leaderboard-data.p.rapidapi.com/leaderboard/278',
  headers: {
    'x-rapidapi-key': apiKey,
    'x-rapidapi-host': 'golf-leaderboard-data.p.rapidapi.com'
  }
};

// const createLeaderboardList = async e => {
//   try {
//     const response = await fetch("http://localhost:5000/leaderboard", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(e)
//     });
//   } catch (error) {
//     console.log(error)
//   }
// }

// axios.request(leaderboard).then(function (response) {
//   console.log(response.data.results.leaderboard)
//   response.data.results.leaderboard.forEach(golfer => {
//     const round = golfer.current_round - 1;
//     const golferData = {
//       firstname: golfer.first_name,
//       lastname: golfer.last_name,
//       player_id: golfer.player_id,
//       score: golfer.total_to_par,
//       currentround: golfer.rounds[round].total_to_par,
//       bonus: 0,
//       holes_played: golfer.holes_played,
//       player_status: golfer.status
//     }
//     createLeaderboardList(golferData)
//   });
// }).catch(function (error) {
// 	console.error(error);
// });

// Update Leaderboard // 

const updateLeaderboardList = async e => {
  try {
    const url = `http://localhost:5000/leaderboard/${e.player_id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(e)
    });
  } catch (error) {
    console.log(error)
  }
}

// const getAutoUpdateStatus = async () => {
//   try {
//     const url = 'http://localhost:5000/autoUpdate';
//     const response = await fetch(url, {
//       method: "GET",
//       headers: { "Content-Type": "application/json" },
//     })
//   } catch (error) {
//     console.log(error)
//   }
// }

// const job = schedule.scheduleJob('*/1 * * * *', async function(){
//   let autoUpdate = false;
//   await axios.get('http://localhost:5000/autoUpdate',{
//     headers: {"Content-Type": "application/json"
//     },
//   })
//   .then(response => {
//     console.log("setting autoUpdate")
//      autoUpdate = response.data
//   })
//   .catch(ex => {
//     const error =
//     ex.response.status === 404
//       ? "Resource not found"
//       : "An unexpected error has occurred";
//     console.log(error)
// });
//   console.log("if check")
//   if (autoUpdate) {
//     axios.request(leaderboard).then(function (response) {
//       // console.log(response.data.results.leaderboard)
//       response.data.results.leaderboard.forEach(golfer => {
//         const round = golfer.current_round - 1;
//         const golferData = {
//           player_id: golfer.player_id,
//           score: golfer.total_to_par,
//           currentround: golfer.rounds[round].total_to_par,
//           holes_played: golfer.holes_played,
//           player_status: golfer.status
//         }
//         updateLeaderboardList(golferData)
//       });
//     }).catch(function (error) {
//       console.error(error);
//     });
//   } else {
//     console.log('AutoUpdate turned off');
//   }
// })

 
// axios.request(leaderboard).then(function (response) {
//   // console.log(response.data.results.leaderboard)
//   response.data.results.leaderboard.forEach(golfer => {
//     const round = golfer.current_round - 1;
//     const golferData = {
//       player_id: golfer.player_id,
//       score: golfer.total_to_par,
//       currentround: golfer.rounds[round].total_to_par,
//       holes_played: golfer.holes_played,
//       player_status: golfer.status
//     }
//     updateLeaderboardList(golferData)
//   });
// }).catch(function (error) {
// 	console.error(error);
// });

// Get players eligble for bonus //

const bonusJob = schedule.scheduleJob('0 0 21 ? *, 3-7', async function(){
  const updateBonus = async e => {
    try {
      const url = `http://localhost:5000/bonus/${e.player_id}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(e)
      });
    } catch (error) {
      console.log(error)
    }
  }
  
  axios.request(leaderboard).then(function (response) {
    const round = response.data.results.tournament.live_details.current_round - 1
    const max = response.data.results.leaderboard.reduce(function(prev, current) {
      return (prev.rounds[round].total_to_par < current.rounds[round].total_to_par) ? prev : current
  }) //returns object
    const eligbleGolfers = response.data.results.leaderboard.filter(golfer => golfer.rounds[round].total_to_par === max.rounds[round].total_to_par)
    eligbleGolfers.forEach(golfer => {
      const golferData = {
        player_id: golfer.player_id,
      }
      updateBonus(golferData)
    });
  }).catch(function (error) {
    console.error(error);
  });  
})

//Routes//

//add golfers//
app.post('/golfers', async (req, res) => {
  try {
    const { firstname, lastname, player_id } = req.body;
    console.log(req.body)
    const newGolfer = await pool.query(
      'INSERT INTO golfers (firstname, lastname, player_id) VALUES($1, $2, $3)',
      [firstname, lastname, player_id]
    );
    res.json(newGolfer.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
})

//get golfers//
app.get('/golfers', async (req, res) => {
  try {
    const golfers = await pool.query('SELECT * FROM golfers');
    res.json(golfers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//create leaderboard//
app.post('/leaderboard', async (req, res) => {
  try {
    const { firstname, lastname, player_id, score, currentround, bonus, holes_played, player_status } = req.body;
    const golfer = await pool.query(
      'INSERT INTO leaderboard (firstname, lastname, player_id, score, currentround, bonus, holes_played, player_status) VALUES($1, $2, $3, $4, $5, $6, $7, $8)',
      [firstname, lastname, player_id, score, currentround, bonus, holes_played, player_status]
    );
    res.json(golfer.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
})

//update leaderboard//
app.put('/leaderboard/:id', async (req, res) => {
  try {
    const status = 'active'
    const { score, currentround, holes_played, player_status} = req.body;
    const results = await pool.query('UPDATE leaderboard SET score = $1, currentround = $2, holes_played = $3, player_status = $4 where player_id = $6 AND player_status = $5', [score, currentround, holes_played, player_status, status, req.params.id]);
    res.json(results);
  } catch (err) {
    console.error(err.message);
  }
})

//Get leaderboard//
app.get('/leaderboard', async (req, res) => {
  try {
    const leaderboard = await pool.query('SELECT firstname, lastname, player_id, score, currentround, holes_played, player_status FROM leaderboard ORDER BY score ASC');
    res.json(leaderboard.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//update bonus//

app.put('/bonus/:id', async (req, res) => {
  try {
    const results = await pool.query('UPDATE leaderboard SET bonus = $1 where player_id = $2', [-2, req.params.id]);
    res.json(results);
  } catch (err) {
    console.error(err.message);
  }
})

//Add Team//
app.post('/entries', async (req, res) => {
  try {
    const { fullname, email, teamname, golfer1, golfer2, golfer3, golfer4, golfer5, paid } = req.body;
    const team = await pool.query(
      'INSERT INTO entries (fullname, email, teamname, golfer1, golfer2, golfer3, golfer4, golfer5, paid) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)',
      [fullname, email, teamname, golfer1, golfer2, golfer3, golfer4, golfer5, paid]
    );
    res.json(team.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
})

//Get Teams//
let sqlTeams = `SELECT DISTINCT
    entries.fullname,
entries.teamname,
CONCAT(LEFT(golfer1.firstname, 1), '. ', golfer1.lastname) AS "golfer1",
CONCAT(LEFT(golfer2.firstname, 1), ', ', golfer2.lastname) AS "golfer2",
CONCAT(LEFT(golfer3.firstname, 1), '. ', golfer3.lastname) AS "golfer3",
CONCAT(LEFT(golfer4.firstname, 1), '. ', golfer4.lastname) AS "golfer4",
CONCAT(LEFT(golfer5.firstname, 1), '. ', golfer5.lastname) AS "golfer5",
entries.paid
FROM
entries
JOIN golfers golfer1 ON golfer1.player_id = entries.golfer1
JOIN golfers golfer2 ON golfer2.player_id = entries.golfer2
JOIN golfers golfer3 ON golfer3.player_id = entries.golfer3
JOIN golfers golfer4 ON golfer4.player_id = entries.golfer4
JOIN golfers golfer5 ON golfer5.player_id = entries.golfer5;`

app.get('/entries', async (req, res) => {
  try {
    const team = await pool.query(sqlTeams);
    res.json(team.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Get Teams who have not paid

app.get('/entries-paid', async (req, res) => {
  try {
    const team = await pool.query('SELECT * FROM entries WHERE paid = false ORDER BY fullname');
    res.json(team.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//Get Standings//
let sqlStandings = `SELECT
entries.teamname,
entries.entry_id,
golfer1score.score AS "golfer1score",
golfer2score.score AS "golfer2score",
golfer3score.score AS "golfer3score",
golfer4score.score AS "golfer4score",
golfer5score.score AS "golfer5score",
golfer1bonus.bonus AS "golfer1bonus",
golfer2bonus.bonus AS "golfer2bonus",
golfer3bonus.bonus AS "golfer3bonus",
golfer4bonus.bonus AS "golfer4bonus",
golfer5bonus.bonus AS "golfer5bonus", 
SUM(COALESCE(golfer1score.score,0) + COALESCE(golfer2score.score,0) + COALESCE(golfer3score.score,0) + COALESCE(golfer4score.score,0) + COALESCE(golfer5score.score,0) - GREATEST(golfer1score.score, golfer2score.score, golfer3score.score, golfer4score.score, golfer5score.score)) AS "rawtotal",
SUM(COALESCE(golfer1score.score,0) + COALESCE(golfer2score.score,0) + COALESCE(golfer3score.score,0) + COALESCE(golfer4score.score,0) + COALESCE(golfer5score.score,0) + COALESCE(golfer1bonus.bonus,0) + COALESCE(golfer2bonus.bonus,0) + COALESCE(golfer3bonus.bonus,0) + COALESCE(golfer4bonus.bonus,0) + COALESCE(golfer5bonus.bonus,0) - GREATEST(golfer1score.score, golfer2score.score, golfer3score.score, golfer4score.score, golfer5score.score)) AS "total"
FROM
entries
JOIN leaderboard golfer1score ON golfer1score.player_id = entries.golfer1
JOIN leaderboard golfer2score ON golfer2score.player_id = entries.golfer2
JOIN leaderboard golfer3score ON golfer3score.player_id = entries.golfer3
JOIN leaderboard golfer4score ON golfer4score.player_id = entries.golfer4
JOIN leaderboard golfer5score ON golfer5score.player_id = entries.golfer5
JOIN leaderboard golfer1bonus ON golfer1bonus.player_id = entries.golfer1
JOIN leaderboard golfer2bonus ON golfer2bonus.player_id = entries.golfer2
JOIN leaderboard golfer3bonus ON golfer3bonus.player_id = entries.golfer3
JOIN leaderboard golfer4bonus ON golfer4bonus.player_id = entries.golfer4
JOIN leaderboard golfer5bonus ON golfer5bonus.player_id = entries.golfer5
GROUP BY entries.teamname,entries.entry_id,golfer1score.score, golfer2score.score, golfer3score.score, golfer4score.score, golfer5score.score,
golfer1bonus.bonus, golfer2bonus.bonus, golfer3bonus, golfer4bonus.bonus, golfer5bonus.bonus
ORDER BY SUM(COALESCE(golfer1score.score,0) + COALESCE(golfer2score.score,0) + COALESCE(golfer3score.score,0) + COALESCE(golfer4score.score,0) + COALESCE(golfer5score.score,0) + COALESCE(golfer1bonus.bonus,0) + COALESCE(golfer2bonus.bonus,0) + COALESCE(golfer3bonus.bonus,0) + COALESCE(golfer4bonus.bonus,0) + COALESCE(golfer5bonus.bonus,0) - GREATEST(golfer1score.score, golfer2score.score, golfer3score.score, golfer4score.score, golfer5score.score)) ASC;`

app.get('/standings', async (req, res) => {
  try {
    const standings = await pool.query(sqlStandings);
    res.json(standings.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//top ten//
//Post top ten//
app.post('/topten', async (req, res) => {
  try {
    const { fullname, player_id } = req.body;
    console.log(req.body)
    const newGolfer = await pool.query(
      'INSERT INTO topten (player_id, fullname) VALUES($1, $2)',
      [player_id, fullname]
    );
    res.json(newGolfer.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
})

//Get top ten//
app.get('/topten', async (req, res) => {
  try {
    const topten = await pool.query('SELECT * FROM topten');
    res.json(topten.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Get AutoUpdate //
app.get('/autoUpdate', async (req, res) => {
  try {
    const update = await pool.query("SELECT status FROM admin WHERE setting = 'autoupdate'");
    res.json(update.rows[0].status);
  } catch (err) {
    console.error(err.message);
  }
});

// Update AutoUpdate //
app.put('/autoUpdate', async (req, res) => {
  try {
    console.log(req.body.newStatus)
    const newStatus = req.body.newStatus;
    const update = await pool.query("UPDATE admin SET status = $1 WHERE setting = 'autoupdate'", [newStatus]);
    res.json(update);
  } catch (err) {
    console.error(err.message);
  }
})

// Update Paid //
app.put('/paid/:user', async (req, res) => {
  try {
    console.log(req.params.user)
    const results = await pool.query('UPDATE entries SET paid = $1 where fullname = $2', [true, req.params.user]);
    res.json(results);
  } catch (err) {
    console.error(err.message);
  }
})

app.listen(5000, () => {
  console.log('server has started on port 5000');
});