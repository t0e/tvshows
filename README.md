# TV Shows Application

## Prerequisites

- [Node.js > 15](https://nodejs.org) and npm (Recommended: Use [nvm](https://github.com/nvm-sh/nvm))
- [Watchman](https://facebook.github.io/watchman)
- [JDK > 11](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)
- [Android Studio and Android SDK](https://developer.android.com/studio)

## Usage

You can start by cloning this repository and you should proceed as with any javascript project:

- Go to your project's root folder and run `npm install`.
- Run `npm run android` to start your application!

(Using yarn: `yarn android`)

## Folder structure

This template follows a very simple project structure:

- `assets`: Asset folder contains images and gif files.
- `components`: Folder that contains generic components that are used through the app
  - `loading.tsx`
  - `movieItem.tsx`
  - `movieList.tsx`
  - `searchBox.tsx`
- `screens`: Folder that contains all the application screens.
  - `Home.tsx`
  - `ShowDetail.tsx`
- `redux`: Folder that contains redux store and reducer.
  - `store.tsx`
  - `movies.tsx`
- `App.tsx`: Main component that starts the whole app.
- `index.js`: Entry point of the application as per React-Native standards.

## Generate production version

These are the steps to generate `.apk`, `.aab` and `.ipa` files

### Android

1. Generate an upload key
2. Setting up gradle variables
3. Go to the android folder
4. Execute `./gradlew bundleRelease`

For more info please go to https://reactnative.dev/docs/signed-apk-android
