# Epatrakaar-newsApi
In this Api project. We provided authentication using JWT token. In this we provided REGISTER &amp; LOGIN functionality. User can fetch the article and And the AUTHOR can post the article and Admin can update and delete the article.


<h2> Method to use the project: </h2>

: Clone this project and make it run the project in your system.


<h2>Endpoints of the api: </h2>

          Epatrakaar Endpoints


NOTE:- LINK = http://52.66.197.82:5000


For AUTHENTICATION
1.)  For Register
   :- LINK/api/register

2.) For Login
   :- Link/api/login

3.)  For Logout
  :- Link/api/logout


For User Details
4.)  For user details
  :- Link/api/me


For News related
5.) For Posting the news
  :- Link/api/article
 
NOTE: For posting the news, User should be login

6.)  For Updating the news
  :- Link/api/article/id

NOTE: Only admin can update the news, Admin should be login, and in place of id... give the id of the article you want to update

7.) For Delete the news
  :- Link/api/article/id

NOTE: Only admin can delete the news, by giving the id and admin should be login

8.) For Get the all news
  : Link/api/articles

9.) For getting the news by providing details

  :Link/api/articlefilter?author=Alok
- It will display all the news whose author is Alok

  :Link/api/articlefilter?category=technology
- It will display all the news whose category should be technology

  :Link/api/artcilefilter?tags=tech
- It will display all the news, in which tech will present in the tag

  :Link/api/articlefilter?keywords=iphone
- it will display all the news, in which iphone will be present in the keywords

  :Link/api/articlefilter?author=alok&from=22-12-02
- it will fetch all the news from 22-12-02 to till now AND whose author will be alok

  :Link/api/articlefilter?author=alok&from=22-12-02&to=22-12-07
- it will fetchall the news from 22-12-02 to 22-12-07 AND whose author will be alok
