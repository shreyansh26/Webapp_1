var express = require('express');
var morgan = require('morgan');
var path = require('path');
var jsdom = require('jsdom').jsdom;
var document = jsdom('<html></html>', {});
var window = document.defaultView;
var $ = require('jquery')(window);
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
/*var jsdom = require('jsdom');
var $ = null;

jsdom.env(
 "http://localhost:8080",
 function (err, window) {ś
   $ = require('jquery')(window);
 }
);*/
//var document = typeof document === 'undefined' ? '' : document;
/*$(document).ready(function(){
    $('#image').mouseenter(function(){
      $('#image').fadeTo('fast',0.5)
    });
    $('#image').mouseleave(function(){
      $('#image').fadeTo('fast',1)
    });
});*/

// Start psql (postgresShell) first
var config = {
  host: 'localhost',
  user: 'postgres',
  database: 'postgres',
  port: '5432',
  password: 'kankunani'
};

var articles={
        'article1':{
          title: 'India | Shreyansh',
          date: 'Feb 2, 2017',
          heading:'India (Bharat)',
          content: `<p>
                       India, officially the Republic of India (BhÄrat Gaá¹arÄjya),[e] is a country in South Asia. It is the seventh-largest country by area, the second-most populous country (with over 1.2 billion people), and the most populous democracy in the world. It is bounded by the Indian Ocean on the south, the Arabian Sea on the southwest, and the Bay of Bengal on the southeast. It shares land borders with Pakistan to the west;[f] China, Nepal, and Bhutan to the northeast; and Myanmar (Burma) and Bangladesh to the east. In the Indian Ocean, India is in the vicinity of Sri Lanka and the Maldives. India's Andaman and Nicobar Islands share a maritime border with Thailand and Indonesia. Its capital is New Delhi; other metropolises include Mumbai, Kolkata, Chennai, Bangalore, Hyderabad and Ahmedabad.
                   </p>
                   <p>
                       Home to the ancient Indus Valley Civilisation and a region of historic trade routes and vast empires, the Indian subcontinent was identified with its commercial and cultural wealth for much of its long history.[17] Four religionsâHinduism, Buddhism, Jainism, and Sikhismâoriginated in India, whereas Zoroastrianism, Judaism, Christianity, and Islam arrived in the first millennium CE, and they also played a part in shaping the region's diverse culture. Gradually annexed and brought under the administration of the British East India Company from the early 18th century and administered directly by the United Kingdom after the Indian Rebellion of 1857, it became an independent nation in 1947 after a struggle for independence that was marked by non-violent resistance led by Mahatma Gandhi.
                   </p>
                   <p>
                       In 2015, the Indian economy was the world's seventh largest by nominal GDP and third largest by purchasing power parity.[14] Following market-based economic reforms in 1991, India became one of the fastest-growing major economies and is considered a newly industrialised country. However, it continues to face the challenges of poverty, corruption, malnutrition, and inadequate public healthcare. A nuclear weapons state and regional power, it has the third largest standing army in the world and ranks sixth in military expenditure among nations. India is a federal constitutional republic governed under a parliamentary system and consists of 29 states and 7 union territories. It is a pluralistic, multilingual and multi-ethnic society and is also home to a diversity of wildlife in a variety of protected habitats.
                   </p>`
        },
        'article2':{
          title:'USA | Shreyansh',
          date: 'Feb 2, 2017',
          heading: 'United States of America',
          content:`<p>
                   The United States of America (USA), commonly referred to as the United States (U.S.) or America, is a federal republic composed of 50 states, a federal district, five major self-governing territories, and various possessions.[fn 1] Forty-eight of the fifty states and the federal district are contiguous and located in North America between Canada and Mexico. The state of Alaska is in the northwest corner of North America, bordered by Canada to the east and across the Bering Strait from Russia to the west. The state of Hawaii is an archipelago in the mid-Pacific Ocean. The U.S. territories are scattered about the Pacific Ocean and the Caribbean Sea. Nine time zones are covered. The geography, climate and wildlife of the country are extremely diverse.
                  </p>
                  <p>
                  At 3.8 million square miles (9.8 million km2)[19] and with over 324 million people, the United States is the world's fourth-largest country by total area (and fourth-largest by land area)[fn 2] and the third-most populous. It is one of the world's most ethnically diverse and multicultural nations, and is home to the world's largest immigrant population.[26] Urbanization climbed to over 80% in 2010 and leads to growing megaregions. The country's capital is Washington, D.C. and its largest city is New York City; the other major metropolitan areas, all with around five million or more inhabitants, are Los Angeles, Chicago, San Francisco, Boston, Dallas, Philadelphia, Houston, Miami, and Atlanta.
                  </p>
                  <p>
                  The United States embarked on a vigorous expansion across North America throughout the 19th century,[29] displacing American Indian tribes, acquiring new territories, and gradually admitting new states until it spanned the continent by 1848.[29] During the second half of the 19th century, the American Civil War led to the end of legal slavery in the country.[30][31] By the end of that century, the United States extended into the Pacific Ocean,[32] and its economy, driven in large part by the Industrial Revolution, began to soar.[33] The SpanishâAmerican War and World War I confirmed the country's status as a global military power. The United States emerged from World War II as a global superpower, the first country to develop nuclear weapons, the only country to use them in warfare, and a permanent member of the United Nations Security Council. It is a founding member of the Organization of American States (OAS) and various other Pan-American and international organizations. The end of the Cold War and the dissolution of the Soviet Union in 1991 left the United States as the world's sole superpower
                  </p>`
        },
        'article3':{
          date: 'Feb 2, 2017',
          title: 'Russia | Shreyansh',
          heading: 'Russia',
          content: `<p>
                   Russia (Listeni/ËrÊÊÉ/; Russian: Ð Ð¾ÑÑÐ¸ÌÑ, tr. Rossija; IPA: [rÉËsÊ²ijÉ]; from the Greek: Î¡ÏÏÎ¯Î± â Rus'), also officially known as the Russian Federation[12] (Russian: Ð Ð¾ÑÑÐ¸ÌÐ¹ÑÐºÐ°Ñ Ð¤ÐµÐ´ÐµÑÐ°ÌÑÐ¸Ñ, tr. Rossijskaja Federacija; IPA: [rÉËsÊ²ijskÉjÉ fÊ²ÉªdÊ²ÉªËratsÉ¨jÉ]), is a country in Eurasia.[13] At 17,075,200 square kilometres (6,592,800 sq mi), Russia is the largest country in the world by surface area, covering more than one-eighth of the Earth's inhabited land area,[14][15][16] and the ninth most populous, with over 140 million people at the end of March 2016.[17][7] The European western part of the country is much more populated and urbanised than the eastern, about 77% of the population live in European Russia. Russia's capital Moscow is one of the largest cities in the world, other major urban centers include Saint Petersburg, Novosibirsk, Yekaterinburg, Nizhny Novgorod and Samara.
                   </p>
                   <p>
                   Extending across the entirety of Northern Asia and much of Eastern Europe, Russia spans eleven time zones and incorporates a wide range of environments and landforms. From northwest to southeast, Russia shares land borders with Norway, Finland, Estonia, Latvia, Lithuania and Poland (both with Kaliningrad Oblast), Belarus, Ukraine, Georgia, Azerbaijan, Kazakhstan, China, Mongolia, and North Korea. It shares maritime borders with Japan by the Sea of Okhotsk and the U.S. state of Alaska across the Bering Strait.
                   </p>
                   <p>
                   The nation's history began with that of the East Slavs, who emerged as a recognizable group in Europe between the 3rd and 8th centuries AD.[18] Founded and ruled by a Varangian warrior elite and their descendants, the medieval state of Rus arose in the 9th century. In 988 it adopted Orthodox Christianity from the Byzantine Empire,[19] beginning the synthesis of Byzantine and Slavic cultures that defined Russian culture for the next millennium.[19] Rus' ultimately disintegrated into a number of smaller states; most of the Rus' lands were overrun by the Mongol invasion and became tributaries of the nomadic Golden Horde in the 13th century.[20] The Grand Duchy of Moscow gradually reunified the surrounding Russian principalities, achieved independence from the Golden Horde, and came to dominate the cultural and political legacy of Kievan Rus'. By the 18th century, the nation had greatly expanded through conquest, annexation, and exploration to become the Russian Empire, which was the third largest empire in history, stretching from Poland on the west to Alaska on the east
                   </p>`,
        },
};

