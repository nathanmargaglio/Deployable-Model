# Deploying a Model

This repo [train a neural network on MNIST with Keras](https://www.tensorflow.org/datasets/keras_example), [create a Flask app to serve it](https://towardsdatascience.com/deploying-deep-learning-models-using-tensorflow-serving-with-docker-and-flask-3b9a76ffbbda), then [containerise and deploy the app onto Heroku](https://medium.com/@ksashok/containerise-your-python-flask-using-docker-and-deploy-it-onto-heroku-a0b48d025e43).

## Setup the Environment

- `python3 -m venv venv`
- `source venv/bin/activate`
- `pip install --upgrade pip && pip install flask tensorflow`
- `pip freeze > requirements.txt`

## Train the Model

- `python3 ./train.py`

## Deploy to Heroku

- `heroku container:push web --app <app-name>`
- `heroku container:release web --app <app-name>`

