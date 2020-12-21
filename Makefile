.PHONY: bootstrap clean lint test
.DEFAULT_GOAL := test

BIN=venv/bin/

test: clean lint
	@$(BIN)python -m pytest tests/ --cov=./ -p no:cacheprovider

lint:
	@flake8 .

clean:
	@find . -type f -name '*.pyc' -delete

bootstrap:
	@$(BIN)pip install -r requirements.txt
	@$(BIN)pip install -r requirements-test.txt