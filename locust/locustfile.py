from locust import HttpUser, task, constant_pacing

class PlaylistUser(HttpUser):
    wait_time = constant_pacing(10)
    @task
    def hello_world(self):
        self.client.get("/playlist/01")