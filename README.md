![](https://imgur.com/dGHOo9n.png)

# Homework Submission Guide 

You will receive homework every evening at about 5:50pm EDT -- please have it submitted for grading by 10AM EDT the next morning! Sometimes there will be too much homework to complete, and sometimes you might just get stuck and not get everything done, and that's totally okay. It's a good idea to set a limit for how long you work on the homework: generally speaking, you want to dedicate about four to five hours each night (set a cutoff of midnight - 1am EDT). You want to be properly rested for the next day's learning.

### 1. Get your homework
 
To access your homework, you will pull the files from Github. The instructors typically post homework at the end of the day right before announcing the homework, so please be sure to pull again after homework announcement! On the command line navigate to the class remote repo on your local machine. You want to pull from upstream with the following command::

```
git pull upstream master
```

![git pull](https://i.imgur.com/CM8ltZk.png)

Press enter, and the Terminal output should look something like this:


![git pull](https://i.imgur.com/S4VqLtp.png)

If there were no changes upstream, or if you have already received the changes, then you won't get anything from Github. Your Terminal output will say 'Already up-to-date' instead:

![git pull](https://i.imgur.com/6U1PYMe.png)



### 2. Complete your homework

Work on your homework in the **homework** folder for that particular day.

- Some homework will come with **starter code** and you can start coding directly in the provided files inside the homework folder according to the instructions.

- If homework does not come with starter code, you will need to create the necessary folders and files inside the homework folder.

- At certain intervals in your homework markdown, you will be given prompts to commit your work to git. Please follow these prompts because they are an important part of grading your work.


### 3. Commit your work to your local Git repo

* To submit your homework after you have followed all the commit prompts
  1. commit it on your local Git repo
  2. push it to your repo on Github. 
  
The overall process looks like this: in the root folder of your class repo you will run the following commands:

```
git add .
git commit -m 'my commit message'
git push origin master
```

But first, let's commit to your local, checking on the status of your files along the way. See the status of your homework files with `git status`:  


![git_status_1](https://i.imgur.com/sJSzNQh.png)

The above shows that the homework file has been changed but not staged for commit. To stage the file, type `git add .`

![git_add](https://i.imgur.com/KwwUmUv.png)

Then, type `git status` again to see that it has been staged:

![git_status_2](https://i.imgur.com/objcvPV.png)

This shows that the file is staged, but not committed. To commit the changes, type `git commit -m 'my commit message'`. Make sure your commit messages are short and descriptive of the changes.

![commit](https://i.imgur.com/RqOMBem.png)

Terminal output should look like this after committing:

![commit2](https://i.imgur.com/B60hMaP.png)



### 4. Push your commits to Github

Now push your commits to Github with `git push origin master`.

Note that you are pushing to `origin` **not** `upstream`. Your forked repo in this case is your **origin**, and this is where you want to push your homework.

![git_push_1](https://i.imgur.com/GmHYWrM.png)

Terminal output will look like this:

![git_push_2](https://i.imgur.com/1GG7QZ1.png)

- Now your folders and files should appear in your repo on Github. 



### 5. Make a Github Issue for your homework

Your homework is submitted via Github Issues. For this you will want access both to the main GA class repo, and to your own **forked** repo on the Github website. Bookmark both when you have them open.

You can easily tell which repo you are looking by checking the name in the top left:

#### This is the main repo
This repo is where the instructors put course material  
![main_repo](https://i.imgur.com/V5oOKxR.png)

#### This is your forked repo
This repo is your fork of the main repo, where you push your own work. It will have your username instead of singular000.
![forked_repo](https://i.imgur.com/SiIrlKv.png)

Above your forked repo in the url bar, copy the url of the homework folder you worked in:

![url_copy](https://i.imgur.com/pYKA6Y4.png)

  


#### On the [main repo](https://github.com/ga-students/wdi-remote), click on the "issues" tab.

![issues_1](https://i.imgur.com/HCIcilp.png)


#### Click on the green "New Issue" button

![issues_2](https://i.imgur.com/iGcumCR.png)


#### Fill out the form in the issue:

![](https://i.imgur.com/39jmFEX.png)
		
Then, click the Submit New Issue button.

![issue_3](https://i.imgur.com/B2vfGOn.png)

Congrats! Your homework is submitted! We will be able to see your Issue on the main repo and follow the link to your homework in your forked repo. You will receive feedback from the Homework Grader via email. If you have questions about your feedback, please reach out to the homework grader!
