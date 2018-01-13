import { expect } from 'chai';

import AbstractResolver from '../../lib/resolvers/AbstractResolver';

describe('AbstractResolver class', function() {

  describe('The abstract class itself', function() {
    it('has a constructor', function() {
      expect(AbstractResolver).to.be.a('function');
    });

    it('throws an error when constructed', function() {
      expect(() => new AbstractResolver()).to.throw(TypeError, 'Cannot construct');
    });
  });

  describe('Children of class', function() {
    class TestConcreteResolverWithoutInitFields extends AbstractResolver {};

    it('can be constructed', function() {
      expect(TestConcreteResolverWithoutInitFields).to.be.a('function');
    });

    it('throw an error without initFields() defined on the child', function() {
      expect(() => new TestConcreteResolverWithoutInitFields()).to.throw(TypeError, 'initFields() must be overriden in the child class');
    });

    class TestConcreteResolverWithInitFields extends AbstractResolver { initFields() { return { field1: 'String' }; } };

    it('do not throw an error if initFields() is defined', function() {
      expect(() => new TestConcreteResolverWithInitFields()).does.not.throw(TypeError);
    });

    it('can be constructed with no options', function() {
      expect(() => new TestConcreteResolverWithInitFields()).to.be.a('function');
    });

    it('can be constructed with options', function() {
      expect(() => new TestConcreteResolverWithInitFields({ foo: 'bar' })).to.be.a('function');
    });
  });

  describe('Instances of the class', function() {
    class TestConcreteResolverWithInitFields extends AbstractResolver { initFields() { return { field1: 'String' }; } };
    
    let r = new TestConcreteResolverWithInitFields({ foo: 'bar' });

    it('responds to getName()', function() {
      expect(r).to.respondTo('getName');
    });

    it('has a name which is a string', function() {
      expect(r.getName()).to.be.a('string');
    });

    it('use the class name as their name', function() {
      expect(r.getName()).to.equal('TestConcreteResolverWithInitFields');
    });

  });

});