import fastapi

app = fastapi.FastAPI()

@app.get("/")
def root():
    return "You are at the root"

@app.get("/test/get")
def root():
    return "You are at the root"

@app.get("/test/post")
def root():
    return "You are at the root"