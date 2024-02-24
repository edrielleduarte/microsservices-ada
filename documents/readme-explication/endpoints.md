# Endpoints microsservices ADA

## Api Gateway

Contém as rotas:

GET: /addres-services - rota que faz a busca de um endereço via cep.

    http://localhost:3001/address-service?cep=000000000

POST: /addres - rota que busca um cep e registra um usuário no banco com o endereço que ele busca da api cep

    {
      id": 1,
      "name": "Edrielle",
      "email": "teste@mail.com",
      "cpf": "00000000000",
      "number": "278888888888",
      "cep": "00000000",
      "country": "Brasil",
      "password": "teste1234"
    }

POST: /register-service - essa rota ele vai registrar um usuário no banco e vai notificar no email do mesmo informando o cadastro.

- Colocar email valido para o envio

      {
        "id": 8,
        "name": "Maria Duarte",
        "email": "teste@mail.com",
        "cpf": "090909039090",
        "street": "Rua teste",
        "number": "278888888888",
        "neighborhood": "BUG",
        "city": "Bug",
        "state": "ES",
        "country": "Brasil",
        "password": "teste1234"

      }

POST: /order-service - faz o registro do pedido do usuário, lembrando de passar o mesmo id do register, no id e o user_id do order, aqui ele vai criar outra tabela de pedidos e notificar o usuário por email o pedido feito, por isso é bom passar o id pra realizar a busca do usuário para notificação.

      {
        "id": 8,
        "user_id": 8,
        "description": "BK WHOPPER"
      }

POST: /session - aqui é feito a busca do usuário da cadastrado no banco pelo email e cpf, e ele cria o token jwt.

      {
        "email": "teste@mail.com",
        "password": "teste1234"
      }

POST: /session-validate - aqui é passado no bearer token o token gerado na rota session pra autenticar e liberar a pesquisa por id dos dados do usuário.

    http://localhost:3001/session-validate?id=54
