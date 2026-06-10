# Repository Guidelines

## Project Structure & Module Organization

- `src/` contains application code; entry points are `src/main.ts` and `src/App.vue`.
- `src/components/` is grouped by feature (`home/`, `layout/`, `ui/`) with PascalCase `.vue` files.
- `src/views/` holds route views; `src/router/` defines Vue Router; `src/stores/` contains Pinia stores; `src/composables/` holds Composition API hooks.
- `src/assets/` is for bundled assets; `public/` is for static files; `material/` stores reference images.
- Tests live in `src/__tests__/` (unit) and `e2e/` (Playwright).

## Build, Test, and Development Commands

- `pnpm install` installs dependencies (pnpm is required).
- `pnpm dev` starts the Vite dev server.
- `pnpm build` runs type-check + production build; `pnpm build-only` skips type-check.
- `pnpm preview` serves the production build locally.
- `pnpm type-check` runs `vue-tsc --build`.
- `pnpm test:unit` runs Vitest; add `-- --watch` for watch mode.
- `pnpm test:e2e` runs Playwright; add `--project=chromium` for a single browser.
- `pnpm lint` runs oxlint + ESLint with auto-fix; `pnpm format` runs Prettier on `src/`.

## Coding Style & Naming Conventions

- Vue 3 + TypeScript with `<script setup>`; use the `@/` alias for `src/`.
- Tailwind CSS v4 is the primary styling approach; keep custom CSS minimal and scoped.
- Component files use PascalCase (e.g., `HeroSection.vue`); composables use `useX.ts` (e.g., `useScrollProgress.ts`).
- Stores are in `src/stores/` with lower-case filenames (e.g., `scroll.ts`).
- Keep formatting consistent via Prettier and fix lint warnings before pushing.

## Testing Guidelines

- Unit tests: `src/__tests__/*.spec.ts` using Vitest + jsdom.
- E2E tests: `e2e/*.spec.ts` using Playwright.
- First-time Playwright runs need `npx playwright install`; CI-style runs should build first (`pnpm build`).

## Commit & Pull Request Guidelines

- Commit messages follow `<type>: <description>` (e.g., `feat: add hero section`), with types like `feat`, `fix`, `refactor`, `style`, `docs`, `test`, `chore`.
- Keep commits scoped to a single task or feature.
- PRs should explain intent, list tests run, and include screenshots/GIFs for UI changes; link issues when applicable.

## Environment & Configuration

- Node version: `^20.19.0 || >=22.12.0` (see `package.json`).
- Do not commit secrets; use local `.env` files when needed.

# 開發守則

請遵守以下的規則，將每個部件拆成 component，每個職責都簡單，每一個功能都必須完整。
以下要求，請一個一個確認，自己要理解、驗證、分析、設計、規劃、執行，修復所有錯誤。

每做完任何變更都要 commit。

使用 sequential-thinking 來規劃。
使用 context7 來查詢相關或所需套件的最薪資訊。

前端使用的是：Vue 3 + Tailwind CSS 4
請務必先理解 Vue 3 跟 Tailwind CSS 4 的規格與新的內容。

使用 mcp chrome-devtools 來輔助開發，必須要測試不跑版、無錯誤、UI/UX 優秀。

為了達到以上，請先詳細分析該如何配色、設計。
要更加現代化，低調且專業，設計要合理布局、UI跟UX 兼顧，不要有任何妥協，請合理布局不要跑版，不要過於華麗，要簡潔。
請重新設計元件的顏色，請足夠有辨識度，並且有大量的互動與動畫。
移動到每一個元件的時候，都要有互動反饋。
發送按鈕必須要有回饋。
整體設計的風格必須是有質感、配色舒適，要有大量的動畫跟優良的使用者體驗與互動。

## 設計規範（必須遵守）

### SOLID（必須）

