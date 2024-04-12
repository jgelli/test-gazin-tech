BACKEND_CONTAINER = backend


backend-db-push:
	docker-compose exec $(BACKEND_CONTAINER) npx prisma db push

backend-db-migrate:
	docker-compose exec $(BACKEND_CONTAINER) npx prisma migrate dev

backend-db-generate:
	docker-compose exec $(BACKEND_CONTAINER) npx prisma migrate dev --create-only

backend-prisma-up: 
	docker-compose exec $(BACKEND_CONTAINER) yarn generate
	docker-compose exec $(BACKEND_CONTAINER) yarn migrate
	docker-compose exec $(BACKEND_CONTAINER) yarn deploy

backend-test:
	docker-compose exec $(BACKEND_CONTAINER) yarn test