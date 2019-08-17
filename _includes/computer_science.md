## Computer Science Labs

Millersville University Computer Science Professors ask that 
the assignments are not publically available but they highly 
encourage the use of a private repository. My full coursework is 
available upon request. Here are some highlights of my favorite 
assignments.

### Binary Search Tree

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

### Complex Sorting Algorithms

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

### Nerdluv

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
```PHP
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

### Javascript Number Puzzle

