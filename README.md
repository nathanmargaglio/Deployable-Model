# Deploying a Model

This repo [train a neural network on MNIST with Keras](https://www.tensorflow.org/datasets/keras_example), [create a Flask app to serve it](https://towardsdatascience.com/deploying-deep-learning-models-using-tensorflow-serving-with-docker-and-flask-3b9a76ffbbda), then [containerise and deploy the app onto Heroku](https://medium.com/@ksashok/containerise-your-python-flask-using-docker-and-deploy-it-onto-heroku-a0b48d025e43).

## Setup the Environment

We first create a virtual environment, then install the dependencies found in `requirements.txt`.

- `python3 -m venv venv`
- `source venv/bin/activate`
- `pip install --upgrade pip && pip install -r requirements.txt`

## Train the Model

This trains a simple neural network to classify MNIST digits.

`python3 ./train.py`

The model is saved to `mnist/`.  It takes a 28x28 grayscale image as input and returns a vector of length 10 with each value corresponding to the probability of the image representing the number at it's index.

## Build the Flask App

The Flask app is responsible for two things:

1) Serving the static front-end site.
2) Hosting the endpoint which we pass data to for inference.

The Flask app is found at `app.py` and `templates/` and `static/` hold resources for the front-end, which is a simple Vue app we can use to interact with the server.  The site is hosted at `/` and one can POST gray-scale image data to `/infer` to pass the image data to the model for inference.

You can run it locally with `python3 ./app.py` and navigate to `localhost:5000` to test it.

## Deploy to Heroku

The container's configuration is found in `Dockerfile`.  The image is built on the Ubuntu image, where we setup the Python environment, then we install the project's requirements, then copy the model and the code to the container.  The image's entrypoint is `python3 app.py`, which runs the Flask app.

We can build the image and directly deploy to Heroku with the following commands.  You will need Docker and the Heroku CLI installed and authenticated.  

- `heroku container:push web --app <app-name>`
- `heroku container:release web --app <app-name>`

*Note:*  The first time you push the container to Heroku, you will have to push a layer which contains TensorFlow which is ~2GB large.  This can be slow on Heroku, but updates to the image will skip this layer making any following uploads quick.

Once deployed, navigate to `https://<app-name>.herokuapp.com/` (it may take a minute after release for it setup and load).  [Check out the demo](https://deployable-model.herokuapp.com/), which may take a minute to load since free dynos have to wake up after periods of inactivity.
