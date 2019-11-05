from flask import Flask, request, send_from_directory
import json
import uuid

app = Flask(__name__, static_url_path='')

@app.route('/')
def index():
  return send_from_directory(app.static_folder, 'form.html')


# Routes for static resources

@app.route('/js/<path:path>')
def send_js(path):
    return send_from_directory('js', path)

@app.route('/css/<path:path>')
def send_css(path):
    return send_from_directory('css', path)


# HTTP actions for assignment 3

@app.route('/users', methods = ['GET'])
def getUsers():
    with open('data.json', 'r') as f:
        d = json.load(f)
        return(d)

@app.route('/user/<user_id>', methods = ['GET'])
def addUser(user_id):
    newId = uuid.uuid4().hex[:6]

    newUser = {
        "id": newId,
        "fullName": request.form.get("fullName"),
        "major": request.form.get("major"),
        "startYear": int(request.form.get("startYear"))
    }

    with open('data.json', 'r') as f:
        d = json.load(f)
        d["records"].push(newUser)
        print(d)
        return(d)
    pass
    
@app.route('/user/<user_id>', methods = ['GET'])
def deleteUser(user_id):
    pass



@app.route('/hello/')
@app.route('/hello/<name>')
def hello(name="tell me your name"):
  return "Hello, " + name + "!"

if __name__ == '__main__':
      app.run(host='0.0.0.0', port=8081)
      

'''
 docker image build -t assignment3 .
 docker run -d -p 27017:27017 -p 8081:8081 assignment3
'''