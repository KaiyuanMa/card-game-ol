import { combineReducers } from "redux";
import cardReducer from "./cardReducer";
import opCardReducer from "./opCardReducer";
import authReducer from "./authReducer";
import friendsReducer from "./friendsReducer";
import unreadMessagesReducer from "./unreadMessagesReducer";
import chatFriendReducer from "./chatFriendReducer";
import popUpReducer from "./popReducer";
import inGameWithReducer from "./inGameWithReducer";

const reducers = combineReducers({
  card: cardReducer,
  opCard: opCardReducer,
  auth: authReducer,
  friends: friendsReducer,
  unreadMessages: unreadMessagesReducer,
  chatFriend: chatFriendReducer,
  popUp: popUpReducer,
  inGameWith: inGameWithReducer,
});

export default reducers;
