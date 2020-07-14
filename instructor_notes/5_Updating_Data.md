# Integrating React w/Rails - Part 5: Updating Data

### Lesson objectives

_After this lesson, students will be able to:_

- Prefil the form with the original post data
- Update data / make a PUT request to the backend

## An Overview

### Where do we want to update our data?

By now the answer should come easier - all our data resides in the Main, therefore we want to make the actual PUT request there.

### Okay, but how?

We already set it up so that clicking on the `edit post` button toggles the form view on. That's great, but if we were to actually put anything in the form and submit it, it wouldn't update the post we clicked on. It would just create a whole new post.

Do we have to create a whole new form component that just handles edit then? No! Remember, React components are _reusable_. We already have a form that has all the inputs we need for editing a post as well, so let's just refactor our code a bit!

### What we want to achieve  

When the user clicks on the edit post button, it should toggle the form view on _and_ autopopulate the form inputs with the clicked post's data. Then, when the user submits the form, it should make a PUT request to update that post.

## Refactoring App

Currently when we click on `edit post`, it calls on `handleView` and passes data up to App, which then updates state by changing the `view.page` and `view.pageTitle`. That then triggers a re-render, and the Form is toggled on.  

If we want to autofill the inputs of the Form, we need to do a similar process: pass the clicked Post's data back up to App, which can then send that data back down to Form.

So, let's start by adding to App's state

#### In `App.js` constructor

Add a `formInputs` object with all the necessary input keys. We also want to add a key for the `id` so that the App knows what post is being edited, if any.

```js
this.state = {
  view: {
    page: 'home',
    pageTitle: 'i heard that...',
  },
  formInputs: {
    name: null,
    image: null,
    body: null,
    id: null
  }
}
```

Now, we just need to set the `formInputs` state depending on the view.

#### In `App.js` handleView method

Add a variable `postData` as an argument to `handleView`. Now, when we call on `handleView` after clicking on the `edit post` button, we can pass up the post's data.

Then, set a default `formInputs` object with empty strings for when the view is either home or addPost.

Next, in the editPost case, we of course want to change the `formInputs` object to have non-empty string values. Set them instead to the `postData`

And finally, add `formInputs` to `setState`

```js
  handleView = (view, postData) => {
    // declare an empty variable
    let pageTitle = ''
    let formInputs = {
      name: '',
      image: '',
      body: '',
      id: null
    }
    // decide the pageTitle based on the view
    switch (view) {
      case 'home':
        pageTitle = 'i heard that...'
        break
      case 'addPost':
        pageTitle = 'what did you say?'
        break
      case 'editPost':
        pageTitle = 'what did you really say?'
        formInputs = {
          name: postData.name,
          image: postData.image,
          body: postData.body,
          id: postData.id
        }
        break
      default:
        break
    }
    // update the state
    this.setState({
      view: {
        page: view,
        pageTitle: pageTitle
      },
      formInputs: formInputs
    })
  }
```

If you try and test it now, it will error since we haven't actually lifted any `postData` up. Let's do that next.

#### In `Post.js` render method

```jsx
<li onClick={() => {this.props.handleView('editPost', this.props.postData)}}>edit post</li>
```

If you test it, it should now switch to the form view _but_ the inputs are still empty.

That's because we haven't passed the `formInputs` down to the Form

#### In `App.js` render method

```jsx
<Main
  view={this.state.view}
  handleView={this.handleView}
  formInputs={this.state.formInputs}
/>
```

#### In `Main.js` render method

```jsx
<Form
  handleCreate={this.handleCreate}
  formInputs={this.props.formInputs}
/>
```

Testing now will still give you the same result: an empty form. However, if you check React console, you'll see our state was updated correctly and the props were sent down successfully.

Now all we have to do is fix the form so that it actually autopopulates based on the view.

## Refactoring the Form

Looking at the form, it's already properly set up. The value is set to the state, so that onChange it will update to whatever the user has typed. In other words, the form is very reliant on the input values being set to the Form state.

Because of that, we can't simply just change the input values to equal the `formInputs` from App. If we can't change the value, we have to change the state instead.

Remember the `componentDidMount` method we learned earlier? Let's use that again to update the state when the component first loads

#### In `Form.js`

```js
componentDidMount() {
  this.setState({
    name: this.props.formInputs.name,
    image: this.props.formInputs.image,
    body: this.props.formInputs.body,
    id: this.props.formInputs.id
  })
}
```

Cool! The inputs are not autofilled, but if you actually submit it, it still _creates_ a new post instead of editing. That's because our Form's `handleSubmit` currently only calls on `handleCreate`. Let's create a new method then for handling updates.

