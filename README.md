# equal-row-height
A jQuery plugin that gives equal height to every row in a grid based on the tallest row item.

## Overview 
When the plugin loads, it looks at each child in the container and creates a child object.  Then, when the child object will look to its left and right to find other items in its row and match their heights.  If a child object includes an image, it will wait until the image loads and then run its comparison.

## Usage
Include jQuery and the plugin on a page. Then select the parent grid container you want to apply the equal row heights to. 

```html
<div class="container">
  <div>col 1</div>
  <div>col 2</div>
  <div>col 3</div>
  <div>col 1</div>
  <div>col 2</div>
  <div>col 3</div>
</div>
<script src="jquery.js"></script>
<script src="jquery.validate.js"></script>
<script>
$(".container").equalRowHeight();
</script>
```

## Installation

###bower 
````bash
bower install equal-row-height --save
````
