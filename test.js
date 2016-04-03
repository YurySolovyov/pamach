import test from 'ava';
import match from './index';

// Shamelessly taken from examples

test('should match simple string', t => {
  const drink = 'coke';

  const myDrink = match(drink)({
    coke:    () => { return 'Pssshhh...'; },
    wine:    () => { return 'I like this harvest from summer 1901...'; },
    beer:    () => { return 'After a long day...' },
    default: () => { return 'H20'; },
  });

  t.is(myDrink, 'Pssshhh...');
});

test('should match multiple arguments', t => {
  const firstComponent = 'coke';
  const secondComponent = 'vodka';

  const cocktail = match(firstComponent, secondComponent)({
    'coke, vodka': () => { return 'Much better together'; },
    'beer, vodka': () => { return 'Are you sure this is a good idea?'; },
    default:       () => { return 'H20'; }
  });

  t.is(cocktail, 'Much better together');
});

test('should recognize .toString interface', t => {
  const person = {
    firstName: 'Steve',
    lastName: 'Jobs',
    toString: function() { return `${this.firstName} ${this.lastName}` }
  };

  const collegue = match(person)({
    'Steve Jobs': () => {
      return { firstName: 'Jonny', lastName: 'Ive' }
    },
    'Fox Malder': () => {
      return { firstName: 'Dana', lastName: 'Scully' }
    }
  });

  t.same(collegue, { firstName: 'Jonny', lastName: 'Ive' });
});


test('should call `default` if no matches found', t => {
  const role = 'user'

  const greet = match(role)({
    admin:   () => { return 'Hello, Admin!'; },
    vip:     () => { return 'Hey, you are quite important!'; },
    default: () => { return 'Hi user!'; }
  });

  t.is(greet, 'Hi user!');
});
