class ProductService {

  /**
   * It comes down to declaring all allowed method signatures without
   * implementing these methods, followed by one implemented method.
   */

  getProducts(): void;
  getProducts(id: number): void;
  getProducts(id?: number): void {
    if (typeof id === 'number') {
      console.log(`Getting the product info for ${id}`);
    } else { 
      console.log(`Getting all products`);
    }
  }
}

const prodService = new ProductService();
prodService.getProducts(123);
prodService.getProducts();


/**
 * Similarly, you can overload a method signature to indicate that it can
 * not only have different arguments but return values of different types.
 */

interface Product {
  id: number;
  description: string;
}

class ProductServiceV2 {

    getProducts(description: string): Product[];
    getProducts(id: number): Product;
    getProducts(product: number | string): Product[] | Product{
        if  (typeof product === "number") {
          console.log(`Getting the product info for id ${product}`);
                    return { id: product, description: 'great product' };
        } else if (typeof product === "string")  { 
          console.log(`Getting product with description ${product}`);
          return [{ id: 123, description: 'blue jeans' },
                  { id: 789, description: 'blue jeans' }];
      } else {
        return { id: -1, description: 'Error: getProducts() accept only number or string as args' };
      }   
        
    }
}

const prodServicev2 = new ProductServiceV2();
console.log(prodServicev2.getProducts(123));
console.log(prodServicev2.getProducts('blue jeans'));

/**
 * The question is, why even declare overloaded signatures
 * if you can simply implement a single method using unions
 * in argument types and return values?
 * 
 * Method overloading helps the Typescript compiler to properly
 * map the provided argument types to the types of the return values.
 * When the overloaded method signatures are declared, the TypeScript
 * static analyzer will properly suggest possible ways of invoking
 * the overloaded method.
 */