const express = require('express')   /* script para testar se o express esta rodando */
const bodyParser = require('body-parser')

const userRoute = require ('./routes/userRoute')/* Importar Rota*/


const app = express()  /* express é uma funçao */
const port = 3000   /* Porta onde sera rodada a aplicação */

app.use(bodyParser.urlencoded({extended:false}))

userRoute(app)

app.get('/', (req, res) => res.send ('Olá mundo pelo Express!!'))/* Metodo http para teste*/

app.listen(port, () => console.log ('Api rodando na porta 3000') ) /* Função calbak aviso quando a api esta pronta.*/
