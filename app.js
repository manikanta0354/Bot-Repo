var restify = require('restify');
var builder = require('botbuilder');

// Get secrets from server environment
var botConnectorOptions = { 
    appId: 'a487307c-aee5-4c95-9402-60e0acc85df7', 
    appPassword:'V34vMDDMLkGDz8qUn1rK2AN'
};

// Create bot
var connector = new builder.ChatConnector(botConnectorOptions);
var bot = new builder.UniversalBot(connector);

var ClaimData=[
        {
            'Id': '0123',
            'status': 'Denied'
        },
{
            'Id': '0456',
            'status': 'Pending'
        },
{
            'Id': '0009',
            'status': 'Paid'
        },
{
            'Id': '5667',
            'status': 'In Process'
        }

]

var policyData=[
        {
            'Id': 'abc001',
            'status': 'Active',
            'TerminationDate' : 'April 27, 2019'
        },
{
            'Id': 'abc002',
            'status': 'Active',
	    'TerminationDate' : 'February 17, 2018'
        },
{
            'Id': 'abc003',
            'status': 'InActive',
	    'TerminationDate' : 'January 20, 2016'
        }

]

var claimFlag=0;
var policyFlag=0;

bot.dialog('/', function (session) {
    
    //respond with user's message
    //this will send you said+ what ever user says.

   if(session.message.text == "hi" || session.message.text == "Hai" || session.message.text == "hello")
  {
    session.send("Hi How are you today!, How can i help you");
  }
  
  else if (session.message.text == "I need info on my Policy")
  {
   session.send("Can you Please provide your policy no");
   policyFlag=1;
  }

  else if (session.message.text == "Can I know my Claims Status?")
  {
   session.send("Please Provide ur Claim Id?");
   claimFlag=1;
  }

  if (claimFlag==1)
    {
  	ClaimData.find(function(item, i)
	 {
	   if(item.Id === session.message.text)
		{
	    	  index = i;    
		  session.send("Its in "+ ClaimData[index].status+", Amount will be credited to your account");
		  claimFlag=0;
  		}

 	 });
    }



 if (policyFlag==1)
    {  
  	policyData.find(function(item, i)
	 { 
           
	        if(item.Id === session.message.text)
		{
	    	  index = i;    
		  session.send("Your Policy is  "+ policyData[index].status+",and its TerminationDate is"+ policyData[index].TerminationDate);
		  policyFlag=0;
  		}
               
 	 });

       }
 });

// Setup Restify Server
var server = restify.createServer();

// Handle Bot Framework messages
/*here we are giving path as "/api/messages" because during the process of regi9stering bot we have given end point URL as "azure qwebapp url/api/messages" if you want to give some other url give the same url whatever you give in the endpoint excluding azure webapp url */
server.post('/api/messages', connector.listen());

// Serve a static web page
server.get(/.*/, restify.serveStatic({
        'directory': '.',
        'default': 'index.html'
}));

server.listen(process.env.port || 3978, function () {
    console.log('%s listening to %s', server.name, server.url); 
});