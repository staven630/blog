### Partial\<T>

&emsp;&emsp;将 T 中所有属性的类型设置为可选属性。返回的类型可以是 T 的任意子集。

> 源码：

```ts
type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

> 示例:

```ts
interface Todo {
  title: string;
  description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}

const todo1 = {
  title: "organize desk",
  description: "clear clutter",
};

const todo2 = updateTodo(todo1, {
  description: "throw out trash",
});
```

### Required\<T>

&emsp;&emsp;将 T 中所有属性的类型设置为必选属性。与 Partial 相对。

> 源码：

```ts
type Required<T> = {
  [P in keyof T]-?: T[P];
};
```

> 示例：

```ts
interface Props {
  a?: number;
  b?: number;
}

const obj: Props = { a: 5 };
// Property 'b' is missing in type '{ a: number; }' but required in type 'Required<Props>'.
const obj2: Required<Props> = { a: 5 };
```

## Readonly\<T>

&emsp;&emsp;将 T 中所有属性设置为只读。

> 源码：

```ts
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

> 示例：

```ts
interface Todo {
  title: string;
}

const todo: Readonly<Todo> = {
  title: "Delete inactive users",
};

// Cannot assign to 'title' because it is a read-only property.
todo.title = "Hello";
```

### Record\<K, T>

&emsp;&emsp;构造一个类型，该类型具有一组属性 K，每个属性的类型为 T。可用于将一个类型的属性映射为另一个类型。

> 源码：

```ts
type Record<K extends keyof any, T> = {
  [P in K]: T;
};
```

> 示例：

```ts
interface CatInfo {
  age: number;
  breed: string;
}

type CatName = "miffy" | "boris" | "mordred";

const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: "Persian" },
  boris: { age: 10, breed: "Persian" },
  mordred: { age: 10, breed: "Persian" },
};

cats.boris;
```

### Pick\<Type, Keys>

&emsp;&emsp;通过在 T 中抽取一组属性 K 构建一个新类型。

> 源码：

```ts
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

> 示例：

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Pick<Todo, "title" | "completed">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};

todo;
```

- [piotrwitek/utility-types](https://github.com/piotrwitek/utility-types)