- **S（SRP）單一職責**：一個模組/類別/函式只負責一件事；改動理由應該只有一個。
- **O（OCP）開放封閉**：新增行為用擴充（介面/策略/注入），避免修改既有核心邏輯造成回歸。
- **L（LSP）里氏替換**：子型別可替換父型別，不能改變原契約語意（輸入/輸出/例外）。
- **I（ISP）介面隔離**：小介面、按需依賴；避免「胖介面」逼迫使用者依賴不需要的方法。
- **D（DIP）依賴反轉**：高階策略依賴抽象；IO/外部系統以介面注入，方便測試與替換。

### Clean Code（必須）

- 命名具體、可讀、可搜尋；避免縮寫與模糊詞（如 `data`, `info`, `tmp`）。
- 函式短小、單一責任；避免深層巢狀（> 2 層建議重構）。
- 以「意圖」為中心設計 API；呼叫端讀起來像自然語句。
- 避免重複（DRY），但也避免過度抽象；抽象必須能降低未來變更成本。
- 註解只補「為什麼」，不重述「做什麼」；若註解在解釋程式在做什麼，代表程式需要更清楚。

### 程式結構

- 分層清楚：**Domain（商業邏輯）不得直接依賴 Infrastructure（DB/HTTP/Queue）**，透過介面隔離。
- **禁止業務邏輯散落在 Controller/Handler**：Handler 只做輸入驗證/授權/轉換/呼叫 use-case。
- 模組邊界清楚：跨模組只能透過公開介面，不得偷用內部細節。

### 錯誤處理與可觀測性

- 所有錯誤都要「可追踪」：具體錯誤碼/訊息、必要上下文（request id / user id / correlation id）。
- 例外/錯誤要分層：Domain error vs Infra error，不得混用。

### 測試（必須）

- 新增/修改行為必須附測試，至少涵蓋：
  - 主要成功路徑
  - 重要失敗路徑（權限不足、輸入非法、外部依賴失敗）
  - 邊界條件（空值、最大長度、時間邊界、並發）
- 單元測試不得依賴真實外部系統（DB/HTTP），用 stub/mock 或測試替身。
- 修 bug 必須提供「會失敗的測試」再修正（防回歸）。

## 可維護性與一致性（必須）

### 格式化與靜態檢查

- 必須啟用：formatter、linter、type check（能用就用）。

## 安全規範

### 機敏資料與憑證

- 憑證/金鑰/Token **不得寫進程式碼或 repo**

### 套件管理（必須）

- **使用 pnpm**

### Formatter（必須）

- **Prettier：**`prettier . --write`

### Linter

- **ESLint + typescript-eslint（必開 typed linting）**
  - typed linting 需要在設定中明確啟用 type information
  - 建議直接使用 `strict-type-checked` + `stylistic-type-checked` 兩套預設規則集

### Type check（必須）

- `tsc -p tsconfig.json --noEmit`

### 最嚴格建議 tsconfig.json（核心選項）

以下是「strict 之外再加嚴」的常用組合（以避免隱性 undefined / optional 型別陷阱 / catch any）：

```json
{
  "compilerOptions": {
    "strict": true,

    // 進一步加嚴
    "noUncheckedIndexedAccess": true, // index access 會帶出 undefined 風險
    "exactOptionalPropertyTypes": true, // ? 不等於 | undefined 的語意更嚴格
    "useUnknownInCatchVariables": true, // catch 變數預設 unknown 而非 any

    // 逼迫工程紀律（最嚴格通常會開）
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "forceConsistentCasingInFileNames": true,

    // 建議不要偷懶（最嚴格 = 不跳過第三方型別）
    "skipLibCheck": false
  }
}
```

### 最嚴格 ESLint（legacy config 範例）

```jsx
/* eslint-env node */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    projectService: true,
    tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/strict",
    "plugin:@typescript-eslint/stylistic",
    "plugin:@typescript-eslint/strict-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
  ],
  rules: {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/no-misused-promises": "error",
  },
};
```

### 建議 package.json scripts

```json
{
  "scripts": {
    "format:check": "prettier . --check",
    "format:write": "prettier . --write",
    "lint": "eslint . --max-warnings 0",
    "typecheck": "tsc -p tsconfig.json --noEmit"
  }
}
```

