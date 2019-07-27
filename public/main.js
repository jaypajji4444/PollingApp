const form=document.getElementById("vote-form");


form.addEventListener('submit', e=>{
    
    const choice = document.querySelector('input[name=os]:checked').value;
    const data = {os: choice};

    fetch('http://localhost:3001/poll',{
        method: 'post',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(res => res.json()) // convert response data from json to js object
    .then(data=>console.log(data))
    .catch(err => console.log(err));

    e.preventDefault();
});


// fetch for get

fetch("http://localhost:3001/poll") //hit the get url written in poll.js which is sending votes which are captured in data... data has {success:true,votes:[{id--os--points}]}
.then(res=>res.json())
.then(data=>
    {
    const votes=data.votes;
    const totalVotes=votes.length;

    // easch os vote total  ----  reduce has 2 parameters ..(accumulator, currentValue)
    const voteCount = votes.reduce((acc, vote) => (
        (acc[vote.os] = (acc[vote.os] || 0) + parseInt(vote.points)), acc),
        {}
    );//every vote object will iterate through reduce()
       
    
//Datapponts

let dataPoints = [
    { label: 'Windows', y:voteCount.Windows},
    { label: 'MacOS', y:voteCount.MacOS },
    { label: 'Linux', y:voteCount.Linux },
    { label: 'Other', y:voteCount.Other}
];


// chart elemetn gett

const chartContainer=document.querySelector("#chartContainer");
if(chartContainer)
{
   
    var chart = new CanvasJS.Chart("chartContainer",
    {
       title:{
        text: `Total Votes: ${totalVotes}`, 
        fontWeight: "bolder",
        fontColor: "#008B8B",
        fontfamily: "tahoma",        
        fontSize: 25,
        padding: 10        
      },

      theme:"theme1",


      data: [
      {        
        type: "column",
        dataPoints:dataPoints
    }]
})

      
    

    chart.render();

// get this from your pusher db anbd in write appropritate catching evnts name and bind the correct event accordung to your backend..
    Pusher.logToConsole = true; 

    var pusher = new Pusher('9bbbdb8df23bad0517d8', {  

      cluster: 'ap2',
      forceTLS: true
    });

    var channel = pusher.subscribe('os-poll'); // catching the  event  triggered  from backend(poll.js..).
    channel.bind('os-vote', function(data) { 
        dataPoints=dataPoints.map(x=>{ // map  through your data
            if(x.label==data.os)
            {
                x.y +=data.points;
                return x; // map ma always return the mapping parameter..
            }

            else{
                return x;
            }
        }) ;

        chart.render(); // after we have newly created y coordinates again re render the chart to diaply the change.. 

      
    });

  }


});

 


 