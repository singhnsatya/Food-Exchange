import axios from 'axios';

axios.defaults.baseURL = "http://localhost:3000";

const searchAPi = {
  async search(data) {
    let endpoint = `v1/search?startDate=${data.startDate}&endDate=${data.endDate}&hour=${data.hour}`;
    return await axios.get(endpoint);
  }
}

export default searchAPi;