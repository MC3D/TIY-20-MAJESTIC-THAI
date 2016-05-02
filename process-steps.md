Application Process Steps

01. create model class
02. create model instance
    pass in data object
03. create model view class
04. create model view instance
    pass in model instance
05. define view el
06. define view template
07. define view render function
08. call view's render function
    check that data object renders in html

09. change model class to firebase model class
10. define model class urlRoot
11. change model instance data object to id
    this will create a data object with given id and default values
    use .set to update model values
    use .save to update server
    check server for new data object

12. define view class initialize function
    call this.render when model changes
    define remove function
    call this.remove when model is destroyed
13. create collection class
    define model
14. create collection instance
    instance manages a collection of models
15. define collection url (remove urlRoot from model)
16. call .fetch to fetch collection from the server

17. create collection view class
18. create collection view instance
    pass in collection instance
19. define collection render function
20. call collection view's render function   

21. define collection initialize function

22. create router (two step process -- combined into one)

23. create document ready function
