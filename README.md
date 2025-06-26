# StackAdapt Playwright TypeScript Framework

A comprehensive end-to-end testing framework built with Playwright and TypeScript for testing the StackAdapt website. This framework follows the Page Object Model (POM) pattern and includes reusable configurations, utilities, and test data management.

## 🚀 Features

- **Page Object Model**: Clean separation of page logic and test logic
- **TypeScript Support**: Full TypeScript integration with proper type checking
- **Multi-browser Testing**: Support for Chromium, Firefox, WebKit, and mobile browsers
- **Reusable Configurations**: Environment-specific configurations
- **Test Data Management**: Centralized test data with random data generation
- **Comprehensive Reporting**: HTML, JSON, and JUnit reports
- **Parallel Execution**: Configurable parallel test execution
- **Screenshot & Video Capture**: Automatic capture on test failures
- **Responsive Testing**: Mobile and desktop viewport testing

## 📁 Project Structure

```
StackAdapt/
├── src/
│   ├── pages/
│   │   ├── BasePage.ts          # Base page object with common methods
│   │   ├── HomePage.ts          # Homepage page object
│   │   └── DemoRequestPage.ts   # Demo request form page object
│   ├── utils/
│   │   └── TestData.ts          # Test data and utilities
│   ├── fixtures/
│   │   └── testFixtures.ts      # Custom test fixtures
│   └── config/
│       └── (configuration files)
├── tests/
│   ├── e2e/
│   │   ├── homepage.spec.ts     # Homepage tests
│   │   └── demo-request.spec.ts # Demo form tests
│   └── api/
│       └── (API tests)
├── playwright.config.ts         # Playwright configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Project dependencies and scripts
└── README.md                   # This file
```

## 🛠️ Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd StackAdapt
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Install Playwright browsers**:
   ```bash
   npm run test:install
   ```

## 🧪 Running Tests

### Basic Test Commands

```bash
# Run all tests
npm test

# Run tests in headed mode (visible browser)
npm run test:headed

# Run tests in debug mode
npm run test:debug

# Run tests with UI mode
npm run test:ui
```

### Browser-Specific Testing

```bash
# Run tests on specific browsers
npm run test:chromium
npm run test:firefox
npm run test:webkit

# Run mobile tests
npm run test:mobile
```

### Advanced Test Commands

```bash
# Run tests in parallel
npm run test:parallel

# Run tests with retries
npm run test:retry

# Generate test code
npm run test:codegen

# View test reports
npm run test:report
```



## 📈 Reporting

The framework generates multiple report types:
- **HTML Report**: Interactive test results with screenshots and traces
- **JSON Report**: Machine-readable test results
- **JUnit Report**: CI/CD integration compatible

View reports with:
```bash
npm run test:report
```

## 🚀 CI/CD Integration

### GitHub Actions Example
```yaml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run test:install
      - run: npm test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## 🐛 Debugging

### Debug Mode
```bash
npm run test:debug
```

### UI Mode
```bash
npm run test:ui
```

### Code Generation
```bash
npm run test:codegen
```