function createTemplate(data){
var title=data.title;
var heading= data.heading;
var date=data.date;
var content=data.content;
var HTMLTemplate=`<html>
        <head>
            <title>
                ${title}
            </title>
            <meta name="viewport" content="width-device-width, initial-sacle=1" />
            <link href="/ui/style.css" rel="stylesheet" />

        </head>

        <body>
            <div class="container">
                <div>
                <a href="/">Home</a>
            </div>
           <hr/>
           <h3>${heading}</h3>
           <div>
               ${date.toDateString()}
           </div>
           <div>
               ${content}
           </div>
           </div>
        </body>
    </html>
    `;
    return HTMLTemplate;
}

function createTemplate2(data){
var title=data.title;
var heading= data.heading;
var date=data.date;
var content=data.content;
var time=data.time;
var HTMLTemplate=`<html>
        <head>
            <title>
                ${title}
            </title>
            <meta name="viewport" content="width-device-width, initial-sacle=1" />
            <link href="/ui/style2.css" rel="stylesheet" />
        </head>

        <body>
            <div class="container">
                <div>
                <a href="/">Home</a>
            </div>
           <hr/>
           <h3>${heading}</h3>
           <div>
               ${date.toDateString()}</br>
               ${time}
           </div>
           <div>
               ${content}
           </div>
           </div>
        </body>
    </html>
    `;
    return HTMLTemplate;
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input,salt){
  var hashed = crypto.pbkdf2Sync(input, salt,10000, 512, 'sha512').toString('hex');
  return ["pbkdf2", "10000", salt, hashed.toString('hex')].join('$');
}
app.get('/hash/:input',function(req,res){
  var hashedString = hash(req.params.input,'this-is-a-random-string');
  res.send(hashedString);
});


