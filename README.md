# PaginatorService

An injectable Angular 5+ service for paginating an array.

## Installation

You must have npm installed first.  Then, in the command line:

```bash
npm install @writetome51/paginator-service
```

## Loading
```
// If using TypeScript:
import { PaginatorService } from '@writetome51/paginator-service';
// If using ES5 JavaScript:
var PaginatorService = require('@writetome51/paginator-service').PaginatorService;
```

## Usage

```
// Injecting it into another class:

export class ExampleAngularComponent {

    constructor(public paginatorSvc: PaginatorService) { ... }
}

// Assigning it a new array:  
paginatorSvc.data = [item1, item2, item3, ...]

// Changing number of items per page:  
paginatorSvc.itemsPerPage = 15;

// Getting a page:
let page = paginatorSvc.getPage(pageIndex);  // page indexes begin at 0.

// Changing the current page, and then reading it:
paginatorSvc.currentPageNumber += 1;
let currentPage = paginatorSvc.currentPage; 

// Getting the total number of pages:  
let totalPages = paginatorSvc.totalPages;

// Getting the current page number:  
let currentPageNumber = paginatorSvc.currentPageNumber;
```

## Properties
```
data : any[]
    // the array being paginated.

itemsPerPage : integer
    // default is 25.

currentPageNumber : integer
    // Assigning this a value automatically causes this.currentPage to update.

currentPage : any[] (read-only)
    // all items to be shown on current page.

totalPages : integer (read-only)

protected  _currentPageNumber : integer (read-writable)
    // available in case a subclass wants to use it.

className : string (read-only)
```

## Methods
```
getPage(pageIndex) : any[]
    // returns a 'page' of items copied from this.data.
    // Changes value of this.currentPageNumber to pageIndex + 1.
    // Also changes value of this.currentPage.
    // As an alternative to using this method, you can change the
    // value of this.currentPageNumber and then get the value of
    // this.currentPage.
``` 
The methods below are not important to know about in order to use this  
class.  They're inherited from [BaseClass](https://github.com/writetome51/typescript-base-class#baseclass) .

```
protected   _createGetterAndOrSetterForEach(
                  propertyNames: string[],
                  configuration: IGetterSetterConfiguration
            ) : void
     /*********************
     Use this method when you have a bunch of properties that need getter and/or 
     setter functions that all do the same thing. You pass in an array of string 
     names of those properties, and the method attaches the same getter and/or 
     setter function to each property.
     IGetterSetterConfiguration is this object:
     {
         get_setterFunction?: (
             propertyName: string, index?: number, propertyNames?: string[]
         ) => Function,
             // get_setterFunction takes the property name as first argument and 
             // returns the setter function.  The setter function must take one 
             // parameter and return void.
     
         get_getterFunction?: (
             propertyName: string, index?: number, propertyNames?: string[]
         ) => Function
             // get_getterFunction takes the property name as first argument and 
             // returns the getter function.  The getter function must return something.
     }
     *********************/ 
   
   
protected   _returnThis_after(voidExpression: any) : this
    // voidExpression is executed, then function returns this.
    // Even if voidExpression returns something, the returned data isn't used.

protected   _runMethod_and_returnThis(
    callingObject, 
    method: Function, 
    methodArgs: any[], 
    additionalAction?: Function // takes the result returned by method as an argument.
) : this
```   

## Inheritance Chain

PaginatorService<--[AppPaginator](https://github.com/writetome51/app-paginator#apppaginator)<--[ArrayPaginator](https://github.com/writetome51/array-paginator#arraypaginator)<--[PublicArrayContainer](https://github.com/writetome51/public-array-container#publicarraycontainer)<--[BaseClass](https://github.com/writetome51/typescript-base-class#baseclass)


## License
[MIT](https://choosealicense.com/licenses/mit/)