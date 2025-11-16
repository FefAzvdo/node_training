// jest.config.js
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  // Preset para usar TypeScript com Jest
  preset: "ts-jest",

  // Ambiente de execução
  testEnvironment: "node",

  // Onde o Jest deve procurar pelos arquivos de teste
  // Isso garante que ele encontre 'src/tests/health.test.ts'
  testMatch: ["<rootDir>/src/**/*.test.ts"],

  // Mapeamento de Módulos: Traduz os aliases do tsconfig.json para o Jest
  moduleNameMapper: {
    // Mapeia os aliases do tsconfig.json
    "^@config/(.*)$": "<rootDir>/src/config/$1",
    "^@core/(.*)$": "<rootDir>/src/core/$1",
    "^@modules/(.*)$": "<rootDir>/src/modules/$1",
    "^@tests/(.*)$": "<rootDir>/src/tests/$1", // Mapeamento do novo alias de testes

    // Mapeamento especial para o seu app.ts
    // Isso permite que você importe 'app' de qualquer lugar usando um alias
    "^@app$": "<rootDir>/src/app.ts",
  },

  // Configurações de tipagem (já resolvidas, mas mantidas para robustez)
  moduleFileExtensions: ["js", "json", "ts"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
};
