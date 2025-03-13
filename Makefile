up:
	docker-compose up

up-prod:
	docker-compose -f docker-compose.prod.yml up

down: 
	docker-compose down

build-local-image:
	docker image build -t container-name .

run-local-image:
	docker run -it -p 3000:3000 --name container-name container-name

stop-local-image:
	docker stop container-name

kubepath:
	export KUBECONFIG=PATH_TO_KUBECONFIG_FILE

kube-deploy:
	kubectl create -f deployment.yml

kube-serve:
	kubectl apply -f service.yml

# Comandos para desarrollo
dev-up:
	docker-compose up

dev-build:
	docker-compose build

dev-restart:
	docker-compose restart express-typescript-boilerplate

dev-logs:
	docker-compose logs -f express-typescript-boilerplate

# Comando para reiniciar completamente el entorno de desarrollo
dev-reset:
	docker-compose down
	docker-compose up --build

# Comando para entrar al contenedor
dev-shell:
	docker-compose exec express-typescript-boilerplate sh
