// Export the global KV binding from this file.
// This isn't necessary, other files could just reference the global
// variable directly, but I often find it better to only reference worker
// bindings in one specific file and the use ECMAScript import/export
// to use them in other files. That way it's easier to mock them in
// test files
export const KV = self.KV;
