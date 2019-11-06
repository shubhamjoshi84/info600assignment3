FROM       python:latest
RUN pip install flask

WORKDIR /app
COPY . /app

RUN set -e

RUN export FLASK_ENV=development
RUN export FLASK_APP=server.py

CMD ["python","server.py"]