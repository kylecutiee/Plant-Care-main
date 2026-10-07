# Plant Care - Basic Expo Go Study Project

This version is intentionally simple for learning React Native.

## Folder structure

```text
Plant-Care-Expo-Go-Basic/
├── App.js
├── app.json
├── package.json
│
├── components/
│   ├── Button/
│   │   └── CustomButton.js
│   ├── TextInputField/
│   │   └── TextInputField.js
│   ├── PlantCard/
│   │   └── PlantCard.js
│   └── Header/
│       └── Header.js
│
├── navigation/
│   └── AppNavigation.js
│
├── screens/
│   ├── Login/
│   │   └── LoginScreen.js
│   ├── Home/
│   │   └── HomeScreen.js
│   └── Profile/
│       └── ProfileScreen.js
│
└── styles/
    └── colors.js
```

## Main concepts

### 1. Components
Reusable UI is placed in `components/`.

Example:

```js
<CustomButton title="Sign In" onPress={() => navigate("Home")} />
```

### 2. Basic navigation

`navigation/AppNavigation.js` uses React state:

```js
const [screen, setScreen] = useState("Login");

function navigate(screenName) {
  setScreen(screenName);
}
```

Then:

```js
{screen === "Login" && <LoginScreen navigate={navigate} />}
{screen === "Home" && <HomeScreen navigate={navigate} />}
{screen === "Profile" && <ProfileScreen navigate={navigate} />}
```

This is intentionally basic navigation so it is easy to understand.

### 3. Flexbox

React Native uses Flexbox for layouts.

Examples:

```js
container: {
  flex: 1,
  justifyContent: "center",
}
```

Horizontal layout:

```js
statsRow: {
  flexDirection: "row",
  justifyContent: "space-between",
}
```

### 4. TextInput

The reusable `TextInputField` component uses:

```js
<TextInput
  value={email}
  onChangeText={setEmail}
/>
```

### 5. Buttons

The reusable `CustomButton` component uses:

```js
<TouchableOpacity onPress={onPress}>
  <Text>{title}</Text>
</TouchableOpacity>
```

## Run with Expo Go

```bash
npm install
npx expo start
```

Scan the QR code using Expo Go.

This project has no backend, database, API, or authentication. It is for learning basic React Native concepts.
