## Notes

![Website Photo where Notes are stored](/images/notes.png)

*[Senior-Year-Notes](https://mattfossett.github.io/Senior-Year-Notes/)*

This is a website created to store class notes taken. A friend of mine is taking some of these classes remotely and asked me to record lecture audio, so I thought a nice way to provide this for him is to host it along with my own notes so that he has a better chance at following the audio. Notes are created using Github's Markdown and are able to be pushed quickly after class. 
One problem I quickly found with this method is that before a class started, I would have to make a new markdown file to be "included" in the class main page. I would then have to update the class page to import this file, and then lastly update its links at the top of the class page. I decided to automate this process with the following script. 

```bash
#!/usr/bin/env bash
# populateFiles numberedClass date [optional- any char specifies sound file inclusion]
# Designed to populate .md files with information for notes site

echo "#### _$2_" >> _includes/$1/$2.md
if [ $# -eq 3 ]
    then 
        echo "<audio controls>" >> _includes/$1/$2.md
        echo "  <source src=\"/Audio/$1-$2.mp3\" type=\"audio/mpeg\">" >> _includes/$1/$2.md
        echo "Your browser does not support the audio element.</audio>" >> _includes/$1/$2.md
fi
echo "* [$2](#$2)" >> _includes/$1/links.md

echo "" >> $1/index.md
echo "***" >> $1/index.md
echo "" >> $1/index.md
echo "{% include /$1/$2.md %}" >> $1/index.md
echo "" >> $1/index.md
echo "*[Back to index](#$1)*" >> $1/index.md

code _includes/$1/$2.md
```

This script simply makes a new markdown file with a provided name, and puts in an audio tag if the optional parameter is included. It then puts a link to the heading of this file and includes it on the main site. Lastly, it will open up the new file in Visual Studio Code so that I can immediately take notes. 
This project also contains a simple script for quickly committing and pushing to git, which allows me to run one quick command after class and have the changes be live. 

*[Senior Year Notes Repo](www.github.com/MattFossett/Senior-Year-Notes)*