import cv2, json, time, subprocess
import numpy as np

class CoordinateManager(object):
    # Parameters
    # x - number of pixels of the image on x-axis
    # y - number of pixels of the image of y-axis
    # image_points - four coorindates defining the plane on the image
    # real_world_points - four coorindates defining the virtual plane to map to
    # filename - json file name to be read
    def __init__(self, x, y, image_points, real_world_points, refresh_rate, filename) -> None:
        self.resolution = [x, y]
        self.image_points = image_points
        self.real_world_points = real_world_points
        self.h_matrix = None
        self.refresh_rate = refresh_rate
        self.filename = filename

    def calculate_matrix(self) -> None:
        self.h_matrix, _ = cv2.findHomography(self.image_points, self.real_world_points)

    def image_to_real_world(self, image_point) -> np.array:
        image_point_homogeneous = np.append(image_point, 1)
        real_world_point_homogeneous = np.dot(self.h_matrix, image_point_homogeneous)
        real_world_point = real_world_point_homogeneous / real_world_point_homogeneous[2]
        return real_world_point[:2]
    
    def start_update(self) -> None:
        while True:
            f = open(self.filename)
            try:
                data = json.load(f)
            except Exception:
                continue
            new_data ={}
            for camera in data:
                for person in data[camera]:
                    image_point = np.array(data[camera][person]['box_pos'])
                    coordinate = self.image_to_real_world(image_point)
                    new_data[person] = {}
                    new_data[person]['pos'] = coordinate.tolist()
            print(new_data)
            json_obj = json.dumps(new_data, indent=4)
            with open("result.json", "w") as outfile:
                outfile.write(json_obj)

            time.sleep(self.refresh_rate/1000)

if __name__ == "__main__":
    # Corresponding points in the image (in pixels)
    image_points = np.array([
        [3820, 2483],      # Corresponding point of Point 1 in the image
        [3755, 980],      # Corresponding point of Point 2 in the image
        [2263, 892],      # Corresponding point of Point 3 in the image
        [0, 1530]       # Corresponding point of Point 4 in the image
    ], dtype=np.float32)
    real_world_points = np.array([
        [0, 0],          # Point 1 (0,0)
        [1, 0],        # Point 2 (200,0)
        [1, 1],      # Point 3 (200,300)
        [0, 1]         # Point 4 (0,300)
    ], dtype=np.float32)

    camera1 = CoordinateManager(4000, 3000, image_points, real_world_points, 200, 'example.json')
    camera1.calculate_matrix()
    camera1.start_update()