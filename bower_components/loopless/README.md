&#426;oop.&#426;ess
===================

Encapsulated .loop function in LESS

Load
----
```shell
    bower --save-dev install loopless
```
Make a mix
----------
```css
    .loop-in(@selector, @index, @from, @to) when(@selector = '#kraftwerk') {
      &.model-@{index} {
        content: '@{index}';
        z-index: (@index - @from);
      }
    }
```
Loop in selector
----------------
```css
    .loop(in, '#kraftwerk', 1970, 1980);
```   

Rewind
------
```css
    #kraftwerk.model-1970 {
      content: '1970';
      z-index: 0;
    }
    #kraftwerk.model-1971 {
      content: '1971';
      z-index: 1;
    }
    ...
```
Get over
--------
```css
    .loop-over(@selector, @index, @from, @to) when(@selector = '#kraftwerk') {
      &.model-@{index} {
        display: block;
      }
    }

    #kraftwerk {
      .loop(over, '#kraftwerk', 1970, 1980);
    }
```
Ups
---

There are two helpful examples that feed into this solution.

- https://gist.github.com/edwinwebb/5155504
- http://snipplr.com/view/70819/less-loop-to-generate-classes/

