from locust import HttpUser, task

class PlaylistUser(HttpUser):
    @task
    def hello_world(self):
        self.client.get("/playlist/01")