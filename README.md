![](/ga_cog.png)

---
Title: Introduction to CSS Grid<br>
Type: Morning Exercise <br>
    Course: SEIR-Avocado-Toast<br>
Competencies: CSS, Grid<br>
Prerequisites: HTML, CSS basics<br>

---

# CSS GRID

![](https://imgur.com/IqIRrx1.png)

## What is CSS Grid?

CSS Grid Layout is a two-dimensional layout system (which means it includes both columns and rows). So far we've been using Flexbox which is very useful, but is only a one-dimensional system (it controls either columns OR rows). You can actually use Flexbox and Grid together.

Grid is a very useful when you need to custom your layout beyond the capabilities of floats or Flexbox.

### Can I use grid?

Grid is supported almost universally on modern browsers.

You can always check out [caniuse.com](http://caniuse.com/) and [shouldiprefix](http://shouldiprefix.com/) to ensure that you are able to use Grid with whichever browser you need it to display on.

## Basic Terminology

![](https://imgur.com/41BYy6R.png)

- **Grid container** - An element that defines a grid-formatting context for its contents.

- **Grid item** - A thing that participates in grid layout within a grid-formatting context.

- **Grid track** - A continuous run between two adjacent grid lines. A grid row or column.

- **Grid cell** - Any space bounded by four grid lines, with no grid lines running through it.

- **Grid area** - Any rectangular area bounded by four grid lines and made up of one or more grid cells.


## Today's Build
![](https://imgur.com/4Z16JXq.png)

### Getting Started

#### Starter-Code Directory
- cd into w10d02 morning_exercise folder
- atom .
- Inside there are two files `index.html` and `main.css`
- `main.css` is the only file you will edit this morning
- Open `index.html` in your browser

(Fun fact Firefox includes a Grid Inspector, you can open it there if you have it - or you can check-out my example)

#### Let's start by adding in our grid
main.css
```
.container {
  display: grid;
}
```
## Creating Our Grid

#### Explicit vs Implicit Grids
- An **Explicit Grid** is when we manually define our grid using `grid-template-rows`, `grid-template-columns` and `grid-areas`.
- An **Implicit Grid** is formed when there are more grid items than cells in the grid or when a grid item is placed outside of the explicit grid, the grid container automatically generates grid tracks by adding grid lines to the grid.

### Let's define our rows and columns
main.css
```
.container {
  display: grid;
  grid-auto-columns: 1fr;
  grid-template-rows: 200px 500px 200px;
}
```

When creating our rows/columns we can use the normal measurements such as px or em, as well as new `min-content`, `max-content` and `auto`. We also have the option of using fractional units.

When using fractional units you are specifying the fractional amount of space out of what is available you would like for a column/row to take up. For example purposes we have used pixels for the template-rows and fractional units for the grid-columns.

### Now let's specify where we want our grid items to show up within our grid.
- To do so we are going to state which column we would like our item to start at `grid-column-start`.
- You can also specify which column you would like it to end on `grid-column-end`.
- If you don't set an end point it will automatically take up one column.

Let's start with our header section.

```
.header {
  grid-column-start: 1;
  grid-column-end: 11;
}
```

#### Now define our  `.header` rows:

```
.header {
  grid-row-start: 1;
}
```
We aren't going to specify our row end point because for this lesson we will just have one row.

#### We can move on to the sidebars now

```
.leftSidebar {
  grid-column-start: 1;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 4;
}

.rightSidebar {
  grid-column-start: 9;
  grid-column-end: 11;
  grid-row-start: 2;
}

```

#### Let's now choose where we want our `.main` content displayed within our grid
```
.main {
  grid-column-start: 3;
  grid-column-end: 9;
}
```

#### Finally we will create a grid within a grid for our `.footer` section

 Let's start by placing the footer in our original grid. This time let's use `grid-area` to accomplish this. 
 
Grid-area can be used as shorthand for row start / col start / row end / col end.

 ```
 .footer {
  grid-area: 3 / 3 / 4 / 11;
 }
```

You could also write it like this: 

```
.footer {
  grid-area: 3 / 3 / span 1 / span 8;
}
```

Now we can make the `.footer` section into it's grid

```
.footer {
  display: grid;
  grid-template-columns: repeat(11, 1fr);
  align-items: center;
}
```

Notice something new?

That's the `repeat()` notation we are using for our `grid-template-columns`.

We are saying that we want 11 columns that each take up 1 fractional unit.

You can also use `grid-area` to name grid items and then use them to create `grid-template-areas`.

Ex. (you don't need to add this)

```
.header { grid-area: header; }
.main { grid-area: main; }
.leftSidebar { grid-area: left; }
.rightSidebar { grid-area: right; }
.footer { grid-area: footer; }

.container {
  grid-template-areas:
    'header header header header header header'
    'left main main main right right'
    'menu footer footer footer footer footer';
}
```

#### Placing our footer items

We have 4 items in our footer section, let's go ahead and specify where we would like these all to go within our footer grid.

```
#footer1 {
  grid-column-start: 3;
}

#footer2 {
  grid-column-start: 5;
}

#footer3 {
  grid-column-start: 7;
}

#footer4 {
  grid-column-start: 9;
}
```

#### Centering our text elements within our grid items

So our text is looking pretty funky, let's go ahead and clean that up.

We are able to both `justify-items` (aligns items along the row axis) and `align-items` (aligns items along the column axis).

Additionally you can use `place-content` which allows you to specify both of the above in one line.

#### Let's use `align-items` to center our text

```
.container > div, h1, h2 {
  display: grid;
  place-items: center;
}
```

#### Lastly let's take a look at a few other features `grid-row-gap` and `grid-column-gap`

This will specify the size of the grid lines.

```
.container {
  grid-column-gap: 10px; 
  grid-row-gap: 15px; 
}
```

#### You can also use `grid-gap` for shorthand to declare both in one line.

```
.container {
  grid-gap: 15px 10px; 
}
```

## Final Thoughts 

That is all we are going to go over today, though Grid has many more useful features that you can utilize. Take some time to review and learn more about Grid using the resources below. 


## References
[CSS-TRICKS A Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)

[Learn CSS Grid](https://learncssgrid.com/)

[Grid Garden (A game for learning grid)](https://cssgridgarden.com/)

[CSS Grid Changes EVERYTHING (YouTube)](https://www.youtube.com/watch?v=7kVeCqQCxlk)

["Grid Layout in CSS: Interface Layout for the Web" by Eric A. Meyer](http://file.allitebooks.com/20161222/Grid%20Layout%20in%20CSS.pdf)
