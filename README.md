### Para produção execute o commando:

- docker-compose up -d

### Para desenvolvimento execute os commandos:

1. Exclui todos os container

- docker rm $(docker ps -aq) -f

2. Exclui todas as imagens

- docker rmi $(docker images -aq)

3. Rebuilding o projeto

- docker-compose -f docker-compose.dev.yaml up -d --build

4. Opções

- docker exec -it node bash (Acessa o container Node)
- docker exec -it nginx bash (Acessa o container NGINX)
- docker exec -it nginx db (Acessa o container MySQL)
- docker logs nginx -f (Segura o processo para visualizar os logs do NGINX)
- docker logs node -f (Segura o processo para visualizar os logs do Node)
- docker logs db -f (Segura o processo para visualizar os logs do MySQL)
