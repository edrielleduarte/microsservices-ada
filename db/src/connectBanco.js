const mongoose = require('mongoose');

class ConnectBanco {
  static async ConnectDB() {
    try {
      console.log('Aguardando conexão com o banco de dados...');
      await mongoose
        .connect(
          `mongodb+srv://<user>:<senha>@<seubanco>.u7oeiqe.mongodb.net/?retryWrites=true&w=majority`,
          {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
          },
        )
        .then(() => console.log('Conectado ao banco de dados'))
        .catch((err) => {
          return err;
        });
    } catch (error) {
      return error;
    }
  }
}

module.exports = ConnectBanco;
