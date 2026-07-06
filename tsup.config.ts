import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  shims: true,
  skipNodeModulesBundle: true,
  target: "es2022",
  outDir: "dist",
});
