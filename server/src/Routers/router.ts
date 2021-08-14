const Router = require('express').Router;
const router = Router();
const {register, login} = require('../Controllers/authController');
const {test} = require('../Controllers/apiController');
const {protect} = require('../middleware/auth.middleware');


router.post('/register', register);
router.post('/login', login);

//router.get('/', test);

// router.get('/', async (req: Request, res: Response) => {
//   const getUserPfp = async (puuid: string) => {
//     axios.defaults.headers.common['X-Riot-Token'] = `RGAPI-436f3bd4-883e-42ee-9dde-5eb91d1d7a7a`;
//     axios.defaults.headers.common['Origin'] = `https://developer.riotgames.com`;
//     const {data} = await axios.get(`https://la2.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`, {
//       headers: {
//         'X-Riot-Token': `RGAPI-436f3bd4-883e-42ee-9dde-5eb91d1d7a7a`,
//         'Origin': `https://developer.riotgames.com`
//       }
//     })
//     return data;
//   }
//   res.send(await getUserPfp('j1kGrDp7aTCMi0KHd9ENvEWrt1tk24bM1W93JVKUfOs7691uGQ582IofeldROoMNkv1ugL6rWQdYKw')); 
// })


module.exports = router;