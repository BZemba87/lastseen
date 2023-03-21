# Last Seen 

This is a social media image sharing site that allows users to create, read, update and delete posts, comments, likes and profiles.

Please click link to live site [here](https://last-seen.herokuapp.com/).

## User Stories 

I used the Agile Methodology Tool on Github to plan my project and use as a to do list. I labelled tasks with Must Have and Should Have and moved the issues I was working on across the board from the To Do column to the In Progress column. Completed issues would then be dragged across to the Done column.  

<h2 align ="center"><img src = "public/user-stories.png"></h2>

# Wireframes

## Home Page

<h2 align ="center"><img src = "public/homepage.png"></h2>

## Home Page Logged In

<h2 align ="center"><img src = "public/homepage-loggedin.png"></h2>

## Create a Post

<h2 align ="center"><img src = "public/createpost.png"></h2>

## Login

<h2 align ="center"><img src = "public/login.png"></h2>

## Sign Up

<h2 align ="center"><img src = "public/signup.png"></h2>

## Forgot Password

<h2 align ="center"><img src = "public/forgotpassword.png"></h2>




# Deployment
- This React application is deployed to Heroku. Please follow the steps below:

- Fork or clone this repository in GitHub

- Log in to Heroku

- Click on 'New' and select 'Create new app' from the dropdown

- Enter a name for the app and select the appropriate region

- Select 'Create app'

- Click on 'Settings'

- Select 'GitHub' and confirm you wish to deploy using GitHub

- Find the 'Connect to GitHub' section and use the search box to locate relevant repo

- Select 'Connect'

- If you would like your site to be automatically deployed with each change that is pushed to Github, choose the 'main' branch under 'Automatic Deploys' and select 'Enable Automatic Deploys'

- Alternatively, you can select 'Manual Deploy' below and choose 'main' as the branch to deploy and select 'Deploy Branch'. Your site will only be manually deployed when you choose

- Once the deployment process is complete, you will be able to click on a link to your deployed site

# To connect the front end site to the back end on Heroku and Gitpod:
- Add new config var to API on Heroku called CLIENT_ORIGIN with a value of the url for the deployed React project

- Add a CLIENT_ORIGIN_DEV key with the value of your Gitpod preview link

- Now we need to tell our React project to send requests to the API

- To do this, install the Axios Library in your Gitpod workspace 

- Create an api folder with an axiosDefaults file inside it and import axios

- Now add base_URL of your deployed API project

- Set the content-type header to multipart/form-data

- Set withCredentials to true

- Import them into App.js

# Credit
- Code Institute Moments Walkthrough
- Mentor

