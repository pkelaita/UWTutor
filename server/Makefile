.PHONY: bootstrap clean lint test
.DEFAULT_GOAL := test

test: clean lint
	@python -m pytest tests/ --cov=./ -p no:cacheprovider -W ignore::DeprecationWarning

lint:
	@flake8 .

clean:
	@find . -type f -name '*.pyc' -delete

bootstrap:
	@python -m pip install -r requirements.txt
	@python -m pip install -r requirements-test.txt