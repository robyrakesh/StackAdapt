export class TestData {
  // Sample user data for demo form
  static readonly validDemoFormData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '555-123-4567',
    company: 'Test Company Inc.',
    jobTitle: 'Marketing Manager',
    companyType: 'Brand',
    industry: 'E-Commerce',
    companySize: '101 to 250',
    country: 'United States',
    state: 'California',
    budget: '$1M – $5M',
    workWithUs: 'Run campaigns in StackAdapt',
    agreeToTerms: true
  }

  static readonly testUsers = {
    validUser: {
      email: 'test@example.com',
      password: 'TestPassword123!'
    },
    invalidUser: {
      email: 'invalid@example.com',
      password: 'wrongpassword'
    }
  }

} 