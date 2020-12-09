import { createSwitchNavigator } from "react-navigation";
import LoadingScreen from "./LoadingScreen.js";
import SignUpScreen from "./SignUpScreen.js";
import SignInScreen from "./SignInScreen.js";
import SettingsScreen from "./SettingsScreen.js";

const AuthNavigator = createSwitchNavigator(
  {
    Loading: { screen: LoadingScreen },
    SignUp: { screen: SignUpScreen },
    SignIn: { screen: SignInScreen },
    Settings: { screen: SettingsScreen },
  },
  { initialRouteName: "Loading" }
);
export default AuthNavigator;
