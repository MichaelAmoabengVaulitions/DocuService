import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet } from "react-native";
//@ts-ignore
import Ionicons from "@expo/vector-icons/Ionicons";
import { StackScreenProps } from "@react-navigation/stack";
import { Colors } from "@/constants/Colors";
import Wrapper from "@/components/Wrapper";
import Button from "@/components/Button";
import { emailValid, isEmpty, passwordValid } from "@/utils/validation";
import Box from "@/components/Box";
import TemplateText from "@/components/TemplateText";
import Error from "@/components/Error";
import TemplateTextInput from "@/components/TemplateTextInput";
import { LOGIN } from "@/navigation/screenNames";
import { SCREEN_WIDTH, WRAPPER_MARGIN } from "@/constants/Layout";
import { AuthStackParamList } from "@/navigation/auth/AuthStack";

const CREATOR_PLACEHOLDER = "Your Name";
const BRAND_PLACEHOLDER = "Your Brand Name";

type RootStackParamList = {
  SignUpEmailScreen:
    | {
        type?: string;
        email?: string;
      }
    | undefined;
  Login: undefined;
};

type SignUpEmailScreen = StackScreenProps<
  AuthStackParamList,
  "SignUpEmailScreen"
>;

const SignUpEmailScreen: React.FC<SignUpEmailScreen> = ({
  navigation,
  route,
}) => {
  const type = route.params?.type;
  const userEmail = route.params?.email;

  const isCreator = type === "creator";

  const namePlaceholder = useMemo(() => {
    if (!type) {
      return CREATOR_PLACEHOLDER;
    }
    return isCreator ? CREATOR_PLACEHOLDER : BRAND_PLACEHOLDER;
  }, [type, isCreator]);

  const [name, setName] = useState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState(userEmail);

  const [password, setPassword] = useState();

  const [emailTouched, setEmailTouched] = useState(false);

  const [passwordTouched, setPasswordTouched] = useState(false);

  const [firstNameTouched, setFirstNameTouched] = useState(false);
  const [lastNameTouched, setLastNameTouched] = useState(false);

  const [error, setError] = useState<null | string>();

  const showEmailError = useMemo(
    () => emailTouched && !emailValid(email),
    [email, emailTouched]
  );

  const showPasswordError = useMemo(
    () => passwordTouched && !passwordValid(password),
    [password, passwordTouched]
  );

  const showFirstNameError = useMemo(
    () => firstNameTouched && isEmpty(firstName),
    [firstName, firstNameTouched]
  );
  const showLastNameError = useMemo(
    () => lastNameTouched && isEmpty(lastName),
    [lastName, lastNameTouched]
  );

  const [loading, setLoading] = useState(false);

  const [passwordVisible, setPasswordVisible] = useState(false);

  const disabled = useMemo(
    () =>
      !emailValid(email) ||
      !passwordValid(password) ||
      isEmpty(firstName) ||
      isEmpty(lastName) ||
      loading ||
      !!error,
    [email, password, name, loading, error]
  );

  useEffect(() => {
    setError(null);
  }, []);

  const handleSignUp = async () => {
    setLoading(true);
    // try {
    //   await AsyncStorage.setItem("@userType", namePlaceholder);
    //   const response = await auth().createUserWithEmailAndPassword(
    //     email,
    //     password
    //   );

    //   if (response?.user) {
    //     if (isCreator) {
    //       await createCreatorProfile(name, response?.user);
    //     } else {
    //       await createBrandProfile(name, response?.user);
    //     }
    //   }
    // } catch (e) {
    //   if (e.code === "auth/email-already-in-use") {
    //     setError("That email address is already in use!");
    //   }

    //   if (e.code === "auth/invalid-email") {
    //     setPassword("That email address is invalid!");
    //   }
    //   setLoading(false);
    // }
    setLoading(false);
  };

  return (
    <Box flex backgroundColor={Colors.BLACK}>
      <Wrapper
        contentContainerStyle={styles.contentContainerStyle}
        style={styles.container}
        showsVerticalScrollIndicator={false}
        keyboard
      >
        <Box flex mt={100}>
          <Box mb={24} center>
            <TemplateText size={24} semiBold color={Colors.WHITE} mb={8}>
              Complete your account
            </TemplateText>
            <TemplateText size={14} color={Colors.WHITE_60}>
              Sign up to finish creating your profile.
            </TemplateText>
          </Box>

          <Box mb={24}>
            <TemplateText color={Colors.WHITE} mb={8} medium size={14}>
              Email
            </TemplateText>

            <TemplateTextInput
              placeholder="Enter your email address"
              value={email}
              style={[showEmailError && styles.error]}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
              onBlur={() => setEmailTouched(true)}
              autoCapitalize="none"
            />
            <Error show={showEmailError}>Please enter a valid email</Error>
          </Box>
          <Box mb={24}>
            <TemplateText color={Colors.WHITE} mb={8} medium size={14}>
              First Name
            </TemplateText>
            <TemplateTextInput
              placeholder="Enter your first name"
              style={[showFirstNameError && styles.error]}
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
              onBlur={() => setFirstNameTouched(true)}
            />
            <Error show={showFirstNameError}>Please enter a valid name</Error>
          </Box>

          <Box mb={24}>
            <TemplateText color={Colors.WHITE} mb={8} medium size={14}>
              Last Name
            </TemplateText>

            <TemplateTextInput
              placeholder="Enter your last name"
              style={[showLastNameError && styles.error]}
              value={lastName}
              onChangeText={(text) => setLastName(text)}
              onBlur={() => setLastNameTouched(true)}
            />
            <Error show={showLastNameError}>Please enter a valid name</Error>
          </Box>

          <Box mb={24}>
            <TemplateText color={Colors.WHITE} mb={8} medium size={14}>
              Password
            </TemplateText>
            <Box>
              <TemplateTextInput
                placeholder="Create a password"
                style={[showPasswordError && styles.error]}
                value={password}
                onChangeText={(text) => setPassword(text)}
                onBlur={() => setPasswordTouched(true)}
                secureTextEntry={!passwordVisible}
                autoCapitalize="none"
              />

              <Box
                absolute
                zIndex={99}
                right={16}
                height="100%"
                center
                onPress={() => setPasswordVisible((prevState) => !prevState)}
              >
                <Ionicons
                  name={passwordVisible ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color={Colors.WHITE}
                  family="Ionicons"
                />
              </Box>
            </Box>
            <Error show={showPasswordError}>
              Please enter a valid password
            </Error>
          </Box>
          <Error show={!!error} style={styles.generalError}>
            {error}
          </Error>

          <Button
            title="Continue with Email"
            onPress={handleSignUp}
            loading={loading}
            disabled={disabled}
            style={{ marginTop: 40, marginBottom: 24, alignSelf: "center" }}
          />

          <Box
            row
            justifyContent="center"
            mv={24}
            onPress={() => navigation.navigate(LOGIN)}
          >
            <TemplateText color={Colors.WHITE_60} size={14}>
              Already have an account?{" "}
            </TemplateText>
            <TemplateText color={Colors.WHITE} size={14}>
              Login
            </TemplateText>
          </Box>
        </Box>
        <Box
          alignItems="center"
          selfCenter
          onPress={() => {
            // if (mainDomain) {
            //   navigation.navigate(WEBVIEW, {
            //     url: mainDomain,
            //   });
            // }
          }}
        >
          <TemplateText size={12} color="#71717A">
            By signing up you agree to our{" "}
            <TemplateText color={Colors.WHITE} bold size={12}>
              Terms
            </TemplateText>
          </TemplateText>
          <TemplateText size={12} color={Colors.WHITE} bold>
            and Conditions of Use
          </TemplateText>
        </Box>
      </Wrapper>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  contentContainerStyle: {},
  logo: {
    alignSelf: "center",
  },
  buttonContainer: {
    alignSelf: "center",
    marginBottom: 20,
  },
  button: {
    marginTop: 24,
  },
  loginText: {
    marginTop: WRAPPER_MARGIN,
  },
  signupLink: {
    marginTop: 16,
  },
  title: {},
  input: {
    height: 60,
    width: SCREEN_WIDTH - 32,
    borderRadius: 8,
    paddingLeft: 16,
    marginTop: 16,
    borderColor: Colors.BLACK_10,
    backgroundColor: Colors.WHITE_60,
  },
  error: {
    borderColor: Colors.ERROR_RED,
  },
  generalError: {
    marginVertical: 10,
    alignSelf: "center",
  },
  passwordIcon: {
    bottom: 20,
    right: 20,
    position: "absolute",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
export default SignUpEmailScreen;
