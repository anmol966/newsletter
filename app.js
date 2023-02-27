import fetch from "node-fetch";
import express from "express";
import bodyParser from "body-parser";
import path from "path";

const app = express();
const __dirname = path.resolve();

//66aeb1bedd857f2f86a76b0928970de2-us14

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.post('/signup', (req, res) => {
  const { firstName, lastName, email } = req.body;


  if (!firstName || !lastName || !email) {
    res.redirect('/fail.html');
    return;
  }

  const data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const postData = JSON.stringify(data);

  fetch('https://us14.api.mailchimp.com/3.0/lists/7d2e98b5af', {
    method: 'POST',
    headers: {
      Authorization: 'auth 66aeb1bedd857f2f86a76b0928970de2-us14'
    },
    body: postData
  })
    .then(res.statusCode === 200 ?
      res.redirect('/success.html') :
      res.redirect('/fail.html'))
    .catch(err => console.log(err))
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`));