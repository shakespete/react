# TypeScript

## Types


<p align="center">
  <img src="https://github.com/shakespete/react/blob/dev/TS/images/type_hierarchy.png" width="700" height="auto">
</p>

### Objects

```
let a: {
  b: number
  c?: string
  [key: number]: boolean
}
```

The [key: T]: U syntax is called an **index signature**, and this is the way you tell TypeScript that the given object might contain more keys. The way to read it is, “For this object, all keys of type T must have values of type U.” Index signatures let you safely add more keys to an object, in addition to any keys that you explicitly declared.

There is one rule to keep in mind for index signatures: the index signature key’s type (T) must be assignable to either number or string.2

Also note that you can use any word for the index signature key’s name—it doesn’t have to be key.


---
Sources:
- Programming TypeScript by Boris Cherny
