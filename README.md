# Lets Ride Kids (Carpool)

## Prerequisites

- [Node.js > 16](https://nodejs.org)
- [Watchman](https://facebook.github.io/watchman)
- [Xcode 14](https://developer.apple.com/xcode)
- [Cocoapods 1.11.3](https://cocoapods.org)
- [JDK > 12](https://www.oracle.com/in/java/technologies/javase/jdk12-archive-downloads.html)
- [Android Studio and Android SDK](https://developer.android.com/studio)
- NDK Version > 23.1.7779620

## Base dependencies

- [axios](https://github.com/axios/axios) for networking.
- [react-navigation](https://reactnavigation.org/) navigation library.
- [redux](https://redux.js.org/) for state management.
- [redux-persist](https://github.com/rt2zz/redux-persist) as persistance layer.
- [redux-thunk](https://github.com/gaearon/redux-thunk) to dispatch asynchronous actions.

## Folder structure

This template follows a very simple project structure:

- `App.js`: Main component that starts your whole app.
- `index.js`: Entry point of your application as per React-Native standards.

- `src`: It is the main place where you store all the code for your application.
  - `assets`: Asset folder to store all fonts, images, vectors, etc.
    - `Fonts`: Store all your fonts here.
    - `Images`: Store all images, vectors, etc.
    - `assets.path.js`: This file contains the paths to all images.
  - `components`: Folder to store any common component that you use through your app (such as a generic button)
  - `constants`: Folder to store any kind of constant that you have.
  - `Localization`: Folder to store the languages files.
  - `redux`: Folder that contains all your application redux.
    - `actions`: This folder contains all actions that can be dispatched to redux.
    - `controllers`: The api collection and network request handlers are contained in this folder.
    - `reducers`: This folder should have all your reducers, and expose the combined result using its `Root.Reducers.js`
    - `selectors`: Folder to store your selectors for each reducer.
    - `storage`: Folder that contains the application storage logic.
    - `store`: Folder to put all redux middlewares and the store.
  - `routes`: Folder to store the navigators.
  - `screens`: Folder that contains all your application screens/features.
    - `Screen`: Each screen should be stored inside its folder and inside it a file for its code and a separate one for the styles.
        - `Screen.js`
        - `Screen.Styles.js`
  - `theme`: Folder to store all the styling concerns related to the application theme.
    - `Fonts.js`: This file contains the paths to all Fonts.
  - `utils`: Folder to store application utilities and components.
    - `Validations`

## How To Use
  - git clone git@bitbucket.org:RnF-Technologies/carpool-mobile.git
  - cd carpool-mobile
  - npm run clean
  - npm start (The project will be started for both platforms.)

  
## Possible Error
  
  ### Error 1
   - Error: spawn ./gradlew EACCES at Process (if you got this error use this command in root project files)
      ```
      chmod 755 android/gradlew
      ```
  
  ### Error 2
   - Open root folder blindspotsmobileapp > android > open local.properties > copy and paste below lines after `sdk.dir`
   - ndk.dir=/Users/yourusername/Library/Android/sdk/ndk/23.1.7779620 (23.1.7779620 this version should be present in your ndk folder)
     ```
      > Task :realm:stripDebugDebugSymbols FAILED
     ```

### #happycoingps