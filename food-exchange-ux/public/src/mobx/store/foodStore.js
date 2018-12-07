import { observable, action } from 'mobx';
import { searchApi } from '../../api';


class FoodStore {

  @observable exhistingCustomers = 0;
  @observable newCustomers = 0;
  @observable allOrders = 0;
  @observable cancelledOrders = 0;
  @observable deliveredOrders = 0;
  @observable notDeliveredOrders = 0;
  @observable defaultCalls = true;
  @observable socket;
  @observable selectName="Select Hours"
  @observable currentUser;

  @action async searchData(data) {
    try {
      let result = await searchApi.search(data);
      return result.data;
    } catch(e) {
      console.log(e)
      return e;
    }
  }
}

const foodStore = new FoodStore;

export default foodStore;