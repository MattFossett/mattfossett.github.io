## iMessage Clone

This is a ridiculously simple PHP project that is 
designed to mimick the functionality of the iOS iMessage 
platform. Messages are _literaly_ stored with HTML 
elements nested around them, plaintext in a file. 
This is **not** meant to be a serious messaging platform, 
but did teach me interesting style details and sparked 
interest in a real chat platform! 

![photo of a conversation using this iMessage clone](/images/iMessage.png)

The following PHP code shows the idea of reading in the 
.txt file, parsing the username and if it matches the previously 
stored username then applying the style elements for messages to 
appear on the right. 

```php
/* Text file example lines
jimmy~<div class="whole"><div class="leftBubble">hey its me</div></div>
matt~<div class="whole"><div class="leftBubble">Hello</div></div>
matt~<div class="whole"><div class="leftBubble">whats poppin</div></div>
*/
$messages = file("messages_log.txt");
foreach ($messages as $message){    
    $s = explode('~', $message);
    if ($s[0] == ''){
        continue;
    }
    if ($s[0]==$username){
        echo( str_replace('leftBubble', 'rightBubble', $s[1]) );
    } else {
        echo ($s[1]);
    }	
}
```
```css
.leftBubble{
    width: 500px;
    float: left;
    padding: 20px 10px 20px 10px;
    background-color: #d3d3d3;
    border: 2px solid transparent;
    border-radius: 20px;
    
}

.rightBubble{
    width: 500px;
    color: white;
    float: right;
    padding: 20px 10px 20px 10px;
    background-color: #007aff;
    border: 2px solid transparent;
    border-radius: 20px;
    margin-left: 20px;
    
}
```

This project was fun because it was very quick to throw together and 
allowed friends and I to work on simple exploits on the way I was storing
data. By simply sending a message in <style> or <script> tags, we were able
to completely wreck the pages' contents. If I were to implement this again I 
would use a SQL database and **only** store the plaintext message, and simply 
apply HTML and style later. I think it is also very clearly important to parse 
the stored messages for any odd characters, like HTML tags, and escape them. 
