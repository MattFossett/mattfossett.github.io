# Computer Science Labs

Millersville University Computer Science Professors ask that 
the assignments are not publically available but they highly 
encourage the use of a private repository. My full coursework is 
available upon request. Here are some highlights of my favorite 
assignments.

## Binary Search Tree

This lab is known for being complicated and I enjoyed the 
challenge. There are so many cases to think through when implementing
a BST and it is so rewarding to see it all piece together. 
Here is an increment iterator method. I enjoy this method because I commented out all of 
the cases that I could think through and it is now very interesting
to look back at my train of thought.

```cpp
increment (ConstNodePtr n)
  {
    //cases:
    //1: n->right exists and has no left, return n->right (1 and 2 could be on while(n->left !=nullptr))
    //2. n->right exists and has a left, return the left most of that subtree
    //3. n->right does not exist and parent->left == n, return parent
    //4. n->right does not exist and parent->left != n(n is in rightsubtree),return first parent > n->data
    //    or first parent whos parent == searchNode head, which means it is header 

    if (n->right != nullptr)
    {
      n = n->right;
      while (n->left != nullptr)
        n = n->left;
      return n;
    } 
    else 
    {
      if (n->parent->left == n)
        return n->parent;
      ConstNodePtr temp = n; 
      while (temp->data <= n->data)
      {
        //If temp is header, we have reached end. 
        if (temp == temp->parent->parent)
          return temp->parent;
        temp = temp->parent;
      }
      return temp;
    }
  }
```

## Complex Sorting Algorithms

This lab tasked me with implementing Insertion sort, Mergesort, 
Quicksort, and Shellsort. This lab was very complicated 
due to one-off errors. The first part was implementing 
a function to populate 4 Vectors with the same 
random elements. Each Vector is then sorted and the 
speeds are compared. 

Here is my analysis of the different speeds and 
comparisons. Note that the values in parenthesis is the number of comparisons 
and the double is the time taken to perform the operation. The sorts I implemented 
were compared against the std library and you can see it performs slightly better. 

Table of Results:
```cpp
/*
  N:       20,000,000            40,000,000             80,000,000    
  ============================================================================
  Merge    6354.62  (986639932)  13383.30 (2053281083)  27770.84 (4266548415)
  Quick    1314.08   (20115755)   2702.81   (40115656)   5527.38   (80112085)
  Shell    5332.00 (1886297903)  12148.60 (4312522006)  27986.28 (9442491664)
  std      1117.32                2249.43                5351.19
  My sorts show that quick sort is obviously much faster than merge and shell, 
  this is likely due to the efficiency of the divide and conquer strategy and 
  less comparisons. Shell sort has more comparisons than merge sort but I believe 
  it is faster because merge has to unload elements in a seperate temp vector. 
*/
```

## Nerdluv

This lab was from the Database/Web Design class and was very fun to implement. 
I was tasked with making an Online Dating website called Nerdluv. 
I was given some assets and data to work with so the website followed a style. 
To sign up, a user enters parameters like Name, Age, Personality Type, Favorite OS, 
and the age range that they are looking for. They are then given a list of compatable 
matches!

This lab was done using the LAMP stack, so all of the backend work is with PHP. 
The most interesting aspect of this lab to me was that we had to make an API that 
handled the requests. The API did all of the SQL work and returned JSON. 

Here is a user's perspective when they view their matches:
![dating profiles that match the user](/images/nerdluv.png)

Here is the API file logic when a match is requested. 
The last line will output matches to JSON.
```php
if ($_SERVER["REQUEST_METHOD"] == "GET") {
	# process a GET request
	$name = $_GET["name"];
	$db = getConnection($username, $login);
	$user = getUser($db, $name);
	$basic = getBasicMatches($db, $user);
	$matches = getMatches($user[3], $basic ); 
	# To match specification, data was concat'd on
	print "{\"data\":".json_encode($matches)."}";
}
```

## Javascript Number Puzzle

I absolutely love the sliding number puzzle and have had an app on my phone 
for it for years. I have gotten very fast at it (I never get a chance to brag about that).

This project involved breaking up an image into separate divs, and finding a way 
to swap locations on click. I chose to use the JS position attribute and keep track 
of a dummy 16th div that would swap when applicable. Jquery was very helpful since 
it gave very simple selectors for finding positions. 

![15 sliding number puzzle](/images/fifteen.png)

Here is a helper function I used that highlights the heavy use of 
Jquery selectors and the .position() function in JS. 
```js
// Returns the matching index of the div based on its .position()
function getIndex(position) {
  for (var i = 1; i < 16; i++) {
    var x = $('#puzzlearea > div:nth-child(' + i + ')').position();
    if (equalPositions(position, x)) {
      return i;
    }
  }
  return -1;
}
```

Since this assignment was forward-facing on student virtual machines and 
did not use anything but HTML, CSS, and JS, it is totally fair game 
to show off the final game on this site! 
Check it out [here!](/puzzle/fifteen.html)

## Filesystem

This Operating Systems lab has us implement a filesystem given a formatted disk file. 
This lab is designed to learn how blocks are stored within 
a disk. The first block is called the Super Block and 
contains a bitvector of free or used blocks, and 16 inodes.
The inodes hold information about each of the 16 allowed files
in this small filesystem. The key takeaway of the inode is 
that it contains an array of block pointers so each file may 
not necessarily have all of its contents stored contiguously. 

Here is a diagram from Professor Killian's prompt illustrating the idea.
![how our filesystem works](/images/filesystem.png)

Here is some sample code illustrating the C data types
that were used in this filesystem, followed by some 
brief bit manipulation used to store information. 

```c
struct superblock {
    char[128] freeBlockList;
    inode[15] nodes;
}

struct inode {
    char name[16];
    int size;
    int blockPointers[8];
    int used;
}
...
{   // Code showing the use of moving a file descriptor,
    // and storing data into a char array
    lseek(fs->fildes, 0, SEEK_SET);
    char freeList[128];
    read(fs->fildes,freeList, 128);
}
```

This lab was one of my favorites as it really solidified 
the concepts associated with filesystems, and also highlighted
the fact that a lot of these operations are not very complicated. 