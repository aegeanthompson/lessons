![](https://imgur.com/4cnukJk.png)

# Ollivanders Wand Shop

![](https://imgur.com/RVuuRU7.png)

The Wand Ban in the Wizarding World has been lifted! This ban (*passed in 1631*) prevented non-human magical beings from using wands and extending their powers. 

Now that wand-use is legal for these creatures for the first time in centuries, they are all flooding over to Ollivanders Wand Shop. He'll need to be able to quickly assign wands to his long line of mystical customers! 

# Set up

Use Create React App (and don't forget to remove the `.git`) to set up a react project called `ollivanders-app`

In `App.js` clear out all their stuff and just have an h1 element displaying 'Hello Wizarding World'

You should now have an h1 element render in the DOM

- **Optional** : Bored of plain html? Want to make your Ollivanders App feel more magical with some CSS? Set a timer for 10 minutes and add a `index.css` file, include a google font, background color and font color. If you have some leftover time try to style some thing else, a special style for the h1? You'll be using a `ul` and `li`s as well, maybe some other colors or fonts there?

## Inside the App class

```js
class App extends React.Component {
  render () {
    return (
      <div className='container'>
        <h1 className='shop-name'>Ollivanders Wand Shop</h1>
      </div>
    )
  }
}

```
<hr>
&#x1F534; **Commit your work** <br>
The commit message should read: <br>
"First Component Created".
<hr>

## Add State to the App Component

[State should be set in the constructor](https://reactjs.org/docs/state-and-lifecycle.html)

```js
constructor(props) {
    super(props)
    this.state = {
      customers: [
        {
          name: "Dobby",
          type: "House-Elf",
          id: 1
        },
        {
          name: "Winky",
          type: "House-Elf",
          id: 2
        },
        {
          name: "Firenze",
          type: "Centaur",
          id: 3
        },
        {
          name: "Griphook",
          type: "Goblin",
          id: 4
        },
      ]
    }
```
<hr>
&#x1F534; **Commit your work** <br>
The commit message should read: <br>
"State Added"
<hr>

## Create a Customers Component 

1. Create a `Customers` class
2. Have the render function return a `ul` - leave it empty for now.

## Create a CustomersList Component and Pass Props

1. Create a `CustomerList` class 
2. Have the render function return an `li` that includes the customer name and type.

## Return to the `ul` in your Customers component
1. Map over customers 
2. Have the map function return the Customer list 
3. Set a value for customer
4. Don't forget to assign a key to the map elements. You can use index or you can also consider using id from the data. Since most of the time you'll be getting data from a database and that data will have an id, it is a nice option to have

![](https://imgur.com/BPntQst.png)

Check your react dev tools too

Expected Appearance

![](https://imgur.com/5b3hn1d.png)

Once you are rendering the list without errors it is time to add functionality to our list items in order to reveal the wand selections. 

<hr>
&#x1F534; **Commit your work** <br>
The commit message should read: <br>
"Rendering List Items"
<hr>


## Write a Function that is Called by a Click Event

1. Inside the App class

```js

selectWand () {
  console.log('clicked it and the value of this is:', this)
}
```
1. Add a click event to the `li` in the CustomerList component
2. `this` is undefined/null? Make sure you add the function to the constructor in your App Component and bind `this`

Once the function is called on and this has the expected value:
1. Let's give that `selectWand` function some more functionality. This app is going to suggest wands to all of Ollivander's customers.
2. Add in the following array of wands to choose from - you can place it at the top of your `app.js` to be used globally. 

```js
const wands = ["Holly wood w/ Phoenix Feather", "The Elder Wand", "Walnut w/ Dragon Heartstring", "Rosewood w/ Veela Hair", "Hawthorn w/ Unicorn Hair", "Vine w/ Dragon Heartstring", "Maple w/ Phoenix Feather", "Hazel w/ Unicorn Hair", "Blackthorn w/ Troll Whisker"];
```

3. Write a `randomWand` function that will pull a random wand from this array. 

4. Inside of your `selectWand` function create a variable for `suggestedWand` and assign a `randomWand` to it.

5. Update customer.name to display the wand suggested. 

6.  We have to call` this.setState({})` at the end of our `selectWand` function to update our state and thus update our data and view

```js
selectWand (customer) {
    const suggestedWand = randomWand()
    customer.name = `${customer.name}'s Wand Selection: ${suggestedWand}`
    this.setState({customers: this.state.customers})
  }
```

On click of the `li` it should now update to read
![Dobby's Wand Example](https://imgur.com/dHpFWXX.png)

1. It isn't obvious that we have to click the li element to get the wand suggestion:
in the CustomerList component, inside the li, let's add a button that says 'Wand Suggestion', and let's move the click event to the button

2. Nice but we can click the button many times, which makes the advice come out a bit, weird

![weird](https://imgur.com/S7jlPjz.png)

1. Let's fix this by only allowing the button to show up if `wandSelected` is false
2. Let's update our state, add a key `wandSelected` to each customer with a property of `false` to start
3. Add a ternary operator to determine whether or not a button should be displayed in the CustomerList component
4. Not working? Did you pass this property down from App?

![](https://imgur.com/rM5MfKA.png)

<hr>
&#x1F534; **Commit your work** <br>
The commit message should read: <br>
"Function on Click"
<hr>

1. It should be quite easy to update the customer...something like:
```
customer.wandSelected = !customer.wandSelected
```

  <hr>
&#x1F534; **Commit your work** <br>
The commit message should read: <br>
"Wand Selection Button Functionality"
<hr>

## Add More Customers Through a Form

1. Should we make a new component just for a single input form? Nah, having one massive and complex component isn't the react way, but over-normalizing and making every html element a component isn't useful either
2. In our App component let's set up a form - two inputs, one text, one submit, right below the `h1`
3. Write two functions, one for handling the item input change and another for the item input submit
4. Add a new property to `this.state` in the app component called `newCustomer` and set it to an empty string
5. The text input will have an onChange event listener that will call the corresponding function
6. The form will have an on submit that will call the corresponding function, remember to prevent the default behavior for submit, see if you can empty the input after submit as well
7. On submit be sure to create an object that matches our other data and try shifting it into our customers array

<hr>
&#x1F534; **Commit your work** <br>
The commit message should read: <br>
"Able To Add More Customers"
<hr>


# Hungry for More

## Turn away a customer due to interest in dark magic (delete them)

It's hungry for more! Figure it out! You can do it!

## Help Ollivander out by updating his inventory 🧙

Add an array of objects within state that will keep track of all of Ollivander's wands. You can include keys for the name and whether it is still inStock (boolean). Refactor your code to use this your new array to make wand suggestions and include a button to update whether it was purchased or not.

## Practice CSS

Give your app some more magical styling!✨
