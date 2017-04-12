import store from './redux';
import * as actions from './redux/actions';

// 打印初始状态
console.log('call test');

// 每次 state 更新时，打印日志
// 注意 subscribe() 返回一个函数用来注销监听器
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

// 发起一系列 action
store.dispatch(actions.move(37));
store.dispatch(actions.move(40));
store.dispatch(actions.move(39));
store.dispatch(actions.initOrReset());

// 停止监听 state 更新
unsubscribe();

export default store;