## 1) Purpose & Output Contract (LLM Must Follow)

**Goal:** Generate a YAML document with:

- Root key: `features`
- `features` is a **YAML list** of feature objects
- Each feature object MUST contain:
  - `feature_key` (kebab-case, unique)
  - `feature_name` (string, human-readable, includes prefix like “Add/Enhance/Fix/Refactor/Healthcheck”)
  - `is_frontend` (boolean)
  - `int_url` (string URL)
  - `context` (list of strings)
  - `requirements` (list of strings; may include section headers as comment lines starting with `#`)
  - `acceptance_criteria` (list of strings)

**Style requirements:**

- Use **clear, testable language**: “must/shall/should” with explicit constraints.
- Requirements must be **structured** with section headings (comments) and bullet-like string items.
- Emphasize:
  - **Contracts / schemas**, **state machines**, **idempotency**, **auditability**, **observability**
  - **INT E2E with cleared data** requirement and evidence capture (`E2E_RUN_REPORT.md`, `STATE.md`)
  - **UI truth from backend** for frontend features

- Use deterministic specs whenever possible; avoid vague statements.

---

## 2) YAML Field Semantics (What Each Field Means)

### `feature_key`

- **Uniquely identifies** the feature in tracking systems.
- Format: `lower-kebab-case`
- Recommendation:
  - Prefix by action: `add-`, `enhance-`, `fix-`, `refactor-`, `healthcheck-`, `upgrade-`
  - Include scope keywords (e.g., `test-platform`, `runner`, `scheduler`, `ui-console`)

### `feature_name`

- Human-facing title.
- Should start with a category prefix:
  - `"Add:"`, `"Enhance:"`, `"Fix:"`, `"Refactor:"`, `"Upgrade:"`, `"Healthcheck:"`

- Include key scope and constraints (e.g., “FastAPI + Pydantic + Scheduling/Concurrency”).

### `is_frontend`

- `true` if any UI deliverable is included.
- `false` for backend-only features.

### `int_url`

- The primary INT environment URL to validate against.
- Must be a real reachable service URL in your environment naming scheme.

### `context`

- **Why and what** at a high level.
- Must include:
  - Target scope and user impact
  - Key constraints (e.g., “INT is source of truth”, “clear data before validation”)
  - Any non-goals or safety constraints if relevant

### `requirements`

- The **detailed specification**.
- Structure using comment separators:
  - `# --------`
  - `# A. ...`

- Each requirement line is a string item; it may contain indentation inside the string to express sub-bullets.
- Must specify:
  - Interfaces/contracts (schemas)
  - Execution semantics (state machine, concurrency)
  - APIs (endpoints, security, pagination/filtering)
  - Data model expectations (DB tables, indexes, retention)
  - Observability (metrics/logging/tracing)
  - Testing strategy, including INT E2E steps and evidence archiving

### `acceptance_criteria`

- **Binary-verifiable** outcomes.
- Must include:
  - INT E2E (clear data) pass conditions
  - No-console-errors/no-network-failures for frontend
  - Evidence captured in `features/<feature_key>/E2E_RUN_REPORT.md` + `STATE.md`
  - Measurable statements (e.g., “supports cancel”, “reports generated”, “dedupe works”)

---

## 3) Quality Bar Checklist (LLM Should Self-Check Before Output)

**Feature completeness**

- [ ] Has context with goal + constraints
- [ ] Has requirements with sections and deep operational detail
- [ ] Has acceptance criteria that are testable and mention INT clear-data E2E
- [ ] Uses consistent terminology: `run`, `step`, `artifact`, `report`, `schedule`

**Engineering rigor**

- [ ] Defines contracts and schema fields explicitly
- [ ] Includes state machine and illegal transitions guard
- [ ] Covers idempotency and deduplication
- [ ] Covers observability (logs, metrics, tracing)
- [ ] Covers security: authn/authz + audit logs
- [ ] Defines data retention for artifacts/results

**Verification**

- [ ] Includes unit tests + integration tests + INT E2E steps
- [ ] Includes evidence capture requirements
