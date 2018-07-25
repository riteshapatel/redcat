#### Project RedCAT

Author: Ritesh Patel

ritesh@tocotou.com

---

**Description**

This project is a product of a coding challenge for a Full Stack Engineer. Loved the challenge. Here is the actual [Coding Challenge](Requirements.pdf).

**Minimum Requirements**

API must be built with PHP. You may use Bootstrap / Datatables for the front-end. 

**API**

Api is built with PHP Slim framework. Runs on port 8001 via built-in PHP server.

**Routes**

/payload - allows to upload the csv file
/products - presents with a listing of products

```
http://127.0.0.1:8001/payload 
http://127.0.0.1:8001/products
```

**UI**

I have used VueJS with Bootstrap and FontAwesome to build the UI. Vuex handles the application state. 

**Sample Formulas**

| Column Name        | Formula  |
| ------------- |:-------------:|
| sales      | units * price |
| double_sales      | sales * 2 |
| divide_sales | sales / 5      |
| decrease_sales | sales - 10 |
| city_product | city & " has " & units & " " & product|

UI runs on `nginx` proxied to `PHP built-in server`.


**Sample payload**

[empty file](api/data/empty.csv)

[products](api/data/products.csv)

[smaller list of products](api/data/smaller_list.csv)

**Production**

App is available @ http://redcat.codepremi.com

**Development**

*Install dependencies*

```
yarn install
```

*Compiles and hot-reloads for development*
```
yarn run serve
```

*Compiles and minifies for production*
```
yarn run build
```

*Lints and fixes files*
```
yarn run lint
```

**Screenshots**

[Main](screenshots/main.png)

[sales](screenshots/sales.png)

[double_sales](screenshots/double_sales.png)

[decrease_sales](screenshots/decrease_sales.png)

[divide_sales](screenshots/divide_sales.png)

[total_sales](screenshots/total_sales.png)

[city_products](screenshots/city_products.png)


**Comments / Questions**

Questions? Gimme a holler! 

All ears! Fork and enjoy!

Cheers!

Ritesh