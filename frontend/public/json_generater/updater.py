import json, time

class Updater(object):
    # Parameters
    # x - number of pixels of the image on x-axis
    # y - number of pixels of the image of y-axis
    # refresh_rate - time in milliseconds to update the json file
    def __init__(self, x, y, refresh_rate, camera_id="0-0-0") -> None:
        self.x = x
        self.y = y
        self.walk_time = 5000   # Sample time taken to reach from start to end
        self.refresh_rate = refresh_rate
        self.camera_id = camera_id

        self.sample_path = {
            "start": [0.5, 0.6],
            "end": [0.7, 0.5]
        }

        self.sample_data = {
            self.camera_id: {
                "31975151":{
                "box_pos": [0, 0]
                }
            }
        }

    def write_json(self) -> None:
        json_object = json.dumps(self.sample_data, indent=4)
        with open("example.json", "w") as outfile:
            outfile.write(json_object)

    def start_simulation(self) -> None:
        start_pos = [self.x * self.sample_path["start"][0], self.y * self.sample_path["start"][1]]
        end_pos = [self.x * self.sample_path["end"][0], self.y * self.sample_path["end"][1]]

        vector_start_end = [end_pos[0] - start_pos[0], end_pos[1] - start_pos[1]]
        scale_factor = self.refresh_rate / self.walk_time
        current_x, current_y = start_pos[0], start_pos[1]

        vector_inc = [vector_start_end[0] * scale_factor, vector_start_end[1] * scale_factor]

        print("Starting simulation. \nStart pixel: ", start_pos, "\nEnd pixel: ", end_pos)

        while True:
            self.sample_data[self.camera_id]["31975151"]["box_pos"][0] = current_x
            self.sample_data[self.camera_id]["31975151"]["box_pos"][1] = current_y
            
            self.write_json()
            
            time.sleep(self.refresh_rate / 1000)

            current_x += vector_inc[0]
            current_y += vector_inc[1]

            if current_x > end_pos[0] and current_y < end_pos[1]:
                current_x = start_pos[0]
                current_y = start_pos[1]

if __name__ == "__main__":
    updater_obj = Updater(4000, 3000, 200, "3-2-9")
    updater_obj.start_simulation()