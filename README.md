# Testura

![Smoke Tests](https://github.com/kint4/testura/actions/workflows/smoke.yml/badge.svg)

End-to-end test automation framework built with **Playwright**, **Cucumber.js (BDD)**, and **TypeScript**. Covers both API and UI testing against [automationexercise.com](https://automationexercise.com).

---

## Tech Stack

| Layer | Tool |
|---|---|
| Language | TypeScript |
| Test Runner | Playwright |
| BDD Layer | Cucumber.js |
| API Client | Playwright `request` context |
| Test Data | Faker.js (dynamic) + JSON fixtures (static) |
| Reporting | Allure Report |
| CI/CD | GitHub Actions |

---

## Project Structure

```
├── .github/workflows/       # CI/CD pipelines (smoke + regression)
├── clients/                 # Typed API client layer
├── config/                  # Environment config (dev, staging)
├── features/
│   ├── api/                 # API test scenarios (Gherkin)
│   └── ui/                  # UI test scenarios (Gherkin)
├── fixtures/                # Static test data (JSON)
├── pages/                   # Page Object Model
├── step-definitions/        # Cucumber step implementations
│   ├── api/
│   └── ui/
├── support/                 # Hooks, World, custom assertions
└── utils/                   # Faker factory, logger
```

---

## Test Coverage

### API
| Scenario | Tags |
|---|---|
| Get all products — 200 + non-empty list | `@smoke @P1` |
| POST to productsList — expect 405 | `@regression @negative @P2` |
| Get all brands — 200 + non-empty list | `@regression @P2` |
| PUT to brandsList — expect 405 | `@regression @negative @P2` |
| Search product with valid keyword | `@smoke @P1` |
| Search product with missing param — 400 | `@regression @negative @P2` |
| Verify login with valid credentials | `@smoke @P1` |
| Verify login with missing params — 400 | `@regression @negative @P2` |
| Verify login with invalid credentials — 404 | `@regression @negative @P2` |
| Create account | `@regression @P1` |
| Update account | `@regression @P1` |
| Delete account | `@regression @P1` |
| Get user detail by email | `@regression @P1` |

### UI
| Scenario | Tags |
|---|---|
| Login with valid credentials | `@smoke @P1` |
| Login with invalid credentials | `@regression @negative @P2` |
| Register new user | `@smoke @P1` |
| Search for a product | `@regression @P2` |
| Add product to cart | `@regression @P2` |
| Remove product from cart | `@regression @P2` |

---

## Getting Started

### Prerequisites

- Node.js >= 18
- Java (required for Allure report generation)

```bash
# Install Java via Homebrew (macOS)
brew install openjdk
echo 'export PATH="/opt/homebrew/opt/openjdk/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

### Installation

```bash
npm install
npx playwright install chromium
```

### Running Tests

```bash
# Smoke tests (critical path)
npm run test:smoke

# Full regression suite
npm run test:regression

# API tests only
npm run test:api

# UI tests only
npm run test:ui
```

### Allure Report

```bash
npm run report:generate
npm run report:open
```

---

## Design Patterns

### API Client Layer
All API calls go through typed client classes in `clients/`. Step definitions never make raw HTTP calls.

```ts
// Good
await productClient.getAllProducts();
await authClient.verifyLogin({ email, password });

// Avoid
await request.get('https://automationexercise.com/api/productsList');
```

### Page Object Model
All UI interactions go through page classes in `pages/`. Step definitions call page methods only.

### Test Data Factory
Dynamic data via `UserFactory.create()`, static data via JSON fixtures.

```ts
const user = UserFactory.create();          // dynamic — unique per run
const user = fixtures.users.validUser;      // static — reusable
```

### Test Isolation
- `BeforeAll` — creates shared test user via API, launches browser
- `Before(@api)` — creates a fresh API request context per scenario
- `Before(@ui)` — creates a fresh browser context and page per scenario
- `After(@ui)` — captures screenshot on failure, closes context
- `AfterAll` — deletes shared test user, closes browser

---

## CI/CD

| Workflow | Trigger | Tags |
|---|---|---|
| `smoke.yml` | Push to `main` / Pull Request | `@smoke` |
| `regression.yml` | Nightly at 02:00 UTC | `@regression` |

Allure report is published to GitHub Pages after each regression run.

---

## Tagging Strategy

```gherkin
@smoke       # Critical path — runs on every push
@regression  # Full suite — runs nightly
@api         # API layer tests
@ui          # UI layer tests
@P1          # Priority 1 — blocker scenarios
@P2          # Priority 2 — major scenarios
@negative    # Negative / error path scenarios
```
