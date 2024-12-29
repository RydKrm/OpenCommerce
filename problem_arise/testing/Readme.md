### Fetching problem while testing

- 1 - While testing in the index.ts file app.listen() function need to be commented out
- 2 - prisma connection need but disconnect function needs to be commented out
- 3 - jest not recongine the `@/author` alise import so jest.config.ts file need to added this line

```javascript
moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
```
