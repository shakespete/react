class AppState {
 
  counter = 0;

  // This property stores the reference to the single instance of AppState.
  private static instanceRef: AppState;

  // A private constructor prevents using the new operator with AppState.
  private constructor() { }

  // This is the only method to get an instance of AppState.
  static getInstance(): AppState {
    // Instantiates the AppState object if it doesn’t exist yet
    if (AppState.instanceRef === undefined) {
      AppState.instanceRef = new AppState();
    }

    return AppState.instanceRef;
  }
}

// const appState = new AppState(); // error because of the private constructor

const appState1 = AppState.getInstance();
const appState2 = AppState.getInstance();

appState1.counter++;
appState1.counter++;
appState2.counter++;
appState2.counter++;

console.log(appState1.counter);
console.log(appState2.counter);