import { injectable, createContainer, inject, optional } from '..';

test('base di with @injectable', () => {
  @injectable()
  class Foo {
    public get test() {
      return 'test';
    }
  }

  @injectable()
  class Bar {
    public constructor(@inject(Foo) public foo: Foo) {}

    public get test() {
      return this.foo.test;
    }
  }

  const bar = createContainer({
    ServiceIdentifiers: new Map(),
  }).get(Bar);

  expect(bar.test).toBe('test');
});

test('base di without @injectable and @inject without token', () => {
  class Foo {
    public get test() {
      return 'test';
    }
  }

  class Bar {
    public constructor(@inject() public foo: Foo) {}

    public get test() {
      return this.foo.test;
    }
  }

  const bar = createContainer({
    ServiceIdentifiers: new Map(),
    modules: [Bar, Foo],
  }).get(Bar);

  expect(bar.test).toBe('test');
});

test('base di hybrid with @injectable', () => {
  @injectable()
  class Foo {
    public get test() {
      return 'test';
    }
  }

  class Bar {
    public constructor(@inject(Foo) public foo: Foo) {}

    public get test() {
      return this.foo.test;
    }
  }

  const bar = createContainer({
    ServiceIdentifiers: new Map(),
    modules: [Bar, Foo],
  }).get(Bar);

  expect(bar.test).toBe('test');
});

test('base di with @optional, and without setting options', () => {
  @injectable()
  class Foo {
    public get test() {
      return 'test';
    }
  }

  @injectable()
  class Bar {
    public constructor(@optional() public foo: Foo) {}

    public get test() {
      return this.foo && this.foo.test;
    }

    public get value() {
      return 'bar';
    }
  }

  @injectable()
  class FooBar {
    public constructor(public bar: Bar) {}

    public get test() {
      return this.bar.test;
    }

    public get value() {
      return this.bar.value;
    }
  }

  const fooBar = createContainer({
    ServiceIdentifiers: new Map(),
  }).get(FooBar);
  expect(fooBar.test).toBeUndefined();
  expect(fooBar.value).toEqual('bar');
});

test('base di with @optional, and with setting options', () => {
  @injectable()
  class Foo {
    public get test() {
      return 'test';
    }
  }

  @injectable()
  class Bar {
    public constructor(@optional() public foo: Foo) {}

    public get test() {
      return this.foo && this.foo.test;
    }

    public get value() {
      return 'bar';
    }
  }

  @injectable()
  class FooBar {
    public constructor(public bar: Bar) {}

    public get test() {
      return this.bar.test;
    }

    public get value() {
      return this.bar.value;
    }
  }

  const fooBar = createContainer({
    ServiceIdentifiers: new Map(),
    modules: [Foo],
  }).get(FooBar);
  expect(fooBar.test).toEqual('test');
  expect(fooBar.value).toEqual('bar');
});
