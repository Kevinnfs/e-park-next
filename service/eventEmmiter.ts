type EventListener<T = any> = (...args: T[]) => void;

class EventEmitter {
  private events: { [key: string]: EventListener[] } = {};

  on<T = any>(event: string, listener: EventListener<T>): void {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  emit<T = any>(event: string, ...args: T[]): void {
    if (!this.events[event]) return;
    this.events[event].forEach((listener) => listener(...args));
  }

  off(event: string, listener: EventListener): void {
    if (!this.events[event]) return;
    const index = this.events[event].findIndex((l) => l === listener);
    if (index !== -1) this.events[event].splice(index, 1);
  }
}

export const eventEmitter = new EventEmitter();

// The EventEmitter you've provided is a simple event management system that allows you to add event listeners (on), trigger events (emit), and remove specific event listeners (off).

// Let's walk through how to use this EventEmitter:

//     Subscribing to an event:

// To listen to an event, you use the on method. The first argument is the name of the event, and the second argument is the callback function that will be executed when the event is emitted.

// typescript

// eventEmitter.on('sayHello', (name: string) => {
// });

//     Emitting an event:

// To trigger an event, use the emit method. The first argument is the name of the event, followed by any data or arguments that should be passed to the event listeners.

// typescript

// eventEmitter.emit('sayHello', 'Alice');  // Console logs: Hello, Alice!

//     Unsubscribing from an event:

// If you want to stop listening to an event, you can use the off method. You'll need to provide the exact function reference that you passed to on originally. This means you cannot unsubscribe anonymous functions.

// typescript

// const myListener = (name: string) => {
// };

// eventEmitter.on('sayGoodbye', myListener);
// eventEmitter.emit('sayGoodbye', 'Bob');  // Console logs: Goodbye, Bob!
// eventEmitter.off('sayGoodbye', myListener);
// eventEmitter.emit('sayGoodbye', 'Bob');  // Nothing happens this time

//     Using with more complex data:

// Your emitter supports any type of data. Here's an example with an object:

// typescript

// eventEmitter.on('userInfo', (user: { id: number, name: string }) => {
// });

// eventEmitter.emit('userInfo', { id: 1, name: 'Charlie' });  // Console logs: User ID: 1, User Name: Charlie

// Remember, with the way your emitter is set up, the event data types aren't strictly typed by event name (each event name can accept any type of data). If you want to create stricter typing, that would require further modifications to your EventEmitter class.
