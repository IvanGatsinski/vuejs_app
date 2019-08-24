# VueJS Project 
SPA Application build with VueJS / Vuex / Vue-Router

### Project name: 
Purchase & Sale

### Description:
A simple shopping application where people can buy other people's products and sell their own. Every user can have unlimited amount of sales, as well as items which want to buy. All users have an individual **Cart** which contains products that the user is willing to buy.

### Installation and Configuration:
To Install this project locally you will need a source code editor such as [VS Code](https://code.visualstudio.com/) and a **restful back-end service** (I am using [Kinvey](https://console.kinvey.com/) for this project). To start, simply download and install the code editor first and then make a registration on the Kinvey website using the links shown above. After you are done with that,open your code editor and make sure you've cloned the [Git Repository](https://github.com/IvanGatsinski/vuejs_app) using the command **git clone the-git-repo-link**(*You can use the VS Code terminal for this operation, just type it there*). When you are done with all of that, navigate to your root folder structure and add a file, named **.env** (*This file will contain the personal information about your app e.g your APP_KEY and APP_SECRET*). Next, you will need to sign-in to your personal Kinvey account on their website. Click the *ADD PROJECT* button and choose a name for the project (I suggest you to name it *VueJS_Sales_App*). Go to the "**Collections**" section of your console-app and add a collection called **Products**. Here is an example of how your collection should looks like.

![App Collection](https://i.ibb.co/MB4yPcd/app-settings.png)

The next step is to copy your APP_KEY and APP_SECRET which are shown on the picture below(*Ofcourse yours will be different.*):

![App Key](https://i.ibb.co/CJDvGBn/app-key.png)

Open the *.env* file and inside of it just type the following key-value-pair attributes:

* VUE_APP_KEY=**Your App Key**
* VUE_APP_SECRET=**Your App Secret**

Save the file, open the terminal again and type **npm run serve** . Your local server should be started at *localhost:8080* :wink:

![App Localhost](https://i.ibb.co/L5nhm1z/app-port.png)

### Usage: 
Simply you need to Sign-Up for an account or Sign-In to an existing one. Once this is done you will be automatically redirected to the home page. There you can find various of products which all users have set for sale. By clicking the +product button from the header menu you can create your own product. Once the product is created you will be redirected to the home page. On that page you may notice that your products have an *edit* and a *delete* icons at the top-right corner of the product card. This is because only you, as a creator of this product, have permission to manipulate the product data the way you like (*Change the imageURL, name, price, description, condition or delete it*).

The product card itself, contains a short information about the product and a **Details** button which will redirects you to the product details page.The product information on the same card has a link at the bottom which is the name of the user who created that product(*Notice that author **links** are available only for other user's products. Otherwise the link is disabled.*). Clicking the username link will redirect you to the profile page of this user. There you may notice that you have two options. The first one is to see if the user has or hasn't any products for sale by clicking the *USERNAME's PRODUCTS* and the second one is to return back to the previous page, simply by clicking the *BACK* button.

On the product details page you can see all of the product information, including the date when the product was created and last modified. On your own product cards you can see a edit icon which will redirects you to the edit product page. You will also able to see just a **BACK** button for your product details. If you are not the author of this product then a **ADD TO CARD** or **REMOVE FROM CARD** button will apear. Therefore by clicking it, you will add the current item to your cart.

Clicking the **Cart Icon** button on the header navigation will redirect you to your cart page, where you can explore all of the products you have purchased to this moment. You have the option to remove any of the products from the cart. By clicking the **CHECKOUT** button you will simply buy all of the products you have in your cart and you will be automatically redirected to the home page.

Few things left to explain. The button which consists your username is the button which will redirects you to your personal profile(*The same as the author link but with information about yourself*). There you may notice that you have an extra button called *EDIT PROFILE*. As the same says this will help you to change any of your user profile information except *Gender, Username, Password and Age*. The **MY PRODUCTS** button on its own will list all of the products which the currently logged user has for sale. You can delete the product from this section if you like or check its details.

Last but not least the **LOGOUT** button has left to explain. Nothing much to say about it. Clicking it will log you out from your account and you will be redirected back again to the login page. :bowtie:

### License:
MIT
