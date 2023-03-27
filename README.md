
# TimeTraveller

TimeTraveller is a state management library that provides undo, redo, delete, and jump-to-state functionality. It's designed for both plain JavaScript and React applications. The library uses [fast-json-patch](https://www.npmjs.com/package/fast-json-patch) to store state differences and allows state tagging for filtering purposes.

## Design Architecture

The Time Traveller library is designed to be efficient and easy to use. It consists of the following main components:

1. **TimeTraveller**: A utility module responsible for managing state history with undo, redo, jumpTo, delete, and filterStates functionality.

2. **TimeTravellerProvider**: A React context provider that wraps your application, providing access to the TimeTraveller utility and additional functions like subscribe, unsubscribe, notify, link, and unlink. This provider optimizes performance by only re-rendering components affected by state changes using a pub-sub pattern.

3. **useTimeTraveller**: A custom React hook that provides access to the TimeTraveller context.

4. **useTimeTravellerState**: A custom React hook to manage local component state with TimeTraveller.

5. **useTimeTravellerGlobalState**: A custom React hook to manage global state with TimeTraveller, allowing you to link and sync local component state with global state.

The library uses a pub-sub pattern to notify only the linked components about state changes, so only the components affected by the state change will be re-rendered, improving the performance of your application.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## Installation

Install the library using npm:

```bash
npm install time-traveller
``


