const express = require("express");
const app = express();
const path = require("path"); //allows us to use path.join

app.use(express.static(path.join(__dirname, 'public')))

//tell express to use EJS
//accepts 2 arguments: property and value
app.set("view engine", "ejs"); //setting view engine to ejs; express bts will require ejs
//by default when we create new express ap, and we use view engine, express will assume our template exist in directory called /views. so we need to make dir called views

//this enables us to run file from outside views dir
app.set("views", path.join(__dirname, "/views")); //-__dirname refers to dir name wherever index.js file is located
//taking absolute path to the index.js file and adding public
app.use(express.static(path.join(__dirname, 'public')))


app.get("/", (req, res) => {
  // res.send('hi') //sending back text
  //renders a view, and sends rendered HTML to the client. I.e send back file /template
  res.render("home"); //bcas we set the view to ejs, we dont have to specify home.ejs
});

//we are passing info from the request params to subreddit template under the variable name subreddit
app.get("/r/:subreddit", (req, res) => {
  const { subreddit } = req.params; //when we render our template, we will pass through that subreddit from the params
  res.render("Subreddit", { subreddit }); 
  //we can use spread operator to directly access properties, instead of referencing like data.property1 and so on
});

//we can pass info (variables) from our route to template.
app.get("/rand", (req, res) => {
  const num = Math.floor(Math.random() * 10) + 1;
  res.render("random", { num }); //render can accept second argument (object with key value). Variable Num (Object) can be accessed by the random template.
});

app.get("error", (req,res)=>{
  res.render("error")
})

app.get("/cats",(req,res)=>{
    const catArr = ["blue", "yellow", "violet","sandy"]
    res.render("cats", { catArr})
})
app.listen(3000, () => {
  console.log("listening on 3000");
});
