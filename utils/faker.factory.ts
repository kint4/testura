import { faker } from '@faker-js/faker';

export interface UserData {
  name: string;
  email: string;
  password: string;
  title: string;
  birth_date: string;
  birth_month: string;
  birth_year: string;
  firstname: string;
  lastname: string;
  company: string;
  address1: string;
  address2: string;
  country: string;
  zipcode: string;
  state: string;
  city: string;
  mobile_number: string;
}

export class UserFactory {
  static create(): UserData {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const birthDate = faker.date.birthdate({ min: 18, max: 60, mode: 'age' });

    return {
      name: `${firstName} ${lastName}`,
      email: faker.internet.email({ firstName, lastName }),
      password: faker.internet.password({ length: 12, memorable: false }),
      title: faker.helpers.arrayElement(['Mr', 'Mrs']),
      birth_date: String(birthDate.getDate()),
      birth_month: String(birthDate.getMonth() + 1),
      birth_year: String(birthDate.getFullYear()),
      firstname: firstName,
      lastname: lastName,
      company: faker.company.name(),
      address1: faker.location.streetAddress(),
      address2: faker.location.secondaryAddress(),
      country: 'United States',
      zipcode: faker.location.zipCode('#####'),
      state: faker.location.state(),
      city: faker.location.city(),
      mobile_number: faker.phone.number(),
    };
  }
}

const searchKeywords = ['dress', 'top', 'jeans', 'tshirt', 'saree', 'skirt', 'blouse'];

export class ProductFactory {
  static searchTerm(): string {
    return searchKeywords[Math.floor(Math.random() * searchKeywords.length)];
  }
}
