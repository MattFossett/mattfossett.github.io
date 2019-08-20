## [It's Not Foss](https://github.com/MattFossett/its_not_foss)

The goal for this project was to make a web application
that would be hosted locally in my apartment to share 
posts and photos with roommates. The name is inspired by 
the website [itsfoss.com](https://itsfoss.com/), and how 
it is very closely related to my last name.

### Specification

Python Web Development is far more abstract than any other 
web technology I have used. All of the online resources I was 
referencing recommended similar modules that took 
a lot of the typical web development concepts out of the picture. 
Instead of manually processing form parameters and using 
regex to check myself, I used **WTForms**. This had validator functions
that verified if input was a valid email or if password fields
matched, etc. The templating system is **Jinja** which was very 
intuitive. The database is a **SQLite** instance since I did not
need anything scalable or feature-rich for this project. 
The database is accessed by **SqlAlchemy**, which gives a 
very Object-Oriented approach to querying the database. The style
takes advantage of **Bootstrap** which gives it a modern look. 

![photo of blog style web application](/images/not_foss.png)

### Findings

Overall this project taught me a different way to program web applications. 
While I did follow [Corey Schafer's Flask Tutorial](https://www.youtube.com/watch?v=MwZwr5Tvyxo)
very strictly, I learned a lot about Python, SQLite, and Bootstrap. 