And remember, we want to make the actual PUT request in `Main`, and we'll just have to pass the method down as a prop.

The general `fetch` syntax for PUT is the exact same as POST. We just have to change the method to PUT.

#### In `Main.js`

```js
handleUpdate = (updateData) => {
  fetch(`/api/posts/${updateData.id}`, {
    body: JSON.stringify(updateData),
    method: 'PUT',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  })
    .then(updatedPost => {
      // switch back to the home view after editing a post
      this.props.handleView('home')
      // for simplicity's sake, we'll just make an extra AJAX call to automatically load the post this time!
      // if you're up for a challenge though, try and see if you can figure out how to do it without an extra call
      this.fetchPosts()
    })
    .catch(err => console.log(err))
}
```

Pass it down to Form as a prop, as well as the view so that the Form knows if we're currently editing or creating

#### In `Main.js` render method

```jsx
<Form
  handleCreate={this.handleCreate}
  handleUpdate={this.handleUpdate}
  formInputs={this.props.formInputs}
  view={this.props.view}
/>
```

Refactor `handleSubmit` to either create or update depending on the current view page

#### In `Form.js` handleSubmit method

```js
handleSubmit = (e) => {
  // prevent default form submit action
  e.preventDefault()
  // if the view is currently addPost
  if(this.props.view.page === 'addPost') {
    // create a post
    this.props.handleCreate(this.state)
  } else if(this.props.view.page === 'editPost') { // else if the view is editPost
    // update the post
    this.props.handleUpdate(this.state)
  }
}
```

---

**PREVIOUS**: [CREATING DATA](4_Creating_Data.md) <br/>
**NEXT**: [DELETING DATA](6_Deleting_Data.md)

---

## Bonus

<details><summary><strong>Click for a bonus code-along</strong></summary><p>

You might have noticed that if you click on edit post and then change your mind and try to add a new post instead, the form will still be autopopulated:

![](https://imgur.com/NXOpJcB.gif)

Technically, it's fine. Because if you try to submit after changing to "ADD POST", it will actually _create_ instead of _edit_. But, it is still a bad user experience.  

### Why does this happen?

#### componentDidMount only runs once after being mounted

Remember how we learned earlier that `componentDidMount` will only run _once_ after the component initially is mounted? Well, that's precisely why.

When we click on the `edit post` button, we mount the Form.

Then, when we click on the `add post` button, the Form is still mounted from the first time, none of it's state changes, and so it doesn't re-render or run the `componentDidMount` again.

Thus, the form input stays the same because the state stays the same.

#### Props changing doesn't cause a re-render

But wait, if you check your React console after clicking on ADD POST, you'll notice that the Form props for formInputs actually changed:

![](https://i.imgur.com/HS7bJgj.png)

If the props changed, why didn't it cause the Form to re-render, and thus run componentDidMount again?

Because components **only re-render when its state changes**.

In this case, only the props changed, therefore it didn't cause Form to re-render.

### How do we fix it?

Even if the component doesn't re-render, that's totally fine! The React devs again anticipated this problem and there is another life-cycle that we can use: `componentDidUpdate` (read more in depth about it on the [React docs](https://reactjs.org/docs/react-component.html#componentdidupdate))

This life-cycle method will run whenever the component updates anything (state _and_ props). And similar to the `prevState` updater we use in this.setState, `componentDidUpdate` also has a snapshot of the previous state and props that you can put in the argument.

In our case, we only need the previous props, so we'll just include that. And then inside of the method, we can do whatever we want to happen after the props update.

For this build, we want to setState again to match the new formInputs props:

#### In `Form.js`

```js
componentDidUpdate(prevProps) {
  this.setState({
    name: this.props.formInputs.name,
    image: this.props.formInputs.image,
    body: this.props.formInputs.body,
    id: this.props.formInputs.id
  })
}
```

Uh-oh! If you test that out, it'll error out pretty bad. Why?

Like mentioned earlier, `componentDidUpdate` will run whenever props _and_ state change. So, because we updated state inside the method, that makes `componentDidUpdate` run again, and again, and again, and oh no, it's an infinite loop again.

That's fine, because we can fix that simply! This is where the `prevProps` snapshot comes in. All we have to do is compare prevProps to the current props and make sure they're not the same. That way, it'll only setState the first time.

#### In `Form.js` componentDidUpdate

```js
componentDidUpdate(prevProps) {
  if(this.props.formInputs.name !== prevProps.formInputs.name) {
    this.setState({
      name: this.props.formInputs.name,
      image: this.props.formInputs.image,
      body: this.props.formInputs.body,
      id: this.props.formInputs.id
    })
  }
}
```

And ta-da! It's fixed!

</p></details>
