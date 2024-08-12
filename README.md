# Decorators
Decorators for everyday programming. 

In this library you'll find a collection of useful shorthands for boosting productivity through the stage 3 Decorators API.

## Installation
```
npm i @figliolia/decorators
# or 
yarn add @figliolia/decorators
```

## API - Decoratators

1. [Bound](#bound)
2. [Cache](#cache)
3. [Debounce](#debounce)
4. [Throttle](#throttle)
5. [Unsafe Chainable](#unsafe-chainable)

## API - Generators
1. [Create Method Decorator](#create-method-decorator)
2. [Create Class Decorator](#create-class-decorator)

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

### Log
Logs invokation arguments and return values for a given method as long as the `NODE_ENV` is not `production`

This method will use native colorized logging (in chrome and firefox) when used on the client while falling back to [Chalk]("https://www.npmjs.com/package/chalk") serverside
```typescript
import { log } from "@figliolia/decorators";

class MyClass {
  @log
  public async getData(query: string) {
    return fetch(`/api/data?query=${query}`);
  }
}

const instance = new MyClass();
void instance.getData("searching for something");
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

### Create Method Decorator
A generator accepting a callback returning a new class method decorator
```typescript
import { createMethodDecorator } from "@figliolia/decorators";

const myMethodDecorator = createMethodDecorator((original, context) => {
  return function(this, ...args) {
    // your logic
  }
});
```

Using stricter types
```typescript
import { createMethodDecorator } from "@figliolia/decorators";

const myStrictDecorator = createMethodDecorator<MyClass, MyMethod>((original, context) => {
  return function(this, ...args) {
    // your logic
  }
});
```

### Create Class Decorator
A generator accepting a callback returning a new class decorator
```typescript
import { createClassDecorator } from "@figliolia/decorators";

const myClassDecorator = createClassDecorator((original, context) => {
  return class extends original {
    public newMethod() {
      // Add a method
    }

    public override existingMethod() {
      // override an existing method
    }
  }
});
```

## Stage 3 Decorator Proposal Vs. Experimental Decorators
If you're a typescript developer, the Experimental decorators API (found under the `experimentalDecorators` flag) has likely become familiar to you in recent years. While it's not far from the JavaScript [Stage 3 Proposal](https://github.com/tc39/proposal-decorators), there are significant syntactical mismatches between each decorators implementation that make interoperability impossible.

Therefore, this library will not use TypeScript's experimental implementation, and instead favor JavaScript's Stage 3 Proposal. To read more on the Stage 3 proposal and where it varies from experimental decorators, I'd recommend [this article](https://2ality.com/2022/10/javascript-decorators.html).

### Limitations
Typescipt is limited in it's ability to transform types based on the presence of a decorator. This means, that if you modify argments or a return type in a decorator, Typescript will not know about it (yet). For the time-being (if you're a typescript user), I'd recommend not mutating method or property declarations in your decorators, and instead limit your usage functional transforms that maintain your application's type safety.

### For JavaScript Users
Using this library without a syntax transform will not work any browser or node.js at the time of writing (August 12th, 2024). To ensure your code works smoothly across varying runtimes, check out the [Babel's Transform](https://babeljs.io/blog/2022/09/05/7.19.0#stage-3-decorators-14836) for Stage 3 Decorators.