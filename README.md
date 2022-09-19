# TOP - Knights Travails
In this task we need to build a function `knightMoves` that shows the shortest path possible way to get from one square to another by outputting all squares the knight will stop on along the way.

For this approach I decided to first build a board tree connecting cells in all possible moves inside a nested array.

Because all nodes are interconnected, we only need to call the tree variable with the initial desired coordinates and assign to a root constant.

Finally, to get the shortest path the start and end coordinates were inverted, so it starts searching from the end and ending in the start, and we can access all data with the use of `next` key.

The example output is the following:

```javascript
knightMoves([0, 0], [1, 2]);
knightMoves([0, 0], [3, 3]);
knightMoves([3, 3], [0, 0]);
```

Output: 
```
You made it in 1 moves! Here's your path: 
[0,0]
[1,2]
You made it in 2 moves! Here's your path: 
[0,0]
[2,1]
[3,3]
You made it in 2 moves! Here's your path: 
[3,3]
[1,2]
[0,0]
```