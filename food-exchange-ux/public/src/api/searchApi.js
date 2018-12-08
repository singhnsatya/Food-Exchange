import axios from 'axios';

axios.defaults.baseURL = "http://ec2-18-224-73-177.us-east-2.compute.amazonaws.com/api";

const searchAPi = {
  async search(data) {
    let endpoint = `v1/search?startDate=${data.startDate}&endDate=${data.endDate}&hour=${data.hour}`;
    return await axios.get(endpoint);
  }
}

export default searchAPi;