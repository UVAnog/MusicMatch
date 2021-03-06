import React from "react";
import {
  StyleSheet,
  Alert,
  View,
  Text,
  Image,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import "firebase/firestore";
import firebase from "firebase";
import * as Facebook from "expo-facebook";
import Expo from "expo";
import { AuthSession } from "expo";

class SignUpScreen extends React.Component {
  state = {
    displayName: "",
    email: "",
    password: "",
    errorMessage: "",
    loading: false,
  };
  // componentDidMount() {
  //   let redirectUrl = AuthSession.getRedirectUrl();
  //   console.log(redirectUrl);
  // }
  onLoginSuccess() {
    this.props.navigation.navigate("App");
  }
  onLoginFailure(errorMessage) {
    this.setState({ error: errorMessage, loading: false });
  }
  renderLoading() {
    if (this.state.loading) {
      return (
        <View>
          <ActivityIndicator size={"large"} />
        </View>
      );
    }
  }
  async signInWithEmail() {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(this.onLoginSuccess.bind(this))
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode == "auth/weak-password") {
          this.onLoginFailure.bind(this)("Weak Password!");
        } else {
          this.onLoginFailure.bind(this)(errorMessage);
        }
      });
  }
  async signInWithFacebook() {
    try {
      //Seed documentation on course site at mobileappdev.teachable.com
      //For default user names and passwords.
      await Facebook.initializeAsync("184462529575747");
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile"],
      });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAvoidingView style={styles.container} behavior="padding">
            <Image
              style={styles.tinyLogo}
              source={require("../assets/logo.png")}
            />
            <Text style={{ fontSize: 32, fontWeight: "700", color: "black" }}>
              Music Match
            </Text>
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor="#B1B1B1"
                returnKeyType="next"
                textContentType="name"
                value={this.state.displayName}
                onChangeText={(displayName) => this.setState({ displayName })}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#B1B1B1"
                returnKeyType="next"
                keyboardType="email-address"
                textContentType="emailAddress"
                value={this.state.email}
                onChangeText={(email) => this.setState({ email })}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#B1B1B1"
                returnKeyType="done"
                textContentType="newPassword"
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={(password) => this.setState({ password })}
              />
            </View>
            {this.renderLoading()}
            <Text
              style={{
                fontSize: 18,
                textAlign: "center",
                color: "red",
                width: "80%",
              }}
            >
              {this.state.error}
            </Text>
            <TouchableOpacity
              style={{ width: "86%", marginTop: 10 }}
              onPress={() => this.signInWithEmail()}
            >
              <View style={styles.signUpButton}>
                <Text
                  style={{
                    fontSize: 16,
                    letterSpacing: 0.5,
                    color: "#000000",
                  }}
                >
                  Sign Up
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ width: "86%", marginTop: 10 }}
              onPress={() => this.signInWithFacebook()}
            >
              <View style={styles.button}>
                <Text
                  style={{
                    letterSpacing: 0.5,
                    fontSize: 16,
                    color: "#000000",
                  }}
                >
                  Continue with Facebook
                </Text>
              </View>
            </TouchableOpacity>
            <View style={{ marginTop: 10 }}>
              <Text
                style={{ fontWeight: "200", fontSize: 17, textAlign: "center" }}
                onPress={() => {
                  this.props.navigation.navigate("SignIn");
                }}
              >
                Already have an account?
              </Text>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "86%",
    marginTop: 15,
  },
  logo: {
    marginTop: 20,
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },
  button: {
    backgroundColor: "#9DFEB7",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    marginBottom: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  signUpButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  tinyLogo: {
    width: 100,
    height: 100,
    flexDirection: "column",
    justifyContent: "space-around",
  },
});
export default SignUpScreen;
