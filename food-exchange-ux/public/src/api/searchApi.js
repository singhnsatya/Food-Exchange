import axios from 'axios';

axios.defaults.baseURL = "http://ec2-3-16-217-186.us-east-2.compute.amazonaws.com/api";

const searchAPi = {
  async search(data) {
    let endpoint = `/search?startDate=${data.startDate}&endDate=${data.endDate}&hour=${data.hour}`;
    return await axios.get(endpoint);
  }
}

export default searchAPi;