var pool = new Pool(config);

app.post('/create-user',function(req,res){    //>curl -v -X POST -H "Content-Type: application/json" -d "{ \"username\": \"shailendra.ks\", \"password\":\"pass2\" }" http://localhost:8080/create-user
   var username = req.body.username;
   var password = req.body.password;
   var salt = crypto.randomBytes(128).toString('hex');
   var dbString = hash(password,salt);
   pool.query('INSERT INTO "users" (username, password) VALUES ($1, $2)', [username, dbString], function(err,result){
     if(err){
          res.status(500).send(err.toString());
      }
      else{
          res.send('User successfully created: '+ username);
        }
   });
});

app.post('/login',function(req,res){    //>curl -v -X POST -H "Content-Type: application/json" -d "{ \"username\": \"shailendra.ks\", \"password\":\"pass2\" }" http://localhost:8080/login
  var username = req.body.username;
  var password = req.body.password;

  pool.query('SELECT * FROM "users" WHERE username= $1', [username], function(err,result){
    if(err){
         res.status(500).send(err.toString());
     }
     else{
       if(result.rows.length===0){
         res.send(403).send('username/password is invalid');
       }else{
         var dbString = result.rows[0].password;
         var salt = dbString.split('$')[2];
         var hashedPassword = hash(password, salt); //Hash based on entered password and old salt
         if(hashedPassword === dbString){
         res.send('credentials correct '+ username);
       }else{
         res.send(403).send('username/password is invalid');
       }
       }
     }
  });
});

app.get('/test-db', function(req,res){
  pool.query('SELECT * from test', function(err,result){
    if(err){
      res.status(500).send(err.toString());
    }
    else{
      res.send(JSON.stringify(result.rows));
    }
  });
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/jq.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'jq.js'));
});

var counter=0;
app.get('/counter', function(req,res){
   counter+=1;
   res.send(counter.toString());
});

var names=[];
app.get('/submit-name', function (req, res) { //URL: /submit-name?name=xxxxx
   var name=req.query.name;
   names.push(name);
  //JSON: Javascript Object Notation
  res.send(JSON.stringify(names));

});

app.get('/:articleName', function(req,res){
    //articleName === article-one
    //articles[articleName]={} content object for article one
    var articleName=req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});

app.get('/articles/:articleName',function(req,res){
	//const conString ="http://localhost/adminer.php?pgsql=localhost&username=postgres&db=postgres&ns=public&select=articlep";
  pool.query("SELECT * FROM articlep WHERE title= $1",[req.params.articleName],function(err,result){
       if(err){
           res.status(500).send(err.toString());
       } else{
        if(result.rows.length===0){
            res.status(404).send('Article not found');
        }else{
            var articleData = result.rows[0];
            res.send(createTemplate(articleData));
        }
       }
    });
});

app.get('/blog/:blog_id', function(req,res){
  pool.query("SELECT * FROM blog WHERE id =$1",[req.params.blog_id],function(err,result){
    if(err){
      res.status(500).send(err.toString());
    }else{
      if(result.rows.length===0){
        res.status(404).send('Article Not found');
      }
      else{
        var blogData=result.rows[0];
        res.send(createTemplate2(blogData));
      }
    }
  });
});

/*
app.get('/article2', function(req,res){
   res.send(createTemplate(articleTwo));
});

app.get('/article3', function(req,res){
    res.send(createTemplate(articleThree));
});
*/
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/style2.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style2.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

/*var names=[];
app.get('/submit-name/:name', function (req, res) {
  var name=req.params.name;
  names.push(name);
  //JSON: Javascript Object Notation
  res.send(JSON.stringify(names));

});
*/

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`Webapp listening on port ${port}!`);
});
