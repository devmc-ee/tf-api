up-build:
	docker-compose  --env-file ./.env.dev -f ./docker-compose.yml up --build --force-recreate --remove-orphans
up-clear-build:
	make clear
	docker-compose  --env-file ./.env.dev -f ./docker-compose.yml up --build --force-recreate --remove-orphans	
up-build-prod:
	-docker network create auth-prod
	docker-compose  --env-file ./.env.prod -f ./docker-compose.prod.yml up --build --force-recreate --remove-orphans
up:
	docker-compose --env-file ./.env.dev -f ./docker-compose.yml up

up-prod:
	docker-compose -f ./docker-compose-prod.yml up
down:
	docker-compose down --remove-orphans

clear: 
	-mkdir .mongo_db 
	-mkdir node_modules
	-docker volume rm tf_api_app
	-docker volume rm tf_api_mongo_db
	-docker volume rm tf_api_node_modules

up-test-build:
	-docker network create tf_api_test
	docker container prune -f
	docker volume prune -f
	-docker volume rm tf-api_app_test
	-docker volume rm tf-api_node_modules_test
	-docker network create tf-api_test
	docker-compose  --env-file ./.env.test -f ./docker-compose.test.yml up --build --force-recreate --remove-orphans

tests:
	docker exec -it tf_api_test npx mocha -r ts-node/register test/**/*.test.ts --timeout=5000  --recursive --exit