const MAX_PARAM = 10
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    createDefaultProgram: true,
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    /* General */
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    'no-use-before-define': 'off',
    'no-unused-vars': 'off',
    'require-jsdoc': 'off',
    'prefer-template': 'error',
    'default-param-last': 'warn',
    'class-methods-use-this': [
      'off',
      {
        exceptMethods: [
          'render',
          'getInitialState',
          'getDefaultProps',
          'getChildContext',
          'shouldComponentUpdate'
        ]
      }
    ],
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
    'object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
    complexity: ['error', { max: 9 }],
    'max-lines': ['error', { max: 200, skipComments: true, skipBlankLines: true }],
    'no-implicit-coercion': ['error', { allow: ['!!'] }],
    'max-params': ['error', MAX_PARAM],
    'no-console': ['error', { allow: ['error'] }],
    'no-magic-numbers': 'off',
    'no-irregular-whitespace': ['error', { skipTemplates: true }],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: '*', next: 'export' },
      { blankLine: 'any', prev: 'export', next: 'export' }
    ],
    'require-await': 'error',
    'no-extra-boolean-cast': ['error', { enforceForLogicalOperands: true }],

    /* React */
    'react/display-name': 'off',
    'react/jsx-boolean-value': ['error', 'never'],
    'react/jsx-closing-bracket-location': 'off',
    'react/function-component-definition': 'off',
    'react/jsx-wrap-multilines': [
      'error',
      {
        assignment: 'parens-new-line',
        return: 'parens-new-line',
        arrow: 'parens-new-line',
        condition: 'parens-new-line',
        logical: 'parens-new-line'
      }
    ],
    'react/prop-types': 'off',
    'react/prefer-stateless-function': 'warn',
    'react/no-danger': 'error',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',

    /* JSX Rules */
    'jsx-a11y/label-has-for': [
      'error',
      {
        components: ['label'],
        required: {
          some: ['nesting', 'id'],
          allowChildren: true
        }
      }
    ],
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        labelComponents: ['label'],
        labelAttributes: ['htmlFor'],
        controlComponents: ['input'],
        assert: 'both'
      }
    ],

    /* Import */
    'sort-imports': 'off',
    'import/prefer-default-export': 'off',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', ['index', 'sibling'], ['parent', 'internal'], 'object'],
        'newlines-between': 'always',
        pathGroups: [
          {
            pattern: 'react+(|-dom)',
            group: 'external',
            position: 'before'
          },
          {
            pattern: '@cosmos/**',
            group: 'object',
            position: 'after'
          },
          {
            pattern: '@space-lib-events/**',
            group: 'object',
            position: 'after'
          }
        ],
        pathGroupsExcludedImportTypes: ['react+(|-dom)', '@cosmos/**', '@space-lib-events/**'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        }
      }
    ],

    /* Typescript */
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-use-before-define': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '_' }],
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/prefer-string-starts-ends-with': 'error',
    '@typescript-eslint/no-magic-numbers': [
      'warn',
      {
        ignore: [1, 0, -1],
        ignoreEnums: true,
        ignoreNumericLiteralTypes: true,
        ignoreReadonlyClassProperties: true
      }
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: ['enumMember', 'enum', 'typeAlias', 'interface'],
        format: ['StrictPascalCase']
      }
    ]
  },
  overrides: [
    {
      files: ['src/**/*.test.ts?(x)'],
      rules: {
        '@typescript-eslint/no-magic-numbers': 'off',
        'max-lines': [
          'error',
          {
            max: 400,
            skipComments: true,
            skipBlankLines: true
          }
        ]
      }
    }
  ]
}
