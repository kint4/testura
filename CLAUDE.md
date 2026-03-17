# CLAUDE.md — E2E Automation Framework

## Project Overview
Personal portfolio project. End-to-end test automation framework using Playwright + Cucumber.js (BDD) + TypeScript.
Covers both **API** and **UI (functional)** testing against a single target site.

**Author:** Diko (QA Engineer — Fintech/Mortgage domain background)
**Target Site:** [automationexercise.com](https://automationexercise.com)
**API Base URL:** `https://automationexercise.com/api`
**UI Base URL:** `https://automationexercise.com`

---

## Tech Stack

| Layer | Tool |
|---|---|
| Language | TypeScript |
| Test Runner | Playwright |
| BDD Layer | Cucumber.js (`@cucumber/cucumber`) |
| API Client | Playwright `request` context |
| Test Data | Faker.js (dynamic) + JSON fixtures (static) |
| Reporting | Allure Report (published to GitHub Pages) |
| CI/CD | GitHub Actions |

---

## Project Structure

```
├── .github/
│   └── workflows/
│       ├── smoke.yml           # Triggered on push
│       └── regression.yml      # Triggered nightly
├── config/
│   ├── env.dev.ts
│   ├── env.staging.ts
│   └── index.ts                # Loads env based on ENV variable
├── features/
│   ├── api/
│   │   ├── products.feature
│   │   ├── brands.feature
│   │   ├── search.feature
│   │   ├── auth.feature
│   │   └── account.feature
│   └── ui/
│       ├── login.feature
│       ├── register.feature
│       ├── search.feature
│       └── cart.feature
├── step-definitions/
│   ├── api/
│   └── ui/
├── pages/                      # Page Object Model
│   ├── LoginPage.ts
│   ├── RegisterPage.ts
│   ├── ProductPage.ts
│   └── CartPage.ts
├── clients/                    # Typed API client layer
│   ├── ProductClient.ts
│   ├── AuthClient.ts
│   └── AccountClient.ts
├── fixtures/
│   ├── users.json
│   └── products.json
├── support/
│   ├── hooks.ts                # Before/After hooks
│   ├── world.ts                # Cucumber World (shared context)
│   └── assertions.ts           # Custom matchers
├── utils/
│   ├── faker.factory.ts        # Test data factory
│   └── logger.ts
├── reports/                    # Allure output (gitignored)
├── cucumber.config.ts
├── playwright.config.ts
├── tsconfig.json
├── package.json
└── CLAUDE.md
```

---

## Available API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/productsList` | Get all products |
| POST | `/api/productsList` | Expect 405 (negative case) |
| GET | `/api/brandsList` | Get all brands |
| PUT | `/api/brandsList` | Expect 405 (negative case) |
| POST | `/api/searchProduct` | Search by keyword (`search_product` param) |
| POST | `/api/verifyLogin` | Verify credentials (`email`, `password`) |
| POST | `/api/createAccount` | Register new user |
| PUT | `/api/updateAccount` | Update user details |
| DELETE | `/api/deleteAccount` | Delete account |
| GET | `/api/getUserDetailByEmail` | Get user by email |

---

## Tagging Strategy

```gherkin
@smoke       # Critical path, runs on every push
@regression  # Full suite, runs nightly
@api         # API layer tests
@ui          # UI layer tests
@P1          # Priority 1 — blocker scenarios
@P2          # Priority 2 — major scenarios
@negative    # Negative/error path scenarios
```

Run specific tags:
```bash
ENV=staging npx cucumber-js --tags "@smoke and @api"
ENV=staging npx cucumber-js --tags "@regression"
```

---

## Design Patterns

### API Client Layer
All API calls go through typed client classes, never raw `request.get()` in step definitions.

```ts
// Good
await productClient.getAllProducts();
await authClient.verifyLogin({ email, password });

// Avoid
await request.get('https://automationexercise.com/api/productsList');
```

### Page Object Model (UI)
All UI interactions go through Page classes. Step definitions call page methods only.

### Test Data Factory
Use `faker.factory.ts` for dynamic data, JSON fixtures for static/reusable data.

```ts
const user = UserFactory.create();         // dynamic
const user = fixtures.users.validUser;     // static
```

### Hooks & Cleanup
- `Before` hook: initialize Playwright browser/context/page
- `After` hook: cleanup via API calls (e.g. delete created accounts), close browser
- Keeps tests isolated and idempotent

---

## CI/CD Workflows

| Workflow | Trigger | Tags Run |
|---|---|---|
| `smoke.yml` | On push to `main` / PR | `@smoke` |
| `regression.yml` | Nightly (cron) | `@regression` |

Allure report is published to GitHub Pages after each regression run.

---

## Coding Conventions

- All files in **TypeScript** — no plain JS
- Use `async/await` throughout, no `.then()` chains
- Step definitions should be thin — logic lives in page/client classes
- Custom assertions go in `support/assertions.ts`
- No hardcoded URLs or credentials — use `config/` and `.env`
- Avoid em dashes in comments or docs

---

## Running Tests Locally

```bash
# Install dependencies
npm install

# Run smoke tests
npm run test:smoke

# Run full regression
npm run test:regression

# Generate and open Allure report
npm run report:generate
npm run report:open
```

---

## Key Scenarios (Reference)

### API
- Get all products — assert 200 + list not empty
- POST to productsList — assert 405
- Search product with valid keyword — assert 200 + matching results
- Search product with missing param — assert 400
- Verify login with valid credentials — assert "User exists!"
- Verify login with missing params — assert 400
- Create account — assert "User created!"
- Update account — assert "User updated!"
- Delete account — assert "Account deleted!"

### UI
- Register new user successfully
- Login with valid credentials
- Login with invalid credentials (negative)
- Search for a product
- Add product to cart
- Remove product from cart

---

## Notes for Claude

- When adding new scenarios, follow existing tagging strategy
- New API endpoints go in `clients/` — create a typed method, not inline calls
- New UI flows go in `pages/` — add a new Page class or extend existing one
- Feature files should read like plain English — keep Gherkin clean and business-readable
- Always add both happy path and at least one negative scenario per feature
