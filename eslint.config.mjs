import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';

export default [
  ...nextCoreWebVitals,
  {
    rules: {
      // Allow setState in effects for localStorage initialization patterns
      // This is a legitimate use case for syncing with external systems
      'react-hooks/set-state-in-effect': 'off',
      // Allow impure functions in event handlers (not render)
      'react-hooks/purity': 'off',
    },
  },
];
