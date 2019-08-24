## Contact Info Portlet

This project was created so I could learn to make Java Liferay Portlets. 
Liferay portlets are designed to be displayed on a page among lots 
of other portlets, so each one has its own section of the page. 
The contact info portlet allowed me to understand setting up a 
MySql connection, validate contact information using Regular Expressions, and familiarize myself with the various aspects of Liferay portlet creation. 

![Liferay contact info portlet displaying contact information](/images/contact.png)

### Code Snippets

This function is used to store phone numbers in a uniform format. 
Instead of saving the phone number in the exact way that was entered
in the form, I decided to allow the user to submit a phone number in 
many different formats and then call this function to change it to a 
uniform desired format. 

*ContactInfo.java*
```java
/**
    * Converts Phone number of any regular format to xxx-xxx-xxxx or xxx-xxx-xxx-xxxx, based on length.  
    * @param phoneNumber ex: (424)852-4789
    * @return 	424-852-4789
    */
private String formatNumber(String phoneNumber){
    phoneNumber = phoneNumber.replaceAll("\\D", "");
    
    String newNumber=phoneNumber.substring(phoneNumber.length()-4, phoneNumber.length());
    phoneNumber = phoneNumber.substring(0, phoneNumber.length()-4);
    newNumber   = phoneNumber.substring(   phoneNumber.length()-3, phoneNumber.length()) + "-" + newNumber;
    phoneNumber = phoneNumber.substring(0, phoneNumber.length()-3);
    newNumber   = phoneNumber.substring(   phoneNumber.length()-3, phoneNumber.length()) + "-" + newNumber;
    
    if(phoneNumber.length()>3){
        phoneNumber = phoneNumber.substring(0, phoneNumber.length()-3);
        newNumber = phoneNumber + "-" + newNumber;
    }
    return newNumber;
}
```

In future projects I will use well-tested libraries or regular expressions
to sanitize input, but in this project I decided to strengthen my 
Regular Expression skills and format my own. The following code will 
check if each variable fits the desired format, and if not will build 
a string up that will be sent to the front end page alerting the user 
that their form input could not be accepted. Since international phone 
numbers can be much longer I adapted the Regex to accept many acceptable 
forms.

*ContactInfo.java*
```java 
if(name == "")
    sendToClient += "[Contact name] ";
if (!number.matches("\\d*-?\\(?\\d{3}\\)?-?\\d{3}-?\\d{4}$"))
    sendToClient += "[Phone Number] ";
if (!email.matches(".+@.+\\..+"))
    sendToClient += "[Email] ";
```

This code will display an error to the user if their form input 
was not acceptable. The *errors* variable is from the request from the 
back end Java file. 

*add_contact.jsp*
```java
<%
if( errors != null ){ 
%>
    <div class="alert alert-danger" role="alert">
        <strong>Oops</strong> The following were invalid: <%=errors %>
    </div>
<%
}
%>
```

### Review

This project was very helpful to adapt to the Liferay portlet development environment. 
After spending time with this project I feel much stronger with SQL, Bootstrap, Regular 
Expressions, Dynamic Web Pages and backend Java configurations. The full code for this project
is privately hosted on my Github and available by request.  