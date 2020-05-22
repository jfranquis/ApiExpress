const fs = require('fs')  /* modulo nativo no nodejs, lidar com arquivos de sistema*/
const { join } = require('path')/*opções para lidar com a pasta de arquivos.*/


const filePath = join(__dirname, 'users.json') /* caminho para arquivo json para simular a interação com banco de dados*/

const getUsers = ( ) => {/* criar metodo simples para buscar e salvar usuarios do arquivo */
  const data = fs.existsSync(filePath) /*veririfcar se o arquivos existe */
    ? fs.readFileSync(filePath) /* se ele existir */
    : [] /*se não existir retonar um objeto vazio */

  try {
    return JSON.parse(data)
  } catch (error) {
    return []
  }
}

const saveUser = (users) => fs.writeFileSync(filePath, JSON.stringify(users, null, '\t'))  /* Salvar e recerber os dados do usuario, adicionar objeto e tabulação de dados */

const userRoute = (app) => {/* criar função*/
  app.route('/users/:id?')
    .get((req, res) => {
      const users = getUsers()

      res.send({ users })
    })
    .post ((req, res) => {
        const users = getUsers()


        users.push(req.body) 
        saveUser(users)

        res.status(201).send('OK')

    })
    .put((req, res)=> {
      const users = getUsers()

    saveUser(users.map(user => {
      if (user.id === req.params.id) {
        return {
          ...user,
          ...req.body
        }
      }
      return user
    }))
    res.status(200).send('OK')
    })
    .delete((req, res) => {
      const users = getUsers()

      saveUser(users.filter(user => user.id !== req.params.id))

      res.status(200).send('OK')
    })
}
module.exports = userRoute

