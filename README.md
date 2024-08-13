# Decorators
Decorators for everyday programming. 

In this library you'll find a collection of useful shorthands for boosting productivity through the stage 3 Decorators API.

## Installation
```
npm i @figliolia/decorators
# or 
yarn add @figliolia/decorators
```

## API

1. [Bound](#bound)
2. [Cache](#cache)
3. [Debounce](#debounce)
4. [Throttle](#throttle)
5. [Animation Frame](#animation-frame)
6. [Log Browser](#log-browser)
7. [Log Server](#log-server)
8. [Measure Browser](#measure-browser)
9. [Measure Server](#measure-server)
10. [Unsafe Chainable](#unsafe-chainable)

### Bound
Implicitely bind class methods to their instances
```typescript
import { bound } from "@figliolia/decorators";

class MyClass {
  private someField = "value";

  @bound
  public someMethod() {
    return this.someField;
  }
}

const { someMethod } = new MyClass();
// Works
someMethod();
```

### Cache
Cache previous calls to a given method
```typescript
import { cache } from "@figliolia/decorators";

class MyClass {
  @cache
  public expensive(x: number, y: number) {
    // Compute expensive value
  }
}

const instance = new MyClass();
// computes on first execution
instance.expensive(1, 2);
// reads from cache then onwards as long as arguments match
instance.expensive(1, 2);
```

### Debounce
Debounces calls to a given method for a pre-determined duration
```typescript
import { debounce } from "@figliolia/decorators";

class MyClass {
  @debounce(300)
  public getData(query: string) {
    void fetch(`/api/data?query=${query}`);
  }
}

const instance = new MyClass();
// Invokes 300ms following the last call
void instance.getData("searching for something");
```

### Throttle
Throttles calls to a given method for a pre-determined duration
```typescript
import { throttle } from "@figliolia/decorators";

class MyClass {
  @throttle(300)
  public getData(query: string) {
    void fetch(`/api/data?query=${query}`);
  }
}

const instance = new MyClass();
// Invokes immediately, then disables later calls for 300ms
void instance.getData("searching for something");
```

### Animation Frame
Invokes the target method using calls to `requestAnimationFrame`
```typescript
import { animationFrame } from "@figliolia/decorators";

class MyClass {
  node: HTMLElement;
  constructor(ID: string) {
    this.node = document.getElementById(ID);
  }

  @animationFrame
  public animate() {
    const { translate } = this.node.style;
    const current = parseInt(translate.slice(0, -2));
    if(current === 100) {
      return;
    }
    this.node.style.translate = `${current + 1}px`;
    this.animate()
  }
}

const instance = new MyClass("elementID");
// animates an element's translateX property
instance.animate();
```

### Log Browser
Logs invokation arguments and return values for a given method as long as the `NODE_ENV` is not `production`

This method will use native colorized logging (in chrome and firefox)
```typescript
import { logBrowser } from "@figliolia/decorators";

class MyClass {
  @logBrowser
  public async getData(query: string) {
    return fetch(`/api/data?query=${query}`);
  }
}

const instance = new MyClass();
void instance.getData("searching for something");
```

### Log Server
Logs invokation arguments and return values for a given method as long as the `NODE_ENV` is not `production`

This method will use [Chalk]("https://www.npmjs.com/package/chalk") for colorized logging
```typescript
import { logServer } from "@figliolia/decorators";

class MyClass {
  @logServer
  public async getData(query: string) {
    return fetch(`/api/data?query=${query}`);
  }
}

const instance = new MyClass();
void instance.getData("searching for something");
```

### Measure Browser
Logs the duration occupied by the target method at runtime
```typescript
import { measureBrowser } from "@figliolia/decorators";

class MyClass {
  @measureBrowser
  public expensive() {
    for(let i = 0; i < 1_000_000; i++) {

    }
  }
}

const instance = new MyClass();
instance.expensive();
```

### Measure Server
Logs the duration occupied by the target method at runtime
```typescript
import { measureServer } from "@figliolia/decorators";

class MyClass {
  @measureServer
  public expensive() {
    for(let i = 0; i < 1_000_000; i++) {

    }
  }
}

const instance = new MyClass();
instance.expensive();
```

### Unsafe Chainable
Overrides the return type of a given method, replacing it with the class instance
```typescript
import { chainable } from "@figliolia/decorators";

class MyClass {
  @chainable
  public async method1() {
    
  }
  @chainable
  public async method2() {
    
  }
}

const instance = new MyClass().method1().method(2);
// instance = MyClass
```

## Stage 3 Decorator Proposal Vs. Experimental Decorators
If you're a typescript developer, the Experimental decorators API (found under the `experimentalDecorators` flag) has likely become familiar to you in recent years. While it's not far from the JavaScript [Stage 3 Proposal](https://github.com/tc39/proposal-decorators), there are significant syntactical mismatches between each decorators implementation that make interoperability impossible.

Therefore, this library will not use TypeScript's experimental implementation, and instead favor JavaScript's Stage 3 Proposal. To read more on the Stage 3 proposal and where it varies from experimental decorators, I'd recommend [this article](https://2ality.com/2022/10/javascript-decorators.html).

### Limitations
Typescipt is limited in it's ability to transform types based on the presence of a decorator. This means, that if you modify argments or a return type in a decorator, Typescript will not know about it (yet). For the time-being (if you're a typescript user), I'd recommend not mutating method or property declarations in your decorators, and instead limit your usage functional transforms that maintain your application's type safety.

### For JavaScript Users
Using this library without a syntax transform will not work any browser or node.js at the time of writing (August 12th, 2024). To ensure your code works smoothly across varying runtimes, check out the [Babel's Transform](https://babeljs.io/blog/2022/09/05/7.19.0#stage-3-decorators-14836) for Stage 3 Decorators.