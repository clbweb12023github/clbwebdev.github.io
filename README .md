# Tutorial for web design course


## Responsive HTML

### Responsive Meta Tag:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### Media Queries

```css
@media (max-width: 768px) {
    /* CSS styles for screens up to 768px width */
}
@media (min-width: 768px) and (max-width: 1200px) {
    /* CSS styles for screens between 768px and 1200px width */
}
@media (min-width: 1200px) {
    /* CSS styles for screens above 1200px width */
}
```

### External CSS

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="/css/style.css">
</head>
<body>
```


```css
// style.css

#header {
    background-color: blue;
    font-family: "Arial, Helvetica, sans-serif";
    font-size: 30px;
    color: #090;
    text-align: center;
}
```

### Internal CSS

```html
<!DOCTYPE html>
<html>
<head>
<style>
    #header {
        background-color: blue;
        font-family: "Arial, Helvetica, sans-serif";
        font-size: 30px;
        color: #090;
        text-align: center;
    }
</style>
</head>
<body>
```


### Inline CSS

```html
<!DOCTYPE html>
<html>
<head>
</head>
<body>
    <div style="background-color: blue; 
        font-family: Arial, Helvetica, sans-serif";
        font-size: 30px;  
        color: #090;
        text-align: center;"
    >
        Header
    </div>
</body>
</html>